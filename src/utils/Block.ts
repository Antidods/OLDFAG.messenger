import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';
import { isEqual } from './helpers';

export type Props = {
	[key: string]: any | Block;
	children?: Children;
	events?: Record<string, (...args: any) => void>;
};
export type Children = Record<string, Block>;

class Block<P extends Record<string, any> = any> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render'
	} as const;

	private _id: string = nanoid(6);

	public id = this._id;

	protected props: P;

	public children: Record<string, Block | Block[]>;

	private eventBus: () => EventBus;

	private _element: HTMLElement | null = null;

	// @ts-ignore
	private _meta: { props: P; tagName?: string };

	public constructor(propsWithChildren: P, tagName?: string) {
		const eventBus = new EventBus();

		const { props, children } = this._getChildrenAndProps(propsWithChildren);

		this._meta = {
			props,
			tagName
		};

		this.children = children;
		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	// Определяем, что является компонентом
	private _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
		const props: Record<string, unknown> = {};
		const children: Record<string, Block | Block[]> = {};

		Object.entries(childrenAndProps).forEach(([key, value]) => {
			if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
				children[key as string] = value;
			} else if (value instanceof Block) {
				children[key as string] = value;
			} else {
				props[key] = value;
			}
		});

		return { props: props as P, children };
	}

	private _addEvents() {
		const { events = {} } = this.props as P & {
			events: Record<string, () => void>;
		};

		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
	}

	// Создаёт элемент обёртку и вызывает событие FLOW_RENDER
	private _init() {
		this._createResources();
		this.init();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init() {
	}

	private _componentDidMount() {
		this.componentDidMount();
	}

	protected componentDidMount() {
	}

	// Событие вызывается снаружи, т.к. объект сам не сможет определить,
	// что он появился на странице
	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

		Object.values(this.children).forEach(child => {
			if (Array.isArray(child)) {
				child.forEach(ch => ch.dispatchComponentDidMount());
			} else {
				child.dispatchComponentDidMount();
			}
		});
	}

	private _componentDidUpdate(oldProps: P, newProps: P) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	protected componentDidUpdate(oldProps: P | undefined, newProps: P | undefined) {
		return isEqual(oldProps, newProps);
	}


	public setProps = (nextProps: P) => {
		if (!nextProps) {
			return;
		}
		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	private _render() {
		const template = this.render();
		const fragment = this.compile(template, {
			...this.props,
			children: this.children
		});
		const newElement = fragment.firstElementChild as HTMLElement;
		this._element?.replaceWith(newElement);
		this._element = newElement;
		this._addEvents();
	}

	protected compile(template: string, context: any) {
		const contextAndStubs = { ...context };
		Object.entries(this.children).forEach(([name, component]) => {
			if (Array.isArray(component)) {
				contextAndStubs[name] = component.map(child => `<div data-id='${child.id}'></div>`);
			} else {
				contextAndStubs[name] = `<div data-id='${component.id}'></div>`;
			}
		});
		const compiled = Handlebars.compile(template);
		const temp = document.createElement('template');
		temp.innerHTML = compiled(contextAndStubs);
		const replaceStub = (component: Block) => {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

			if (!stub) {
				return;
			}

			component.getContent()?.append(...Array.from(stub.childNodes));

			stub.replaceWith(component.getContent()!);
		};

		Object.entries(this.children).forEach(([_, component]) => {
			if (Array.isArray(component)) {
				component.forEach(replaceStub);
			} else {
				replaceStub(component);
			}
		});

		return temp.content;
	}

	// Переопределяется наследниками, этот метод должен вернуть разметку
	protected render() {
		return '';
	}

	public getContent() {
		return this.element;
	}

	private _makePropsProxy(props: P) {
		const self = this;

		return new Proxy(props, {
			get(target, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop: string, value) {
				const oldTarget = { ...target };

				target[prop as keyof P] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			}
		});
	}

	show() {
		this.getContent()!.style.display = 'block';
	}

	hide() {
		this.getContent()!.style.display = 'none';
	}
}

export default Block;
