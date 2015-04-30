var fs = require('fs');


module.exports.data = JSON.parse(fs.readFileSync('./config/config.json', {encoding: 'utf8'}));

module.exports.save = function() {
	return fs.writeFileSync('./config/config.json', JSON.stringify(module.exports.data, 0, 2), {encoding: 'utf8'});
};
