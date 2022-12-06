import Block, {Props} from "../../utils/Block";


export default class Registration extends Block {
    constructor(props: Props) {
        super({
            ...props,
            submit: () => {
                const login: any = document.getElementById('login');
                const password: any = document.getElementById('password');
                console.log(login.value, password.value);

                // @ts-ignore
                window.PAGES.selectPage(window.PAGES.loginPage)
            }


        });


    }

    render() {
        //language=hbs
        return `
            <div class="main-window">
                <header class="main-window__top-line">
                    <h1>{{title}}</h1>
                    {{{windowManager variation="close"}}}
                </header>
                <main class="container_column_start" style="padding: 40px">
                    <img src="../../img/LOGO.svg" alt="LOGO" class="logo">
                    <form class="login-form container_column_start" id="registrationForm" onsubmit="return false">
                        <label for="login" class="login-form__field-label">Логин</label>
                        <input type="text" class="login-form__field-text" id="login">
                        <label for="email" class="login-form__field-label">Почта</label>
                        <input type="text" class="login-form__field-text" id="email">
                        <label for="first_name" class="login-form__field-label">Имя</label>
                        <input type="text" class="login-form__field-text" id="first_name">
                        <label for="second_name" class="login-form__field-label">Фамилия</label>
                        <input type="text" class="login-form__field-text" id="second_name">
                        <label for="phone" class="login-form__field-label">Телефон</label>
                        <input type="text" class="login-form__field-text" id="phone">
                        <label for="password" class="login-form__field-label">Пароль</label>
                        <input type="password" class="login-form__field-text" id="password">
                        <label for="second_password" class="login-form__field-label">Повторите пароль</label>
                        <input type="password" class="login-form__field-text" id="second_password">
                        <div class="container_row_end" style="width: 300px">
                            {{{button class="button" label="Регистрация" form="registrationForm" onclick=submit}}}
                        </div>
                    </form>
                </main>
            </div>
        `
    }
}




