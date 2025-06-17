// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

/*
Creator: By Liwirya Senka
Credit: Mahiru PPOB - 2025

*Notes*:
- Dilarang Menghapus Credit, Minimal Hargai Yang Buat
- Donasi Bisa Ke Nomor 083879152564 Atas Nama Li** St*** Biar Makin Semangat

Thanks To:
• Liwirya Senka Selaku Developer, 
• Verlang Selaku Anomali,
• Wbk Selaku Anomali
*/

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //


require('./setting')
const useCODE = process.argv.includes("--code")
const useQR = !useCODE
const {
    default: makeWASocket,
    downloadContentFromMessage,
    jidNormalizedUser,
    makeWALegacySocket,
    BufferJSON,
    Browsers,
    initInMemoryStore,
    extractMessageContent,
    makeInMemoryStore,
    proto,
    delay,
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    jidDecode,
    areJidsSameUser,
    PHONENUMBER_MCC,
    WA_DEFAULT_EPHEMERAL,
    relayMessage,
    getContentType,
    generateWAMessage,
    generateWAMessageContent,
    generateForwardMessageContent,
    generateWAMessageFromContent
} = require("@whiskeysockets/baileys")
const fs = require("fs");
const chalk = require('chalk')
const figlet = require('figlet');
const pino = require('pino')
const logg = require('pino')
const _ = require('lodash')
const {
    color
} = require('./lib/console.js');
const readline = require("readline")
const {
    serialize,
    fetchJson,
    sleep,
    getBuffer
} = require("./lib/myfunc");
const {
    groupResponse_Welcome,
    groupResponse_Remove,
    groupResponse_Promote,
    groupResponse_Demote
} = require('./lib/group.js')
const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid
} = require('./lib/Upload_Url')
const usePairingCode = true; // Diubah ke false untuk menggunakan QR code

//====================================//

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
};

//====================================//

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

// Fungsi untuk efek gradasi warna (hijau ke cyan)
const gradient = (text) => {
    let output = '';
    const colors = [chalk.greenBright, chalk.cyanBright, chalk.blueBright];
    for (let i = 0; i < text.length; i++) {
        const colorIndex = Math.floor((i / text.length) * colors.length);
        output += colors[colorIndex](text[i]);
    }
    return output;
};

console.log(
    gradient(
        figlet.textSync('Wira', {
            font: 'Small',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 60,
            whitespaceBreak: true,
        })
    )
);

console.log(chalk.whiteBright.bold('┌────────────────────────────────────────────────┐'));
console.log(chalk.whiteBright.bold('│        ✨ LIWIRYA NEWGEN PROJECT ✨            │'));
console.log(chalk.whiteBright.bold('├────────────────────────────────────────────────┤'));

console.log(chalk.whiteBright(`│ ${chalk.cyanBright('📸 Instagram :')} ${chalk.yellowBright('@liwirya')}                │`));
console.log(chalk.whiteBright(`│ ${chalk.cyanBright('🎥 YouTube   :')} ${chalk.yellowBright('@liwirya')}                │`));
console.log(chalk.whiteBright(`│ ${chalk.cyanBright('📁 Version   :')} ${chalk.yellowBright('NewGen')}                  │`));
console.log(chalk.whiteBright(`│ ${chalk.cyanBright('💼 Business  :')} ${chalk.yellowBright('liwirya@gmail.com')}     │`));
console.log(chalk.whiteBright.bold('└────────────────────────────────────────────────┘'));

console.log(chalk.greenBright.bold(' 🚀 Ready to Shape the Future! 🚀 '));
console.log(chalk.whiteBright.bold('════════════════════════════════════'));

console.log(chalk.redBright.bold('🌟 LIWIRYA FUTURE COMPANY 🌟'));
console.log(chalk.whiteBright.bold('════════════════════════════════════'));

const express = require('express')
let app = express()
const {
    createServer
} = require('http')
let server = createServer(app)
let _qr = 'invalid'
let PORT = 3000 || 8000 || 8080
const path = require('path')

