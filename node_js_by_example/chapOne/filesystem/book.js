// books.js required by script.js

/*
exports.name = 'Node.js by example'
exports.read = () => {
    console.log(`I\'m reading ${exports.name}`);
}

var ratePoints = 0;
exports.rate = (points) => {
    ratePoints = points;
}

exports.getPoints = () => {
    return ratePoints;
}
*/
// So we should use this instead of the previous
module.exports = () => {
    var ratePoints = 0;
    return { 
        rate: function(points) {
            ratePoints = points;
        }, 
        getPoints: function() {
            return ratePoints;
        }
    }
}
