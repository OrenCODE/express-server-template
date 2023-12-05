import { Roles } from '@interfaces/roles.interface';

const roles: Roles = {
  roles: [
    {
      name: 'admin',
      permissions: ['create_task', 'read_task', 'update_task', 'delete_task'],
    },
    {
      name: 'manager',
      permissions: ['create_task', 'read_task', 'update_task'],
    },
    {
      name: 'user',
      permissions: ['create_task', 'read_task'],
    },
  ],
};

export default roles;
