if (typeof(JSON.tryParse) === 'undefined') {
    JSON.tryParse = function(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    };
};
