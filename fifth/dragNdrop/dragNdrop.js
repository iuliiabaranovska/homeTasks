function handleDragStart(e) {

    this.style.opacity = '0.4';
    this.setAttribute('draggable', 'true');
    e.dataTransfer.effectAllowed = 'move';

    var wrap = document.createElement('div');
    wrap.appendChild(this.cloneNode(true));

    e.dataTransfer.setData('text/html', wrap.innerHTML);

    return true;
}

function handleDragEnter(e) {

    e.preventDefault();
    this.classList.add('over');
    return true;
}

function handleDragOver(e) {

    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragLeave(e) {

    this.classList.remove('over');
    console.log('Drag Leave is occured !');
}

function handleDrop(e) {
    
    this.classList.remove('over');

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    this.innerHTML = e.dataTransfer.getData('text/html');

    var firstChild=this.firstChild;
    firstChild.classList.add('center');
    firstChild.style.opacity='1';

    return false;
}

function handleDragEnd(e) {

    if (e.dataTransfer.dropEffect === "move") { this.style.visibility = 'hidden'; }

    console.log('Drag End is occured !');
}

var mouse = document.querySelector('.mouse');
var box = document.querySelector('.box');
mouse.addEventListener('dragstart', handleDragStart, false);
box.addEventListener('dragenter', handleDragEnter, false);
box.addEventListener('dragover', handleDragOver, false);
box.addEventListener('dragleave', handleDragLeave, false);
box.addEventListener('drop', handleDrop, false);
mouse.addEventListener('dragend', handleDragEnd, false);
