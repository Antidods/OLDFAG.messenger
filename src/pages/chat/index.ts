import Block, { Props } from '../../utils/Block';

export default class Chat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      submit: () => {
        const login: any = document.getElementById('login');
        const password: any = document.getElementById('password');
        console.log(login.value, password.value);
        // @ts-ignore
        window.PAGES.selectPage(window.PAGES.loginPage);
      },
      userSettings: () => {
        // @ts-ignore
        window.PAGES.setModal(window.PAGES.userSettings);
      },
      error404: () => {
        // @ts-ignore
        window.PAGES.setModal(window.PAGES.error404);
      },
      error500: () => {
        // @ts-ignore
        window.PAGES.setModal(window.PAGES.error500);
      },
      toLogin: () => {
        // @ts-ignore
        window.PAGES.selectPage(window.PAGES.loginPage);
      },
    });
  }

  render() {
    // language=hbs
    return `
            <div class="main-window main-window_chat" id="main-window">
                <div class="main-window__top-line">
                    <h1>{{title}}</h1>
                    {{{windowManager}}}
                </div>
                <div class="main-window__spacer"></div>
                <main>
                    <div class="chat-list">
                        <div class="chat-list__action-panel">
                            {{{button
                                    class="chat-list__button chat-list__button_add"
                                    label="добавить"
                                    onclick=error404
                            }}}
                            {{{button
                                    class="chat-list__button chat-list__button_dell"
                                    label="добавить"
                                    onclick=error404
                            }}}
                            {{{button
                                    class="chat-list__button chat-list__button_search"
                                    label="добавить"
                                    onclick=error404
                            }}}
                        </div>
                        <div class="chat-list__spacer"></div>
                        <div class="chat-list__contacts">
                            {{#each users}}
                                {{{chatListItem
                                        name=this.name
                                        avatarUrl=this.avatarUrl
                                        messageText=this.messageText
                                        messageLastDate=this.messageLastDate
                                        messageUnread=this.messageUnread
                                }}}
                            {{/each}}
                        </div>
                    </div>
                    <div class="chat">
                        <div class="chat-text-block">
                            <div class="chat-text-block__top-bar">
                                <div class="chat-text-block__to-talk-to">
                                    <img src="{{toTalkAvatar}}" alt="avatar"
                                         class="chat-text-block__to-talk-to-avatar">
                                    <span class="chat-text-block__to-talk-to-name">{{toTalkToName}}</span>
                                </div>
                                <div class="chat-text-block__user">
                                    <span class="chat-text-block__user-name">{{userName}}{{userSurname}}</span>
                                    {{{button
                                            class="chat-text-block__button chat-text-block__button_setting"
                                            onclick=userSettings
                                    }}}
                                    {{{button
                                            class="chat-text-block__button chat-text-block__button_exit"
                                            onclick=toLogin
                                    }}}
                                </div>
                                <div class="chat-text-block__spacer"></div>
                            </div>
                        </div>
                        <form class="chat-send-block" onsubmit="return false">
                            <button class="chat-send-block__clip"></button>
                            <input
                                    class="chat-send-block__textarea"
                                    id="message"
                                    placeholder="Ваше сообщение ..."
                                    type="text"
                                    required
                            >
                            <button class="chat-send-block__send">
                                <span>отправить</span>
                            </button>
                        </form>
                    </div>
                </main>
                <footer>
                    {{{statusBar}}}
                </footer>
            </div>
        `;
  }
}
