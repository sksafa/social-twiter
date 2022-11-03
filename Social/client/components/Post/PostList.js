import React, { useContext } from "react";
import moment from "moment";
import parse from 'html-react-parser';
import PostImage from "./PostImage";
// import renderHTML from "react-render-html";
import { BsSuitHeart, BsTrash } from 'react-icons/bs'
import { GoComment } from 'react-icons/go'
import { FiEdit } from 'react-icons/fi'
import { useRouter } from "next/router";
import { UserContext } from "../../context";
const PostList = ({ posts, deleteHandler }) => {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const router = useRouter();
  const [state] = useContext(UserContext)
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <div className="card mb-5">
              <div className="card-header">
                <div>
                  <img
                    src={defaultImage}
                    alt="userpic"
                    height={30}
                    width={30}
                  />
                  <span className="ms-2">{post.postedBy.name}</span>
                  <span className="ms-3">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <div className="card-body">
                {parse(`<div> ${post.content}</div>`)}
                <PostImage url={post.image && post.image.url} />
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <p><BsSuitHeart cursor={'pointer'} color="red" size={25} /> 5 Likes </p>
                    &nbsp; &nbsp;
                    <p><GoComment size={25} cursor={'pointer'} /> 3 Comments</p>
                  </div>
                  {state && state.user && state.user._id === post.postedBy._id && (
                    <div className="d-flex">
                      <BsTrash size={20} cursor={'pointer'} onClick={() => deleteHandler(post)} />
                      &nbsp; &nbsp;
                      <FiEdit size={20} cursor={'pointer'} onClick={() => router.push(`/user/post/${post._id}`)} />
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
