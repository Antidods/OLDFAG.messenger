import Block, {Props} from "../../utils/Block";


export default class LoginPage extends Block {
    constructor(props: Props) {
        super(props);
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
                    <div class="login-form container_column_start" >
                        <div class="container_column_start" style="width: 100%">
                            <label for="login" class="login-form__field-label">Логин</label>
                            <input type="text" class="login-form__field-text" id="login">
                        </div>
                        <label for="password" class="login-form__field-label">Пароль</label>
                        <input type="password" class="login-form__field-text" id="password">
                        <div class="container_row_between" style="width: 300px">
                            {{{button class="button" label="Регистрация" type="button" onClick="window.PAGES.selectPage(PAGES.login)"
                            
                            }}}
                            {{{button class="button" label="Вход" type="button"}}}
                        </div>
                    </div>
                </main>
            </div>`

    }


}




