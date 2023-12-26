const KEY_COUNT = 'count'
const KEY_TYPE = 'type'
const DEFAULTS = {
    type: 'words',
    count: 25
}

class Settings {
    //storage instance (with interface) should be passed to settings object
    setCount(count) {
        localStorage.setItem(KEY_COUNT, count)
        return this
    }

    setType(type) {
        localStorage.setItem(KEY_TYPE, type)
        return this
    }

    getCount() {
        return this._getItem(KEY_COUNT)
    }

    getType() {
        return this._getItem(KEY_TYPE)
    }

    _getItem(key) {
        const result = localStorage.getItem(key)

        if (result == null) {
            return DEFAULTS[key]
        }

        return result
    }
}