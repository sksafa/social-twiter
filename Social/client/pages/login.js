
import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { UserContext } from '../context';

const login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [state, setState]  = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
                email, password
            })
            setState({
                user:data.user,
                token:data.token,
            })
            window.localStorage.setItem("auth", JSON.stringify(data));
            setLoading(false)
            console.log(data)
            toast.success("User login successfully")
            router.push('/')
        } catch (error) {
            toast.error("Try agin")
        }
    }

    if(state && state.token) router.push('/')
    
    return (
        <Layout>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-8'>
                    <h1 className='pt-4 mb-3'>Login Now </h1>
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
                            <label className="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                        </div>
                        <div className='d-flex flex-row'>
                            <button type="submit" disabled={!email || !password} onClick={handleSubmit} className="btn btn-primary">{loading ? (<>
                                <span>Loading</span> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </>) : 'Login'}

                            </button>
                            <p className='m-3'> Are You New ?<span className='text-success'> <Link href="/register">Go to registration </Link></span></p>

                            <p className='m-3'>Forgot<span className='text-danger'> <Link href="/ForgotPassword">Password</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default login