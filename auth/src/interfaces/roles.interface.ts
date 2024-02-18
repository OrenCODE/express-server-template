export interface Role {
  name: string;
  permissions: Permission;
}

export type Roles = Role[];
export type Permission = string[];
