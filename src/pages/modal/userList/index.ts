import Block, { Props } from '../../../core/Block';

export default class UserList extends Block{
	constructor(props: Props) {
		super({
			...props,
		cancel:()=>{
			props.cancel(this.props.events);
		}
		});
	}

	render() {
		// language=hbs
		return `
			<div class="modal-cover" id="userList">
            <div class="main-window modal" style='width: 600px; height: 280px'>
                <header class="main-window__top-line ">
                    <h1>Удаление пользователей из чата</h1>
                    {{{windowManager variation="close" }}}
                </header>
	                <main class="container_row_between" style='padding: 0 30px'>
  								<form onsubmit="return false" id="chatUsers" name="chatUsers">
									<p>Выберите пользователя для удаления из чата</p>
											{{#each chatUsers}}
													<input type='radio' name="chatUser" id="{{ id }}" value="{{id}}">	
													<label for='{{ id }}'>{{ display_name }}</label>
											{{/each}}
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
									</form> 
                </main>
            </div>
        </div>
		`
	}
}
