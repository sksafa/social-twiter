import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '../../context';
import { useRouter } from 'next/router';

const Header = () => {
    const [currentTab, setCurrentTab] = useState("")
    useEffect(() => {
        process.browser && setCurrentTab(window.location.pathname)
    }, [])

    const router = useRouter()
    const [state, setState] = useContext(UserContext);
    const handleLogout = () => {
        window.localStorage.removeItem("auth");
        setState(null)
        router.push('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link href="/">
                        <a className="navbar-brand" >Navbar</a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/">
                                    <a className = {`nav-link ${currentTab === "/" && 'active'}`} aria-current="page" >Home</a>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/about">
                                    <a className = {`nav-link ${currentTab === "/about" && 'active'}`}>About</a>
                                </Link>
                            </li>

                            {state !== null ? <>
                                <li className="nav-item">
                                    <Link href="/user/dashboard">
                                        <a className = {`nav-link ${currentTab === "/user/dashboard" && 'active'}`}>Dashboard</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={handleLogout}>Logout</a>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <Link href="/register">
                                        <a className = {`nav-link ${currentTab === "/register" && 'active'}`}>Register</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link href="/login">
                                        <a className = {`nav-link ${currentTab === "/login" && 'active'}`}>Login</a>
                                    </Link>
                                </li>
                            </>}
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header