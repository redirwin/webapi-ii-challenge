const express = require("express");

const cors = require("cors");

const postsRouter = require("./posts-router");

const server = express();

server.use(express.json());

server.use(cors());

server.use("/api/posts", postsRouter);

server.listen(8000, () => console.log("Server is listening."));
