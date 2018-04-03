'use strict';

class StringBuilder {
    constructor() {
        this.m_data = '';
    }

    appendLine(str) {
        if(str === undefined) {
            this.m_data += '\n';
            return;
        }
        
        this.m_data += str + '\n';
    }

    append(str) {
        this.m_data += str;
    }

    toString() {
        return this.m_data;
    }
};

module.exports = StringBuilder;
