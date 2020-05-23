import React from "react";
import makeStore from '../store';
import { Provider } from "react-redux";
import App from "next/app";
import Layout from "../components/common/Layout";
import withRedux from "next-redux-wrapper";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-input-2/lib/semantic-ui.css';
import "pure-react-carousel/dist/react-carousel.es.css";
import 'toastr/build/toastr.min.css';
import '../index.scss';

class TheFinds4Seekers extends App {
    
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        );
    }
}

export default withRedux(makeStore)(TheFinds4Seekers);