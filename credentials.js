import puppeteer from 'puppeteer';

async function takeScreenshot(url) {
    try {
        const browser = await puppeteer.launch({ headless: "false", userDataDir: `/Users/${process.env.MACHINE_NAME}}/Library/Application Support/Google/Chrome/Default'`});
        const page = await browser.newPage();
        await page.goto(url);
        return filename
    } catch (error) {
        console.log(error)
    }
}

await takeScreenshot()