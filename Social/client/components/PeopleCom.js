import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context';

const PeopleCom = ({ people, handleFollowed }) => {
    const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    return (
        <div className='mt-4'>
            {people.map(user => 
                <div className='card m-1 p-3' key={user._id}>
                    <div className='d-flex align-items-center justify-content-between '>
                        <img
                            src={user.image && user.image.url ? user.image.url : defaultImage}
                            alt={user.name}
                            height={50}
                            width={50}
                            style={{ borderRadius: "50%" }} />
                        <h6 className='mt-2'>{user.name}</h6>
                        <button className='btn btn-primary' onClick={()=>handleFollowed(user._id, user.name)}>Follow</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PeopleCom