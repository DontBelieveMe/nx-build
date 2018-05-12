export function normalizeExtension(extension: string): string {
    if(extension === undefined || extension === null) {
        return undefined;
    }

    if(extension.charAt(0) == '.') {
        return extension.substring(1);
    }

    return extension;
}