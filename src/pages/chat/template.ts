export const template =
	// language=hbs
	`
      <div class="main-window main-window_chat" id="main-window">
          <div class="main-window__top-line">
              <h1>OLDFAG.messenger</h1>
              {{{windowManager}}}
          </div>
          <div class="main-window__spacer"></div>
          <main>
              <div class="chat-list">
                  <div class="chat-list__action-panel">
                      {{{button
                              class="chat-list__button chat-list__button_add"
                              label="добавить"
                      }}}
                      {{{button
                              class="chat-list__button chat-list__button_dell"
                              label="добавить"
                              onclick=error404
                      }}}
                      {{{ userSearchButton }}}
                  </div>
                  <div class="chat-list__spacer"></div>
                  <div class="chat-list__contacts">
                      {{#each chatList}}
                          {{{chatListItem
                                  name=title
                                  avatarUrl=this.avatarUrl
                                  messageText=id
                                  messageLastDate=this.messageLastDate
                                  messageUnread=this.unread_count

                          }}}
                      {{/each}}


                  </div>
              </div>
              <div class="chat">
                  <div class="chat-text-block">
                      <div class="chat-text-block__top-bar">
                          <div class="chat-text-block__to-talk-to">
                              {{#if toTalkAvatar}}
                                  <img src="{{toTalkAvatar}}" alt="avatar"
                                       class="chat-text-block__to-talk-to-avatar">
                              {{/if}}
                              <span class="chat-text-block__to-talk-to-name">{{toTalkToName}}</span>
                          </div>
                          <div class="chat-text-block__user">
                              <span class="chat-text-block__user-name">{{ user.first_name }} {{ user.second_name }} </span>
                              {{{ goProfile }}}
                              {{{ exitButton }}}
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
          <div id="modal">
          </div>
      </div>
	`;
