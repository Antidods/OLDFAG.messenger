import Block, { Props } from '../../utils/Block';

export default class FormField extends Block {
	constructor(props: Props) {
		super({
			...props,

		});
	};

	render() {
		//language=hbs
		return `
        <div class='container_column_start' style='width: 100%'>
            <label for="{{name}}" class="login-form__field-label">{{label}}</label>
            {{{inputValidate
                    type=type
                    class="login-form__field-text"
                    id=name
                    name=name
                    value=value
                    required=0
            }}}
            <label for="{{name}}"
                   class="login-form__field-label login-form__field-label_no-valid">{{error}}
            </label>
        </div>
		`;
	}
}








