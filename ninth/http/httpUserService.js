var HttpUserService = (function() {

    function HttpUserService() {};

    HttpUserService.prototype.getUsers = function(callback) {

        HttpHelper.getAsync('http://heedio.me:8383', function(users) {
            var convertedUsers = users.map(function(user) {
                return new User(user.id,
                    user.name || "No name",
                    user.info || "No info",
                    user.second || "No second",
                    user.avatar || "No avatar",
                    user.newfield || "No info",
                    user.skills || "No skills",
                    user.isFullTime || "No isFull time",
                    user.phone || "No phone",
                    user.city || "No city",
                    user.countryState || "No state",
                    user.zip || "No zip");
            });

            callback(convertedUsers);
        });
    };

    HttpUserService.prototype.saveUser = function(user, callback) {

        var userString = JSON.stringify(user);

        if (user.id === "0") {
            HttpHelper.postAsync('http://heedio.me:8383', userString, function() {
                console.log("Successfully post!");
                callback();
            });
        } else {
            HttpHelper.putAsync('http://heedio.me:8383/' + user.id, userString, function() {
                console.log("Successfully put!");
                callback();
            });
        }
    }

    return HttpUserService;
}());
