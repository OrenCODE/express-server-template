import { Payment } from '@prisma/client';
import { CreatePaymentDTO } from '@dtos/payments.dto';
import { DatabaseError } from '@exceptions/DatabaseError';
import paymentDAO from '@repository/payment.dao';

const PaymentService = () => {
  const getAllPayments = async (): Promise<Payment[]> => {
    try {
      return await paymentDAO.getAllPayments();
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const getPaymentById = async (id: string): Promise<Payment | null> => {
    try {
      return await paymentDAO.getPaymentById(id);
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const getAllPaymentsForUser = async (userId: string): Promise<Payment[] | null> => {
    try {
      return await paymentDAO.getAllPaymentsForUser(userId);
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const createPaymentForUser = async (data: CreatePaymentDTO): Promise<Payment> => {
    try {
      return await paymentDAO.createPayment(data);
    } catch (e) {
      throw new DatabaseError(e.message);
    }
  };

  const deletePaymentById = async (id: string): Promise<Payment> => {
    try {
      return await paymentDAO.deletePayment(id);
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
