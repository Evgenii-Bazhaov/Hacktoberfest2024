import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../services/operations/userApi';
import Posts from '../components/Posts';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const allPosts = async () => {
        const response = await getAllPosts();
        // Sort posts by createdAt in descending order
        const sortedPosts = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
    };

    useEffect(() => {
        allPosts();
    }, []);

    return (
        <div>
            <h1 className='text-center my-10 font-semibold text-4xl'>Welcome to BLOGSPHERE</h1>
            <Posts
                posts={posts}
                isUserPost={false}
            />
            
        </div>
    );
};

export default Home;
