var userManager = new UserView();
userManager.setUserInfoNodeHTML('');

var loadUsers = function() {
    HttpHelper.getAsync('http://heedio.me:8383', function(users) {
        //users = users.slice(users.length - 10);
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

        userManager.drawUsers(convertedUsers);
    });
};

var getInfo = function() {
    var user = new User();
    var $inputs = $("#userInfoNode").find("input");
    for (var i = 0; i < $inputs.length; i++) {
        var inputName = $($inputs[i]).attr("name");
        if (user.hasOwnProperty(inputName)) {
            user[inputName] = $($inputs[i]).val();
        };
    };
    return user;
};

var $newUserButton = $('#newUserButton');
var $userInfoNode = $('#userInfoNode');

loadUsers();

$newUserButton.on('click', function() {
    userManager.setUserInfo(new User());
});

$userInfoNode.on('change', '#avatarInput', function() {
    $('img').attr('src', $(this).val());
})

$userInfoNode.on('click', '#sendButton', function() {
    var user = getInfo();
    if (user.id === "0") {
        HttpHelper.postAsync('http://heedio.me:8383', user, function() {
            console.log("Successfully post!");
            loadUsers();
        });
    } else {
        HttpHelper.putAsync('http://heedio.me:8383/' + user.id, user, function() {
            console.log("Successfully put!");
            loadUsers();
        });
    }

    userManager.eviscerateUsersList();
});
