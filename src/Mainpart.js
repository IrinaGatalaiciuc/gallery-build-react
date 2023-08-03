import React, { useEffect, useRef, useState } from "react";

function Mainpart() {
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState(0);

    const imageRef = useRef();
    
    useEffect(() => {
        imageRef.current.focus()
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 5000);
    }, [message]);

    const createPost = () => {
        if (edit > 0) {
            let gallery = posts;
            gallery.forEach(post => {
                if (post.id === edit) {
                    post.image = imageRef.current.value; 
                }
            });
            setPosts(gallery);
            setMessage("Post updated");
            setEdit(0);
            imageRef.current.value = "";
            return;
        }
        if (imageRef.current.value.length > 10) {
            setMessage("Post created");
            setPosts([
                ...posts,
                {
                    id: Date.now(),
                    image: imageRef.current.value,
                }
            ]);
            imageRef.current.value = "";
        } else {
            setMessage("Enter an URL for the image");
        }
    };

    const editPost = (id) => {
        setEdit(id);

        let post = posts.filter(post => post.id === id)[0];

        imageRef.current.value = post.image;
        setMessage("Edit mode turned on");
    };


    return (
        <div className="Mainpart">
            <header>
                <h1>TwoSplash - Your Own Gallery</h1>
            </header>
            <div className="input">
                <input type="text" ref={imageRef}></input>
                <button onClick={() => createPost()}>
                    {edit ? "Edit" : "Create"}
                </button>
                <p>{message}</p>
            </div>
            <div className="posts">
                <h2>Gallery</h2>
                <div className="gallery-item">
                    {
                        posts.map(post =>
                        (
                            <div className="post" key={post.id}>
                                <img src={post.image} alt="Image" />
                                <button onClick={() => editPost(post.id)}>Edit</button>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </div>

    );
}

export default Mainpart;