import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import UserPermissions from '@exceptions/UserPermissions';

function hasPermission(permission: string) {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userRole = req.user.role;

    const userPermissions = new UserPermissions().getPermissionsByRoleName(userRole);

    if (userRole === 'admin' || userPermissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
}

export default hasPermission;
