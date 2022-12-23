const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config()

// require('./config/database');
require('./models/user');
require('./models/project');
require('./models/data');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:7000', credentials: true,
}));


app.use(require('./routes'));

app.get('/', (req, res) => {
    const driver = getDriver();
    console.log(driver);
    res.send('Connected Succesfully');

})
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}: http://localhost:${PORT}`);
});