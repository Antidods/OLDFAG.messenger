import Block, { Props } from '../../core/Block';

export default class Span extends Block {
	constructor(props: Props) {
		super({
			...props,
		});
	}

	render() {
		// language=hbs
		return `
            <span 
										class="span {{ class }}" 
										style="
											{{#if max-width}}
													max-width: {{ max-width }};
											{{/if}}
											{{#if font-size}}
													font-size: {{ font-size }}px;
											{{/if}}			
										"
						>{{ text }}
						</span>
        `;
	}
}
