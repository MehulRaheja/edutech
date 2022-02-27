const path = require('path');
// const socket = require('socket.io');

const dotenv  = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');
const auth = require('./middleware/auth');
const feedRoutes = require('./routes/feed');
const schoolRoutes = require('./routes/school');
const standardRoutes = require('./routes/standard');
const subjectRoutes = require('./routes/subject');
const userRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const { clearImage } = require('./util/file');

const app = express();

dotenv.config();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS') { // this line is added because of graphql because it doesn't allow 'OPTIONS' method
        return res.sendStatus(200);
    }
    next();
});

// app.use((req, res, next) => {
//     // res.send('connected to server');
//     console.log('received request');
//     next();
// })

app.use(auth);

app.put('/post-image', (req, res, next) => {
    // if(!req.isAuth) {
    //     return res.status(200).json({ message: 'No file provided!' });
    // }
    if(!req.file) {
        return res.status(200).json({ message: 'No file provided!' });
    }
    // console.log(req.file);
    if(req.body.oldPath) {
        clearImage(req.body.oldPath);
    }
    return res 
        .status(201)
        .json({ message: "File Stored. ", filePath: req.file.path });
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if(!err.originalError) {
                return err;
            }
            console.log('there is an error.');
            const data = err.originalError.data;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data };
        }
    })
);


app.use('/', feedRoutes);
app.use('/school/', schoolRoutes);
app.use('/standard/', standardRoutes);
app.use('/subject/', subjectRoutes);
app.use('/user/', userRoutes);
app.use('/', profileRoutes);



app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


// mongoose
//     .connect(
//         process.env.DB_ADMIN_URL
//     )
//     .then(result => {
//         const server =  app.listen(process.env.PORT);
//         // console.log('Client connected1');
//         const io = require('./socket').init(server,{
//             cors: {
//                 origin: '*',
//                 methods: ['GET', 'POST']
//             }
//         });
//         // console.log('Client connected2');
//         io.on('connection', socket => {
//             console.log('Client connected3');
//         });
//     })
//     .catch(err => console.log(err));

mongoose
    .connect(
        process.env.DB_ADMIN_URL
    )
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log('Client connected');
        });
    })
    .catch(err => console.log(err));

// use function graphqlHttp from 'express-graphql'
// graphqlHttp will take 2 components first is schema i.e. graphql schema and second is rootValue i.e. graphql resolver
// inside body of graphqlquery always set a key as query because express-graphql will look for it 
// we add line: graphiql: true, because it allows to use it on browser on localhost/8000/graphql path, Note: it workds with app.use and not app.get
// formatError(err) receives all the errors in resolver and format them and sends them
// originalError is thrown by graphql when it detects error in code
// 