import React, { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

function DataFetching() {
  //GET
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery("posts", async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(response.data);
    return response.data;
  });

  //DELETE
  const deletePostMutation = useMutation(async (postId) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    console.log(response.data); // getting a 200 https status
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => deletePostMutation.mutate(post.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default React.memo(DataFetching);
