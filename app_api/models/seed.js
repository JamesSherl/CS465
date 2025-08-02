//Bring in DB connection and trip scheme
const Mongoose = require('./db');
const Trip = require('./travlr');

//Reads seed data from JSON
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

//Replaces records with seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the Mongo connection and exit gracefully
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});
