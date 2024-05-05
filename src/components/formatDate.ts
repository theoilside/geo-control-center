// Конвертировать ISO-дату в DD.MM.YYYY HH:MM:SS
export const formatDate = (dateString: string | undefined | null): string | undefined => {
    if (!dateString) {
        return undefined;
    }
    const date = new Date(dateString);

    const formattedDate = [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear(),
    ].join('.');

    const formattedTime = [
        date.getHours().toString().padStart(2, '0'),
        date.getMinutes().toString().padStart(2, '0'),
        date.getSeconds().toString().padStart(2, '0'),
    ].join(':');

    return `${formattedDate} ${formattedTime}`;
};
