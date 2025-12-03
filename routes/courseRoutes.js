const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();


router.get('/', courseController.course_index);


router.post('/', courseController.course_create_post);


router.delete('/:id', courseController.course_delete);

module.exports = router;