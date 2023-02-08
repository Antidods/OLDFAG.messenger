import Block, { Props } from '../../core/Block';
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
					const input: Element | null = this.element;
					let timeout: any;
					input?.addEventListener('keypress', () => {
						clearTimeout(timeout);
						timeout = setTimeout(() => {
							checkElementValidity(this.element);
						}, 800);
					});
				},
			},
		});
	}

	public setValue(value: string) {
		(this.element as HTMLInputElement).value = value;
	}

	public getName() {
		return (this.element as HTMLInputElement).name;
	}

	public getValue() {
		return (this.element as HTMLInputElement).value;
	}

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
                placeholder="{{placeholder}}"
            {{#if required}}
                required
            {{/if}}
            {{#if pattern}}
                pattern="{{pattern}}"
            {{/if}}
                data-valid=false
            {{#if disabled}}
                disabled
            {{/if}}
        >
		`;
	}
}
