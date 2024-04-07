import React, { useState, useEffect } from "react";
import axios from 'axios';
import './pages.css';
import {paikallinenIP} from "./VAIHDATÄMÄ";




const Blogs = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editId, setEditId] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editImage, setEditImage] = useState(null);
    const [isAddingNewPost, setIsAddingNewPost] = useState(false);




    useEffect(() => {
        fetchPosts();
    }, []);

    const tempIP = paikallinenIP;

    const fetchPosts = async () => {
        try {
            const response = await axios.get(tempIP+'/blog-posts');
            const postsWithImages = await Promise.all(response.data.map(async post => {
                // Vedä kuvat
                if (post.image) {
                    try {
                        const imageResponse = await fetch(post.image);
                        const blob = await imageResponse.blob();            //kiertoreitti niin ei tarvitse käyttä buffereita
                        const imageDataURL = await getBase64FromBlob(blob);
                        return {
                            id: post.id,
                            content: post.content,
                            image: imageDataURL,
                            created_at: post.created_at
                        };
                    } catch (error) {
                        console.error('Häiriö kuvan lataamisessa:', error);
                        return {
                            id: post.id,
                            content: post.content,
                            image: null,
                            created_at: post.created_at
                        };
                    }
                } else {
                    return {
                        id: post.id,
                        content: post.content,
                        image: null,
                        created_at: post.created_at
                    };
                }
            }));
            setPosts(postsWithImages);
            console.log(response.data);
        } catch (error) {
            console.error('Blogipostauksien lataus epäonnistui: ', error);
        }
    };

// Blobista base64
    const getBase64FromBlob = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {

        setImage(e.target.files[0]); // Hoida kuvan muutos

    };
    const handleEditImageChange = (e) => {
        setEditImage(e.target.files[0]); // Hoida kuvan muutos
    };



    const handleSavePost = async () => {

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('content', content);

            const response = await fetch(tempIP+`/blog-posts`,{
                method: 'POST',body:formData,
            });
            setContent(''); // Clear the text field after saving
            setImage(null); // Clear the image state after saving
            setIsAddingNewPost(false);
            fetchPosts(); // Fetch updated posts after saving
        } catch (error) {
            console.error('Error saving blog post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(tempIP+`/blog-posts/${postId}`);
            setImage(null);
            fetchPosts(); // Fetch updated posts after deleting
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };

    const handleEditPost = async () => {
        try {
            const formData = new FormData();
            formData.append('id',editId);
            formData.append('content', editContent);
            formData.append('image', editImage);

            const response = await axios.put(tempIP+`/blog-posts/${editId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data); // Handle response as needed
            setEditId('');
            setEditContent('');
            setEditImage(null);
            fetchPosts(); // Fetch updated posts after updating
        } catch (error) {
            console.error('Error updating blog post:', error);
        }
    };


    const toggleAddNewPost = () => {
        setIsAddingNewPost(!isAddingNewPost);

    };





    return(
        <div className="container">
            <h1>Tälle sivulle vissiin metästystarinoita</h1>

            <button className={"uploadtext"} onClick={toggleAddNewPost}>{isAddingNewPost ? "En mie nyt oikeesti" : "Lisää muistoja"}</button>
            {isAddingNewPost && (

                <div>

                <textarea

                    value={content}
                    onChange={handleContentChange}
                    placeholder="Kirjottelehan tähän tarinas..."
               />
                    <div className="blog-form">
                    <label className={"uploadtext"} htmlFor="uploadbox">Lisää kuva</label>
                    <input style={{visibility: "hidden"}} id="uploadbox" type="file"  onChange={handleImageChange}/>
                    <button className={"uploadtext"} onClick={handleSavePost}>Tallenna</button>
                    </div>
                </div>

            )}

            <div className="blog-posts">
                <h2>Aikaisemmat raapustukset</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} className="blog-post">
                            <div>ID: {post.id}</div>
                            <div>{post.content}</div>

                            {post.image ===tempIP+"/null" ?
                                (<p>Kuvaa ei saatavilla</p>):
                                (<img className={"blogPostPhoto"} src={post.image} alt="reissukuva"/>)
                            }
                            <div>Created At: {new Date(post.created_at).toLocaleString()}</div>
                            <button className={"uploadtext"} onClick={() => handleDeletePost(post.id)}>Poista</button>

                            <button className={"uploadtext"} onClick={() => {
                                setEditId(post.id);
                                setEditContent(post.content);
                                console.log(editContent);
                                setEditImage(post.image);
                            }}>Muokkaa
                            </button>


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
                        placeholder="Mitteepä kirjottelit väärin..."
                    />
                    <label className={"uploadtext"} htmlFor="uploadbox2">Lisää kuva</label>
                    <input
                        style={{visibility: "hidden"}}
                        id="uploadbox2"
                        type="file"
                        onChange={handleEditImageChange}
                        placeholder={""}
                    />

                    <button onClick={handleEditPost}>Tallenna muutokset</button>


                </div>
            )}
        </div>)
};

export default Blogs;