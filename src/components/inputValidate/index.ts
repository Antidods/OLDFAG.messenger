import Block, { Props } from '../../utils/Block';
import { checkElementValidity } from '../../utils/validator';

export default class InputValidate extends Block {
	constructor(props: Props) {
		super({
			...props,
			events: {
				blur: () => {
					checkElementValidity(this.element);
				},
				focus: () => {
					checkElementValidity(this.element);
				}
			}
		});
	};

	render() {
		// language=hbs
		return `
        <input
                type="{{type}}"
                class="{{class}}"
                id="{{id}}"
            {{#if name}}
                name="{{name}}"
            {{/if}}
                value="{{value}}"
            {{#if required}}
                required
            {{/if}}
            {{#if pattern}}
                pattern="{{pattern}}"
            {{/if}}
                data-valid=false
        >
		`;
	}
}








