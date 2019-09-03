import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Comments from "./Comments";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts").then(res => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="page-wrapper">
        {posts.map(post => (
          <div key={post.id} className="post-wrapper">
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
            <Comments id={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
