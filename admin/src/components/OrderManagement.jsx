import { ordersAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Edit, Loader2, Package, CheckCircle, Truck, Clock, AlertCircle, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "react-toastify";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [numOrders, setNumOrder] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStatus, setNewStatus] = useState("pending");

  // Enhanced order statuses with more options
  const orderStatuses = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ];

  // Status styling function for modern appearance with icons
  const getStatusStyle = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200 hover:scale-105 shadow-sm flex items-center gap-1 w-fit";
    
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          className: `${baseClasses} bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200`,
          icon: <CheckCircle className="h-3 w-3" />
        };
      case "shipped":
        return {
          className: `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200`,
          icon: <Truck className="h-3 w-3" />
        };
      case "processing":
        return {
          className: `${baseClasses} bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-200`,
          icon: <Clock className="h-3 w-3" />
        };
      case "pending":
        return {
          className: `${baseClasses} bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-gray-200`,
          icon: <AlertCircle className="h-3 w-3" />
        };
      case "cancelled":
        return {
          className: `${baseClasses} bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200`,
          icon: <XCircle className="h-3 w-3" />
        };
      default:
        return {
          className: `${baseClasses} bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-200`,
          icon: <Package className="h-3 w-3" />
        };
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await ordersAPI.getAll();
      const numberOfOrders = await ordersAPI.getNumber()
      setOrders(response.data.data);
      setNumOrder(numberOfOrders.data.data)
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders()
  }, []);

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsEditDialogOpen(true);
  };

  const handleUpdateOrderStatus = async () => {
    try {
      setIsSubmitting(true);
      const response = await ordersAPI.updateStatus(selectedOrder.id, newStatus);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchOrders();
        setIsEditDialogOpen(false);
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error(err.response?.data?.message || 'Error updating order status');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Order Management
            </h2>
            <p className="text-muted-foreground">
              Manage customer's order here
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Order Management
          </h2>
          <p className="text-muted-foreground">
            View and manage all customer orders
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Orders ({numOrders}) {orders.length > 0 && `- Showing ${orders.length} orders`}
          </CardTitle>
          <CardDescription>List of orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.items?.length || 0} item(s)</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>
                      <div className={getStatusStyle(order.status).className}>
                        {getStatusStyle(order.status).icon}
                        {order.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditOrder(order)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Order Status Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status of order #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="order_status">Order Status</Label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        {getStatusStyle(status.value).icon}
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Status Preview */}
            {newStatus && (
              <div>
                <Label>Status Preview</Label>
                <div className="mt-2">
                  <div className={getStatusStyle(newStatus).className}>
                    {getStatusStyle(newStatus).icon}
                    {newStatus}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedOrder(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateOrderStatus} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
