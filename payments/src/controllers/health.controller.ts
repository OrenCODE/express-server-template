import { Request, Response } from 'express';
import logger from '@utils/logger';

const HealthController = () => {
  const live = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Payments Server is up and alive`);
    res.status(200).send('Payments Server is up and alive');
  };

  return { live };
};

export default HealthController;
