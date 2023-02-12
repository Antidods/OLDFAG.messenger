// language=hbs
export const template: string = `
    <div class="modal-cover">
        <div class="main-window modal chat-settings">
            <header class="main-window__top-line ">
                <h1>Опции чата</h1>
                {{{windowManager variation="close" }}}
            </header>
            <main class="chat-settings__main-container" style="padding: 20px;">
								{{{span
												text="Список пользователей чата"
												font-size=14
												
								}}}
                <div class="chat-settings__user-list-container">
                    {{#each selectedChatUsers}}
                        {{{span
                                text=display_name
                                font-size=9
                                max-width=150
                        }}}
                    {{/each}}
                </div>
                <div class="container_row_between">
                    {{{ delete }}}
                    {{{ userAdd }}}
                    {{{ userDell }}}
                </div>
            </main>
        </div>
    </div>
`;
