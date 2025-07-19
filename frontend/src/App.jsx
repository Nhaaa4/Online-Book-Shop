import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Books from "./pages/Books"
import BookDetails from "./pages/BookDetails"
import Authentication from "./pages/Authentication"
import Profile from "./pages/Profile"
import CartItems from "./pages/CartItems"
import Home from "./pages/Home"
import PlaceOrder from "./pages/PlaceOrder"
import Verify from "./pages/Verify"
import About from "./pages/About"
import Contact from "./pages/Contact"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/books/:id" element={<BookDetails/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/authentication" element={<Authentication/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<CartItems/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>}/>
      </Route>
    </>
  )
)

function App() {
  return <RouterProvider router={router} /> 
}

export default App
