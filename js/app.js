
var corporate = {
    nodes       : {},
    generator   : new TextGenerator(new IpsumFactory()),
    settings    : new Settings()
};

function populateForm() {
    var count = corporate.settings.getCount();

    getNode('count').value = count;
    getNode('count-display').textContent = count;
    getNode('type').value = corporate.settings.getType();
}
function copyContent() {
    var node = getNode('outputtext');
    node.focus();
    node.select();
    document.execCommand('Copy');
}
function getNode(id) {
    if (typeof(corporate.nodes[id]) !== "undefined") {
        return corporate.nodes[id];
    }
    return document.getElementById(id);
}

function formChanged(e) {
    e.preventDefault();
    e.stopPropagation();
    
    //update settings
    var value = e.target.value;
    var id = e.target.id;
    if (id == 'count') {
        getNode('count-display').textContent = value;
    }
    
    corporate.settings['set' + id.ucFirst()](value);
    runGenerator();
}
function runGenerator() {
    corporate.generator.setType(corporate.settings.getType())
                       .setCount(corporate.settings.getCount());

    getNode('outputtext').value = corporate.generator.generateString();
}

window.onload = function() {
    populateForm();
    runGenerator();
    
    var fields = ['count', 'type'];
    
    for (var i=0, l=fields.length; i<l; i++) {
        getNode(fields[i]).addEventListener('change', formChanged);
    }

    document.forms.loremform.addEventListener('submit', runGenerator);

    getNode('copy').addEventListener('click', copyContent);
}