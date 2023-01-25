import LoginPage from './src/pages/login';
import Registration from './src/pages/registration';
import registrationAllComponents from './src/utils/registerComponents';
import Profile from './src/pages/userSettings';
import router from './src/utils/Router';
import Messenger from './src/pages/messenger';
import ErrorPage from './src/pages/error';
import  AuthController  from './src/controllers/AuthController';

registrationAllComponents();


export enum Routes {
	Login = '/',
	Register = '/register',
	Messenger = '/messenger',
	Profile = '/profile',
	error404 = '/404'
}

window.addEventListener('DOMContentLoaded', async () => {
	router
		.use(Routes.Login, LoginPage)
		.use(Routes.Register, Registration)
		.use(Routes.Messenger, Messenger)
		.use(Routes.Profile, Profile)
		.use(Routes.error404, ErrorPage);

AuthController.loggingCheck();
	// let isProtectedRoute = true;
	// let currentPages = window.location.pathname;
	//
	// switch (currentPages) {
	// 	case Routes.Login:
	// 	case Routes.Register:
	// 		isProtectedRoute = false;
	// 		break;
	// }
	//
	//
	// try {
	// 	await AuthController.loggingCheck();
	// 	router.start();
	//
	// 	if (!isProtectedRoute) {
	// 		router.go(Routes.Messenger);
	// 	}
	// } catch (e) {
	// 	router.start();
	//
	// 	if (isProtectedRoute) {
	// 		router.go(Routes.Login);
	// 	}
	// }
});
