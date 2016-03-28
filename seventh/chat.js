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

var user = {
    username: "",
    receivedMessage: function(message) {
        console.log(message);
    }
}

var Message = (function() {

    function Message(recipient, messageText) {

        if (!(this instanceof Message)) {
            return new Message(recipient, messageText);
        }

        this.recipient = recipient;
        this.messageText = messageText;
        this.timeSent = new Date();
    }

    return Message;
}());


chat.subscribe(user.receivedMessage, "stepan");

chat.sendMessage(new Message("petro", "hello, petro!!!"));
chat.sendMessage(new Message("stepan", "hello, stepan!!!"));
chat.sendMessage(new Message("petro", "hello, petro, one more time!!!"));
