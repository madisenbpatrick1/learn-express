import express, { Response, NextFunction, Request } from 'express';
import fs from 'fs';
import path from 'path';
import { User, UserRequest } from './types';

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

router.get('/usernames', addMsgToRequest, (req: UserRequest, res: Response) => {
    let usernames = req.users?.map(user => ({ id: user.id, username: user.username }));
    res.send(usernames);
})

router.get('/username/:name', addMsgToRequest, (req: UserRequest, res: Response) => {
    let username = req.params.name;
    console.log(username)
    for (let i = 0; i < users?.length; i++) {
        console.log(users[i].username)
        if (users[i].username === username) {
            console.log("found", username)
            return res.send({ email: users[i].email });
        }
    }
    return res.status(404).json({ error: { message: "user not found", status: 404 } });
})

export default router;