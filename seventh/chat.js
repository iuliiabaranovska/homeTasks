var chat = {

    //publisher properties
    subscribers: {
        any: []
    },

    subscribe: function(callback, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(callback);
    },

    unsubscribe: function(callback, type) {
        type = type || 'any';
        var subscribers = this.subscribers[type];
        for (var i = 0; i < subscribers.length; i += 1) {
            if (subscribers[i] === callback) {
                subscribers.splice(i, 1);
            }
        }
    },

    publish: function(data, type) {
        type = type || 'any';
        var subscribers = this.subscribers[type];
        if (subscribers !== undefined) {
            for (var i = 0; i < subscribers.length; i += 1) {
                subscribers[i](data);
            }
        }
    },

    //chat wrapper
    sendMessage: function(message) {
        this.publish(message, message.recipient);
    }
};

var User = function(username) {

    this.username = username;
    this.messagesList = [];

    this.receiveMessage = function(message) {
        this.messagesList.push(message);

        var item = document.getElementById(this.username);

        var event; // The custom event that will be created

        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent("click", true, true);
        } else {
            event = document.createEventObject();
            event.eventType = "click";
        }

        event.eventName = "click";

        if (document.createEvent) {
            item.dispatchEvent(event);
        } else {
            item.fireEvent("on" + event.eventType, event);
        }

    }
}

var Message = (function() {

    var options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    function Message(recipient, messageText) {

        if (!(this instanceof Message)) {
            return new Message(recipient, messageText);
        }

        var time = new Date();

        this.recipient = recipient;
        this.messageText = messageText;
        this.timeSent = function() {
            return time.toLocaleDateString("en-us", options);
        }
    }

    return Message;
}());

var john = new User('John');
var max = new User('Max');
var niko = new User('Niko');

var usersList = [john, max, niko];

chat.subscribe(function(msg) { john.receiveMessage(msg); }, john.username);
chat.subscribe(function(msg) { max.receiveMessage(msg); }, max.username);
chat.subscribe(function(msg) { niko.receiveMessage(msg); }, niko.username);

var sendButton = document.getElementById('button');

sendButton.addEventListener('click', function() {

    var recipient = document.getElementById('dropdown'),
        text = document.getElementById('sendingMessage'),
        message = new Message(recipient.value, text.value);

    chat.sendMessage(message);
})

var UserManager = function() {
    var recipientsList = document.getElementById('recipientsList');
    var receivedMessageBlock = document.getElementById('receivedMessageBlock');

    this.drawUsers = function(users) {
        users.forEach(drawOneUser);
    }

    var selectedUser;

    drawOneUser = function(userObject, index) {

        var item = document.createElement('li');
        item.innerHTML = userObject.username;
        item.className = 'user';
        item.id = userObject.username;
        item.onclick = function() {

            if (selectedUser) {
                selectedUser.classList.toggle('userActive', false);
            }
            setUserInfo(userObject);
            this.classList.toggle('userActive');
            receivedMessageBlock.classList.toggle('receivedMessageBlock', true);
            selectedUser = this;

        }
        recipientsList.appendChild(item);
    }

    var template = receivedMessageBlock.innerHTML;

    var setUserInfo = function(userObject) {
        var newContent = Mustache.to_html(template, userObject);
        receivedMessageBlock.innerHTML = newContent;
    }

    this.setUserInfoNodeHTML = function(content) {
        receivedMessageBlock.innerHTML = content;
    }
}

var userManager = new UserManager();
userManager.drawUsers(usersList);
