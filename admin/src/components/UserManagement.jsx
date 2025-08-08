import { Edit, Eye, Loader2, Trash2, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { usersAPI, rolesAPI } from "@/lib/api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { toast } from "react-toastify"

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    role_id: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Helper function to get role name from role_id
  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId)
    return role ? role.role : 'Unknown'
  }

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await usersAPI.getAll()
      console.log('Users response:', response.data.data)
      setUsers(response.data.data)
    } catch (err) {
      console.log(err);
    } finally {
        setIsLoading(false)
    }
  }

  const fetchRoles = async () => {
    try {
      setIsLoading(true)
      const response = await rolesAPI.getAll()
      console.log('Roles response:', response.data.data)
      setRoles(response.data.data)
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      role_id: null,
    })
  }

  const handleAddUser = async () => {
    try {
      setIsSubmitting(true)
      const newUser = await usersAPI.create(formData)
      if (!newUser.data.success) {
        toast.error(newUser.data.message)
      } else {
        toast.success(newUser.data.message)
        fetchUsers()
        setIsAddDialogOpen(false)
        resetForm()
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error creating user');
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditUser = (userUpdate) => {
    setSelectedUser(userUpdate)
    setFormData({
      first_name: userUpdate.first_name,
      last_name: userUpdate.last_name,
      email: userUpdate.email,
      phone_number: userUpdate.phone_number || "",
      password: "",
      role_id: userUpdate.role_id,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = async () => {
    try {
      setIsSubmitting(true)
      const response = await usersAPI.update(selectedUser.id, { role_id: formData.role_id })
      if (response.data.success) {
          toast.success(response.data.message)
          fetchUsers()
          setIsEditDialogOpen(false)
          setSelectedUser(null)
          resetForm()
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error updating user');
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (id) => {
      try {
        const response = await usersAPI.delete(id);
        if (response.data.success) {
          toast.success(response.data.message);
          fetchUsers()
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || 'Error deleting user');
      }
    };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground">Manage users and their roles</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading users...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage users and their roles</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with role assignment</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone_number">Phone Number *</Label>
                <Input
                  id="phone_number"
                  type="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone_number: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role_id?.toString() || ""}
                  onValueChange={(value) => {
                    console.log('Role selected:', value);
                    setFormData((prev) => ({ ...prev, role_id: Number.parseInt(value) }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  resetForm()
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleAddUser} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add User"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* show user */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users in your bookshop</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.Role?.role || getRoleName(user.role_id) || 'No Role'}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}> 
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm" 
                        onClick={() => handleDeleteUser(user.id)}
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

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details and role assignment</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
                  disabled
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                disabled
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role_id?.toString() || ""}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, role_id: Number.parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                resetForm()
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}