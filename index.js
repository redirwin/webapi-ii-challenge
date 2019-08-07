const express = require("express");

const postsRouter = require("./posts-router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.listen(8000, () => console.log("Server is listening."));
