import Permissions from '@exceptions/UserPermissions';
import { RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';

const checkPermission = (permission: string) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userRole = req.user ? req.user.role : 'anonymous';
    const userPermissions = new Permissions().getPermissionsByRoleName(userRole);

    if (userPermissions.includes(permission)) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };
};

export default checkPermission;
