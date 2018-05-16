export function normalizeExtension(extension: string): string {
    if(extension.charAt(0) == '.') {
        return extension.substring(1);
    }

    return extension;
}