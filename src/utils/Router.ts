import Block, { Props } from './Block';
import { isEqual } from './helpers';

function render(query: string, block: Block) {
	const root: Element | null = document.querySelector(query);

	if (root === null) {
		throw new Error(`root not found by selector "${query}"`);
	}

	root.innerHTML = '';

	root.append(block.getContent()!);

	return root;
}

function setModal(query: string, modal: Block): void {
	const root: Element | null = document.querySelector(query);

	if (root === null) {
		throw new Error(`root not found by selector "${query}"`);
	}

	root.append(modal.getContent()!);
}

class Route {
	private block: Block | null = null;

	constructor(
		private pathname: string,
		private readonly BlockClass: typeof Block,
		private readonly query: string
	) {}

	leave() {
		this.block = null;
	}

	match(pathname: string) {
		return isEqual(pathname, this.pathname);
	}

	render() {
		if (!this.block) {
			this.block = new this.BlockClass({});

			render(this.query, this.block);
		}
	}
}

class Router {
	private static __instance: Router;

	private routes: Route[] = [];

	private currentRoute: Route | null = null;

	private history = window.history;

	constructor(private readonly rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];

		Router.__instance = this;
	}

	public use(pathname: string, block: typeof Block | any) {
		const route = new Route(pathname, block, this.rootQuery);
		this.routes.push(route);

		return this;
	}

	public start(): void {
		// Регистрация события PopSate(событие перехода по страницам)
		window.onpopstate = (event: PopStateEvent) => {
			const target = event.currentTarget as Window;

			this._onRoute(target.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	private _onRoute(pathname: string) {
		const route = this._getRoute(pathname);

		// TODO Добавить 404
		if (!route) {
			this.go('/404')
			return;
		}

		if (this.currentRoute && this.currentRoute !== route) {
			this.currentRoute.leave();
		}

		this.currentRoute = route;

		route.render();


	}


	public setModal(Modal: any, props?: Props): void {
		const query: string = this.rootQuery;
		const modal = <Block>new Modal({ ...props });

		setModal(query, modal);
	}

	public closeAllModal(): void {
		const modal = document.querySelectorAll('.modal-cover');
		modal.forEach((item: Element) => {
			item.remove();
		});
	}

	public closeModalById(id: string): void {
		const modal: Element | null = document.getElementById(id);
		if (!modal) {
			console.log(`Модальное окно с id ${id} не найдено`);
		}
		modal?.remove();
	}

	public go(pathname: string): void {
		// Записываем в историю
		this.history.pushState({}, '', pathname);

		this._onRoute(pathname);
	}

	public back(): void {
		this.history.back();
	}

	public forward(): void {
		this.history.forward();
	}

	private _getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname));
	}
}

export default new Router('#app');
