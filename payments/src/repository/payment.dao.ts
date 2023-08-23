import prisma from '@repository/prisma';
import { Payment } from '@prisma/client';

const paymentDAO = {
  async createPayment(data) {
    return prisma.payment.create({ data });
  },

  async getAllPayments(): Promise<Payment[]> {
    return prisma.payment.findMany();
  },

  async getPaymentById(id): Promise<Payment | null> {
    return prisma.payment.findUnique({ where: { id } });
  },

  async getAllPaymentsForUser(userId): Promise<Payment[] | null> {
    return prisma.payment.findMany({
      where: {
        userId: userId,
      },
    });
  },

  async deletePayment(id) {
    return prisma.payment.delete({ where: { id } });
  },
};

export default paymentDAO;
