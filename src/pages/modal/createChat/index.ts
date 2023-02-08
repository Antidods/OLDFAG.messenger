import Block, { Props } from '../../../core/Block';
import FormField from '../../../components/formField';
import { checkFormValidity } from '../../../utils/validator';
import { ICreateChat } from '../../../types';
import chatsController from '../../../controllers/ChatsController';

export default class CreateChat extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				event!.preventDefault();
				event!.stopPropagation();
				// @ts-ignore
				const form: any = document.forms.createChat;
				const data: unknown = checkFormValidity(form);
				console.log(data);
				chatsController.createChat(data as ICreateChat);
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
        <div class="modal-cover">
            <div class="main-window modal">
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
                            onsubmit="submit()"

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
