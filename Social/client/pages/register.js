
import React,{useState} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

const register = () => {
    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [answer, setAnswer]= useState("")

    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/register',{
            name,email,password,answer
        }).then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        console.log(name,email,password, answer)
    }

    return (
        <Layout>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-8'>
                    <h1 className='pt-4 mb-3'>Register Now </h1>
                    <form >
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} class="form-control" />
                        </div>

                        <select class="form-select mb-2" aria-label="Default select example">
                            <option selected>Select Security Question</option>
                            <option value="1">Enter your best friend name</option>
                            <option value="2">Enter your best teacher name</option>
                            <option value="3">Enter your best first school name</option>
                        </select>
                        <div class="mb-3">
                            <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} class="form-control" placeholder='enter answer' aria-describedby="emailHelp" />
                        </div>

                        <button type="submit" onClick={handleSubmit} class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default register