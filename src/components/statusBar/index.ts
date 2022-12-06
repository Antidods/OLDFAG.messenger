import Block, {Props} from '../../utils/Block';


export default class statusBar extends Block {
    constructor(props: Props) {
        super({...props});
    }

    render() {
        //language=hbs
        return `
            <div class="status-bar">
                <div class="status-bar__container">
                    <div class="status-bar__section"></div>
                    <div class="status-bar__section"></div>
                </div>
                <div class="status-bar__section"></div>
            </div>
        `;
    };

}

