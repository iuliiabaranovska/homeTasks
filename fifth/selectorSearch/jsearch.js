var jSearch = (function() {
    var jSearch = function() {};
    jSearch.all = function(selector) {
        var objectsOfSelectors = [],
            domElements = [];

        objectsOfSelectors = splitSelector(selector);

        traversingDOM(document.body, function(node) {
            if (node.nodeType === 1 || node.nodeType === 2) {

                var satisfy = true;

                for (var i = 0; i < objectsOfSelectors.length; i++) {
                    satisfy = satisfy && objectsOfSelectors[i].satisfy(node);

                    if (!satisfy) {
                        break;
                    }
                };

                if (satisfy) {
                    domElements.push(node);
                }
            };
        });

        return domElements;
    };

    var traversingDOM = function(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            traversingDOM(node, func);
            node = node.nextSibling;
        };
    };

    var splitSelector = function(selector) {
        var objectsList = [],
            selectorsList = selector.split(' ');
        for (var i = 0; i < selectorsList.length; i++) {
            if (selectorsList[i].charAt(0) === ".") {
                var classObject = new ClassSelector(selectorsList[i]);
                objectsList.push(classObject);
            }
            else if (selectorsList[i].charAt(0) === "#") {
                var idObject = new IdSelector(selectorsList[i]);
                objectsList.push(idObject);
            }
            else{
                var elementObject = new ElementSelector(selectorsList[i]);
                objectsList.push(elementObject);
            };
        };
        return objectsList;
    };

    var ElementSelector = (function() {

        function ElementSelector(elementSelector) {
            this.elementSelector = elementSelector;
        };

        ElementSelector.prototype.satisfy = function(node) {
            return this.elementSelector === node.localName;
        };

        return ElementSelector;
    }());

    var ClassSelector = (function() {
        function ClassSelector(classSelector) {
            this.classSelector = classSelector;
        };

        ClassSelector.prototype.satisfy = function(node) {
            return this.classSelector === "." + node.className;
        };

        return ClassSelector;
    }());

    var IdSelector = (function() {
        function IdSelector(idSelector) {
            this.idSelector = idSelector;
        };

        IdSelector.prototype.satisfy = function(node) {
            return this.idSelector === "#" + node.id;
        };

        return IdSelector;
    }());

    return jSearch;
}());
