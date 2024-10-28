import React, { useEffect, useState } from 'react';
import { getUserPost } from '../services/operations/userApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Posts from '../components/Posts';

const UserPosts = () => {
    const [posts, setPosts] = useState([]);
    const { token } = useSelector((state) => state.auth);

    const allPosts = async () => {
        const response = await getUserPost(token);
        // Sort posts by createdAt in descending order
        const sortedPosts = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
    };

    useEffect(() => {
        allPosts();
    }, [token]);

    const handleDelete = (postId) => {
        const updatedPosts = posts.filter(post => post._id !== postId);
        setPosts(updatedPosts);
    };

    return (
        <div>
            <h1 className='text-center my-10 font-semibold text-4xl'>User Posts</h1>
            <div>
                {posts.length > 0 ? (
                    <Posts
                        posts={posts}
                        isUserPost={true}
                        onDelete={handleDelete}
                    />
                ) : (
                    <div className='flex justify-center items-center w-full h-full'>
                        <p className='text-center'>
                            You have not created any post. To create a post,{' '}
                            <Link to='/create-post' className='text-blue-600'>
                                Click here
                            </Link>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPosts;
