import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../../../components/Layout'
import CreatePost from '../../../components/Post/CreatePost'
import UserRoute from '../../../components/routes/userRoute'
import { UserContext } from '../../../context'

const PostEdit = () => {
    const router = useRouter()
    const { _id } = router.query;
    const [post, setPost] = useState({})
    const [content, setContent] = useState("");
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const [state] = useContext(UserContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`/user-post/${_id}`);
                setContent(data.content)
                setImage(data.image)
                setPost(data)
            } catch (error) {
                console.log(error)
            }
        };
        if (_id) fetchPost();
    }, [])

    //handle image upload
    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        console.log([...formData]);
        setUploading(true);
        try {
            const { data } = await axios.post("/upload-image", formData);
            // console.log("Image Upload", data);
            setUploading(false);
            setImage({
                url: data.url,
                public_id: data.public_id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/update-post/${_id}`, { content, image });
            console.log(data)
            if (data.error) {
                toast.error(error)
                console.log(error)
            } else {
                toast.success("Post updated!");
                router.push('/user/dashboard')
            }
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    };
    return (
        <Layout>
            <UserRoute>
                <div className="row">
                    <div className="col-md-8">
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <CreatePost
                            content={content}
                            setContent={setContent}
                            handlePostSubmit={handlePostSubmit}
                            handleImage={handleImage}
                            uploading={uploading}
                            image={image}
                        />
                        <br />

                    </div>
                </div>
            </UserRoute>
        </Layout>
    )
}

export default PostEdit