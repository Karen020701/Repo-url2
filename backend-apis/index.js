const express = require('express');
const restController = require('./src/restController');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());


app.use('/api', restController);


const startServer = async () => {
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
};

startServer();
