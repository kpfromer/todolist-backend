import express from 'express';
import asyncMid from '../middleware/asyncMid';
import { joiValidate } from '../middleware/joiValidate';
import passport from 'passport';
import ProjectService from '../services/ProjectService';
import { projectDto } from '../types/project';

const router = express.Router();

// GET all
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await ProjectService.getAll(req.user!._id)
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
      data: await ProjectService.getById(req.user!._id, req.params.id)
    });
  })
);

// CREATE
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  joiValidate(projectDto),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await ProjectService.createProject(req.user!._id, req.body)
    });
  })
);

// UPDATE
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  joiValidate(projectDto),
  asyncMid(async (req, res) => {
    res.json({
      success: true,
      data: await ProjectService.updateProject(req.user!._id, req.params.id, req.body)
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
      data: await ProjectService.deleteProject(req.user!._id, req.params.id)
    });
  })
);

export const projectRoute = router;
