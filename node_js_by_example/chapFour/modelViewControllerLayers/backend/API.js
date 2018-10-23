// responsible for the REST API. We will use JSON as a format to transfer data. 
module.exports = function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('{}' + '\n');
};
