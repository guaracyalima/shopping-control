function setConfig() {
	var texts = {
		"title":"Shopping Control"
	};

	document.title = texts.title; //seta o titulo no index do html
	document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();