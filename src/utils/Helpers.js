// Date formate
export const dateFormate = (date) => {
    date = new Date(date)
    const cdate = date.toDateString();
    return cdate;
}

export const formatDateWithAMPM = date => {
    date = new Date(date)
    const cdate = date.toDateString();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = cdate + ' ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

// String Short
export const StringShort = data => {
    let string = data
    const firstLetter = string.slice(0, 1)
    return firstLetter
}