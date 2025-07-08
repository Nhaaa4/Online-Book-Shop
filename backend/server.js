import express from "express"
import cors from "cors"
import 'dotenv/config'
import bookRoute from "./src/router/book.route.js"
import customerRoute from "./src/router/customer.route.js"

const app = express()
const port = process.env.PORT

// Enable CORS for all routes and origins
app.use(cors());

// Enable json serialization
app.use(express.json());

app.use('/api/books', bookRoute)
app.use('/api/customer', customerRoute)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})