const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

router.post('/create', diaryController.createEntry);
router.get('/list/:userId', diaryController.getEntries);
router.put('/update/:id', diaryController.updateEntry);
router.delete('/delete/:id', diaryController.deleteEntry);

module.exports = router;