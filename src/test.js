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
        await driver.get("https://internetorder.dominos.jp/estore/ja/Login");
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
console.log(process.argv)
email = process.argv[2]
password = process.argv[3]

loginTest(email, password);
//export {loginTest};