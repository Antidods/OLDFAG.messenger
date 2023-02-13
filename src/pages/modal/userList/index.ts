import Block, { Props } from '../../../core/Block';

export default class UserList extends Block {
	constructor(props: Props) {
		super({
			...props,
			cancel: () => {
				props.cancel(this.props.events);
			},
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover" id="userList">
            <div class="main-window modal" style="width: 400px; height: auto">
                <header class="main-window__top-line" style="margin-bottom: 20px">
                    <h1>{{ title }}</h1>
                    {{{windowManager variation="close" }}}
                </header>
                <main class="container_row_between" style='padding: 0 30px'>
                    <form onsubmit="return false" id="chatUsers" name="chatUsers">
												<span class="error-modal__message" style="margin: 40px; hyphens: auto;">
                            {{ description }}
                        </span>
                        <br>
                        <div class="container_column_start" style="margin: 20px">
                            {{#each chatUsers}}
                                <div class="container_row_start">
                                    <input type='radio' name="chatUser" id="{{ id }}" value="{{id}}" style="margin-right: 10px">
                                    <label for='{{ id }}'>{{ display_name }}</label>
                                </div>
                            {{/each}}
                        </div>
                        <br>
                        <div class="container_row_center" style="margin-bottom: 20px">
                            {{{ button
                                    class="button"
                                    label="Отмена"
                                    onclick=cancel
                            }}}
                            {{{ button
                                    class="button"
                                    label="Удалить"
                                    onclick=delete

                            }}}
                        </div>
                    </form>
                </main>
            </div>
        </div>
		`;
	}
}
