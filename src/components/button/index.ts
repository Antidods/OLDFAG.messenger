import Block, {Props} from '../../utils/Block';

export default class button extends Block {
    constructor(props: Props) {
        super({
            label: props.label,
            class: props.class,
            value: props.value,

        });
    }

    render() {

        return `
            <button class="{{class}}"  value="{{value}}" >{{label}}</button>
        `
    };

}

