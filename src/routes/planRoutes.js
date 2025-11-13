const express = require('express');
const router = express.Router();
const {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan
} = require('../controllers/planController');

router.post('/', createPlan);
router.get('/', getAllPlans);
router.get('/:id', getPlanById);
router.patch('/:id', updatePlan);
router.delete('/:id', deletePlan);

module.exports = router;
