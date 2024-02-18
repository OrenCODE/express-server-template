// UserPermissions.ts
import roles from '@config/roles';
import { Role } from '@interfaces/roles.interface';

class UserPermissions {
  public permissions: string[];

  constructor() {
    this.permissions = [];
  }

  getPermissionsByRoleName(roleName: string): string[] {
    const role: Role | undefined = roles.find(r => r.name === roleName);
    return role ? role.permissions : [];
  }
}

export default UserPermissions;
