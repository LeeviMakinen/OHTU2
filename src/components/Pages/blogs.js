import React, { useState, useEffect } from "react";
import axios from 'axios';
import './pages.css';

const Blogs = () => {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [editId, setEditId] = useState('');
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/blog-posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSavePost = async () => {
        try {
            await axios.post('http://localhost:8081/blog-posts', { content });
            setContent(''); // Clear the text field after saving
            fetchPosts(); // Fetch updated posts after saving
        } catch (error) {
            console.error('Error saving blog post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:8081/blog-posts/${postId}`);
            fetchPosts(); // Fetch updated posts after deleting
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };

    const handleEditPost = async () => {
        try {
            await axios.put(`http://localhost:8081/blog-posts/${editId}`, { content: editContent });
            setEditId('');
            setEditContent('');
            fetchPosts(); // Fetch updated posts after updating
        } catch (error) {
            console.error('Error updating blog post:', error);
        }
    };

    return(
        <div className="container">
            <h1>Tälle sivulle vissii metästystarinointia</h1>
            <div className="blog-form">
                <textarea
                    className="textarea"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Write your blog post here..."
                />
                <button onClick={handleSavePost}>Save Post</button>
            </div>
            <div className="blog-posts">
                <h2>Earlier Written Posts</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} className="blog-post">
                            <div>ID: {post.id}</div>
                            <div>Content: {post.content}</div>
                            <div>Created At: {new Date(post.created_at).toLocaleString()}</div>
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                            <button onClick={() => { setEditId(post.id); setEditContent(post.content); }}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
            {editId && (
                <div className="edit-form">
                    <input
                        type="text"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Enter new content..."
                    />
                    <button onClick={handleEditPost}>Save Changes</button>
                </div>
            )}
        </div>
    )
};

export default Blogs;
