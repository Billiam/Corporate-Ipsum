var Settings = Class.extend({
    KEY_COUNT : 'count',
    KEY_TYPE : 'type',
    
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
        return localStorage.getItem(this.KEY_COUNT);
    },
    getType : function() {
        return localStorage.getItem(this.KEY_TYPE);
    }
});