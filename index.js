import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './server/dbconnection.js';
import { templateRouter,assessmentRouter,submissionRouter } from './routes/index.js'
import { errorHandler } from './utils/errorHandler.js';
import { checkSubmissions } from './cron/checkSubmissions.js';
import cron from 'node-cron';
const app = express();

dotenv.config();
app.use(cors());

// Middleware AND //router Template
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Creating Routes
app.use("/api/templates",templateRouter);
app.use("/api/assessments",assessmentRouter);
app.use("/api/submissions",submissionRouter);

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(errorHandler);

//DataBase Connection
dbConnection(); 

//Task-scheduler
cron.schedule("* * * * *", checkSubmissions);
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at port:${PORT}`);
});