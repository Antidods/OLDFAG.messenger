import Block, { Props } from '../../core/Block';
import Button from '../../components/button/index';
import ChatsController from '../../controllers/ChatsController';
import store from '../../core/Store';
import router from '../../core/Router';
import UserAdd from '../modal/userAdd/index';
import { checkFormValidity } from '../../utils/validator';
import UserController from '../../controllers/UserController';
import { IUser, IUserSearch } from '../../types';
import UserList from '../modal/userList';
import { template } from './template';
import ErrorModal from '../modal/error/index';

export default class ChatSettings extends Block {
	constructor(props: Props) {
		super({
			...props,
			selectedChatUsers: store.getState().selectedChatUsers,
		});
	}

	init() {
		const selectedChatId = store.getState().selectedChat as number;
		ChatsController.getChatUsers(selectedChatId);

		this.children.delete = new Button({
			label: 'Добавить пользователя',
			class: 'button button_big',
			onclick: () => {
				store.set('searchUserForAddingChat', null);
				router.setModal(UserAdd, {
					title: 'Добавить пользователя',
					description: ' Введите логин пользователя для добавления в чат',
					submit: () => {

						// @ts-ignore
						const form = document.forms.searchUser;

						const formData: unknown = checkFormValidity(form);
						if (form.dataset.valid === 'true') {
							const user: Promise<IUser[]> = UserController.searchUser(formData as IUserSearch);
							user.then((result) => {
								const userSearchId = result[0]?.id;

								if (!userSearchId) {
									router.setModal(ErrorModal, {
										title: 'Ошибка',
										error_message:
											'По вашему запросу не найдено пользователей, пожалуйста уточните запрос',
									});
								} else if (userSearchId) {
									ChatsController.addUser({
										id: userSearchId,
										chatId: selectedChatId as number,
									});
									console.log('Пользователь добавлен');
									router.closeAllModal();
								} else {
									console.log('Что то пошло не так');
								}
							});
						}
					},
				});
			},
		});

		this.children.userAdd = new Button({
			label: 'Удалить пользователя',
			class: 'button button_big',
			onclick: () => {
				const id = store.getState().selectedChat;
				ChatsController.getChatUsers(id!);
				const selectedChatUsers = store.getState().selectedChatUsers;
				router.setModal(UserList, {
					chatUsers: selectedChatUsers,
					title: 'Удалить пользователя',
					description: 'Выберите пользователя для удаления из чата',
					cancel: () => {
						router.closeModalById('userList');
					},
					delete: () => {
						ChatsController.getChatUsers(selectedChatId);
						// @ts-ignore
						const form: HTMLFormElement = document.forms.chatUsers;
						const formData = new FormData(form);
						let deleteUserId: string = '';
						for (let item of formData) {
							deleteUserId = item[1] as string;
						}
						ChatsController.deleteUser({
							userId: deleteUserId,
							chatId: selectedChatId,
						}).then(() => {
							router.closeAllModal();
						});
					},
				});
			},
		});

		this.children.userDell = new Button({
			label: 'Удалить чат',
			class: 'button button_big',
			onclick: async () => {
				const id = store.getState().selectedChat;
				await ChatsController.deleteChat(id!);
				store.set('chats', []);
				await ChatsController.getChats();
				router.closeAllModal();
				location.reload();
			},
		});
	}

	render() {
		// language=hbs
		return template;
	}
}
