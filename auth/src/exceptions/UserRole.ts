import roles from '@config/roles';
import { Role } from '@interfaces/roles.interface';

class UserRole {
  public roles: Role[];

  constructor() {
    this.roles = roles.roles;
  }

  getRoleByName(name: string) {
    return this.roles.find(role => role.name === name);
  }

  getRoles() {
    return this.roles;
  }
}

export default UserRole;
