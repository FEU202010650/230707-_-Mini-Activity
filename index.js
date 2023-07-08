const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://202010650:OCIfyXCTw9AEyASC@sandbox.btzyzmi.mongodb.net/an22_sample_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

const cors = require('cors');
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
});
