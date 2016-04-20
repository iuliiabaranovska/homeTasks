var HttpService = function() {

    function HttpService() {};

    HhtpService.getUsers = function(callback) {
        HttpHelper.getAsync('http://heedio.me:8383', callback);
    };

    HttpService.setUsers = function(user, params) {

        if (user.id === "0") {
            HttpHelper.postAsync('http://heedio.me:8383', params, function() {
                console.log("Successfully post!");
                getUsers();
            });
        } else {
            HttpHelper.putAsync('http://heedio.me:8383/' + user.id, params, function() {
                console.log("Successfully put!");
                getUsers();
            });
        }

    }

    return HttpService;
}
