import express from 'express';
import asyncMid from '../middleware/asyncMid';
import { joiValidate } from '../middleware/joiValidate';
import passport from 'passport';
import TodoService from '../services/TodoService';
import { todoDto } from '../types/todo';

const router = express.Router();

// GET all
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await TodoService.getAll(req.user!._id)
    });
  })
);

// GET by id
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await TodoService.getById(req.user!._id, req.params.id)
    });
  })
);

// CREATE
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  joiValidate(todoDto),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await TodoService.createTodo(req.user!._id, req.body)
    });
  })
);

// UPDATE
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  joiValidate(todoDto),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await TodoService.updateTodo(req.user!._id, req.params.id, req.body)
    });
  })
);

// DELETE
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await TodoService.deleteTodo(req.user!._id, req.params.id)
    });
  })
);

export const todoRoute = router;
