'use strict';

class StringBuilder {
    constructor() {
        this.m_data = '';
    }

    appendLine(str) {
        if(str === undefined || str === null) {
            this.m_data += '\n';
            return;
        }
        
        this.m_data += str + '\n';
    }

    append(str) {
        if(str === undefined || str === null)
            return;

        this.m_data += str;
    }

    toString() {
        return this.m_data;
    }
};

module.exports = StringBuilder;
