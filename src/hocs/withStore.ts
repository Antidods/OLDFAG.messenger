import store, { StoreEvents } from '../core/Store';
import { isEqual } from '../utils/helpers';
import { Props } from '../core/Block';
import { IState } from '../types';

export default function withStore(mapSateToProps: (sate: IState) => Record<string, unknown>) {
	return function wrap(Component: any) {
		let currentState: Record<string, unknown>;

		return class witchStore extends Component {
			constructor(props: Props) {
				const state = store.getState();
				currentState = mapSateToProps(state);

				super({ ...props, ...currentState });

				store.on(StoreEvents.Updated, () => {
					const state = store.getState();

					const propsFromState = mapSateToProps(state);

					if (!isEqual(currentState, propsFromState)) {
						this.setProps({ ...propsFromState });
					}
				});
			}
		};
	};
}
