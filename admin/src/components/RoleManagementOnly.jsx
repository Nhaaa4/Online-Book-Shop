import { rolesAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CheckCircle, Crown, Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    role: "",
    permissionIds: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchRoles = async () => {
    try {
      setIsLoading(true);

      const responseRoles = await rolesAPI.getAll();
      const responsePermissions = await rolesAPI.getPermissions();
      
      setRoles(responseRoles.data.data);
      setPermissions(responsePermissions.data.data);
    } catch (error) {
      console.error("Error loading roles/permissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles()
  }, []);

  const resetForm = () => {
    setFormData({
      role: "",
      permissionIds: [],
    })
  }

  const handleCreateRole = async () => {
    if (!formData.role.trim()) {
      toast.error("Please enter a role name")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await rolesAPI.create(formData)
      if (response.data.success) {
        toast.success(response.data.message)
        fetchRoles()
        setIsCreateDialogOpen(false)
        resetForm()
      }
    } catch (err) {
      console.error('Error creating role:', err);
      toast.error(err.response?.data?.message || 'Error creating role');
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditRole = async (role) => {
    setSelectedRole(role)
    
    // Extract permission IDs from the role's permissions array
    const existingPermissions = role.Permissions || role.permissions || [];
    const permissionIds = existingPermissions.map(permission => permission.id || permission.permission_id);
    
    setFormData({
      role: role.role,
      permissionIds: permissionIds,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateRole = async () => {
    if (!formData.role.trim()) {
      toast.error("Please enter a role name")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await rolesAPI.update({ roleId: selectedRole.id, permissionIds: formData.permissionIds })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchRoles()
        setIsEditDialogOpen(false)
        setSelectedRole(null)
        resetForm()
      }
    } catch (err) {
      console.error('Error updating role:', err);
      toast.error(err.response?.data?.message || 'Error updating role');
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteRole = async (id) => {
    try {
      const response = await rolesAPI.delete(id);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchRoles()
      }
    } catch (err) {
      console.error('Error deleting role:', err);
      toast.error(err.response?.data?.message || 'Error deleting role');
    }
  };

  const togglePermission = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter((p) => p !== permissionId)
        : [...prev.permissionIds, permissionId],
    }))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Role Management
            </h2>
            <p className="text-muted-foreground">
              Manage user roles and their permissions
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading roles...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
          <p className="text-muted-foreground">Manage user roles and their permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Create a new role and assign permissions to it.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="Enter role name"
                />
              </div>
              <div className="space-y-4">
                <Label>Permissions</Label>
                <div className="grid gap-2 max-h-60 overflow-y-auto border rounded p-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Switch
                        id={`create-${permission.id}`}
                        checked={formData.permissionIds.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                      <Label htmlFor={`create-${permission.id}`} className="text-sm flex-1">
                        <div>
                          <div className="font-medium">{permission.permission}</div>
                          {permission.description && (
                            <div className="text-xs text-muted-foreground">{permission.description}</div>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Selected: {formData.permissionIds.length} of {permissions.length} permissions
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Role"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Show roles */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  {role.role}
                </CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Role ID: {role.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    Permissions ({(role.Permissions || role.permissions || []).length}):
                  </h4>
                  <div className="grid gap-1">
                    {(role.Permissions || role.permissions || []).slice(0, 3).map((permission) => (
                      <div
                        key={permission.id || permission}
                        className="flex items-center gap-2 text-xs"
                      >
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {permission.description || permission.permission || permission}
                      </div>
                    ))}
                    {(role.Permissions || role.permissions || []).length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{(role.Permissions || role.permissions || []).length - 3} more permissions
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Update role */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Modify the role and its permissions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-role-name">Role Name</Label>
              <Input
                id="edit-role-name"
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="Enter role name"
                disabled
              />
            </div>
            <div className="space-y-4">
              <Label>Permissions</Label>
              <div className="grid gap-2 max-h-60 overflow-y-auto border rounded p-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Switch
                      id={`edit-${permission.id}`}
                      checked={formData.permissionIds.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                    <Label htmlFor={`edit-${permission.id}`} className="text-sm flex-1">
                      <div>
                        <div className="font-medium">{permission.permission}</div>
                        {permission.description && (
                          <div className="text-xs text-muted-foreground">{permission.description}</div>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Selected: {formData.permissionIds.length} of {permissions.length} permissions
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
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Role"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
