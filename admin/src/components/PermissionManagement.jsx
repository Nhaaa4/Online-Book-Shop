import { rolesAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatePermissionDialogOpen, setIsCreatePermissionDialogOpen] = useState(false)
  const [isEditPermissionDialogOpen, setIsEditPermissionDialogOpen] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState(null)
  const [permissionFormData, setPermissionFormData] = useState({
    permission: "",
    description: "",
  })
  const [isSubmittingPermission, setIsSubmittingPermission] = useState(false)

  const fetchPermissions = async () => {
    try {
      setIsLoading(true);
      const responsePermissions = await rolesAPI.getPermissions();
      console.log('Permissions response:', responsePermissions.data.data);
      setPermissions(responsePermissions.data.data);
    } catch (error) {
      console.error("Error loading permissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions()
  }, []);

  // Permission management functions
  const resetPermissionForm = () => {
    setPermissionFormData({
      permission: "",
      description: "",
    })
  }

  const handleCreatePermission = async () => {
    if (!permissionFormData.permission.trim()) {
      toast.error("Please enter a permission name")
      return
    }

    try {
      setIsSubmittingPermission(true)
      const response = await rolesAPI.createPermission(permissionFormData)
      if (response.data.success) {
        toast.success(response.data.message)
        fetchPermissions() // Refresh data
        setIsCreatePermissionDialogOpen(false)
        resetPermissionForm()
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error creating permission');
    } finally {
      setIsSubmittingPermission(false)
    }
  }

  const handleEditPermission = async (permission) => {
    setSelectedPermission(permission)
    setPermissionFormData({
      permission: permission.permission,
      description: permission.description || "",
    })
    setIsEditPermissionDialogOpen(true)
  }

  const handleUpdatePermission = async () => {
    if (!permissionFormData.permission.trim()) {
      toast.error("Please enter a permission name")
      return
    }

    try {
      setIsSubmittingPermission(true)
      const response = await rolesAPI.updatePermission(selectedPermission.id, permissionFormData)
      if (response.data.success) {
        toast.success(response.data.message)
        fetchPermissions() // Refresh data
        setIsEditPermissionDialogOpen(false)
        setSelectedPermission(null)
        resetPermissionForm()
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error updating permission');
    } finally {
      setIsSubmittingPermission(false)
    }
  }

  const handleDeletePermission = async (id) => {
    if (!confirm('Are you sure you want to delete this permission? This action cannot be undone.')) {
      return
    }
    
    try {
      const response = await rolesAPI.deletePermission(id);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchPermissions() // Refresh data
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error deleting permission');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Permission Management
            </h2>
            <p className="text-muted-foreground">
              Manage system permissions
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading permissions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Permission Management Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Permission Management</h2>
            <p className="text-muted-foreground">Manage system permissions</p>
          </div>
          <Dialog open={isCreatePermissionDialogOpen} onOpenChange={setIsCreatePermissionDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetPermissionForm}>
                <Plus className="mr-2 h-4 w-4" />
                Create Permission
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Permission</DialogTitle>
                <DialogDescription>Add a new permission to the system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="permission-name">Permission Name</Label>
                  <Input
                    id="permission-name"
                    value={permissionFormData.permission}
                    onChange={(e) => setPermissionFormData((prev) => ({ ...prev, permission: e.target.value }))}
                    placeholder="e.g., create.user"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="permission-description">Description (optional)</Label>
                  <Input
                    id="permission-description"
                    value={permissionFormData.description}
                    onChange={(e) => setPermissionFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of what this permission allows"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatePermissionDialogOpen(false)} disabled={isSubmittingPermission}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePermission} disabled={isSubmittingPermission}>
                  {isSubmittingPermission ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Permission"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Permissions List */}
        <div className="grid gap-2">
          {permissions.map((permission) => (
            <Card key={permission.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium">{permission.permission}</div>
                  {permission.description && (
                    <div className="text-sm text-muted-foreground">{permission.description}</div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditPermission(permission)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePermission(permission.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Permission Dialog */}
      <Dialog open={isEditPermissionDialogOpen} onOpenChange={setIsEditPermissionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
            <DialogDescription>Modify the permission details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-permission-name">Permission Name</Label>
              <Input
                id="edit-permission-name"
                value={permissionFormData.permission}
                onChange={(e) => setPermissionFormData((prev) => ({ ...prev, permission: e.target.value }))}
                placeholder="e.g., create.user"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-permission-description">Description (optional)</Label>
              <Input
                id="edit-permission-description"
                value={permissionFormData.description}
                onChange={(e) => setPermissionFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of what this permission allows"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditPermissionDialogOpen(false)
                resetPermissionForm()
              }}
              disabled={isSubmittingPermission}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdatePermission} disabled={isSubmittingPermission}>
              {isSubmittingPermission ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Permission"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
