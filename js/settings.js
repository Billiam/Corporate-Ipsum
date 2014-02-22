var Settings = Class.extend({
    KEY_COUNT : 'count',
    KEY_TYPE : 'type',
    DEFAULTS: {
        type: 'words',
        count: 25, 
    },
    //storage instance (with interface) should be passed to settings object
    setCount : function(count) {
        localStorage.setItem(this.KEY_COUNT, count);
        return this;
    },
    setType : function(type) {
        localStorage.setItem(this.KEY_TYPE, type);
        return this;
    },
    getCount : function() {
        return this._getItem(this.KEY_COUNT);
    },
    getType : function() {
        return this._getItem(this.KEY_TYPE);
    },
    _getItem: function(key) {
        var result = localStorage.getItem(key);

        if (result == null) {
            result = this.DEFAULTS[key];
        }
        return result;
    }
});