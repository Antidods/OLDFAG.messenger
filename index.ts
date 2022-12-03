import LoginPage from "./src/pages/login";


window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;

    const login = new LoginPage({
        title: 'Вход'
    });

    root.append(login.getContent()!);

    login.dispatchComponentDidMount();

});
