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

export const  fixText = (string:string) => {
    const newString = String(string);
    let str = newString.toLowerCase();

    for (let i = 0;i < str.length; i = i + 1) {
        if (str.charAt(i) === 'á') str = str.replace(/á/,'a');
        if (str.charAt(i) === 'é') str = str.replace(/é/,'e');
        if (str.charAt(i) === 'í') str = str.replace(/í/,'i');
        if (str.charAt(i) === 'ó') str = str.replace(/ó/,'o');
        if (str.charAt(i) === 'ú') str = str.replace(/ú/,'u');
    }
    return str;
};