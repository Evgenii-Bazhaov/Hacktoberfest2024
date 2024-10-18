import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, editPost } from '../services/operations/userApi';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({edit, post}) => {
    const {token} = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        title: post?.title || "",
        content: post?.content || ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {title, content} = formData;
    useEffect(() => {
        if (edit && post) {
            setFormData({
                title: post.title,
                content: post.content,
            });
        }
    }, [edit, post]);
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            await editPost(post._id, title, content, token, navigate);
        } else {
            await dispatch(createPost(title, content, token, navigate));
        }
    };
    return (
        <div>
            <h1 className='text-center mt-10 font-semibold text-4xl'>{edit ? 'Edit' : 'Create'} your post</h1>
            <form className='flex mt-10 w-1/3 mx-auto flex-col gap-y-4' onSubmit={handleSubmit}>
                <label className="w-full">
                    <p className="mb-1 text-xl leading-[1.375rem] text-black font-semibold">
                    Title <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        placeholder="Enter your post title"
                        className="form-style w-full"
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-xl leading-[1.375rem] text-black font-semibold">
                    Content <sup className="text-pink-200">*</sup>
                    </p>
                    <textarea
                        required
                        type="text"
                        name="content"
                        value={content}
                        rows={10}
                        onChange={handleChange}
                        placeholder="Enter your post content"
                        className="form-style w-full !pr-10"
                    />
                </label>
                <div className="flex justify-between gap-4">
                    <button
                        type="submit"
                        className="flex-1 mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white"
                    >
                        {edit ? "Edit Post" : "Create Post"}
                    </button>    
                    <button
                        onClick={() => navigate('/user-posts')}
                        className="flex-1 mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white"
                    >
                        Cancel
                    </button>           

                </div>         
            </form>
        </div>
    )
}

export default CreatePost