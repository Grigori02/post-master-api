const Post = require('../models/Post');

const upsertPost = async (req, res) => {
  const { postId, text, base64 } = req.body;
  try {
    if (postId) {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          'message.text': text,
          'message.media': base64,
        },
        { new: true, upsert: false }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.json(updatedPost);
    } else {
      const newPost = new Post({
        'message.text': text,
        'message.media': base64,
        author: req.user._id, 
        date: new Date(),
      });
      await newPost.save();
      return res.status(200).json(newPost);
    }
  } catch (error) {
    console.error('Error creating/updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.user._id 
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id.toString()}).populate('author');
    if (!posts) return res.status(404).json({ message: 'Posts not found' });

    res.send(posts || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.send(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPosts, getPost, deletePost, upsertPost };
