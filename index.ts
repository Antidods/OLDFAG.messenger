import LoginPage from "./src/pages/login";
import {registrationAllComponents} from "./src/utils/registerComponents";


registrationAllComponents();

export const PAGES = {
    selectPage(pageName: any) {
        const root = document.querySelector('#app')!;
        root.innerHTML = '';
        root.append(pageName.getContent()!);
        console.log('страница сгенерированна')

    },

    loginPage: new LoginPage({
        title: 'Вход'
    }),
    login: new LoginPage({
        title: 'Регистрация'
    })

};

window.PAGES=PAGES;

export function selectPage(pageName: any) {
    const root = document.querySelector('#app')!;
    root.innerHTML = '';
    root.append(pageName.getContent()!);
    console.log('страница сгенерированна')

}

document.addEventListener('DOMContentLoaded', () => {
    // const root = document.querySelector('#app')!;
    //
    // const loginPage = new LoginPage({
    //     title: 'Вход'
    // });
    //
    // root.append(PAGES.loginPage.getContent()!);
    window.PAGES.selectPage(PAGES.loginPage);

});
