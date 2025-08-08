import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Trash2, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { booksAPI } from "@/lib/api"
import { toast } from "react-toastify"

export default function BookManagement() {
  const [books, setBooks] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    image_url: "",
    author_id: 0,
    category_id: 0,
    authorName: "",
    categoryName: "",
  })
  const [authors, setAuthors] = useState([])
  const [categories, setCategories] = useState([])

  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      const response = await booksAPI.getAll()
      console.log('API Response:', response.data.data);
      console.log('First book:', response.data.data[0]);
      setBooks(response.data.data)
    } catch (err) {
      console.error('Error fetching books:', err);
      toast.error(err.response?.data?.message || 'Error fetching books');
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAuthorsAndCategories = async () => {
    try {
      setIsLoading(true)
      const authorsData = await booksAPI.getAuthors()
      const categoriesData = await booksAPI.getCategories()
      setAuthors(authorsData.data.data)
      setCategories(categoriesData.data.data)
    } catch (err) {
      console.error('Error fetching authors/categories:', err);
      toast.error(err.response?.data?.message || 'Error fetching authors/categories');
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
    fetchAuthorsAndCategories()
  }, [])

  const resetForm = () => {
    setFormData({
      title: "",
      isbn: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      image_url: "",
      author_id: 0,
      category_id: 0,
      authorName: "",
      categoryName: "",
    })
  }

  const handleAdd = async () => {
    try {
      setIsLoading(true)
      
      // Validation
      if (!formData.title || !formData.isbn || !formData.author_id || !formData.category_id || !formData.price) {
        toast.error('Please fill in all required fields (Title, ISBN, Author, Category, Price)');
        return;
      }

      console.log('Creating book with data:', formData);
      const response = await booksAPI.create(formData)
      console.log('Create book response:', response);
      
      if (response.data.success) {
        toast.success(response.data.message)
        fetchBooks()
        setIsAddDialogOpen(false)
        resetForm()
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error('Error creating book:', err);
      toast.error(err.response?.data?.message || 'Error creating book');
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (book) => {
    console.log('=== EDIT DEBUG START ===');
    console.log('Full book object:', JSON.stringify(book, null, 2));
    console.log('Book title:', book.title);
    console.log('Book description:', book.description);
    console.log('Book Author object:', book.Author);
    console.log('Book Category object:', book.Category);
    console.log('Author ID:', book.Author?.id);
    console.log('Category ID:', book.Category?.id);
    console.log('Available authors:', authors);
    console.log('Available categories:', categories);
    
    setSelectedBook(book)
    const editFormData = {
      title: book.title || "",
      isbn: book.isbn || "",
      description: book.description || "",
      price: book.price || 0,
      stock_quantity: book.stock_quantity || 0,
      image_url: book.image_url || "",
      author_id: book.Author?.id || 0,
      category_id: book.Category?.id || 0,
      authorName: book.Author ? `${book.Author.first_name} ${book.Author.last_name}` : "",
      categoryName: book.Category ? book.Category.category_name : "",
    }
    
    console.log('Form data being set:', JSON.stringify(editFormData, null, 2));
    console.log('=== EDIT DEBUG END ===');
    setFormData(editFormData)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      
      // Validation
      if (!formData.title || !formData.author_id || !formData.category_id || !formData.price) {
        toast.error('Please fill in all required fields (Title, Author, Category, Price)');
        return;
      }

      console.log('Updating book with data:', formData);
      const response = await booksAPI.update(selectedBook.id, {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        stock_quantity: formData.stock_quantity,
        image_url: formData.image_url,
        author_id: formData.author_id,
        category_id: formData.category_id
      })
      console.log('Update book response:', response);
      
      if (response.data.success) {
        toast.success(response.data.message)
        fetchBooks()
        setIsEditDialogOpen(false)
        setSelectedBook(null)
        resetForm()
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error('Error updating book:', err);
      toast.error(err.response?.data?.message || 'Error updating book');
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (bookId) => {
    try {
      const response = await booksAPI.delete(bookId)
      if (response.data.success) {
        toast.success(response.data.message);
        fetchBooks()
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error deleting book');
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Book Management</h2>
            <p className="text-muted-foreground">Manage your book inventory</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading books...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Book Management</h2>
          <p className="text-muted-foreground">Manage your book inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>Add a new book to your inventory</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isbn: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={formData.stock_quantity || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, stock_quantity: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/book-cover.jpg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="author">Author *</Label>
                  <Select
                    value={formData.author_id.toString()}
                    onValueChange={(value) => {
                      const authorId = Number.parseInt(value)
                      const author = authors.find((a) => a.id === authorId)
                      setFormData((prev) => ({
                        ...prev,
                        author_id: authorId,
                        authorName: author ? `${author.first_name} ${author.last_name}` : "",
                      }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id.toString()}>
                          {author.first_name} {author.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category_id.toString()}
                    onValueChange={(value) => {
                      const categoryId = Number.parseInt(value)
                      const category = categories.find((c) => c.id === categoryId)
                      setFormData((prev) => ({
                        ...prev,
                        category_id: categoryId,
                        categoryName: category?.category_name || "",
                      }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  resetForm()
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Book'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Inventory</CardTitle>
          <CardDescription>Manage your bookshop's book collection</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>
                    {book.Author ? `${book.Author.first_name} ${book.Author.last_name}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {book.Category ? book.Category.category_name : 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell>${book.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        book.stock_quantity > 10 ? "default" : book.stock_quantity > 0 ? "secondary" : "destructive"
                      }
                    >
                      {book.stock_quantity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(book)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(book.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update book information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image_url">Image URL</Label>
              <Input
                id="edit-image_url"
                value={formData.image_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/book-cover.jpg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-author">Author *</Label>
                <Select
                  value={formData.author_id && formData.author_id > 0 ? formData.author_id.toString() : ""}
                  onValueChange={(value) => {
                    const authorId = Number.parseInt(value)
                    const author = authors.find((a) => a.id === authorId)
                    setFormData((prev) => ({
                      ...prev,
                      author_id: authorId,
                      authorName: author ? `${author.first_name} ${author.last_name}` : "",
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id.toString()}>
                        {author.first_name} {author.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select
                  value={formData.category_id && formData.category_id > 0 ? formData.category_id.toString() : ""}
                  onValueChange={(value) => {
                    const categoryId = Number.parseInt(value)
                    const category = categories.find((c) => c.id === categoryId)
                    setFormData((prev) => ({
                      ...prev,
                      category_id: categoryId,
                      categoryName: category?.category_name || "",
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price ($) *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock_quantity">Stock Quantity</Label>
                  <Input
                    id="edit-stock_quantity"
                    type="number"
                    value={formData.stock_quantity || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, stock_quantity: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                resetForm()
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Book'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
