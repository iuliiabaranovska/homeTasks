var User = function(name, info, second, avatar, newfield, skills, isFullTime, phone, city, countryState, zip) {
    this.name = name;
    this.info = info;
    this.second = second;
    this.avatar = avatar;
    this.newfield = newfield;
    this.skills = skills;
    this.isFullTime = isFullTime;
    this.phone = phone;
    this.address = new Address(city, countryState, zip);
}

var Address = function(city, countryState, zip) {
    this.city = city;
    this.countryState = countryState;
    this.zip = zip;
}

var UserManager = function() {

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
    }

    this.setUserInfoNodeHTML = function(content) {
        userInfoNode.innerHTML = content;
    }
}

var usersList = [
    new User('John', 'likes bowling', 'Second', 'http://www.iconarchive.com/download/i51046/hopstarter/halloween-avatars/Jason.ico',
        'asdasdasdasd', ['EcmaScript', 'PHP', 'Java'], true, "617-123-4567", "Boston", "MA", "02106"),
    new User('Pavel', 'plays football', 'Second', 'http://www.iconarchive.com/download/i51026/hopstarter/halloween-avatars/Alien.ico',
        'asdasdasdasd', ['JavaScript', 'C#', 'Paskal'], false, "617-987-6543", "London", "GH", "45676"),
    new User('Igor', 'drinks a lot', 'Second', 'http://files.softicons.com/download/internet-cons/halloween-avatars-icons-by-deleket/ico/Zombie%202.ico',
        'asdasdasdasd', ['C++', 'Ruby'], true, "617-111-2323", "Amsterdam", "JJ", "69696")
];
