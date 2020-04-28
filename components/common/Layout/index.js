import React from 'react';
import Head from "next/head";
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>thefinds4seekers - Online lost and found</title>
                <meta name="description" content="Create an Ad of loss and help others" />
                <meta name="keywords" content="lost and found, ad, map, finds for seekers" />
                <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}></script>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            </Head>
            <Header />
            <main className='main-content-container'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;