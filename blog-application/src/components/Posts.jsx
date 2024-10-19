import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../services/operations/userApi';
import Post from '../components/Post';

const Posts = ({posts, isUserPost, onDelete}) => {

    return (
        <div>
            <div className='w-9/12 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {posts.map((post) => (
                        <div key={post._id} className='max-w-maxContentTab'>
                            <Post posts={post} isUserPost={isUserPost} onDelete={onDelete}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
