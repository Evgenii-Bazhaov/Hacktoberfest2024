import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserPostsById } from '../services/operations/userApi';
import Posts from '../components/Posts';

const PostOfOtherUser = () => {
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const allPosts = async () => {
        const response = await getUserPostsById(id);
        // Sort posts by createdAt in descending order
        const sortedPosts = response[0].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setUser(response[1].username);
    };

    useEffect(() => {
        allPosts();
    }, [id]);
  return (
    <div>
            <div className='w-9/12 mx-auto mt-10'>
                <button onClick={() => navigate(-1)} className="bg-puregreys-200 text-puregreys-800 px-4 py-2 rounded hover:bg-puregreys-300  ">
                    Back
                </button>
            </div>
            <h1 className='text-center mb-10 font-semibold text-4xl'>Posts of {user}</h1>
            <Posts
                posts={posts}
                isUserPost={false}
                id={id}
            />
        </div>
  )
}

export default PostOfOtherUser