import store, { StoreEvents } from '../utils/Store';
import { isEqual } from '../utils/helpers';
import { Props } from '../utils/Block';

export default function witchStore(mapSateToProps: (sate: any) => any) {
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
