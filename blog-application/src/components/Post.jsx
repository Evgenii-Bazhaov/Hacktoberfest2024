import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../services/operations/userApi';
import { useNavigate } from 'react-router-dom';

// Helper function to format the date and time
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const Post = ({ posts, isUserPost, onDelete }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const handleDelete = async (postId) => {
        await deletePost({ postId: postId }, token);
        onDelete(postId);
    };

    const handlePostClick = () => {
        navigate(`/post/${posts._id}`);
    };

    const handleUsernameClick = (e) => {
        e.stopPropagation();
        navigate(`/posts/${posts.user._id}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        navigate(`/edit-post/${posts._id}`)
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        handleDelete(posts._id)
    };

    return (
        <div className='border border-gray-300 rounded-lg bg-white shadow-md p-4 m-4 w-[22rem]' onClick={handlePostClick}>
            <div className='flex justify-between items-center mb-2'>
                <h2 className='text-xl font-bold truncate'>
                {posts.title?.length > 15 ? posts.title.substring(0, 15) + '...' : posts.title}
                </h2>
                <p className='text-sm text-gray-500'>{formatDateTime(posts.createdAt)}</p>
            </div>
            <p className='text-gray-700 text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
                {posts.content?.length > 150 ? posts.content.substring(0, 150) + '...' : posts.content}
            </p>
            <div className='flex items-center justify-between text-sm text-gray-500 mt-4'>
                <div>
                    <p className='font-semibold cursor-pointer hover:text-blue-800' onClick={handleUsernameClick}>{posts.user?.username}</p>
                    <p>{posts.user?.email}</p>
                </div>
                {token === user?.token && isUserPost && (
                    <div className='flex gap-2'>
                        <button 
                            onClick={handleEditClick} 
                            className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'
                        >
                            Edit
                        </button>
                        <button 
                            onClick={handleDeleteClick} 
                            className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600'
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
