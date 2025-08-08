import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import AdminLayout from "./layouts/AdminLayout"
import Home from "./pages/Home"
import UserManagement from "./pages/UserManagement"
import RoleManagement from "./pages/RoleManagement"
import PermissionManagement from "./pages/PermissionManagement"
import BookManagement from "./pages/BookManagement"
import OrderManagement from "./pages/OrderManagement"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AdminLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/users" element={<UserManagement/>}/>
        <Route path="/roles" element={<RoleManagement/>}/>
        <Route path="/permissions" element={<PermissionManagement/>}/>
        <Route path="/books" element={<BookManagement/>}/>
        <Route path="/orders" element={<OrderManagement/>}/>
      </Route>
    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
