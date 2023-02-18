const express = require('express');
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const morgan = require("morgan");

const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000', 'http://localhost:8000']
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/platforms', require('./routes/platformRoutes'))
app.use('/api/accounts', require('./routes/accountRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
