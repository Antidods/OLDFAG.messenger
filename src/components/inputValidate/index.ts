import Block, { Props } from '../../core/Block';
import { checkElementValidity, checkValueValidity } from '../../utils/validator';

export default class InputValidate extends Block {
	constructor(props: Props) {
		super({
			...props,
			events: {
				blur: () => {
					checkElementValidity(this.element as HTMLInputElement);
				},
				focus: () => {
					const input: HTMLInputElement = this.element as HTMLInputElement;
					let timeout: any;
					input?.addEventListener('keypress', () => {
						clearTimeout(timeout);
						timeout = setTimeout(() => {
							checkElementValidity(input);
						}, 800);
					});
				}
			}
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

	public getValidateStatus(): boolean {
		const elem = this.element as HTMLInputElement;

		return checkValueValidity(elem.name, elem.value).validateStatus
	}


	render() {
		// TODO: добавить подстановку autocomplete
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
