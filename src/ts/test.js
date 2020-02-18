"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const capabilities = selenium_webdriver_1.Capabilities.chrome();
capabilities.set('chromeOptions', {
    args: [
        '--headless',
        '--disable-gpu',
        '--window-size=1024,768'
    ]
});
async function loginTest(email, password) {
    const driver = await new selenium_webdriver_1.Builder()
        .withCapabilities(capabilities)
        .build();
    try {
        await driver.get("https://www.dominos.jp/");
        await driver
            .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className("delivery button")), 5000)
            .sendKeys(selenium_webdriver_1.Key.RETURN);
        await driver
            .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id("login")), 5000)
            .sendKeys(selenium_webdriver_1.Key.RETURN);
        await driver
            .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id("email")), 5000)
            .sendKeys(email);
        await driver
            .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id("password")), 5000)
            .sendKeys(password, selenium_webdriver_1.Key.RETURN);
        let base64 = await driver.takeScreenshot();
        let buffer = Buffer.from(base64, "base64");
        await util_1.promisify(fs_1.default.writeFile)('screenshot.jpg', buffer);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        await driver.quit();
    }
}
console.log(process.argv);
const email = process.argv[2];
const password = process.argv[3];
loginTest(email, password);
//# sourceMappingURL=test.js.map