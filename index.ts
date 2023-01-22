import LoginPage from './src/pages/login';
import Registration from './src/pages/registration';
import Chat from './src/pages/messenger';
import AuthController from './src/controllers/AuthController';
import registrationAllComponents from './src/utils/registerComponents';
import Profile from './src/pages/userSettings';
import router from './src/utils/Router';
import UserController from './src/controllers/UserController';

registrationAllComponents();

enum Routes {
	Login = '/',
	Register = '/register',
	Chat = '/chat',
	Profile = '/profile',
}

window.addEventListener('DOMContentLoaded', async () => {
	router
		.use(Routes.Login, LoginPage)
		.use(Routes.Register, Registration)
		.use(Routes.Chat, Chat)
		.use(Routes.Profile, Profile);
	router.start();

	try {
		await AuthController.fetchUser();
		UserController.lockEditProfile(true);
		router.go(Routes.Chat);
	} catch (e) {
		router.go(Routes.Login);
	}

	// let isProtectedRoute = true;
	//
	// switch (window.location.pathname) {
	// 	case Routes.Login:
	// 	case Routes.Register:
	// 		isProtectedRoute = false;
	// 		break;
	// }
	//
	// try {
	// 	await AuthController.fetchUser();
	//
	// 	Router.start();
	//
	// 	if (!isProtectedRoute) {
	// 		Router.go(Routes.Chat);
	// 	}
	// } catch (e) {
	// 	Router.start();
	//
	// 	if (isProtectedRoute) {
	// 		Router.go(Routes.Login);
	// 	}
	// }
});
