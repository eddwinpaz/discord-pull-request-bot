import puppeteer from 'puppeteer';
import { Client, GatewayIntentBits, AttachmentBuilder } from 'discord.js';
import crypto from 'crypto'
import fs from 'fs/promises'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.TOKEN

const IMAGE_PATH = "/Users/lpaz/Desktop/discord/"
const BROWSER_PATH="/Users/lpaz/Library/Application Support/Google/Chrome/Default"

async function takeScreenshot(url) {
    try {
        const filename = `screen_${crypto.randomBytes(16).toString('hex')}.png`
        const browser = await puppeteer.launch({ headless: "true", userDataDir: BROWSER_PATH });
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: filename });
        await browser.close();
        return filename

    } catch (error) {
        console.log(error)
    }
}

async function clickElementByXPath(url, selector, buttonText) {

    const browser = await puppeteer.launch({ headless: "true", userDataDir: BROWSER_PATH });
    const page = await browser.newPage();
    await page.goto(url);
    const elements = await page.$$(selector);
    for (let element of elements) {
        const text = await page.evaluate(el => el.textContent, element);
        if (text.includes(buttonText)) {
            await element.click();
            break;
        }
    }
    await browser.close();
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'pr-front') {
        await interaction.deferReply()
        try {
            const url = "https://dev.azure.com/MetLife-Global/Chile%20Digital%20Customer/_git/metlifecl_dc_adn_ts_react_web_svc/pullrequests?_a=active";
            const screenshot = await takeScreenshot(url);
            const file = `${IMAGE_PATH}${screenshot}`
            const attachment = new AttachmentBuilder(file, { name: screenshot });
            await interaction.editReply({ content: 'Tuve que convertirme en kevin mitnick por un momento, para entrar a la VPN y traer tus PRs, Aqui estan. (Frontend Pull Requests) ', files: [attachment] });
            await fs.unlink(file)
        } catch (error) {
            console.log(error);
            await interaction.editReply('Sorry, there was an error taking a screenshot of that URL.');
        }
    }

    if (interaction.commandName === 'pr-back') {
        await interaction.deferReply()
        try {
            const url = "https://dev.azure.com/MetLife-Global/Chile%20Digital%20Customer/_git/metlifecl_dc_adn_ts_nestjs_api_svc/pullrequest/pullrequests?_a=active";
            const screenshot = await takeScreenshot(url);
            const file = `${IMAGE_PATH}${screenshot}`
            const attachment = new AttachmentBuilder(file, { name: screenshot });
            await interaction.editReply({ content: 'Tuve que convertirme en kevin mitnick por un momento, para entrar a la VPN y traer tus PRs, Aqui estan. (Backend Pull Requests)', files: [attachment] });
            await fs.unlink(file)
        } catch (error) {
            console.log(error);
            await interaction.editReply('Sorry, there was an error taking a screenshot of that URL.');
        }
    }

    if (interaction.commandName === 'approve-front') {
        await interaction.deferReply()
        try {
            const prNumber = interaction.options.getInteger('number');
            const selector = '#skip-to-main-content > div > div.repos-pr-header.margin-bottom-8.bolt-header.flex-row.flex-noshrink.flex-start.bolt-header-no-spacing-defined > div > div.flex-row.rhythm-horizontal-8.flex-center.flex-grow > div.repos-pr-header-vote-button.bolt-split-button.flex-stretch.inline-flex-row > button';
            const url = `https://dev.azure.com/MetLife-Global/Chile%20Digital%20Customer/_git/metlifecl_dc_adn_ts_react_web_svc/pullrequest/${prNumber}`
            await clickElementByXPath(url, selector, 'Approve')
            const screenshot = await takeScreenshot(url);
            const file = `${IMAGE_PATH}${screenshot}`
            const attachment = new AttachmentBuilder(file, { name: screenshot });
            await interaction.editReply({ content: `PR: ${prNumber} fue Aprobado. Esto es experimental; Debes verificar!`, files: [attachment] });
            await fs.unlink(file)
        } catch (error) {
            console.log(error);
            await interaction.editReply('Sorry, there was an error taking a screenshot of that URL.');
        }
    }

    if (interaction.commandName === 'approve-back') {
        await interaction.deferReply()
        try {
            const prNumber = interaction.options.getInteger('number');
            const selector = '#skip-to-main-content > div > div.repos-pr-header.margin-bottom-8.bolt-header.flex-row.flex-noshrink.flex-start.bolt-header-no-spacing-defined > div > div.flex-row.rhythm-horizontal-8.flex-center.flex-grow > div.repos-pr-header-vote-button.bolt-split-button.flex-stretch.inline-flex-row > button';
            const url = `https://dev.azure.com/MetLife-Global/Chile%20Digital%20Customer/_git/metlifecl_dc_adn_ts_nestjs_api_svc/pullrequest/${prNumber}`;
            await clickElementByXPath(url, selector, 'Approve')
            const screenshot = await takeScreenshot(url);
            const file = `${IMAGE_PATH}${screenshot}`
            const attachment = new AttachmentBuilder(file, { name: screenshot });
            await interaction.editReply({ content: `PR: ${prNumber} fue Aprobado. Esto es experimental; Debes verificar!`, files: [attachment] });
            await fs.unlink(file)
        } catch (error) {
            console.log(error);
            await interaction.editReply('Sorry, there was an error taking a screenshot of that URL.');
        }
    }


});

client.login(TOKEN);
