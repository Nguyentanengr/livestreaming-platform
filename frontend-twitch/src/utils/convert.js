

export const convertView =(view) => {
    var result = null;
    result = view >= 1_000_000_000 ? Math.round(view * 10 / 1_000_000_000) / 10 + "T"
    : view >= 1_000_000 ? Math.round(view * 10 / 1_000_000) / 10 + "M"
    : view >= 1_000 ? Math.round(view * 10 / 1000) / 10 + "K"
    : view;
    return result;
};

export const convertDuration = (duration) => {
    var result = null;
    var hour = Math.floor(duration / 3600);
    var minute = Math.floor((duration - hour * 3600) / 60);
    var seconds = duration - hour * 3600 - minute * 60;
    result = (hour == 0 ? "" : hour + ":") 
    + (minute < 10 ? "0" + minute : minute) + ":" 
    + (seconds < 10 ? "0" + seconds : seconds)

    return result;
};

export const convertTimeAgo = (time) => {
    // Convert input string to Date object
    const parseTimeString = (timeStr) => {
        const [datePart, timePart] = timeStr.split(' ');
        const [year, month, day] = datePart.split(':').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    const now = new Date();
    const inputTime = parseTimeString(time);
    const diffInSeconds = Math.floor((now - inputTime) / 1000);

    if (diffInSeconds < 5) {
        return 'just now';
    } else if (diffInSeconds < 60) {
        return `${Math.floor(diffInSeconds)} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
};
