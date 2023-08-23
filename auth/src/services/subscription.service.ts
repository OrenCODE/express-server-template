import { User } from '@prisma/client';
import prisma from '@repository/prisma';
import config from '@config/config';
import { CustomError } from '@exceptions/CustomError';
import { ErrorCodes } from '@utils/errorCodes';
import { CreateSubscriptionSchema } from '@dtos/subscription.dto';
import SubscriptionClient from '@clients/subscriptionClient';

const SubscriptionService = () => {
  const subscriptionClient = SubscriptionClient();

  const createSubscriptionPayment = async (data: User, cookie: string) => {
    const findUser: User = await prisma.user.findUnique({ where: { email: data.email } });
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    const payment = { userId: findUser.id, amount: config.SUBSCRIPTION_PRICE };
    const validatedPayment = CreateSubscriptionSchema.parse(payment);

    return await subscriptionClient.createSubscriptionPayment(validatedPayment, cookie);
  };

  return { createSubscriptionPayment };
};

export default SubscriptionService;
