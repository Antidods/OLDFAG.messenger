import withStore from './withStore';

export const withSelectedChat = withStore((state) => ({
	// @ts-ignore
	selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));
