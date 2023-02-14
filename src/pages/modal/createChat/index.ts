import Block, { Props } from '../../../core/Block';
import FormField from '../../../components/formField';
import { checkFormValidity } from '../../../utils/validator';
import { ICreateChat } from '../../../types';
import chatsController from '../../../controllers/ChatsController';
import router from '../../../core/Router';

export default class CreateChat extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				// @ts-ignore
				const form: any = document.forms.createChat;
				const data: unknown = checkFormValidity(form);
				chatsController.createChat(data as ICreateChat);
				router.closeModalById('CreateChat');
			},
		});
	}

	init() {
		this.children.chatName = <Block>new FormField({
			type: 'text',
			name: 'title',
			id: 'chatName',
			label: 'Название чата',
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover" id="CreateChat">
            <div class="main-window modal create-chat" >
                <header class="main-window__top-line ">
                    <h1>Создать чат</h1>
                    {{{windowManager variation="close" }}}
                </header>
								<div class='logo' style='height: 90px; margin-top: 30px'></div>
                <main class="container_column_center" >
                    <form
                            name="createChat"
                            id="title"
                            class="container_column_start"
                            onsubmit="return false"

                    >

                        {{{ chatName }}}
                        {{{ button
                                class="button"
                                label="Создать"
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
