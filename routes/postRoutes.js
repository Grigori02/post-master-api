const express = require('express');
const { createPost, editPost, deletePost, getPosts, upsertPost, getPost } = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', authenticate, getPost);
router.get('/', authenticate, getPosts);
router.post('/', authenticate, upsertPost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;
