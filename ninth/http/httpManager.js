var userManager = new UserManager();
userManager.setUserInfoNodeHTML('');

HttpHelper.getAsync('http://heedio.me:8383', function(users) {
    var convertedUsers = users.map(function(user) {
        return new User(user.name || "No name",
            user.info || "No info",
            user.second || "No second",
            user.avatar || "No info",
            user.newfield || "No avatar",
            user.skills || "No skills",
            user.isFullTime || "No isFull time",
            user.phone || "No phone",
            user.city || "No city",
            user.countryState || "No state",
            user.zip || "No zip");
    });

    userManager.drawUsers(convertedUsers);

});

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


$newUserButton.on('click', function() {
    userManager.setUserInfo(new User());
});

$userInfoNode.on('change', '#avatarInput', function() {
    $('img').attr('src', $(this).val());
})

$userInfoNode.on('click', '#sendButton', function() {
    HttpHelper.postAsync('http://heedio.me:8383', getInfo(), function() { console.log("Successfully post!"); });
    userManager.drawUsers([getInfo()]);
});
