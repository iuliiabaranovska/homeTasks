var HttpHelper = (function() {

    function HttpHelper() {};

    HttpHelper.getAsync = function(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && callback !== undefined) {
                callback(JSON.parse(xmlHttp.responseText));
            }
        }
        xmlHttp.open("GET", theUrl, true);      
        xmlHttp.send(null);
    };

    HttpHelper.postAsync = function(theUrl, params, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", theUrl, true);

        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-16");

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && callback !== undefined) {
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.send(JSON.stringify(params));
    };

    return HttpHelper;
}());
