/*
 * TODO:
 *   - Add support for custom newline characters?
 *   - e.g. either \n, \r\n, \r etc...
 *   - Or maybe better to be consistent?
 */

export class StringBuilder {
    private stringData: string;

    constructor() {
        this.stringData = '';
    }

    public appendLine(str?: string) {
        if(!str) {
            str = '';
        }

        this.stringData += str + '\n';
    }

    public append(str?: string) {
        this.stringData += str;
    }

    public toString(): string {
        return this.stringData;
    }
};