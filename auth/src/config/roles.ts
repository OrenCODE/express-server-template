import { Roles } from '@interfaces/roles.interface';

const roles: Roles = [
  {
    name: 'admin',
    permissions: ['create_task', 'read_task', 'update_task', 'delete_task', 'view_users'],
  },
  {
    name: 'manager',
    permissions: ['create_task', 'read_task', 'update_task'],
  },
  {
    name: 'user',
    permissions: ['create_task', 'read_task'],
  },
];

export default roles;
