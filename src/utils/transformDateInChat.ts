export const transformDateInChat = (date: string): string => {
	const lastMessageDate: Date = new Date(date);
				const lastMessageDay: number = lastMessageDate.getDay();
				const currentDate: Date = new Date();
				const msToDay = 86400000;
				const lastMessageDaysAgo: number = Math.round((+currentDate - +lastMessageDate) / msToDay);

	switch (lastMessageDaysAgo) {
		case 0:
			return 'сегодня';

		case 1:
			return 'вчера';

		default:
			switch (lastMessageDay) {
				case 6:
					return 'воскресенье';
				case 0:
					return 'понедельник';
				case 1 :
					return 'вторник';
				case 2:
					return 'среда';
				case 3:
					return 'четверг';
				case 4:
					return 'пятница';
				case 5:
					return 'суббота';

				default:
					console.error('Ошибка в функции конвертации даты последнего сообщения');
			}
		return '';
	}
};
