localStorage.errorReloadCount ??= 0
localStorage.errorReloadTimer ??= Date.now()
self.onerror = (_a, _b, _c, _d, e) => {
    if (+localStorage.errorReloadTimer <= Date.now() - 15000 /* milliseconds; resets counter after 15 error-free seconds */) {
        localStorage.errorReloadCount = 1
    } else {
        localStorage.errorReloadCount++
    }
    if (localStorage.errorReloadCount.length >= 20) {
        console.error("An error occurred 20 times.", e)
    } else {
        history.go(0)
    }
}

setTimeout(() => delete self.onerror, 500)

const chatInput = document.getElementById `chat-input`
chatInput.oninput = () => {
    let lines = 1
    chatInput.value.replaceAll("\n", () => console.log(lines++))
    console.log(lines)
    chatInput.style.height = lines + "em"
}

// opens an alert showing what was sent, but only if no modifier keys are hel
// this allows shift+enter to break the line
chatInput.onkeydown = e => {
    if (e.which == 13 && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
        alert("You sent: " + chatInput.value)
        e.preventDefault()
    }
}
// redirects clicks on the white space (shown when resizing) to the chat input
chatInput.parentElement.onclick = e => {
    if (e.target == chatInput.parentElement) {
        chatInput.click()
    }
}

// yea i dunno what im doing, im not a js dev (i pretend i am)

// vscode documentation = 🌈

/**
 * @typedef {string | Node | SlotFill[]} SlotFill
 */
/**
 * Instantiates the given named template, fills its slots with the given data, and returns the instance.
 * @param {string}                    name
 * @param {Record<string, SlotFill>} data
 */
function instantiate(name, data = {}) {
    const template = document.getElementById(name)
    if (!template || !(template instanceof HTMLTemplateElement)) {
        throw new Error(`No such template ${template}`)
    }
    const instance = document.createElement("instance")
    instance.setAttribute("from", name)
    instance.append(template.content.cloneNode(true))
    for (let slot of instance.querySelectorAll("slot")) {
        if (slot.name in data) {
            // @ts-ignore - Typescript doesn't know that flattening removes arrays
            slot.replaceWith(...[data[sl]].flat(Infinity))
        } else {
            slot.replaceWith(...slot.childNodes)
        }
    }
    return instance
}

// testing code
document.querySelector(".pending-uploads").append(instantiate("pending-upload-card"))