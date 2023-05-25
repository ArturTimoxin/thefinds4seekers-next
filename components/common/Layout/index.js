import React from "react";
import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";
import TabLogo from "../../../assets/logo.png";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>TheFinds4Seekers - Online lost and found</title>
        <meta
          name="description"
          content="Online lost and found. Help someone and someone will help you."
        />
        <meta
          name="keywords"
          content="lost and found, lost, found, seekers, finds, online lost and found, points, map, finds for seekers"
        />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
        ></script>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <link rel="icon" href={TabLogo}></link>
      </Head>
      <Header />
      <main className="main-content-container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
