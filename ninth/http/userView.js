var UserView = function() {

    var usersList = document.getElementById('usersListNode');
    var userInfoNode = document.getElementById('userInfoNode');
    var index = 0;

    this.drawUsers = function(usersList) {
        usersList.forEach(drawOneUser);
    }

    var selectedUser,
        that = this;

    var drawOneUser = function(userObject) {

        var item = document.createElement('li');
        item.innerHTML = index + ':' + userObject.name;
        item.className = 'user';
        item.onclick = function() {

            if (selectedUser) {
                selectedUser.classList.toggle('userActive', false);
            }
            that.setUserInfo(userObject);
            this.classList.toggle('userActive');
            selectedUser = this;

        }
        usersList.appendChild(item);
        index += 1;
    }

    var template = userInfoNode.innerHTML.replace(/{{&gt;/g, "{{>");

    var partials = { address: "{{city}} {{countryState}} {{zip}}" };

    this.setUserInfo = function(userObject) {
        var newContent = Mustache.to_html(template, userObject, partials);
        userInfoNode.innerHTML = newContent;
    };

    this.setUserInfoNodeHTML = function(content) {
        userInfoNode.innerHTML = content;
    };

    this.eviscerateUsersList = function() {
        usersList.innerHTML = '';
        index = 0;
    };
}
