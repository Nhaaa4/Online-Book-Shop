import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Books from "./pages/Books"
import BookDetails from "./pages/BookDetails"
import Authentication from "./pages/Authentication"
import Profile from "./pages/Profile"
import CartItems from "./pages/CartItems"
import Home from "./pages/Home"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/books/:id" element={<BookDetails/>}/>
        <Route path="/authentication" element={<Authentication/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<CartItems/>}/>
      </Route>
    </>
  )
)

function App() {
  return <RouterProvider router={router} /> 
}

export default App
