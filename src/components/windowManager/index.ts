import Block, {Props} from '../../utils/Block';

export default class windowManager extends Block {
    constructor(props: Props) {
        super(props);
    }



    render() {
         if (this.props.variation === "close") {
            return `
                    <div class="main-window__manager">
                        <button class="main-window__manager_close" id="main-window-close" onclick="this.closest('.main-window').classList.add('hidden')"></button>
                    </div>
                `;
        }


        return `
                    <div class="main-window__manager">
                        <button class="main-window__manager_minimize" id="main-window-minimize" onclick="console.log('Действие отсутствует')"></button>
                        <button class="main-window__manager_maximize" id="main-window-maximize" onclick="this.closest('.main-window').classList.toggle('full-screen')"></button>
                        <button class="main-window__manager_close" id="main-window-close" onclick="this.closest('.main-window').classList.add('hidden')"></button>
                    </div>
                `;

    }

}

