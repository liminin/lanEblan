const config = require('./config');
const { Telegram } = require('puregram');
const fs = require('fs');
const path = require('path');

if(!fs.existsSync('./pics')) {
    fs.mkdirSync('./pics');
}

const tg = new Telegram(config);

tg.updates.on('message', async (ctx) => {
    log(`Новое сообщение от ${ctx.chat.firstName} [${ctx.chat.username || ctx.senderId}]`)

    const files = fs.readdirSync('./pics');

    if(files.length) {
        await ctx.sendPhoto(path.join('./pics', files[randInt(0, files.length - 1)]));
    } else {
        await ctx.send(`Папка с фотками пуста. Ланский, еблан, заполни её. :D`)
    }
    
})

tg.updates.startPolling()
.catch(console.log);

function log(text) {
    console.log(`[${Date().toString()}] ${text}`);
}

function randInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
} 