var LocalStorageUserService = (function() {

    function LocalStorageUserService() {};

    LocalStorageUserService.prototype.getUsers = function(callback) {

        var users = localStorage.getItem('users'),
            parsedUsers = JSON.tryParse(users),
            convertedUsers = [];

        if (parsedUsers !== false && parsedUsers !== null) {
            convertedUsers = parsedUsers.map(function(user) {
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
        }

        callback(convertedUsers);
    };

    LocalStorageUserService.prototype.saveUser = function(user, callback) {

        var users = null,
            maxId = 0,
            userIndex;

        this.getUsers(function(result) { users = result; });

        if (user.id === "0") {
        	maxId = users.length > 0
        					 	 ? users.reduce(function(a, b) { return a.id > b.id ? a.id : b.id;  }, { id: 0 })
        						 : 0;
            
            user.id = maxId + 1;
            users.push(user);
        } else {			
        	userIndex = users.map(function (item) { return item.id; }).indexOf(parseInt(user.id));
            users.splice(userIndex, 1, user);
        }

        localStorage.setItem('users', JSON.stringify(users));
        callback();
    };

    return LocalStorageUserService;
}());
