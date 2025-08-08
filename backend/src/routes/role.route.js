import { Router } from "express";
import { getRoles, getPermissions, createRole, updateRole, deleteRole, createPermission, updatePermission, deletePermission } from "../controllers/role.controller.js";
import { authUser, authorize } from "../middleware/auth.middleware.js";

const roleRoute = Router();

// Get all roles
roleRoute.get('/', authUser, authorize('select.role'), getRoles);

// Get all permissions
roleRoute.get('/permission', authUser, authorize('select.permission'), getPermissions);

// Create a new role
roleRoute.post('/', authUser, authorize('insert.role'), createRole);

// Update role permissions
roleRoute.post('/update-role', authUser, authorize('update.role'), updateRole);

// Delete a role
roleRoute.delete('/:id', authUser, authorize('delete.role'), deleteRole);

// Permission management routes
// Create a new permission
roleRoute.post('/permission', authUser, authorize('insert.permission'), createPermission);

// Update a permission
roleRoute.patch('/permission/:id', authUser, authorize('update.permission'), updatePermission);

// Delete a permission
roleRoute.delete('/permission/:id', authUser, authorize('delete.permission'), deletePermission);

export default roleRoute;
