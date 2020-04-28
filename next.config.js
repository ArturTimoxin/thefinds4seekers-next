const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSass(withImages({
    target: 'serverless',
    env: {
        API_URL: 'http://localhost:3001/',
        PORT: 80,
        ADMIN_EMAIL: 'thefinds4seekers@gmail.com',
        GOOGLE_MAPS_API_KEY: 'AIzaSyAwNkloWYpRV7l_zpVglnTWWlgjOPh__OQ'
    },
})));