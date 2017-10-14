class EventCenter {
    static on(type, handler) {
        return document.addEventListener(type, handler)
    }
    static trigger(type, data) {
        return document.dispatchEvent(new CustomEvent(type, {
            detail: data,
            bubbles: true,
            cancelable: true
        }))
    }
}

export default EventCenter