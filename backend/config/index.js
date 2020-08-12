require('dotenv').config()

module.exports = {
    SECRET_KEY: process.env.APP_SECRET_KEY,
    DB: process.env.MONGO_DB,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
}