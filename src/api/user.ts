import express from 'express';
import joi from 'joi';
import asyncMid from '../middleware/asyncMid';
import { joiValidate } from '../middleware/joiValidate';
import UserService from '../services/UserService';

const router = express.Router();

const loginDto = joi
  .object({
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  })
  .required();

const registerDto = joi
  .object({
    email: joi
      .string()
      .email()
      .required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    password: joi.string().required()
  })
  .required();

router.post(
  '/login',
  joiValidate(loginDto),
  asyncMid(async (req, res) => {
    const token = await UserService.login(req.body);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Username/password does not match.'
      });
    }
    res.json({
      success: false,
      data: token
    });
  })
);

router.post(
  '/register',
  joiValidate(registerDto),
  asyncMid(async (req, res) => {
    const user = await UserService.register(req.body);
    if (!user) {
      // TODO: status
      return res.status(404).json({
        success: false,
        message: 'Email already taken.'
      });
    }
    res.json({
      success: true,
      message: 'Created user.'
    });
  })
);

export const userRoute = router;
