import LoginPage from './src/pages/login';
import Registration from './src/pages/registration';
import registrationAllComponents from './src/utils/registerComponents';
import Profile from './src/pages/userSettings';
import router from './src/core/Router';
import Messenger from './src/pages/messenger';
import ErrorPage from './src/pages/error';
import AuthController from './src/controllers/AuthController';
import './src/assets/css/index.scss';
import 'regenerator-runtime/runtime';

// require('dotenv').config();

registrationAllComponents();

export enum Routes {
	Login = '/',
	Register = '/register',
	Messenger = '/messenger',
	Profile = '/profile',
	error404 = '/404',
}

window.addEventListener('DOMContentLoaded', async () => {
	router
		.use(Routes.Login, LoginPage)
		.use(Routes.Register, Registration)
		.use(Routes.Messenger, Messenger)
		.use(Routes.Profile, Profile)
		.use(Routes.error404, ErrorPage)
		.start();

	AuthController.loggingCheck();
});
