import jwt from "jsonwebtoken";
import db from "../db/models/index.js";

const { User, Role, Permission } = db;

export const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          include: [
            {
              model: Permission,
              through: { attributes: [] },
            }
          ],
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const permissions = user.Role?.Permissions?.map(p => p.permission) || [];

    req.user = {
      id: user.id,
      role_id: user.role_id,
      permissions: permissions,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


export function isSuperAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.user.role_id !== 1) {
    return res.status(403).json({ success: false, message: 'Access denied: Superadmin only' });
  }

  next();
}

export function authorize(...requiredPermissions) {
  return (req, res, next) => {
    // Allow superadmin (role_id: 1) to bypass all permission checks
    if (req.user?.role_id === 1) {
      return next();
    }

    const userPermissions = req.user?.permissions || [];

    const hasPermission = requiredPermissions.some(p =>
      userPermissions.includes(p)
    );

    if (!hasPermission) {
      return res.status(403).json({ success: false, message: 'Permission Access Denied' });
    }

    next();
  };
}