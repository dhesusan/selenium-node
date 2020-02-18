import {
  Builder,
  By,
  Capabilities,
  Key,
  until,
  WebDriver
} from "selenium-webdriver";
import fs from "fs";
import { promisify } from "util";
const capabilities: Capabilities = Capabilities.chrome();
capabilities.set("chromeOptions", {
  args: ["--headless", "--disable-gpu", "--window-size=1024,768"]
});

async function loginTest(email: string, password: string): Promise<void> {
  const driver: WebDriver = await new Builder()
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
    let base64 = await driver.takeScreenshot();
    let buffer: Buffer = Buffer.from(base64, "base64");
    await promisify(fs.writeFile)("screenshot.jpg", buffer);
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

console.log(process.argv);
const email: string = process.argv[2];
const password: string = process.argv[3];

loginTest(email, password);
