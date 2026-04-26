import express from 'express';
import {
  getColleges,
  getStates,
  getCollegeById,
  createCollege,
  compareColleges
} from '../controllers/collegeController.js';
import { validateCollege, validateCompare } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/states', getStates);
router.get('/:id', getCollegeById);
router.post('/', validateCollege, createCollege);
router.post('/compare', validateCompare, compareColleges);

export default router;
