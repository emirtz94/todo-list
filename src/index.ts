import 'dotenv/config';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'It works!' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});