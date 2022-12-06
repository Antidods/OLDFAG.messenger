import Block, {Props} from "../../utils/Block";


export default class UserSettings extends Block {
    constructor(props: Props) {
        super({
            ...props,

        });

    }

    render() {
        //language=hbs
        return `
            <div class="main-window user-settings">
                <div class="main-window__top-line">
                    <h2>{{modalWindowName}}</h2>
                    <div class="main-window__manager">
                        {{{windowManager variation="close"}}}
                    </div>
                </div>
                <div class="container_column_center" style="padding: 0 100px 20px">
                    <img src="../../img/avatar-substitute.svg" alt="avatar" class="user-settings__avatar">
                    <div class="container_row_between" style="width: 300px">
                        <button class="button user-settings__button">изменить данные</button>
                        <button class="button user-settings__button">изменить пароль</button>
                        <button class="button user-settings__button" id="avatar">изменить аватар</button>
                    </div>
                    <form 
                            class="container_column_start" 
                            style="width: 100%; margin-bottom: 20px" 
                            onsubmit="return false"
                    >
                        <label for="login" class="user-settings__field-label">Логин</label>
                        <input type="text" class="user-settings__field-text" id="login" disabled
                               value="{{userLogin}}">

                        <label for="email" class="user-settings__field-label">Почта</label>
                        <input type="text" class="user-settings__field-text" id="email" disabled
                               value="{{userMail}}">

                        <label for="phone" class="user-settings__field-label">Телефон</label>
                        <input type="text" class="user-settings__field-text" id="phone" disabled
                               value="{{userTell}}">

                        <label for="first_name" class="user-settings__field-label">Имя</label>
                        <input type="text" class="user-settings__field-text" id="first_name" disabled
                               value="{{userName}}">

                        <label for="second_name" class="user-settings__field-label">Фамилия</label>
                        <input type="text" class="user-settings__field-text" id="second_name" disabled
                               value="{{userSurname}}">

                        <label for="display_name" class="user-settings__field-label">Имя в чате</label>
                        <input type="text" class="user-settings__field-text" id="display_name" disabled
                               value="{{userChatName}}">

                        <div class="container_row_center">
                            <a class="user-settings__button button" href="chat.hbs">Отмена</a>
                            {{{button class="button" label="Вход" form="loginForm" onclick=submit}}}
                        </div>
                    </form>

                </div>
            </div>
        `;
    }
}


// {{{windowManager variation="close"}}}
// {{{button class="button" label="Вход" form="loginForm" onclick=submit}}}
