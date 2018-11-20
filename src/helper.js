// Helper methods

export const selector = selector =>
	selector.charAt(0) == '#' ? document.getElementById(selector.substr(1)) :
	selector.charAt(0) == '.' ? document.getElementsByClassName(selector.substr(1)) :
	{};

export const escapeHtml = unsafe =>
	unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
