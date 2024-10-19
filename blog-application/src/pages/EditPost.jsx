import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/operations/userApi';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const resp = await getPostById(id);
                setPost(resp);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <CreatePost edit={true} post={post} />
        </div>
    );
};

export default EditPost;
