import Block from '../../core/Block';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

interface ILinkProps extends PropsWithRouter {
	to: string;
	label: string;
	class?: string;
	events?: {
		click: () => void;
	};
}

class BaseLink extends Block {
	constructor(props: ILinkProps) {
		super({
			...props,
			events: {
				click: () => this.navigate(),
			},
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
