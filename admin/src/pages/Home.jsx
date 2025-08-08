import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usersAPI, booksAPI, ordersAPI } from "@/lib/api"
import { BarChart3, BookOpen, Loader2, ShoppingCart, Users } from "lucide-react"
import { useEffect, useState, useCallback } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [numCustomers, setNumCustomers] = useState(0)
  const [numBooks, setNumBooks] = useState(0)
  const [numOrders, setNumOrders] = useState(0)

  const fetchData = useCallback(async () => {
      try {
        setIsLoading(true);
        const [numberOfCustomers, numberOfBooks, numberOfOrders] = await Promise.all([
          usersAPI.getCount(),
          booksAPI.getCount(),
          ordersAPI.getCount(),
        ]);
        
        console.log('API Responses:', {
          customers: numberOfCustomers.data,
          books: numberOfBooks.data,
          orders: numberOfOrders.data,
        });
        
        // Handle different response formats from backend
        setNumCustomers(numberOfCustomers.data.data?.count || 0);
        setNumBooks(numberOfBooks.data.data || 0);
        setNumOrders(numberOfOrders.data.data || 0);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to your bookshop admin panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books in Stock</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
