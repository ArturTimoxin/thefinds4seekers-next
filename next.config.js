const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
  withSass(
    withImages({
      target: "serverless",
      env: {
        API_URL: "http://127.0.0.1:3001/",
        PORT: 80,
        ADMIN_EMAIL: "thefinds4seekers@gmail.com",
        GOOGLE_MAPS_API_KEY: "AIzaSyBwagwxR6PPGzFqcl-NG4FPVextZr1Nsds",
      },
    })
  )
);
