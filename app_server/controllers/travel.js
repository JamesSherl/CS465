var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/*Traval view time :D*/
const travel = (req, res) => {
    res.render('travel', {title: 'Travlr Getaway', trips} );
};

module.exports = {
    travel
};