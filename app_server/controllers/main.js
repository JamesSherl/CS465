/*Gets homepage*/
const index = (req, res) => {
    res.render('index', {title: "Travlr GFetaways"});
};

module.exports = {
    index
}