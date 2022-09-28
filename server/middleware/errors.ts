const fs = require('fs');
import express from "express";

class ExpressError extends Error {
    public status: number;
    public message: string;
    constructor (status: number = 401, message:string = "UNAUTHORIZED") {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export class UnauthorizedError extends ExpressError {
    constructor (message: string) {
        super(401, message);
    }
}

export const notFoundHandler = (req: express.Request, res: express.Response) => {
    res.status(404).json({message: "Specified API endpoint does not exist."});

    //this is handling 404s for api calls, which will be usually
    //because of curious users fiddling around with our service,
    //we can log their user agent for further inspection and
    //to block crawlers and apps like postman
    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const message: String = new Date().toISOString() + ": " + req.url + " requested by IP: " + ip + " with UA: " + req.headers['user-agent'] + "\n";

    //console.log(message);
    fs.appendFile("error.log", message, (err: any) => {
        if (err) { 
            console.log(err);
         }
    });
};

export const errorHandler = (err: ExpressError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 401).json({...err, message: err.message});
};