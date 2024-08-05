export function isArray<T>(obj: any, validator: (obj: any) => obj is T): obj is T[] {
    return Array.isArray(obj) && obj.every(validator);
}