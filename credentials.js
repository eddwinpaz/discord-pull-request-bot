import puppeteer from 'puppeteer';

async function takeScreenshot(url) {
    try {
        const url = "https://dev.azure.com/MetLife-Global/Chile%20Digital%20Customer/_git/metlifecl_dc_adn_ts_react_web_svc/pullrequests?_a=active";
        const browser = await puppeteer.launch({ headless: false, userDataDir: `/Users/${process.env.MACHINE_NAME}/Library/Application Support/Google/Chrome/Default'`});
        const page = await browser.newPage();
        await page.goto(url);
    } catch (error) {
        console.log(error)
    }
}

await takeScreenshot()