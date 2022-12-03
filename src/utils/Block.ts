import {EventBus} from "./EventBus";
import {nanoid} from 'nanoid';


export type Props = {
    [key: string]: any | Block;
    children?: Children;
    events?: Record<string, (...args: any) => void>;
};
export type Children = Record<string, Block>;

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;

    public id = nanoid(6);
    protected props: Props;
    public children: Children;
    private eventBus: () => EventBus;
    private _element: any = null;
    // @ts-ignore
    private _meta: { props: P; tagName?: string };

    protected constructor(propsWithChildren: Props, tagName?: string) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrenAndProps(propsWithChildren);

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

    private _getChildrenAndProps(childrenAndProps: Props): { props: Props, children: Children } {
        const props: Record<string, unknown> = {};
        const children: Children = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return {props: props as Props, children};
    }

    private _addEvents() {
        const {events = {}} = this.props as Props & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
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
        const {tagName} = this._meta;
        this._element = (this._meta.tagName) ? this._createDocumentElement(tagName) : new DocumentFragment();
    }

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

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: Props, newProps: Props) {
        return true;
    }

    protected setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();
        if (this._element.tagName) {
            this._element!.innerHTML = '';
            this._element!.append(fragment);
        } else {
            this._element = fragment.firstElementChild as HTMLElement;
            const newElement = fragment.firstElementChild as HTMLElement;
            this._element = newElement;
        }

        this._addEvents();
    }

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = {...context};

        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        });
        return temp.content;
    }

    public render(): DocumentFragment {
        return new DocumentFragment();
    }

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: Props) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = {...target}

                target[prop as keyof Props] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    private _createDocumentElement(tagName?: string) {
        if (tagName) {
            return document.createElement(tagName);
        }
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

export default Block;
