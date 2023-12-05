export interface Role {
  name: string;
  permissions: string[];
}

export interface Roles {
  roles: Role[];
}

export type Permission = string[];
