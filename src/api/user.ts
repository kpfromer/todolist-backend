import express from 'express';
import asyncMid from '../middleware/asyncMid';
import { joiValidate } from '../middleware/joiValidate';
import UserService from '../services/UserService';
import { loginDto, registerDto } from '../types/user';

const router = express.Router();

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
      success: true,
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
