import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

// connect to database
mongoose.Promise = global.Promise;
// const dbUrl = 'mongodb://localhost:27017/valhallaapp';
const dbUrl = 'mongodb+srv://petete:riverplate10@valhalla-app.oouav.mongodb.net/valhalla?retryWrites=true&w=majority';
mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(mongoose => console.log('Connected to DB'))
    .catch(err => console.log(err));

const app = express();


// settings
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: true }));


// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/api', router);

// static files
app.use(express.static(path.join(__dirname, 'public'))); 


// port
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'))
});