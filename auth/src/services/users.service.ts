import { User } from '@prisma/client';
import { DatabaseError } from '@exceptions/DatabaseError';
import userDAO from '@repository/user.dao';

const UsersService = () => {
  const getUsers = async (): Promise<User[]> => {
    try {
      return await userDAO.getAllUsers();
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const getUserById = async (id: string): Promise<User | null> => {
    try {
      return await userDAO.getUserById(id);
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const updateUser = async (id: string, data: User): Promise<User> => {
    try {
      return await userDAO.updateUser(id, data);
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const deleteUser = async (id: string): Promise<User> => {
    try {
      return await userDAO.deleteUser(id);
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  return { getUsers, getUserById, updateUser, deleteUser };
};

export default UsersService;
