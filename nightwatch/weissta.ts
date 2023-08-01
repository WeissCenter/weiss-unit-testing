import  assert  from "assert";
import { ELEMENT_KEY } from "nightwatch";
import { getPageComponents } from "./util/util";

const KEY = ELEMENT_KEY ?? 'element-6066-11e4-a52e-4f735466cecf'
const devRootURL = 'http://localhost:4200/'
const prodRootURL = 'https://www.weissta.org/'
const qaRootURL = 'https://qa.weissta.org/'

const rootURL = qaRootURL;

describe('WeissTA', function() {
    this.tags = ['demo'];
  
    before(browser => browser.navigateTo(rootURL));

    it('Test Title', function(browser) {
        browser
          .waitForElementVisible('body')
          .assert.titleContains('Home | Rhonda Weiss Center for Accessible IDEA Data')
      });
  
    it('Test Header', async (browser) => {
    
      browser
        .waitForElementVisible('body')
        .assert.visible('.header-wrapper', 'Verify header is visible')
        .assert.visible('.skip-to-content-link', 'Verify skip link is visible')
        .assert.elementsCount('.header-top-section>nav>ul>li', 5, 'Verify there is 4 links in the header')
        .assert.attributeEquals('.header-top-section-logo>img', 'alt', 'Rhonda Weiss Center for Accessible IDEA Data', 'Verify header logo has alt text')


        const validLinks = [
            {label: 'Home', path: ''},
            {label: 'About', path: 'about'},
            {label: 'Events', path: 'events'},
            {label: 'Resources', path: 'resources'},
            {label: 'Newsletter', path: 'newsletter'},
        ]

         const headerLinks = await browser.elements('css selector', '.header-top-section>nav>ul>li>a')

        
         for(const link of headerLinks){
           
           const [txt, href] = await Promise.all([browser.elementIdText(link[KEY]), browser.elementIdProperty(link[KEY], 'href')])

            browser
            .assert.equal(validLinks.some((valid) => valid.label === txt && `${rootURL}${valid.path}` === href), true, `Validate ${txt} is a valid header link`)
         }

    
    });

    it('Test Home Page Components', async (browser) => {

        const homePageComponents = ['gwrk-home-hero', 'gwrk-four-by-one-content-section', 'gwrk-sub-image-header', 'gwrk-sub-image-header', 'gwrk-newsletter-signup']
        
        const pageComponents = await getPageComponents(browser, KEY);


        browser.assert.equal(homePageComponents.every((valid) => pageComponents.includes(valid)), true, 'Verify the correct home page components exist')

    });

    it('Test Home Page a11y', (browser) => {
        browser
        .waitForElementVisible('body')
        .axeInject()
        .axeRun('body');
    })


    it('Test About Page Components', async (browser) => {

        const homePageComponents = ['gwrk-about-page-header', 'gwrk-logo-section', 'gwrk-sub-image-header', 'gwrk-columnar-text-content-section', 'gwrk-columnar-text-content-section', 'gwrk-columnar-text-content-section', 'gwrk-image', 'gwrk-promo-bar']
        

        browser
        .url(`${rootURL}about`)
        .waitForElementVisible('.page-main-content')

        const pageComponents = await getPageComponents(browser, KEY);

        browser.assert.equal(homePageComponents.every((valid) => pageComponents.includes(valid)), true, 'Verify the correct about page components exist')

    })

    it('Test About Page Title', (browser) => {
        browser
        .waitForElementVisible('body')
        .assert.titleContains('About Us | Rhonda Weiss Center for Accessible IDEA Data')
    })

    it('Test About Page a11y', (browser) => {
        browser
        .waitForElementVisible('body')
        .axeInject()
        .axeRun('body');
    })


    it('Test Events Page Components', async (browser) => {

        const homePageComponents = ['gwrk-about-page-header', 'gwrk-events']
        

        browser
        .url(`${rootURL}events`)
        .waitForElementVisible('.page-main-content')

        const pageComponents = await getPageComponents(browser, KEY);

        browser.assert.equal(homePageComponents.every((valid) => pageComponents.includes(valid)), true, 'Verify the correct events page components exist')

    })


  
    after(browser => browser.end());
  });
  