const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const locationController = require('./controllers/locationController');
const weatherController = require('./controllers/weatherController');
const historyController = require('./controllers/historyController');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();
app.use(bodyParser.json());
app.use(rateLimiter);
app.use('/locations', locationController);
app.use('/weather', weatherController);
app.use('/history', historyController);

app.use(errorHandler);
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
});
