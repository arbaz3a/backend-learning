import React, { useState,useEffect } from 'react'
import axios from "axios"


const Feed = () => {

    const [ posts, setPosts ] = useState([])

    useEffect(()=>{

        axios.get("http://localhost:3000/posts")
        .then((res)=>{

            setPosts(res.data.posts)

        })
        
    },[])  // Using this method, it shows the initial data on the first fetch, but it may fail to reflect new data added to the database immediately.
    
        // // using polling
    // useEffect(() => {
    //   const fetchPosts = () => {
    //     axios.get("http://localhost:3000/posts").then((res) => {
    //       setPosts(res.data.posts);
    //     });
    //   };

    //   fetchPosts(); // initial call

    //   const interval = setInterval(fetchPosts, 5000); // every 5 sec

    //   return () => clearInterval(interval);   // Cleanup interval when component unmounts
    // }, []);  // This approach fetches data initially and then polls every 5 seconds, but there may be a delay in reflecting newly added database records.

    return (

        <section className='feed-section' >

            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='post-card' >
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )
            }

        </section>

    )
}

export default Feed