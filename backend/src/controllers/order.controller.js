import db from '../db/models/index.js'

const { ShippingMethod, Order } = db

export async function getShippingMethods(req, res) {
  try {
    const shippingMethods = await ShippingMethod.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json({ success: true, data: shippingMethods });
  } catch (error) {
    console.error("Failed to fetch shipping methods:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch shipping methods' });
  }
}