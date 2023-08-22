import { User } from '@prisma/client';
import { DatabaseError } from '@exceptions/DatabaseError';
import prisma from '@config/prisma';

const UsersService = () => {
  const getUsers = async (): Promise<User[]> => {
    try {
      return await prisma.user.findMany();
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const getUserById = async (id: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const updateUser = async (id: string, data: User): Promise<User> => {
    try {
      return await prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const deleteUser = async (id: string): Promise<User> => {
    try {
      return await prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  return { getUsers, getUserById, updateUser, deleteUser };
};

export default UsersService;
