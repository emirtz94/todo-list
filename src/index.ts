import 'dotenv/config';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'node:path';
import { errorHandler } from './middleware';
import todoRoutes from './routes/todo.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials")
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());

app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

app.get('/', (req: Request, res: Response) => {
    res.redirect('/todos');
});

app.use('/todos', todoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});