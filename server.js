const routes = require('./routes');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Network-Api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () =>
    console.log('Success')
);
mongoose.connection.on('error', (err) =>
    console.log(`MongoDB connection error: ${err}`)
);

app.use(routes);

app.listen(PORT, () => {
    console.log((`Connected to port: ${PORT}`))
})