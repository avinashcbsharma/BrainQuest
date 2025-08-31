import express from 'express';
import mongoose from 'mongoose';

// MongoDB Connection
import dotenv from 'dotenv';
dotenv.config();

export const dbConnection  = async() => {
    try{
    await mongoose.connect(process.env.DB_URI)
    console.log('Database connected');
    }
    catch(err){
        console.error('DB connection error:', err);
    } 
        
};
