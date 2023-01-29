import withStore from './withStore';

export const withUser = withStore((state) => ({ ...state.user }));
