class MakeVariable {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    buildAssignmentOpString() {     
        if(typeof this.name === 'string' && this.name.length === 0) {
            throw new Error('Variable name is empty');
        }
        
        if(/^\s+$/.test(this.name)) {
            throw new Error('Variable name is only whitespace');
        }

        if(typeof this.name !== 'string'){
            throw new Error('Variable name is not of string type');
        }
        
        return this.name + ":=" + this.value;
    }

    buildAppendOpString() {
        return this.name + "+=" + this.value;
    }
}

module.exports = MakeVariable;
