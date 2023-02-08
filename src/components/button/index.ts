import Block, { Props } from '../../core/Block';

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
		// language=hbs
		return `
            <button class="{{class}}"  value="{{value}}" form="{{form}}" type="{{type}}">{{label}} </button>
        `;
	}
}
