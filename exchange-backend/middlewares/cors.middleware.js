// middleware/cors.middleware.js
const cors = require('cors');

const corsOptions = {
    origin: 'https://172.20.10.5:8082.exp.direct', // Change this to your frontend URL
    credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
