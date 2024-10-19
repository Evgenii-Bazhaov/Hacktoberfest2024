import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/operations/userApi';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const resp = await getPostById(id);
                setPost(resp);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [id]);

    // Helper function to format the date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    return (
        <>
            <div className='w-9/12 mx-auto mt-10'>
                <button onClick={() => navigate(-1)} className="bg-puregreys-200 text-puregreys-800 px-4 py-2 rounded hover:bg-puregreys-300 mb-4  ">
                    Back
                </button>
            </div>
                
            <div className="mx-auto w-1/2 my-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                </div>
                <div className="mt-8">
                    <p className="text-left text-lg text-gray-700">{post.content}</p>
                </div>
                <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-gray-600">
                    <div>
                        <p className="font-semibold">{post.user?.username}</p>
                        <p>{post.user?.email}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p>{formatDateTime(post.createdAt)}</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Post;
