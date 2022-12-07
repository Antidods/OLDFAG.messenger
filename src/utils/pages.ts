import LoginPage from '../pages/login';
import Registration from '../pages/registration';
import Chat from '../pages/chat';
import registrationAllComponents from './registerComponents';
import UserSettings from '../pages/userSettings';
import ErrorPage from '../pages/error';

registrationAllComponents();

export const PAGES = {
  selectPage(pageName: any): void {
    const root: any = document.querySelector('#app');
    root.innerHTML = '';
    root.append(pageName.getContent()!);
  },

  setModal(modal: any): void {
    const root: any = document.querySelector('#app');
    root.append(modal.getContent()!);
    modal._element.querySelector('.main-window').classList.remove('hidden');
  },

  removeModal(): void {
  },

  loginPage: new LoginPage({
    title: 'Вход',
  }),

  registration: new Registration({
    title: 'Регистрация',
  }),

  chat: new Chat({

    users: [
      {
        name: 'Ms. Charmain Welch',
        avatarUrl: 'https://i.pravatar.cc/50',
        messageText: 'Sed agam accumsan aliquam sanctus nisl consequat fringilla.',
        messageLastDate: 'пн',
        messageUnread: 5,
      },
      {
        name: 'Stacy',
        avatarUrl: 'https://i.pravatar.cc/51',
        messageText: 'Faucibus dissentiunt consetetur dicunt consul.',
        messageLastDate: 'сегодня',
        messageUnread: 3,
      },
      {
        name: 'Ms. Shad Okuneva',
        avatarUrl: 'https://i.pravatar.cc/52',
        messageText: 'Pri vituperatoribus instructior magna autem nonumy deserunt.',
        messageLastDate: 'вт',
        messageUnread: 5,
      },
      {
        name: 'Manuela',
        avatarUrl: 'https://i.pravatar.cc/49',
        messageText: 'Latine utinam euripidis erroribus sadipscing adipisci partiendo suas.',
        messageLastDate: 'ср',
        messageUnread: 0,
      },
      {
        name: 'Dickens',
        avatarUrl: 'https://i.pravatar.cc/60',
        messageText: 'Fusce populo elementum vis utroque.',
        messageLastDate: 'вчера',
        messageUnread: 0,
      },
      {
        name: 'Summer Smith',
        avatarUrl: 'https://i.pravatar.cc/80',
        messageText: 'Quis qui nostrum potenti erat efficitur non.',
        messageLastDate: 'вс',
        messageUnread: 0,
      },
    ],
    title: 'OLDFAG.messenger',
    toTalkAvatar: 'https://i.pravatar.cc/40',
    toTalkToName: 'Имя собеседника',
    userLogin: 'andrey1990',
    userMail: 'andrey@mail.ru',
    userTell: '+79275562963',
    userName: 'Андрей',
    userSurname: 'Стрельцов',
    nameToChat: 'Andrey_St',
  }),

  userSettings: new UserSettings({
    title: 'Настройки',
  }),

  error404: new ErrorPage({
    title: '404',
  }),
  error500: new ErrorPage({
    title: '500',
  }),
};
