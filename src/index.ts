import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'node:path';
import { errorHandler } from './middleware/errorHandler';
import todoRoutes from './routes/todo.routes';
import authRoutes from './routes/auth.routes';
import session from 'express-session';

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
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'random-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/bootstrap-icons', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font')));

// Global state for all views
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.isAuthenticated = !!req.session.userId;
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.redirect('/todos');
});

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});