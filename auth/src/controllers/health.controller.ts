import { Request, Response } from 'express';
import logger from '@utils/logger';

const HealthController = () => {
  const live = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Authentication Server is up and alive`);
    res.status(200).send('Authentication Server is up and alive');
  };

  return { live };
};

export default HealthController;
