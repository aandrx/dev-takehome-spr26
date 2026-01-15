export function isValidName(name: unknown): boolean {
    return typeof name === 'string' && name.length >= 3 && name.length <= 30;
}

export function isValidItem(item: unknown): boolean {
    return typeof item === 'string' && item.length >= 2 && item.length <= 100;
}

export function isValidStatus(status: unknown): boolean {
    return typeof status === 'string' &&
        ['pending', 'approved', 'completed', 'rejected'].includes(status);
}
