require("dotenv").config();

export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    database: {
      host: process.env.MONGO_DB_HOST,
      port: parseInt(process.env.MONGO_DB_PORT, 10) || 27017
    },
});

let mongodbUri = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`;

if(process.env.MONGO_DB_USERNAME && process.env.MONGO_DB_PASSWORD) {
    mongodbUri = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`
}   

console.log('mongodbUri', mongodbUri)

const uploadsPath = `./${process.env.UPLOADS_DIRRECTORY}`;

export {
    mongodbUri,
    uploadsPath,
};