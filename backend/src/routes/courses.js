import { Router } from 'express';
import {
  getCourses, getCourseById, createCourse,
  enrollCourse, getLesson, completeLesson, uploadVideo
} from '../controllers/coursesController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { uploadLimiter } from '../middleware/rateLimiter.js';
import { validate, createCourseSchema } from '../middleware/validate.js';
import { uploadVideo as videoUpload, uploadImage } from '../config/cloudinary.js';

const router = Router();

// Public (still needs auth for enrollment check)
router.get ('/',    authenticate, getCourses);
router.get ('/:id', authenticate, getCourseById);

// Student actions
router.post('/:id/enroll',                          authenticate, enrollCourse);
router.get ('/:courseId/lessons/:lessonId',          authenticate, getLesson);
router.post('/:courseId/lessons/:lessonId/complete', authenticate, completeLesson);

// Admin / Instructor only
router.post(
  '/',
  authenticate, authorize('admin', 'instructor'),
  uploadImage.single('thumbnail'),
  validate(createCourseSchema),
  createCourse
);

router.post(
  '/upload/video',
  authenticate, authorize('admin', 'instructor'),
  uploadLimiter,
  videoUpload.single('video'),
  uploadVideo
);

export default router;