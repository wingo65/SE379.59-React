import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "./LoadingData.jsx"
import useFetch from "../hooks/useFetch.js";
const FetchingData = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/posts');
          setPosts(response.data);
        } catch (error) {
          console.log('An error occurred:', error);
        }
      };
      getData();
    }, []);
    return(
        <div>
            <h1>Posts</h1>
            {
                posts.length ? (
                    <ol>
                        {posts.map((post)=>(
                            <li key={post.id}>{post.title}: {post.body}</li>
                        ))}
                    </ol>) : <Loading />}
        </div>
    );
   
  };
  export default FetchingData;