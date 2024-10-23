// import fs from 'fs';
// import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import readUsersRouter from './readUsers';
import writeUsersRouter from './writeUsers';

const app = express();
const port = 8000;


app.use('/read', readUsersRouter);
app.use('/write', writeUsersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
