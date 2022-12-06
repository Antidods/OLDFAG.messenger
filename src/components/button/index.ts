import Block, {Props} from '../../utils/Block';


export default class button extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (event: Event) => {
                    props.onclick(this, props, event);
                },
            },


        });
    }

    render() {

        return `
            <button class="{{class}}"  value="{{value}}" form="{{form}}" type="{{type}}">{{label}} </button>
        `
    };

}

