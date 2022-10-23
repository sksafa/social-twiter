import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import Layout from '../../components/Layout'
import UserRoute from '../../components/routes/userRoute'
import { UserContext } from '../../context';

const dashboard = () => {
  const [content, setContent] = useState("");
  const [state] = useContext(UserContext);
  const router = useRouter();
  //post handler
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/createpost", { content });
      // console.log("content", data);
      toast.success("Post Created!");
      setContent("");
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
            {/* <CreatePost
              content={content}
              setContent={setContent}
              handlePostSubmit={handlePostSubmit}
            /> */}
          </div>
          <div className="col-md-4">sidebar</div>
        </div>
      </UserRoute>
    </Layout>
  )
}

export default dashboard