import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../components/Layout';
import { UserContext } from '../../../context';

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
                                    <img src={user.image?.url} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body ms-4">
                                        <h5 className="card-title">Name: {user.name}</h5>
                                        <h5 className="card-title">About:  {user.about}</h5>
                                        <h5 className="card-title">Email: {user.email}</h5>

                                        <Link href="/user/profile/update">
                                            <button className='btn btn-primary'>Edit Profile</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    user.following &&  user.following.map(user=><p>{user.name}</p>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile