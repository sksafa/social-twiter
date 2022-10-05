import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <Link href="/">
                        <a class="navbar-brand" >Navbar</a>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link href="/">
                                    <a class="nav-link active" aria-current="page" >Home</a>
                                </Link>
                            </li>

                            <li class="nav-item">
                                <Link href="/about">
                                    <a class="nav-link">About</a>
                                </Link>
                            </li>

                            <li class="nav-item">
                                <Link href="/register">
                                    <a class="nav-link">Register</a>
                                </Link>
                            </li>

                            <li class="nav-item">
                                <Link href="/login">
                                    <a class="nav-link">Login</a>
                                </Link>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header