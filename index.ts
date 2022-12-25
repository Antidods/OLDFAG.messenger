import PAGES from './src/utils/pages';
import Router from './src/utils/Router';
import LoginPage from './src/pages/login';
import Registration from './src/pages/registration';
import Chat from './src/pages/chat';

// @ts-ignore
window.PAGES = PAGES;

enum Routes {
	Login = '/',
	Register = '/register',
	Chat = '/chat'
}

// window.addEventListener('DOMContentLoaded', async () => {
// 	Router
// 		.use(Routes.Index, LoginPage)
// 		.use(Routes.Register, RegisterPage)
// 		.use(Routes.Profile, ProfilePage)
//
// 	let isProtectedRoute = true;
//
// 	switch (window.location.pathname) {
// 		case Routes.Index:
// 		case Routes.Register:
// 			isProtectedRoute = false;
// 			break;
// 	}
//
// 	try {
// 		await AuthController.fetchUser();
//
// 		Router.start();
//
// 		if (!isProtectedRoute) {
// 			Router.go(Routes.Profile)
// 		}
// 	} catch (e) {
// 		Router.start();
//
// 		if (isProtectedRoute) {
// 			Router.go(Routes.Index);
// 		}
// 	}
//
// });

document.addEventListener('DOMContentLoaded', () => {
	Router
		.use(Routes.Login, LoginPage)
		.use(Routes.Register, Registration)
		.use(Routes.Chat, Chat)
		.start();


	// @ts-ignore
	// window.PAGES.selectPage(window.PAGES.loginPage);
});
