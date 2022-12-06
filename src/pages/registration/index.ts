import Block, {Props} from "../../utils/Block";

export default class Registration extends Block {
    constructor(props: Props) {
        super({
            ...props,
            submit: () => {
                // @ts-ignore
                const form: any = document.forms.regForm;
                const regData: Record<string, any> = {
                    login: form.elements.login.value,
                    email: form.elements.email.value,
                    first_name: form.elements.first_name.value,
                    second_name: form.elements.second_name.value,
                    phone: form.elements.phone.value,
                    password: form.elements.password.value,
                };

                if(form.elements.password.value == form.elements.second_password.value) console.log('Пароли не совпадают');

                if (form.checkValidity() && form.elements.password.value == form.elements.second_password.value) {
                    console.log(regData);
                    // @ts-ignore
                    window.PAGES.selectPage(window.PAGES.chat)
                };
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
                    <form
                            class="login-form container_column_start"
                            id="registrationForm"
                            name="regForm"
                            onsubmit="return false"
                    >
                        <label for="login" class="login-form__field-label">Логин</label>
                        <input
                                type="text"
                                class="login-form__field-text"
                                id="login"
                                name="login"
                                pattern="^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$"
                                required
                        >
                        <label for="email" class="login-form__field-label">Почта</label>
                        <input
                                type="email"
                                class="login-form__field-text"
                                id="email"
                                name="email"
                                pattern="^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$"
                                required
                        >
                        <label for="first_name" class="login-form__field-label">Имя</label>
                        <input
                                type="text"
                                class="login-form__field-text"
                                id="first_name"
                                name="first_name"
                                pattern="^[а-яА-ЯёЁa-zA-Z]+[а-яА-ЯёЁa-zA-Z]$"
                                required
                        >
                        <label for="second_name" class="login-form__field-label">Фамилия</label>
                        <input
                                type="text"
                                class="login-form__field-text"
                                id="second_name"
                                name="second_name"
                                pattern="^[а-яА-ЯёЁa-zA-Z]+[а-яА-ЯёЁa-zA-Z]$"
                                required
                        >
                        <label for="phone" class="login-form__field-label">Телефон</label>
                        <input
                                type="tel"
                                class="login-form__field-text"
                                id="phone"
                                name="phone"
                                pattern="^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){10,14}(\\s*)?$"
                                required
                        >
                        <label for="password" class="login-form__field-label">Пароль</label>
                        <input
                                type="password"
                                class="login-form__field-text"
                                id="password"
                                name="password"
                                pattern="(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                required
                        >
                        <label for="second_password" class="login-form__field-label">Повторите пароль</label>
                        <input
                                type="password"
                                class="login-form__field-text"
                                id="second_password"
                                name="second_password"
                                pattern="(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                required
                        >
                        <div class="container_row_end" style="width: 300px">
                            {{{button
                                    class="button"
                                    label="Регистрация"
                                    form="registrationForm"
                                    type="submit"
                                    onclick=submit
                            }}}
                        </div>
                    </form>
                </main>
            </div>
        `
    }
}




