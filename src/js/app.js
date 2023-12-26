
const Corporate = {
    nodes       : {},
    generator   : new TextGenerator(new IpsumFactory()),
    settings    : new Settings()
}

const COUNT_FIELD = 'count'
const COUNT_DISPLAY = 'count-display'
const TYPE_FIELD = 'type'
const OUTPUT_FIELD = 'outputtext'
const COPY_FIELD = 'copy'

const populateForm = () => {
    const count = Corporate.settings.getCount()

    getNode(COUNT_FIELD).value = count
    getNode(COUNT_DISPLAY).textContent = count
    getNode(TYPE_FIELD).value = Corporate.settings.getType()
}
const copyContent = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const node = getNode(OUTPUT_FIELD)
    node.focus()
    node.select()
    navigator.clipboard.writeText(node.value)
}
const getNode = (id) => {
    if (Corporate.nodes[id] == null) {
        Corporate.nodes[id] = document.getElementById(id)
    }
    return Corporate.nodes[id]
}

const formChanged = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    //update settings
    ;([COUNT_FIELD, TYPE_FIELD]).forEach(id => {
        const node = getNode(id)
        const value = node.value
        if (id === COUNT_FIELD) {
            getNode(COUNT_DISPLAY).textContent = value
        }
        Corporate.settings[`set${id.ucFirst()}`](value)
    })

    runGenerator()
}

function runGenerator() {
    Corporate.generator.setType(Corporate.settings.getType())
                       .setCount(Corporate.settings.getCount())

    getNode(OUTPUT_FIELD).value = Corporate.generator.generateString()
}

window.onload = function() {
    populateForm()
    runGenerator()

    ;([COUNT_FIELD, TYPE_FIELD]).forEach(id => {
        getNode(id).addEventListener('change', formChanged)
    })
    getNode(COUNT_FIELD).addEventListener('input', (e) => {
        getNode(COUNT_DISPLAY).textContent = e.target.value
    })

    document.forms.loremform.addEventListener('submit', runGenerator)

    getNode(COPY_FIELD).addEventListener('click', copyContent)
}