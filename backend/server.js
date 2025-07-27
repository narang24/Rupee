require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
const overviewRoutes = require('./routes/overviewRoutes')
const savingsRoutes = require('./routes/savingsRoutes')
const multer = require('multer');

const app = express();

//Middleware to handle CORS 
app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type','Authorization'],
    })
)

//Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//Serving the uploaded files
app.use('/uploads', express.static('uploads'));

//Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({message: 'File uploaded successfully', fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`})
})

app.use(express.json());

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/savings', savingsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));