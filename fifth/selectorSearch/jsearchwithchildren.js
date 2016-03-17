var jSearch = (function() {

    var jSearch = function() {};
    jSearch.all = function(selector) {
        var objectsOfSelectors = [],
            domElements = [],
            result=[];

        objectsOfSelectors = convertToObjectsList(splitSelector(selector));

        result = getAllDescendants(document.body, objectsOfSelectors);

        return result;
    };

    var getAllDescendants = function(root, selectorsList) {

        var result = [];

        traversingDOM(root, function(node) {

            for (var i = 0; i < selectorsList.length; i++) {

                var satisfy = true,
                    children = [];

                if (selectorsList[i] === " ") {

                    children = getAllDescendants(node, selectorsList.slice([i + 1]), true);

                    children.forEach(function(child) {
                        if (result.indexOf(child) === -1) {
                            result.push(child);
                        }
                    });
                    satisfy = false;
                } else {
                    satisfy = satisfy && selectorsList[i].satisfy(node);
                }

                if (!satisfy) {
                    break;
                }
            };

            if (satisfy && result.indexOf(node) === -1) {
                result.push(node);
            }
        });

        return result;
    };

    var traversingDOM = function(node, func, skipNode) {

        if (!skipNode) {
            if (node.nodeType === 1 || node.nodeType === 2) {
                func(node);
            }
        }

        node = node.firstChild;

        while (node) {
            traversingDOM(node, func);
            node = node.nextSibling;
        };
    };

    var splitSelector = function(selector) {
        var selectorsList = [],
            word = "";

        selector = selector.trim();

        for (var i = 0; i < selector.length; i++) {

            if (selector[i] === "." || selector[i] === "#" || selector[i] === " ") {

                if (word !== "") {
                    selectorsList.push(word);
                    word = "";
                };
            };

            if(selector[i] === " "){
                selectorsList.push(" ");
            } else {
                word += selector[i];
            }
        };

        selectorsList.push(word);

        return selectorsList;
    };

    var convertToObjectsList = function(selectorsList) {

        var objectsList = [];

        selectorsList.forEach(function(item) {
            switch (item.charAt(0)) {
                case " ":
                    {
                        objectsList.push(item);
                        break;
                    }
                case ".":
                    {
                        objectsList.push(new ClassSelector(item));
                        break;
                    }
                case "#":
                    {
                        objectsList.push(new IdSelector(item));
                        break;
                    }
                default:
                    {
                        objectsList.push(new ElementSelector(item));
                    }
            };
        });

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
