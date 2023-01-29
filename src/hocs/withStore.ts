import store, { IState, StoreEvents } from '../utils/Store';
import { isEqual } from '../utils/helpers';
import { Props } from '../utils/Block';

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

// const withStore =
// 	(mapStateToProps: (state: IState) => Record<string, unknown>) => (Component: typeof Block) => {
// 		let state: Record<string, unknown>;
//
// 		return class extends Component {
// 			constructor(props: Record<string, unknown>) {
// 				state = mapStateToProps(store.getState());
//
// 				super({ ...props, ...state });
//
// 				store.on(StoreEvents.Updated, () => {
// 					const newState = mapStateToProps(store.getState());
//
// 					if (!isEqual(state, newState)) {
// 						this.setProps({
// 							...newState,
// 						});
// 					}
// 				});
// 			}
// 		};
// 	};
//
// export default withStore;
