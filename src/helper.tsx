// Helper methods

export const selector : (string) => HTMLElement = selector =>
	document.querySelector(selector);

export const escapeHtml = unsafe =>
	unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
