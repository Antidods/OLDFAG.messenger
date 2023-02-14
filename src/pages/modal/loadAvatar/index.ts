import Block, { Props } from '../../../core/Block';
import UserController from '../../../controllers/UserController';
import router from '../../../core/Router';

export default class LoadAvatar extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				try {
					// @ts-ignore
					const form = document.forms.updateAvatar;
					const file = form.elements.avatar;
					const data: FormData = new FormData(form);
					data.append('avatar', file.files[0]);
					UserController.updateAvatar(data);
					router.closeAllModal();
				} catch (e) {
					console.error('Ошибка при загрузки аватарки');
				}
			},
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover">
            <div class="main-window modal">
                <header class="main-window__top-line ">
                    <h1>Изменить аватар</h1>
                    {{{windowManager variation="close" }}}
                </header>
                <main class="container_column_center" style="padding: 40px">
                    <img class="preview-avatar" id="preview" alt="" src="#">
                    <form
                            name="updateAvatar"
                            id="updateAvatar"
                            class="container_column_start upload-file"
                            onsubmit="return false"
                    >
                        <label for="avatar" class="button upload-file__label">Выберите файл</label>
                        <input class="upload-file__input" type="file" id="avatar"
                               onchange=" 
																const form = document.forms.updateAvatar;
																const file = form.elements.avatar;
																const previewURL = window.URL.createObjectURL(file.files[0]);
																if(file){
																	const preview = document.getElementById('preview');
																	preview.src = previewURL;
																}
															"
                        >
                        {{{button
                                class="button"
                                label="Сохранить"
                                form="loginForm"
                                onclick=submit
                        }}}
                    </form>

                </main>
            </div>
        </div>
		`;
	}
}
