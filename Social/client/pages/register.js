
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link';

const register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
                name, email, password, answer
            })
            setLoading(false)
            toast.success("User registered successfully")
            router.push('./login')
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    return (
        <Layout>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-8'>
                    <h1 className='pt-4 mb-3'>Register Now </h1>
                    <form >
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                        </div>

                        <select className="form-select mb-2" aria-label="Default select example">
                            <option defaultValue>Select Security Question</option>
                            <option value="1">Enter your best friend name</option>
                            <option value="2">Enter your best teacher name</option>
                            <option value="3">Enter your best first school name</option>
                        </select>
                        <div className="mb-3">
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" placeholder='enter answer' aria-describedby="emailHelp" />
                        </div>
                        <div className='d-flex flex-row'>
                            <button type="submit" disabled={!name || !email || !password || !answer} onClick={handleSubmit} className="btn btn-primary">{loading ? (<>
                                <span>Loading</span> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </>) : 'Register'}

                            </button>
                            <p className='m-3'> Are You Registered ?<span className='text-success'><Link href="./login">Go Login </Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default register