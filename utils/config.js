// config.js
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  netlify_siteId: process.env.NETLIFY_SITEID
}
