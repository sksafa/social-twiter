import React from 'react'

const PostImage = ({ url }) => {
    return (
        <div>
           {url && ( <img
                src={url}
                alt="Post Image"
                height={500}
                className="w-100 m-1"
            />)}
        </div>
    )
}
export default PostImage