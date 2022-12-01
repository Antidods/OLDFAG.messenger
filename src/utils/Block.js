"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// @ts-ignore
var EventBus_1 = require("./EventBus");
var nanoid_1 = require("nanoid");
var Block = /** @class */ (function () {
    function Block(tagName, propsWithChildren) {
        if (tagName === void 0) { tagName = 'div'; }
        if (propsWithChildren === void 0) { propsWithChildren = {}; }
        var _this = this;
        this.id = (0, nanoid_1.nanoid)(6);
        this._element = null;
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this.props, nextProps);
        };
        var eventBus = new EventBus_1.EventBus();
        var _a = this._getChildrenAndProps(propsWithChildren), props = _a.props, children = _a.children;
        this._meta = {
            tagName: tagName,
            props: props
        };
        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = function () { return eventBus; };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    Block.prototype._getChildrenAndProps = function (childrenAndProps) {
        var props = {};
        var children = {};
        Object.entries(childrenAndProps).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value instanceof Block) {
                children[key] = value;
            }
            else {
                props[key] = value;
            }
        });
        return { props: props, children: children };
    };
    Block.prototype._addEvents = function () {
        var _this = this;
        var _a = this.props.events, events = _a === void 0 ? {} : _a;
        Object.keys(events).forEach(function (eventName) {
            var _a;
            (_a = _this._element) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, events[eventName]);
        });
    };
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };
    Block.prototype._createResources = function () {
        var tagName = this._meta.tagName;
        this._element = this._createDocumentElement(tagName);
    };
    Block.prototype._init = function () {
        this._createResources();
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    Block.prototype.init = function () {
    };
    ;
    Block.prototype._componentDidMount = function () {
        this.componentDidMount();
    };
    Block.prototype.componentDidMount = function () {
    };
    Block.prototype.dispatchComponentDidMount = function () {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        Object.values(this.children).forEach(function (child) { return child.dispatchComponentDidMount(); });
    };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    };
    // @ts-ignore
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        return true;
    };
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._render = function () {
        var fragment = this.render();
        this._element.innerHTML = '';
        this._element.append(fragment);
        this._addEvents();
    };
    Block.prototype.compile = function (template, context) {
        var contextAndStubs = __assign({}, context);
        Object.entries(this.children).forEach(function (_a) {
            var name = _a[0], component = _a[1];
            contextAndStubs[name] = "<div data-id=\"".concat(component.id, "\"></div>");
        });
        var html = template(contextAndStubs);
        var temp = document.createElement('template');
        temp.innerHTML = html;
        Object.entries(this.children).forEach(function (_a) {
            var _b;
            var _ = _a[0], component = _a[1];
            var stub = temp.content.querySelector("[data-id=\"".concat(component.id, "\"]"));
            if (!stub) {
                return;
            }
            (_b = component.getContent()) === null || _b === void 0 ? void 0 : _b.append.apply(_b, Array.from(stub.childNodes));
            stub.replaceWith(component.getContent());
        });
        return temp.content;
    };
    Block.prototype.render = function () {
        return new DocumentFragment();
    };
    Block.prototype.getContent = function () {
        return this.element;
    };
    Block.prototype._makePropsProxy = function (props) {
        var self = this;
        return new Proxy(props, {
            get: function (target, prop) {
                var value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: function (target, prop, value) {
                var oldTarget = __assign({}, target);
                target[prop] = value;
                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: function () {
                throw new Error('Нет доступа');
            }
        });
    };
    Block.prototype._createDocumentElement = function (tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    };
    Block.prototype.show = function () {
        this.getContent().style.display = 'block';
    };
    Block.prototype.hide = function () {
        this.getContent().style.display = 'none';
    };
    Block.EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };
    return Block;
}());
exports["default"] = Block;
