const router = require("express").Router();

const Posts = require("./data/db");

router.post("/", (req, res) => {
  const body = req.body;

  if (!body.title || !body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(body)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const comment = req.body.text;
  if (!comment) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  } else {
    Posts.insertComment(comment)
      .then(result => {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database."
        });
      });
  }
});

router.get("/", (req, res) => {
  Posts.find()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then(result => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The posts could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  Posts.findById(id) // use this method to find post by id
    .then(result => {
      // first see if the post exists
      if (result.length > 0) {
        // if post exists, see if it has any comments
        Posts.findPostComments(id) // use this method to find comments by post id
          .then(commentResults => {
            if (commentResults.length > 0) {
              // if there are comments, return them
              res.status(200).json(commentResults);
            } else {
              // if the post exists but has no comments
              res
                .status(404)
                .json({ message: "There are no comments for this post." });
            }
          })
          .catch(() => {
            // if there's a database error getting comments
            res.status(500).json({
              error: "The comments information could not be retrieved."
            });
          });
      } else {
        // if the post doesn't exist
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      // if there's a database error getting post
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then(result => {
      //   If post exists...
      if (result.length > 0) {
        Posts.remove(id) // remove it.
          .then(() => {
            res.status(200).json(result); // Then, return the post object.
          })
          .catch(() => {
            // If there is an error removing it send a 500.
            res.status(500).json({ error: "The post could not be removed." });
          });
      } else {
        // The post does not exist. Send a 404.
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      // If there is an error retrieving the post send a 500.
      res.status(500).json({ error: "The post could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedPost = req.params.body;
  Posts.findById(id)
    .then(result => {
      if (result.length > 0) {
        // If there is a post with that ID...
        res.status(200).json(result);
      } else {
        // If there is not a post with that ID..
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The posts could not be retrieved." });
    });
});

module.exports = router;
