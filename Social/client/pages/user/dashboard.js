import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../../components/Layout'
import UserRoute from '../../components/routes/userRoute'
import { UserContext } from '../../context';
import "react-toastify/dist/ReactToastify.css";
import CreatePost from '../../components/Post/CreatePost';
import PostList from '../../components/Post/PostList';
import PeopleCom from '../../components/PeopleCom';

const dashboard = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [state] = useContext(UserContext);
  const router = useRouter();
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

  //useEffect for posts
  useEffect(() => {
    if (state && state.token) {
      fetchUserPosts();
      findPeople();
    }
  }, [state && state.token]);


  //suggest people
  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people")
      console.log("asshdash", data)
      setPeople(data);
    } catch (error) {
      toast.error('Something is wrong')
    }
  }

  //fetchUserPosts
  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-post");
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //post handler
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/createpost", { content, image });
      fetchUserPosts();
      // console.log("content", data);
      toast.success("Post Created!");
      setImage({});
      setContent("");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const deleteHandler = async (post) => {
    try {
      const answer = window.confirm('Are you sure');
      if (!answer) return
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.success('Post Deleted');
      fetchUserPosts();
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleFollowed = async (id, name)=>{
    try {
        const {data} = await axios.put(`/follow/${id}`,{userId:state.user._id} )
        toast.success(`You Followed ${name}`);
        findPeople()
    } catch (error) {
        console.log(error)
    }
}

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
            <PostList posts={posts} deleteHandler={deleteHandler} />
          </div>
          <div className="col-md-4">
            {/* <div>{JSON.stringify(people , null, 6)}</div> */}
            <PeopleCom
              people={people}
              handleFollowed={handleFollowed}
            />
          </div>
        </div>
      </UserRoute>
    </Layout>
  )
}

export default dashboard
