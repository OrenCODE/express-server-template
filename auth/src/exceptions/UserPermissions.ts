import roles from '@config/roles';

class UserPermissions {
  public permissions: string[];

  constructor() {
    this.permissions = [];
  }

  getPermissionsByRoleName(roleName: string) {
    const role = roles.roles.find(r => r.name === roleName);
    return role ? role.permissions : [];
  }
}

export default UserPermissions;
