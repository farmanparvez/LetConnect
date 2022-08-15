const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    POST api/post
// @desc     Create post
// @acess    Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    POST api/post
// @desc     Get all post
// @acess    Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    POST api/post/:id
// @desc     Get post by ID
// @acess    Private
router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("server error");
  }
});

// @route    DELETE api/post
// @desc     DELETE A post
// @acess    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("server error");
  }
});

// @route    PUT api/postS/like/:id
// @desc     LIKE A POST
// @acess    Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post)
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route    PUT api/postS/unlike/:id
// @desc     UNLIKE A POST
// @acess    Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post)
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    const removeIndex = post.likes
      .map((like => like.user.toString()))
      .indexOf(req.user.id);

      post.likes.splice(removeIndex)
    // post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    res.status(500).send("server error");
  }
});


// @route    PUT api/commet/:id
// @desc     comment A post
// @acess    Private

router.put("/comment/:id",[ auth, [ check('text', 'Text is required').not().isEmpty() ]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    const post = await Post.findById(req.params.id);
    // console.log(post)
    if (
      post.comments.filter((comment) => comment.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already comment" });
    }

    post.comments.unshift({ user: req.user.id, text: req.body.text });

    await post.save();

    res.json(post.comments);
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route    PUT api/postS/unlike/:id
// @desc     UNLIKE A POST
// @acess    Private

router.put("/removecomment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post)
    if (
      post.comments.filter((comment) => comment.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not yet been comment" });
    }

    const removeIndex = post.comments
      .map((comment => comment.user.toString()))
      .indexOf(req.user.id);

      post.comments.splice(removeIndex)
    // post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;
