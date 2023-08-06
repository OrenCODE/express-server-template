import { validate } from 'class-validator';
import { CreateUserDto } from '@dtos/users.dto';
import { NextFunction, Request, Response } from 'express';

const validateSignup = async (req: Request, res: Response, next: NextFunction) => {
  const createUserDto = new CreateUserDto();
  createUserDto.email = req.body.email;
  createUserDto.name = req.body.name;
  createUserDto.password = req.body.password;

  const errors = await validate(createUserDto);

  if (errors.length > 0) {
    const constraints = {};
    errors.forEach(error => {
      const propertyName = error.property;
      constraints[propertyName] = Object.values(error.constraints);
    });
    res.status(400).json({ constraints });
  } else {
    next();
  }
};

export default validateSignup;
