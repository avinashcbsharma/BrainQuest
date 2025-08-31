export const errorHandler = (err, req, res, next) => {
    console.log("Error in application: ",err);

    const statusCode= err.statusCode || 500;
    const message = err.message || 'Server Issue found';
    return res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
};