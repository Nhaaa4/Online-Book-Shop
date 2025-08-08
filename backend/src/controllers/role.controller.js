import db from '../db/models/index.js';

const { Role, Permission, RolePermission } = db;

// Get all roles
export async function getRoles(req, res) {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: Permission,
          through: { attributes: [] }
        }
      ]
    });
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch roles', error: error.message });
  }
}

// Get all permissions
export async function getPermissions(req, res) {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json({ success: true, data: permissions });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch permissions', error: error.message });
  }
}

// Create a new role
export async function createRole(req, res) {
  try {
    const { role, permissionIds } = req.body;

    if (!role || !permissionIds || !Array.isArray(permissionIds)) {
      return res.status(400).json({ success: false, message: 'Role name and permission IDs are required' });
    }

    // Create the role
    const newRole = await Role.create({ role: role.trim() });

    // Add permissions to the role
    if (permissionIds.length > 0) {
      const permissions = await Permission.findAll({
        where: { id: permissionIds }
      });
      await newRole.setPermissions(permissions);
    }

    // Fetch the created role with permissions
    const roleWithPermissions = await Role.findByPk(newRole.id, {
      include: [
        {
          model: Permission,
          through: { attributes: [] }
        }
      ]
    });

    res.status(201).json({ success: true, data: roleWithPermissions, message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ success: false, message: 'Failed to create role', error: error.message });
  }
}

// Update role permissions
export async function updateRole(req, res) {
  try {
    const { roleId, permissionIds } = req.body;

    if (!roleId || !permissionIds || !Array.isArray(permissionIds)) {
      return res.status(400).json({ success: false, message: 'Role ID and permission IDs are required' });
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    // Update permissions
    const permissions = await Permission.findAll({
      where: { id: permissionIds }
    });
    await role.setPermissions(permissions);

    // Fetch the updated role with permissions
    const updatedRole = await Role.findByPk(roleId, {
      include: [
        {
          model: Permission,
          through: { attributes: [] }
        }
      ]
    });

    res.status(200).json({ success: true, data: updatedRole, message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ success: false, message: 'Failed to update role', error: error.message });
  }
}

// Delete a role
export async function deleteRole(req, res) {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    // Remove role permissions first
    await role.setPermissions([]);
    
    // Delete the role
    await role.destroy();

    res.status(200).json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ success: false, message: 'Failed to delete role', error: error.message });
  }
}

// Create a new permission
export async function createPermission(req, res) {
  try {
    const { permission, description } = req.body;

    if (!permission) {
      return res.status(400).json({ success: false, message: 'Permission name is required' });
    }

    // Check if permission already exists
    const existingPermission = await Permission.findOne({
      where: { permission: permission.trim() }
    });

    if (existingPermission) {
      return res.status(400).json({ success: false, message: 'Permission already exists' });
    }

    // Create the permission
    const newPermission = await Permission.create({
      permission: permission.trim(),
      description: description?.trim() || null
    });

    res.status(201).json({ 
      success: true, 
      message: 'Permission created successfully', 
      data: newPermission 
    });
  } catch (error) {
    console.error('Error creating permission:', error);
    res.status(500).json({ success: false, message: 'Failed to create permission', error: error.message });
  }
}

// Update a permission
export async function updatePermission(req, res) {
  try {
    const { id } = req.params;
    const { permission, description } = req.body;

    if (!permission) {
      return res.status(400).json({ success: false, message: 'Permission name is required' });
    }

    // Find the permission
    const existingPermission = await Permission.findByPk(id);
    if (!existingPermission) {
      return res.status(404).json({ success: false, message: 'Permission not found' });
    }

    // Check if permission name already exists (excluding current permission)
    const duplicatePermission = await Permission.findOne({
      where: { 
        permission: permission.trim(),
        id: { [db.Sequelize.Op.ne]: id }
      }
    });

    if (duplicatePermission) {
      return res.status(400).json({ success: false, message: 'Permission name already exists' });
    }

    // Update the permission
    await existingPermission.update({
      permission: permission.trim(),
      description: description?.trim() || null
    });

    res.status(200).json({ 
      success: true, 
      message: 'Permission updated successfully', 
      data: existingPermission 
    });
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ success: false, message: 'Failed to update permission', error: error.message });
  }
}

// Delete a permission
export async function deletePermission(req, res) {
  try {
    const { id } = req.params;

    // Find the permission
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ success: false, message: 'Permission not found' });
    }

    // Check if permission is being used by any roles
    const rolesWithPermission = await RolePermission.findAll({
      where: { permission_id: id }
    });

    if (rolesWithPermission.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete permission. It is currently assigned to one or more roles.' 
      });
    }

    // Delete the permission
    await permission.destroy();

    res.status(200).json({ success: true, message: 'Permission deleted successfully' });
  } catch (error) {
    console.error('Error deleting permission:', error);
    res.status(500).json({ success: false, message: 'Failed to delete permission', error: error.message });
  }
}