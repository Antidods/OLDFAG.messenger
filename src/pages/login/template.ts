export const template =
	// language=hbs
	`
      <div class="main-window main-window_login-form">
          <header class="main-window__top-line main-window__top-line_login-form">
              <h1>Вход</h1>
              {{{windowManager variation="close" }}}
          </header>
          <main class="container_column_center" style="padding: 40px">
              <div class="logo"></div>
              <form
                      class="login-form container_column_start"
                      id="loginForm"
                      name="loginForm"
                      data-valid="false"
              >
                  {{{login}}}
                  {{{password}}}
                  <div class="container_row_between" style="width: 300px">
                      {{{linkRegistartion}}}
                      {{{button class="button" label="Вход" form="loginForm" onclick=submit}}}
                  </div>
              </form>
          </main>
      </div>
	`;
