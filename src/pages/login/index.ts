import Block, {Props} from "../../utils/Block";


export default class LoginPage extends Block {
    constructor(props: Props) {
        super({
            ...props,
            submit: () => {
                const login: any = document.getElementById('login');
                const password: any = document.getElementById('password');
                console.log(login.value, password.value);
                // @ts-ignore
                window.PAGES.selectPage(window.PAGES.chat)
            }
        });

    }

    render() {
        //language=hbs
        return `
            <div class="main-window main-window_login-form">
                <header class="main-window__top-line">
                    <h1>{{title}}</h1>
                    {{{windowManager variation="close"}}}
                </header>
                <main class="container_column_center" style="padding: 40px">
                    <!--                        TODO: Вынести лого в css-->
                    <img src="/src/img/LOGO.svg" alt="LOGO" class="logo">
                    <form
                            class="login-form container_column_start"
                            id="loginForm"
                            onsubmit="return false"
                    >
                        <div class="container_column_start" style="width: 100%">
                            <label for="login" class="login-form__field-label">Логин</label>
                            <input type="text" class="login-form__field-text" id="login" required>
                        </div>
                        <label for="password" class="login-form__field-label">Пароль</label>
                        <input type="password" class="login-form__field-text" id="password" required>
                        <div class="container_row_between" style="width: 300px">
                            <a class="button" onclick="window.PAGES.selectPage(window.PAGES.registration)">Регистрация</a>
                            {{{button class="button" label="Вход" form="loginForm" onclick=submit}}}
                        </div>
                    </form>
                </main>
            </div>`

    }


}