async function startliwirya() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("./session");

    const connectionOptions = {
        logger: pino({
            level: "silent"
        }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 120_000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 15_000,
        emitOwnEvents: false,
        fireInitQueries: false,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: false,
        browser: ['ios', 'Chrome', '10.15.7'],
        version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                return msg?.message || undefined;
            }
            return {
                conversation: 'WhatsApp By Liwirya'
            };
        }
    };

    const liwirya = makeWASocket(connectionOptions);

    if (usePairingCode && !liwirya.authState.creds.registered) {
        const phoneNumber = await question(color('\n\n\nSilahkan masukin nomor Whatsapp Awali dengan 62:\n', 'green'));
        const code = await liwirya.requestPairingCode(phoneNumber.trim());
        console.log(color(`🔑 Kode Pairing Bot Whatsapp kamu:`, "gold"), color(`${code}`, "green"));
    }

    liwirya.reply = (from, content, msg) => liwirya.sendMessage(from, {
        text: content
    }, {
        quoted: msg
    })

    liwirya.ev.on('group-participants.update', async (update) => {
        groupResponse_Demote(liwirya, update)
        groupResponse_Promote(liwirya, update)
        groupResponse_Welcome(liwirya, update)
        groupResponse_Remove(liwirya, update)
        console.log(update)
    })

    liwirya.ev.on("connection.update", ({
        connection
    }) => {
        if (connection === "open") {
            console.log("CONNECTION" + " OPEN (" + liwirya.user?.["id"]["split"](":")[0] + ")")
        }
        if (connection === "close") {
            console.log("Connection closed, Hapus File Sesion dan scan ulang");
            startliwirya()
        }
        if (connection === "connecting") {
            if (liwirya.user) {
                console.log("CONECTION" + " FOR (" + liwirya.user?.["id"]["split"](":")[0] + ")")
            } else if (!useQR && !useCODE) {
                console.log("CONNECTION " + "Autentikasi Dibutuhkan\nGunakan Perintah \x1B[36mnpm start\x1B[0m untuk terhubung menggunakan nomor telepon")
            }
        }
    })
    store.bind(liwirya.ev)

    liwirya.ev.on('messages.upsert', async m => {
        var msg = m.messages[0]
        if (!m.messages) return;
        //msg.message = (Object.keys(msg.message)[0] == "ephemeralMessage") ? msg.message.ephemeralMessage.message : msg.message
        if (msg.key && msg.key.remoteJid == "status@broadcast") return
        msg = serialize(liwirya, msg)
        msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
        require('./liwirya.js')(liwirya, msg, m, store)
    })

    liwirya.ev.process(
        async (events) => {
            if (events['presence.update']) {
                await liwirya.sendPresenceUpdate('available')
            }
            if (events['messages.upsert']) {
                const upsert = events['messages.upsert']
                for (let msg of upsert.messages) {
                    if (msg.key.remoteJid === 'status@broadcast') {
                        if (msg.message?.protocolMessage) return
                        await delay(3000)
                        await liwirya.readMessages([msg.key])
                    }
                }
            }
            if (events['creds.update']) {
                await saveCreds()
            }
        }
    )

    liwirya.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await liwirya.sendMessage(jid, {
            image: buffer,
            caption: caption,
            ...options
        }, {
            quoted
        })
    }

    liwirya.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    liwirya.sendTextMentions = async (jid, teks, mention, quoted = '') => {
        return liwirya.sendMessage(jid, {
            text: teks,
            mentions: mention
        }, {
            quoted
        })
    }

    liwirya.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await liwirya.sendMessage(jid, {
                sticker: {
                    url: buffer
                },
                ...options
            }, {
                quoted
            })
            .then(response => {
                fs.unlinkSync(buffer)
                return response
            })
    }

    liwirya.downloadAndSaveMediaMessage = async (msg, type_file, path_file) => {
        if (type_file === 'image') {
            var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        } else if (type_file === 'video') {
            var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage, 'video')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        } else if (type_file === 'sticker') {
            var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        } else if (type_file === 'audio') {
            var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage, 'audio')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        }
    }

    liwirya.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await liwirya.sendMessage(jid, {
                sticker: {
                    url: buffer
                },
                ...options
            }, {
                quoted
            })
            .then(response => {
                fs.unlinkSync(buffer)
                return response
            })
    }

    return liwirya
}
startliwirya()
    .catch(err => console.log(err))