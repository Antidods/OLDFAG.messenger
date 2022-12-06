import {PAGES} from "./src/utils/pages";

// @ts-ignore
window.PAGES = PAGES;

document.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    window.PAGES.selectPage(window.PAGES.loginPage);
});
