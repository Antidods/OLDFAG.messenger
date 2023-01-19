import Block, { Props } from '../../utils/Block';
import Button from '../../components/button';
import UserController from '../../controllers/UserController';
import { withUser } from '../../hocs/withUser';
import AuthController from '../../controllers/AuthController';
import { checkFormValidity } from '../../utils/validator';
import { IUser } from '../../types';
import router from '../../utils/Router';
import ErrorModal from '../modal/error';
import LoadAvatar from '../modal/loadAvatar';
import store from '../../utils/Store';

class UserSettings extends Block {
	constructor(props: Props) {
		super({
			...props,
		});
	}

	init() {
		AuthController.fetchUser();

		UserController.lockEditProfile(true);
		store.emit('updated');
		this.children.editProfileButton = <Block>new Button({
			class: 'button user-settings__button',
			label: 'Изменить данные',
			onclick: () => {
				UserController.lockEditProfile(false);
			},
		});

		this.children.submit = <Block>new Button({
			class: 'button',
			label: 'Сохранить',
			onclick: () => {
				// @ts-ignore
				const form: any = document.forms.updateProfileForm;
				const formData: unknown = checkFormValidity(form);
				if (form.dataset.valid === 'true') {
					try {
						UserController.updateProfile(formData as IUser);
					} catch (e: any) {
						router.setModal(ErrorModal, {
							error_message: `${e.reason}`,
						});
					} finally {
						router.go('/chat');
					}
				}
			},
		});

		this.children.updateAvatarButton = <Block>new Button({
			class: 'button',
			label: 'Загрузить аватар',
			onclick: () => {
				router.setModal(LoadAvatar, {});
			},
		});

		this.children.cancelButton = <Block>new Button({
			class: 'button',
			label: 'Назад',
			onclick: () => {
				router.go('/chat');
			},
		});
	}

	render() {
		// language=hbs
		return `

        <div class="main-window user-settings">
            <div class="main-window__top-line">
                <h2>Профиль пользователя</h2>
                <div class="main-window__manager">
                    {{{windowManager variation="close"}}}
                </div>
            </div>
            <div class="container_column_center" style="padding: 0 100px 20px">
                {{#if avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}"
                         alt="avatar" class="user-settings__avatar"
                    >
                {{else}}
                    <img src="avatar-substitute.svg"
                         alt="avatar" class="user-settings__avatar"
                    >
                {{/if}}
                <div class="container_row_between" style="width: 300px">
                    {{{editProfileButton}}}
                    <button class="button user-settings__button">изменить пароль</button>
                    {{{updateAvatarButton}}}
                </div>
                <form
                        name="updateProfileForm"
                        id="updateProfileForm"
                        class="container_column_start"
                        style="width: 100%; margin-bottom: 20px"
                        onsubmit="return false"
                >

                    {{{formField
                            type=text
                            name="login"
                            label="Логин"
                            value=login
                            disabled=lockEditProfile
                    }}}
                    {{{formField
                            type=text
                            name="email"
                            label="Почта"
                            value=email
                            disabled=lockEditProfile
                    }}}
                    {{{formField
                            type=text
                            name="first_name"
                            label="Имя"
                            value=first_name
                            disabled=lockEditProfile
                    }}}
                    {{{formField
                            type=text
                            name="second_name"
                            label="Фамилия"
                            value=second_name
                            disabled=lockEditProfile
                    }}}
                    {{{formField
                            type=text
                            name="phone"
                            label="Телефон"
                            value=phone
                            disabled=lockEditProfile
                    }}}
                    {{{formField
                            type=text
                            name="display_name"
                            label="Имя в чате"
                            value=display_name
                            disabled=lockEditProfile
                    }}}

                    <div class="container_row_center">
                        {{{ cancelButton }}}
                        {{{ submit }}}
                    </div>
                </form>

            </div>
        </div>
		`;
	}
}

const Profile = withUser(UserSettings);
export default Profile;
