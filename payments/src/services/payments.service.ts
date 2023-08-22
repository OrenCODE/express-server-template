import { Payment } from '@prisma/client';
import { CreatePaymentDto } from '@dtos/payments.dto';
import { DatabaseError } from '@exceptions/DatabaseError';
import prisma from '@config/prisma';

const PaymentService = () => {
  const getAllPayments = async (): Promise<Payment[]> => {
    try {
      return await prisma.payment.findMany();
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const getPaymentById = async (id: string): Promise<Payment | null> => {
    try {
      return await prisma.payment.findUnique({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const getAllPaymentsForUser = async (userId: string): Promise<Payment[] | null> => {
    try {
      return await prisma.payment.findMany({
        where: {
          userId,
        },
      });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const createPaymentForUser = async (data: CreatePaymentDto): Promise<Payment> => {
    try {
      return prisma.payment.create({ data });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const deletePaymentById = async (id: string): Promise<Payment> => {
    try {
      return await prisma.payment.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const getTotalAmount = (data: Payment[]): number => data.reduce((sum, payment) => sum + payment.amount, 0);

  return {
    getAllPayments,
    createPaymentForUser,
    deletePaymentById,
    getPaymentById,
    getAllPaymentsForUser,
    getTotalAmount,
  };
};

export default PaymentService;
