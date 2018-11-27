module.exports = function(source) {
	const obj = JSON.parse(
		source.substring('module.exports = '.length)
	);

	const requireit = element => {
		if( typeof element == 'string' ) {
			return `require("${element}")`;
		}
		if( Array.isArray(element) ) {
			return '[' + element.map( requireit ).join(',') + ']';
		}
		return JSON.stringify(element);
	}

	const data = Object.keys(obj).map( key => 
		`"${key}":${requireit(obj[key])}`
	).join(',');

	if(typeof obj.presets !== 'undefined') {
		obj.presets = requireit(obj.presets);
	}

	if(typeof obj.plugins !== 'undefined') {
		obj.plugins = requireit(obj.plugins);
	}

	return `module.exports = {\n${data}\n}`;
}
