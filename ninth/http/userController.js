var userView = new UserView();
userView.setUserInfoNodeHTML('');

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

var service = new LocalStorageUserService();

service.getUsers(function(users) {
        //users = users.slice(users.length - 10);
        userView.drawUsers(users);
    });

$newUserButton.on('click', function() {
    userView.setUserInfo(new User());
});

$userInfoNode.on('change', '#avatarInput', function() {
    $('img').attr('src', $(this).val());
})

$userInfoNode.on('click', '#sendButton', function() {
    var user = getInfo();

    service.saveUser(user, function () {
        service.getUsers(function(users) {             
            userView.eviscerateUsersList();
            userView.drawUsers(users); });
    });
});