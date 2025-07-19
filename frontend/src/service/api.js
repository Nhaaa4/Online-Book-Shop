import axios from "axios"
import { toast } from "sonner"

const baseUrl = import.meta.env.VITE_BACKEND_URL

export async function getBookById(id) {
  try {
    const response = await axios.get(baseUrl + `/api/books/${id}`)

    return response.data
  } catch (err) {
    console.error(err)
    toast(err.response.data.message)
  }
}
