var Crypto,
	message,
	normalizePlaintext,
	size,
	plaintextSegments,
	ciphertext;

Crypto = function(text) {
	this.message = text;
	this.message = this.message.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
	this.message = this.message.replace(/\s+/g, '');
	this.message = this.message.toLowerCase();
};

Crypto.prototype.normalizePlaintext =  function() {
	return this.message;
};

Crypto.prototype.size = function() {
	var size = Math.sqrt(this.message.length);
	if (size % 1 === 0)
		return size;
	else
		return Math.ceil(size);
};
	
Crypto.prototype.plaintextSegments = function() {
	var segments = [];
	for (i = 0; i < this.size(); i++) {
		segments[i] = this.message.slice(i * this.size(), (i+1) * this.size());	
	}
	if (segments[segments.length-1] == '')
		segments.pop();
	return segments;
};

Crypto.prototype.ciphertext = function() {
	var text = '';
	var segments = this.plaintextSegments();
	for (i = 0; i < this.size(); i++) {
		for(j = 0; j < this.size(); j++) {
			text += segments[j].slice(i, i+1);
		}
	}
	return text;
};

module.exports = Crypto;
