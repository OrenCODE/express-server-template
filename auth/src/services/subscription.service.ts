import { User } from '@prisma/client';
import config from '@config/config';
import { CustomError } from '@exceptions/CustomError';
import { ErrorCodes } from '@utils/errorCodes';
import { CreateSubscriptionSchema } from '@dtos/subscription.dto';
import SubscriptionClient from '@clients/subscriptionClient';
import userDAO from '@repository/user.dao';
import { Payment } from '@interfaces/payment.interface';

const SubscriptionService = () => {
  const subscriptionClient = SubscriptionClient();

  const createSubscriptionPayment = async (data: User, cookie: string) => {
    const findUser: User = await userDAO.getUserByEmail(data);
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    const payment = { userId: findUser.id, amount: config.SUBSCRIPTION_PRICE };
    const validatedPayment = CreateSubscriptionSchema.parse(payment);

    return await subscriptionClient.createSubscriptionPayment(validatedPayment, cookie);
  };

  const updateSubscriptionStatus = async (data: User, payment: Payment) => {
    const subscription = { userId: payment.userId, amount: payment.amount };
    const validatedPayment = CreateSubscriptionSchema.parse(subscription);

    if (validatedPayment.amount === config.SUBSCRIPTION_PRICE) {
      const findUser: User = await userDAO.getUserByEmail(data);
      if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

      const updatedUser = await userDAO.updateUser(findUser.id, { subscribed: true });
      if (updatedUser) {
        return 'Subscription Success';
      }
      return 'Subscription Failed';
    }
  };

  return { createSubscriptionPayment, updateSubscriptionStatus };
};

export default SubscriptionService;
