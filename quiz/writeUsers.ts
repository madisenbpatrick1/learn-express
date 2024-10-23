import express, { Response, NextFunction, Request } from 'express';
import fs from 'fs';
import path from 'path';
import { User, UserRequest } from './types';
import bkupEmitter from '../pubusb/bkupEmitter';

const router = express.Router();

const dataFile = path.resolve(__dirname, '../data/users.json');

let users: User[] = [];

fs.readFile(dataFile, (err, data) => {
    if (err) throw err;
    users = JSON.parse(data.toString());
    console.log('users loaded successfully')
});

const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
    if (users) {
        req.users = users;
        next();
    } else {
        return res.json({
            error: { message: 'users not found', status: 404 }
        });
    }
};

router.get('/adduser', addMsgToRequest, (req: UserRequest, res: Response) => {
    let newuser = req.body as User;
    users.push(newuser);

    fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(users), (err) => {
        if (err) console.log('Failed to write');
        else console.log('User Saved');
    });
    res.send('done');
});

export default router;