export const toDateString = (date:string | number) => {
    const intData = (+date / 60).toString().split('.');
    let first = intData[0] || '00';
    let last = intData[1] ? parseInt(((+('0.' + intData[1]) * 60) / 1).toString(), 0)  : '00';
    if (first && +first < 10) {
        first = '0' + first;
    }
    if (last && last < 10) {
        last = '0' + last;
    }
    return first + ':' + last;
};