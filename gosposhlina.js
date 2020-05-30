function loadInformer() {
	if (!window.jQuery) {
		var script = document.createElement("script");
		script.setAttribute("src", 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
		script.setAttribute("type","text/javascript");
		script.onload  = callbackFunc;
		var head = document.getElementsByTagName("head")[0];
		if (!head) {
			head = document.createElement('head');
			var html = document.getElementsByTagName('html');
			html.insertElement(head);
		}
		head.insertBefore(script, head.firstChild);
	} else
		callbackFunc();
}

var callbackFunc = function(){
	var el = document.getElementById('djuScript');
	var params = '';
	if (el) {
		var src = el.getAttribute("src");
		var ind = src.indexOf("?");
		if (ind != -1)
			params = src.substring(ind + 1);
	}
	if (!window.$)
		window.$ = window.jQuery;
	$.ajax({
		url: 'https://dogovor-urist.ru/calculator/gosposhlina/data.ajax',
		data: params,
		success: function(response) {
			window.jQuery('#djuPanel').html('<div id="du-info">Калькулятор от <a target="_blank" href="https://dogovor-urist.ru/calculator/gosposhlina/">Договор-Юрист.Ру</a></div>' + response);
		}
	});
};

loadInformer();