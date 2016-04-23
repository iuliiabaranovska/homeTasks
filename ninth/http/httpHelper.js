var HttpHelper = (function() {

    var statusReady = 4,
        statusOk = 200;

    function HttpHelper() {};

    HttpHelper.getAsync = function(theUrl, callback) {
        request("GET", theUrl, null, callback);
    };

    HttpHelper.postAsync = function(theUrl, params, callback) {
        request("POST", theUrl, params, callback);
    };

    HttpHelper.putAsync = function(theUrl, params, callback) {
        request("PUT", theUrl, params, callback);
    };

    var request = function(methodName, theUrl, params, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open(methodName, theUrl, true);

        if (methodName === "POST" || methodName === "PUT") {
            xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-16");
        };

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === statusReady && xmlHttp.status === statusOk && callback !== undefined) {
                callback(parseJsonOrFalse(xmlHttp.responseText) || xmlHttp.responseText);
            }
        }

        xmlHttp.send(params);
    };

    var parseJsonOrFalse = function(str) {

        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    };

    return HttpHelper;
}());
