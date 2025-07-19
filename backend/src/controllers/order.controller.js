import db from '../db/models/index.js'
import Stripe from 'stripe';

const { Order, CartItem, Book, User, Author } = db

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "usd";

export async function placeOrder(req, res) {
  const { items, totalAmount, village_id } = req.body;
  const userId = req.user.id; 

  if (!userId || !items || !totalAmount) {
    return res.status(400).json({
      success: false,
      message: "User ID, items, and total amount are required",
    });
  }

  const t = await db.sequelize.transaction();

  try {
    if (village_id !== null) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      user.village_id = village_id;
      await user.save({ transaction: t });
    }

    // Create order
    const order = await Order.create(
      {
        user_id: userId,
        order_status: "pending",
        payment_method: "cash",
        payment_status: false,
        total_amount: totalAmount,
      },
      { transaction: t }
    );

    // Build cart rows
    const cartRows = Object.entries(items).map(([bookId, qty]) => ({
      order_id: order.id, // your variable
      book_id: Number(bookId),
      quantity: Number(qty),
    }));

    // Insert cart items
    await CartItem.bulkCreate(cartRows, {
      validate: true,
      transaction: t,
    });

    // Update book stock
    for (const [bookId, quantity] of Object.entries(items)) {
      await Book.decrement('stock_quantity', {
        by: quantity,
        where: { id: Number(bookId) },
        transaction: t,
      });
    }


    // Commit transaction
    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    await t.rollback();
    console.error("Failed to place order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
}

export async function placeOrderStripe(req, res) {
  const { items, totalAmount, village_id } = req.body;
  const userId = req.user.id;
  const { origin } = req.headers;

  const t = await db.sequelize.transaction();

  try {
    if (village_id) {
      const user = await User.findByPk(userId)

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      user.village_id = village_id;
      await user.save({ transaction: t });
    }

    const order = await Order.create(
      {
        user_id: userId,
        total_amount: totalAmount,
        payment_method: "Stripe",
        payment_status: false,
        order_status: "pending",
      },
      { transaction: t }
    );

    const cartItems = Object.entries(items).map(([bookId, qty]) => ({
      order_id: order.id,
      book_id: Number(bookId),
      quantity: Number(qty),
    }));

    await CartItem.bulkCreate(cartItems, { transaction: t });
    
    // Update book stock
    for (const [bookId, quantity] of Object.entries(items)) {
      await Book.decrement('stock_quantity', {
        by: quantity,
        where: { id: Number(bookId) },
        transaction: t,
      });
    }


    const books = await Book.findAll({
      where: { id: Object.keys(items) },
    });

    const line_items = books.map((book) => ({
      price_data: {
        currency,
        product_data: { name: book.title },
        unit_amount: Math.round(book.price * 100),
      },
      quantity: items[book.id],
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order.id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order.id}`,
      line_items,
      mode: "payment",
    });

    await t.commit();

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    await t.rollback();
    console.error("Stripe Order Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function verifyStripe(req, res) {
  const { orderId, success } = req.query;

  try {
    if (!orderId || typeof success === 'undefined') {
      return res.status(400).json({ success: false, message: "Missing orderId or success status" });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (success === "true") {
      // Update payment status to success
      order.payment_status = true;
      await order.save();

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment failed. Order deleted." });
    }
  } catch (error) {
    console.error("Stripe verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
}

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: CartItem,
          include: [
            { model: Book, attributes: ["title", "price"],
              include: [
                { model: Author, attributes: ["first_name", "last_name"] }
              ]
             },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    })

    const formatted = orders.map(order => ({
      id: order.id,
      date: order.createdAt,
      status: order.order_status,
      total: order.total_amount,
      paymentStatus: order.payment_status,
      paymentMethod: order.payment_method,
      items: order.CartItems.map(item => ({
        title: item.Book.title,
        author: item.Book.Author.first_name + " " + item.Book.Author.last_name,
        price: item.Book.price,
        quantity: item.quantity,
      })),
    }))

    res.json({ success: true, data: formatted })
  } catch (error) {
    console.error("Failed to fetch order history:", error)
    res.status(500).json({ success: false, message: "Failed to fetch order history", error: error.message })
  }
}