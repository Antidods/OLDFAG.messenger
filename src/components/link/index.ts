import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

interface LinkProps extends PropsWithRouter {
	to: string;
	label: string;
	class?: string;
	events?: {
		click: () => void;
	};
}

class BaseLink extends Block {
	constructor(props: LinkProps) {
		super({
			...props,
			events: {
				click: () => this.navigate()
			}
		});
	}

	navigate() {
		this.props.router.go(this.props.to);
	}

	render() {
		// language=hbs
		return `
        <span class="{{ class }}">{{ label }}</span>
		`;
	}


}

export const Link = withRouter(BaseLink);







