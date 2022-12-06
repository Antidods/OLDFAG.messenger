import LoginPage from "./src/pages/login";
import Registration from "./src/pages/registration";
import Chat from "./src/pages/chat";
import {registrationAllComponents} from "./src/utils/registerComponents";


registrationAllComponents();

export const PAGES = {
    selectPage(pageName: any) {
        const root:any = document.querySelector('#app');
        root.innerHTML='';
        root.append(pageName.getContent()!);
        console.log('страница сгенерирована')

    },

    loginPage: new LoginPage({
        title: 'Вход'
    }),

    registration: new Registration({
        title: 'Регистрация'
    }),

    chat: new Chat({


        users:{
            "Ms. Charmain Welch": {
                "avatarUrl": "https://cs6.pikabu.ru/avatars/1873/x1873183-836260127.png",
                "messageText": "Sed agam accumsan aliquam sanctus nisl consequat fringilla.",
                "messageLastDate": "пн",
                "messageUnread": 5
            },
            "Stacy": {
                "avatarUrl": "https://i.yaklass.by/res/6c829b27-bee5-4110-96f5-35f6d3661c0c/photomedium.jpg",
                "messageText": "Faucibus dissentiunt consetetur dicunt consul.",
                "messageLastDate": "сегодня",
                "messageUnread": 3
            },
            "Ms. Shad Okuneva": {
                "avatarUrl": "",
                "messageText": "Pri vituperatoribus instructior magna autem nonumy deserunt.",
                "messageLastDate": "вт",
                "messageUnread": 5
            },
            "Manuela": {
                "avatarUrl": "",
                "messageText": "Latine utinam euripidis erroribus sadipscing adipisci partiendo suas.",
                "messageLastDate": "ср",
                "messageUnread": 0
            },
            "Dickens": {
                "avatarUrl": "",
                "messageText": "Fusce populo elementum vis utroque.",
                "messageLastDate": "вчера",
                "messageUnread": 0
            },
            "Summer Smith": {
                "avatarUrl": "",
                "messageText": "Quis qui nostrum potenti erat efficitur non.",
                "messageLastDate": "вс",
                "messageUnread": 0
            }
        },
        title: 'OLDFAG.messenger',
        toTalkToName: 'Имя собеседника',
        userLogin: 'andrey1990',
        userMail: 'andrey@mail.ru',
        userTell: '+79275562963',
        userName: 'Андрей',
        userSurname: 'Стрельцов',
        nameToChat: 'Andrey_St'
    }),

};

// @ts-ignore
window.PAGES=PAGES;

// export function selectPage(pageName: any) {
//     const root = document.querySelector('#app')!;
//     root.innerHTML = '';
//     root.append(pageName.getContent()!);
//     console.log('страница сгенерированна')
//
// }

document.addEventListener('DOMContentLoaded', () => {
    // const root = document.querySelector('#app')!;
    //
    // const loginPage = new LoginPage({
    //     title: 'Вход'
    // });
    //
    // root.append(PAGES.loginPage.getContent()!);
    // @ts-ignore
    window.PAGES.selectPage(PAGES.loginPage);

});
