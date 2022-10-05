import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Head from 'next/head'

const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                {/* <meta name="description" content="Free Web tutorials" />
                <meta name="keywords" content="HTML, CSS, JavaScript" />
                <meta name="author" content="John Doe" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
                <title>{title}</title>
            </Head>

            <Header></Header>
            <main className='container' style={{minHeight:'90vh'}}>{children}</main>
            <Footer></Footer>

        </>
    )
}
Layout.defaultProps = {
    title:"social media application"
}

export default Layout
