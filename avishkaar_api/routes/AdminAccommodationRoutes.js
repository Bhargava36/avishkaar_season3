// routes/adminAccommodationRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const adminController = require('../controllers/AdminAccommodationController');

/**
 * Blocks endpoints
 */
router.get('/blocks', adminController.listBlocks);
router.post('/blocks', adminController.createBlock);
router.put('/blocks/:id', adminController.updateBlock);
router.delete('/blocks/:id', adminController.deleteBlock);
router.post('/blocks/import', upload.single('file'), adminController.importBlocks);

/**
 * Rooms endpoints
 */
router.get('/rooms', adminController.listRooms);
router.post('/rooms', adminController.createRoom);
router.put('/rooms/:id', adminController.updateRoom);
router.delete('/rooms/:id', adminController.deleteRoom);
router.post('/rooms/import', upload.single('file'), adminController.importRooms);

router.get('/', adminController.healthCheck); // simple check
router.get('/all', adminController.listAll); // returns { blocks, rooms }

module.exports = router;
