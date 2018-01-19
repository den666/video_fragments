export const hashCode = (value: string | object): number => {
    const res = (typeof value === 'string' || value instanceof String) ?
        value.toLowerCase() : JSON.stringify(value).toLowerCase();
    let hash = 0;
    let i;
    let chr;
    if (res.length === 0) return hash;
    for (i = 0; i < res.length; i = i + 1) {
        chr = res.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};