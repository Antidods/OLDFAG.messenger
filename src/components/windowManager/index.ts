import Block, { Props } from '../../core/Block';

export default class WindowManager extends Block {
	constructor(props: Props) {
		super({
			...props
		});
	}

	render() {
		if (this.props.variation === 'close') {
			// language=hbs
			return `
          <div class="main-window__manager" data-testid="window-manager">
              <button class="main-window__manager_close" id="main-window-close"
                      onclick="{
                                try {
                                  this.closest('.main-window')?.classList.add('hidden');                             
                                	this.closest('.modal-cover')?.remove();
                                } catch (e) {
																	console.log(e)                                  
                                }
                      }"
              >
              </button>
          </div>
			`;
		}

		// language=hbs
		return `
        <div class="main-window__manager">
            <button class="main-window__manager_minimize" id="main-window-minimize"
                    onclick="console.log('Действие отсутствует')"></button>
            <button class="main-window__manager_maximize" id="main-window-maximize"
                    onclick="this.closest('.main-window').classList.toggle('full-screen')"></button>
            <button class="main-window__manager_close" id="main-window-close"
                    onclick="{
                                try {
                                  this.closest('.main-window')?.classList.add('hidden');                             
                                	this.closest('.modal-cover')?.remove();
                                } catch (e) {
																	console.log(e)                                  
                                }
                    }"
            >
            </button>
        </div>
		`;
	}
}
