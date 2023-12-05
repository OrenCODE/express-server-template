import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import UserPermissions from '@exceptions/UserPermissions';

function hasPermission(permission: string) {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userRole = req.user.role;

    if (userRole.includes('admin')) {
      next();
    } else {
      const userPermissions = UserPermissions.prototype.getPermissionsByRoleName(userRole);

      if (userPermissions.includes(permission)) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    }
  };
}

export default hasPermission;
