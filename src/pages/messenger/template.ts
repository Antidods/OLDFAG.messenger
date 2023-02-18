export const template =
	// language=hbs
	`
      <div class="main-window main-window_chat" id="main-window">
          <div class="main-window__top-line">
              <h1>OLDFAG.messenger</h1>
              {{{ windowManager }}}
          </div>
          <div class="main-window__spacer"></div>
          <main>
              {{{chatList}}}
              <div class="chat">
                  <div class="chat-text-block">
                      <div class="chat-text-block__top-bar">
                          {{{ selectedChatInfo }}}
                          <div class="chat-text-block__user">
                              <span class="chat-text-block__user-name">{{ user.first_name }} {{ user.second_name }} </span>
                              {{{ goProfile }}}
                              {{{ exitButton }}}
                          </div>
                          <div class="chat-text-block__spacer"></div>
                      </div>
                      {{{ messenger }}}
                  </div>
                  <form class="chat-send-block" onsubmit="return false">
                      <button class="chat-send-block__clip" hidden></button>
                      {{{ inputMessage }}}
                      {{{ buttonSubmit }}}
                  </form>
              </div>
          </main>
          <footer>
              {{{ statusBar }}}
          </footer>
          <div id="modal">
          </div>
      </div>
	`;
