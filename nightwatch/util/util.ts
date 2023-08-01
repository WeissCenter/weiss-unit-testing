import { NightwatchBrowser } from "nightwatch";


export async function getPageComponents(browser: NightwatchBrowser, KEY: string){

    const pageComponents = await browser.elements('css selector', '.page-component');

    return Promise.all(pageComponents.map(async (component) => {

        const ele = await browser.elementIdElement(component[KEY], 'css selector', ':nth-child(1)');

        return await browser.elementIdName(ele[KEY]);

    }))

}