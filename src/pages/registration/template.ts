export const template =
	// language=hbs
	`
      <div class="main-window">
          <header class="main-window__top-line">
              <h1>Регистрация</h1>
              {{{windowManager variation="close"}}}
          </header>
          <main class="container_column_start" style="padding: 40px">
              <div class="logo"></div>
              <form
                      class="login-form container_column_start"
                      id="registrationForm"
                      name="registrationForm"
                      data-valid="false"
              >
                  {{{firstName}}}
                  {{{secondName}}}
                  {{{login}}}
                  {{{email}}}
                  {{{phone}}}
                  {{{password}}}
                  {{{secondPassword}}}
                  <div class="container_row_end" style="width: 300px">
                      {{{button
                              class="button"
                              label="Регистрация"
                              form="registrationForm"
                              onclick=submit
                      }}}
                  </div>
              </form>
          </main>
      </div>
	`;
