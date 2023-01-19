import Block, { Props } from '../../utils/Block';

export default class Button extends Block {
	constructor(props: Props) {
		super({
			...props,
			events: {
				click: () => {
					props.onclick(this.props.events);
				},
			},
		});
	}

	render() {
		return `
            <button class="{{class}}"  value="{{value}}" form="{{form}}" type="{{type}}">{{label}} </button>
        `;
	}
}
