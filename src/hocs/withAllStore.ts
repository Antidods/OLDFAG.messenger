import withStore from './withStore';

export const withAllStore = withStore((state) => ({ ...state }));
