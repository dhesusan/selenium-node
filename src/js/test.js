const fs = require("fs");
const { promisify } = require("util");
const { Builder, By, Capabilities, Key, until} = require('selenium-webdriver');
const capabilities = Capabilities.chrome();

capabilities.set('chromeOptions', {
    args:[
        //'--headless',
        '--disable-gpu',
        '--window-size=1024,768'
    ]
});

const loginTest = async (email, password) => {
    const driver = await new Builder()
        .withCapabilities(capabilities)
        .build();
    try {
        await driver.get("https://www.dominos.jp/");
        await driver
            .wait(until.elementLocated(By.className("delivery button")), 5000)
            .sendKeys(Key.RETURN);
        await driver
            .wait(until.elementLocated(By.id("login")), 5000)
            .sendKeys(Key.RETURN);
        await driver
            .wait(until.elementLocated(By.id("email")), 5000)
            .sendKeys(email);
        await driver
            .wait(until.elementLocated(By.id("password")), 5000)
            .sendKeys(password, Key.RETURN);
        let base64 = await driver
            .takeScreenshot();
        let buffer = Buffer.from(base64, "base64");
        await promisify(fs.writeFile)('screenshot.jpg', buffer)
    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
};

//Debug用でコマンドライン引数でメールアドレスとパスワードを渡す
console.log(process.argv);
const email = process.argv[2];
const password = process.argv[3];

loginTest(email, password);
//export {loginTest};