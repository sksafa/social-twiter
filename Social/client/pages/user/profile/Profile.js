import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../components/Layout';
import { UserContext } from '../../../context';
const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Profile = () => {
    const [state, setState] = useContext(UserContext);
    const [user, setUser] = useState([])

    useEffect(() => {
        if (state && state.token) {
            loadData()
        }
    }, [state && state.token])

    const loadData = async () => {
        try {
            const { data } = await axios.get(`/user/${state.user._id}`)
            setUser(data)
            console.log("this si sdasa", data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="card mb-3 mt-5">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={user.image?.url} height="500" width="500" className="img-fluid rounded-start img-thumbnail" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body ms-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Profile Name: {user.name}</li>
                                            <li className="list-group-item">About:  {user.about}</li>
                                            <li className="list-group-item">Email: {user.email}</li>
                                        </ul>
                                        <Link href="/user/profile/update">
                                            <button className='btn btn-primary ms-3  mt-2'>Edit Profile</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div className='ProfileTab'>
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Following({user.following && user.following.length})</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Follower</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                        <div className='row'>
                                            {user.following && user.following.map(user =>
                                                <div className='col-md-3'>
                                                    <div className='card m-2 p-1' key={user._id}>
                                                        <div className='d-flex align-items-center justify-content-between '>
                                                            <img
                                                                src={user.image && user.image.url ? user.image.url : defaultImage}
                                                                alt={user.name}
                                                                height={100}
                                                                width={100}
                                                                style={{ borderRadius: "50%" }} />
                                                            <div>
                                                                <h6 className='mt-2'>{user.name}</h6>
                                                                <button className='btn btn-light' >Unfollow</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
