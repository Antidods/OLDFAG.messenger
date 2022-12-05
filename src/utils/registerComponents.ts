import Block from "./Block";
import Handlebars from 'handlebars';

import button from "../components/button";
import windowManager from "../components/windowManager";

export function registerComponent(name: string, Component: typeof Block):void {
    Handlebars.registerHelper(name, ({ data, hash }) => {
        const component: any = new Component(hash);
        if (!data.root.children) {

            data.root.children = {};
        }

        data.root.children[component._id] = component;
        return `<div data-id="${component._id}"></div>`;
    });
}

export const COMPONENTS = {
    windowManager,
    button,

}

export function registrationAllComponents(): void {
    Object.entries(COMPONENTS)
        .map(([key, value]: [string, any]) => {
            registerComponent(key, value);
        });
}


