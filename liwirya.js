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

//====================================//

const {
   BufferJSON,
   WA_DEFAULT_EPHEMERAL,
   proto,
   prepareWAMessageMedia,
   areJidsSameUser,
   getContentType,
   getAggregateVotesInPollMessage,
   downloadContentFromMessage,
   generateWAMessage,
   generateWAMessageFromContent,
   MessageType,
   buttonsMessage
} = require('@whiskeysockets/baileys')
const {
   exec,
   spawn
} = require("child_process");

//====================================//

const {
   color,
   bgcolor,
   pickRandom,
   randomNomor
} = require('./lib/console.js')
const {
   isUrl,
   getRandom,
   getGroupAdmins,
   runtime,
   sleep,
   reSize,
   makeid,
   fetchJson,
   getBuffer
} = require("./lib/myfunc");
const {
   addResponList,
   delResponList,
   isAlreadyResponList,
   isAlreadyResponListGroup,
   sendResponList,
   updateResponList,
   getDataResponList
} = require('./lib/addlist');
const {
   addResponTesti,
   delResponTesti,
   isAlreadyResponTesti,
   sendResponTesti,
   updateResponTesti,
   getDataResponTesti
} = require('./lib/respon-testi');
const {
   addResponProduk,
   delResponProduk,
   resetProdukAll,
   isAlreadyResponProduk,
   sendResponProduk,
   updateResponProduk,
   getDataResponProduk
} = require('./lib/respon-produk');

//====================================//

const {
   v4: uuidv4
} = require('uuid');
const id = uuidv4();
console.log(id);

//====================================//

const fs = require("fs");
const chalk = require('chalk');
const axios = require("axios");
const speed = require("performance-now");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const {
   TelegraPh,
   UploadFileUgu
} = require('./lib/Upload_Url');
const fetch = require('node-fetch');
const jimp = require('jimp')
const qs = require("qs");
const toMs = require('ms');
const ms = require('parse-ms');
const QRCode = require('qrcode');
const util = require("util")
const crypto = require('crypto');

//====================================//

if (!fs.existsSync('./gambar/qris/')) {
   fs.mkdirSync('./gambar/qris/');
}
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const db_user = JSON.parse(fs.readFileSync('./database/pengguna.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
const db_respon_testi = JSON.parse(fs.readFileSync('./database/list-testi.json'));
const db_respon_produk = JSON.parse(fs.readFileSync('./database/list-produk.json'));
const {
   addSaldo,
   minSaldo,
   cekSaldo
} = require("./lib/deposit");
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
const {
   payment,
   apikeyAtlantic,
   apikeyMiraclegaming
} = require("./setting")
const {
   OrderKuota
} = require("./lib/orderkuota")
const orderkuota = new OrderKuota()
const capital = str => str.charAt(0).toUpperCase() + str.slice(1);
const toIDR = amount => new Intl.NumberFormat('id-ID', {
   style: 'currency',
   currency: 'IDR',
   minimumFractionDigits: 0
}).format(amount);


global.db = {
   users: {}
};

let depositPath = "./database/deposit/"
let topupPath = "./database/topup/"
let intervals = {}

moment.tz.setDefault("Asia/Jakarta").locale("id");

//====================================//

module.exports = async (liwirya, msg, setting, store) => {
   try {
      const {
         type,
         quotedMsg,
         mentioned,
         now,
         fromMe,
         isBaileys
      } = msg;
      if (msg.isBaileys) return;

      const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss');
      const tanggal = moment().tz('Asia/Jakarta').format('ll');
      let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a');
      const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);

      const content = JSON.stringify(msg.message);
      const from = msg.key.remoteJid;
      const time = moment(new Date()).format("HH:mm");

      let chats =
         type === 'conversation' && msg.message.conversation ?
         msg.message.conversation :
         type === 'imageMessage' && msg.message.imageMessage.caption ?
         msg.message.imageMessage.caption :
         type === 'videoMessage' && msg.message.videoMessage.caption ?
         msg.message.videoMessage.caption :
         type === 'extendedTextMessage' && msg.message.extendedTextMessage.text ?
         msg.message.extendedTextMessage.text :
         type === 'buttonsResponseMessage' && quotedMsg?.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ?
         msg.message.buttonsResponseMessage.selectedButtonId :
         type === 'templateButtonReplyMessage' && quotedMsg?.fromMe && msg.message.templateButtonReplyMessage.selectedId ?
         msg.message.templateButtonReplyMessage.selectedId :
         type === 'messageContextInfo' ?
         msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId :
         type === 'listResponseMessage' && quotedMsg?.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ?
         msg.message.listResponseMessage.singleSelectReply.selectedRowId :
         '';

      if (!chats) chats = '';

      global.prefa = ['', '.'];
      const prefix = prefa ?
         /^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi.test(chats) ?
         chats.match(/^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi)[0] :
         '' :
         prefa ?? global.prefix;

      const isGroup = msg.key.remoteJid.endsWith('@g.us');
      const sender = isGroup ? (msg.key.participant || msg.participant) : msg.key.remoteJid;
      const isOwner = [
         global.ownerNumber,
         '6283879152564@s.whatsapp.net',
         '628568782064@s.whatsapp.net'
      ].includes(sender);

      const pushname = msg.pushName || 'User';
      const body = chats.startsWith(prefix) ? chats : '';
      const budy =
         type === 'conversation' ?
         msg.message.conversation :
         type === 'extendedTextMessage' ?
         msg.message.extendedTextMessage.text :
         '';
      const args = body.trim().split(/ +/).slice(1);
      const q = args.join(' ');
      const isCommand = chats.startsWith(prefix);
      const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
      const isCmd = isCommand ? chats.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
      const botNumber = liwirya.user.id.split(':')[0] + '@s.whatsapp.net';

      const m = {
         key: msg.key,
         message: msg.message,
         pushName: pushname,
         sender: sender,
         isGroup: isGroup,
         quoted: quotedMsg,
         mentionedJid: mentioned || [],
         chat: msg.key.remoteJid // Tambahkan properti chat
      };
      
      const p_c = prefix + command;

      async function appenTextMessage(text, chatUpdate) {
         let messages = await generateWAMessage(m.chat, {
            text,
            mentions: m.mentionedJid
         }, {
            userJid: liwirya.user.id,
            quoted: m.quoted?.fakeObj
         });
         messages.key.fromMe = areJidsSameUser(m.sender, liwirya.user.id);
         messages.key.id = m.key.id;
         messages.pushName = m.pushName;
         if (m.isGroup) messages.participant = m.sender;
         let msgUpsert = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
         };
         liwirya.ev.emit('messages.upsert', msgUpsert);
      }

      //====================================//

      // --- Bagian Database ---
      // Di bagian deklarasi database tambahkan:
      if (!fs.existsSync('./database/produk.json')) {
         fs.writeFileSync('./database/produk.json', '[]');
      }
      const db_produk = JSON.parse(fs.readFileSync('./database/produk.json', 'utf-8'));

      // --- Fungsi Tambah Produk ---
      function tambahProduk(nama, harga, stock, deskripsi) {
         const produk = {
            id: Date.now().toString(36), // ID unik dari timestamp
            nama: nama,
            harga: parseInt(harga),
            stock: parseInt(stock),
            deskripsi: deskripsi || "-",
            tanggal: new Date().toLocaleString('id-ID')
         };

         db_produk.push(produk);
         fs.writeFileSync('./database/produk.json', JSON.stringify(db_produk, null, 2));
      }

      //====================================//

      const groupMetadata = isGroup ? await liwirya.groupMetadata(from) : ''
      const groupName = isGroup ? groupMetadata.subject : ''
      const groupId = isGroup ? groupMetadata.id : ''
      const participants = isGroup ? await groupMetadata.participants : ''
      const groupMembers = isGroup ? groupMetadata.participants : ''
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
      const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
      const isGroupAdmins = groupAdmins.includes(sender)
      const isAntiLink = antilink.includes(from) ? true : false
      const isWelcome = isGroup ? welcome.includes(from) : false
      const path = require('path');
      const transaksiGrup = {};
      const riwayatPath = path.join(__dirname, 'database', 'RiwayatTransaksi');
      // Quoted
      const quoted = msg.quoted ? msg.quoted : msg
      const getQuoted = (m.quoted || m)
      const isImage = (type == 'imageMessage')
      const isQuotedMsg = (type == 'extendedTextMessage')
      const isMedia = (type === 'imageMessage' || type === 'videoMessage');
      const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
      const isVideo = (type == 'videoMessage')
      const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
      const isSticker = (type == 'stickerMessage')
      const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
      const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
      var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
      var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
      const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
      var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
      var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
      const isListMessage = dataListG.length !== 0 ? dataListG : dataList

      function mentions(teks, mems = [], id) {
         if (id == null || id == undefined || id == false) {
            let res = liwirya.sendMessage(from, {
               text: teks,
               mentions: mems
            })
            return res
         } else {
            let res = liwirya.sendMessage(from, {
               text: teks,
               mentions: mems
            }, {
               quoted: msg
            })
            return res
         }
      }

      //====================================//

      const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
      const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
      const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
      mention != undefined ? mention.push(mentionByReply) : []
      const mentionUser = mention != undefined ? mention.filter(n => n) : []

      async function downloadAndSaveMediaMessage(type_file, path_file) {
         if (type_file === 'image') {
            var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
         } else if (type_file === 'video') {
            var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
         } else if (type_file === 'sticker') {
            var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
         } else if (type_file === 'audio') {
            var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
         }
      }

      //====================================//

      let cekUser = (satu, dua) => {
         let x1 = false
         Object.keys(db_user).forEach((i) => {
            if (db_user[i].id == dua) {
               x1 = i
            }
         })
         if (x1 !== false) {
            if (satu == "id") {
               return db_user[x1].id
            }
            if (satu == "name") {
               return db_user[x1].name
            }
            if (satu == "seri") {
               return db_user[x1].seri
            }
         }
         if (x1 == false) {
            return null
         }
      }
      let setUser = (satu, dua, tiga) => {
         Object.keys(db_user).forEach((i) => {
            if (db_user[i].id == dua) {
               if (satu == "±id") {
                  db_user[i].id = tiga
                  fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
               }
               if (satu == "±name") {
                  db_user[i].name = tiga
                  fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
               }
               if (satu == "±seri") {
                  db_user[i].seri = tiga
                  fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
               }
            }
         })
      }

      function getSeriUser(sender) {
         const user = db_user.find((user) => user.id === sender);
         return user ? user.seri : 'Tidak ditemukan';
      }

      function toRupiah(angka) {
         var saldo = '';
         var angkarev = angka.toString().split('').reverse().join('');
         for (var i = 0; i < angkarev.length; i++)
            if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
         return '' + saldo.split('', saldo.length - 1).reverse().join('');
      }

      function randomNomor(min, max = null) {
         if (max !== null) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
         } else {
            return Math.floor(Math.random() * min) + 1
         }
      }

      //====================================//

      async function getGroupMetadata(idGrup) {
         try {
            const grup = await liwirya.groupMetadata(idGrup);
            return grup;
         } catch (error) {
            console.error(error);
            return null;
         }
      }

      async function getGroupMembers(idGrup) {
         try {
            const grup = await getGroupMetadata(idGrup);
            if (!grup) return [];
            return grup.participants;
         } catch (error) {
            console.error(error);
            return [];
         }
      }

      //====================================//

      function generateRandomPassword(length) {
         const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
         let result = '';
         for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
         }
         return result;
      }

      //====================================//

      function generateRandomNumber(length) {
         let result = '';
         for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10); // Hanya angka 0-9
         }
         return result;
      }
      const reply = (teks) => {
         liwirya.sendMessage(from, {
            text: teks
         }, {
            quoted: msg
         })
      }

      //====================================//

      function cariProduk(id) {
         return db_produk.find(produk => produk.id === id);
      }

      //====================================//

      function updateStock(id, newStock) {
         const index = db_produk.findIndex(p => p.id === id);
         if (index !== -1) {
            db_produk[index].stock = newStock;
            fs.writeFileSync('./database/produk.json', JSON.stringify(db_produk, null, 2));
         }
      }

      //====================================//

      const tempTrxPath = "./database/temp_transaksi/";
      if (!fs.existsSync(tempTrxPath)) {
         fs.mkdirSync(tempTrxPath, {
            recursive: true
         });
      }

      //====================================//

      if (msg.message && !isCmd) {
         const activeTrxFiles = fs.readdirSync(tempTrxPath).filter(f => f.startsWith("mks-"));

         for (const file of activeTrxFiles) {
            const filePath = `${tempTrxPath}${file}`;
            const tempData = JSON.parse(fs.readFileSync(filePath));

            if (tempData.pembeli === sender && tempData.menungguInput) {
               const jumlah = parseInt(chats);

               if (isNaN(jumlah) || jumlah < 1) {
                  fs.unlinkSync(filePath);
                  return reply("Jumlah tidak valid! Transaksi dibatalkan.");
               }

               // Update jumlah dan proses
               tempData.jumlah = jumlah;
               delete tempData.menungguInput;
               fs.writeFileSync(filePath, JSON.stringify(tempData));

               prosesPembelian(tempData, jumlah, filePath);
               return;
            }
         }
      }

      //====================================//

      function prosesPembelian(tempData, jumlah, filePath) {
         const produk = cariProduk(tempData.idProduk);

         // Validasi ulang
         if (!produk || produk.stock < jumlah) {
            fs.unlinkSync(filePath);
            return reply("Produk tidak tersedia/stok habis!");
         }

         const totalHarga = produk.harga * jumlah;

         if (cekSaldo(tempData.pembeli, db_saldo) < totalHarga) {
            fs.unlinkSync(filePath);
            return reply("Saldo tidak cukup! Deposit dulu ya.");
         }

         // Kurangi saldo & stok
         minSaldo(tempData.pembeli, totalHarga, db_saldo);
         updateStock(tempData.idProduk, produk.stock - jumlah);

         // Catat riwayat
         tambahRiwayatTransaksi(tempData.pembeli, produk.nama, totalHarga, jumlah);

         // Kirim detail ke pembeli
         const teks = `
  🌟「 *DETAIL PEMBELIAN* 」🌟

📦 *Produk:* ${produk.nama}  
💵 *Harga:* Rp${toRupiah(produk.harga)}/pcs  
🔢 *Jumlah:* ${jumlah}  
💰 *Total:* Rp${toRupiah(totalHarga)}  
⏰ *Waktu:* ${jam} - ${tanggal}  
✅ *Status:* Sukses  

━━━━━━━━━━━━━━━━━━━━━━━  
🔖 *SN:* ${tempData.id}  
━━━━━━━━━━━━━━━━━━━━━━━  

🤗 *Terima kasih telah berbelanja, Kak!* 😊`;

         liwirya.sendMessage(tempData.pembeli, {
            text: teks
         });

         // Notifikasi ke owner
         const msgOwner = `🌟「 *NOTIFIKASI PEMBELIAN* 」🌟

👤 *Pembeli:* @${sender.split('@')[0]}  
📦 *Produk:* ${produk.nama}  
💵 *Harga:* Rp${toRupiah(produk.harga)}  
🔢 *Jumlah:* ${jumlah}  
💰 *Total:* Rp${toRupiah(totalHarga)}  
✅ *Status:* Sukses  

━━━━━━━━━━━━━━━━━━━━━━━  

📢 *Silakan cek dan proses pesanan!* 🚚`;
         liwirya.sendMessage(global.ownerNumber, {
            text: msgOwner,
            mentions: [sender]
         }, {
            quoted: msg
         });
         // Hapus file temp
         fs.unlinkSync(filePath);
      }


      //====================================//


      if (isGroup && isAntiLink && isBotGroupAdmins) {
         if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
            if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
            if (isOwner) return reply('Untung lu owner ku 😙')
            if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
            if (fromMe) return reply('bot bebas Share link')
            await liwirya.sendMessage(from, {
               delete: msg.key
            })
            reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
            liwirya.groupParticipantsUpdate(from, [sender], "remove")
         }
      }
      // Response Addlist
      if (isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
         var get_data_respon = getDataResponList(from, chats, db_respon_list)
         if (get_data_respon.isImage === false) {
            liwirya.sendMessage(from, {
               text: sendResponList(from, chats, db_respon_list)
            }, {
               quoted: msg
            })
         } else {
            liwirya.sendMessage(from, {
               image: await getBuffer(get_data_respon.image_url),
               caption: get_data_respon.response
            }, {
               quoted: msg
            })
         }
      }
      if (!isGroup && isAlreadyResponTesti(chats, db_respon_testi)) {
         var get_data_respon = getDataResponTesti(chats, db_respon_testi)
         liwirya.sendMessage(from, {
            image: {
               url: get_data_respon.image_url
            },
            caption: get_data_respon.response
         }, {
            quoted: msg
         })
      }
      if (!isGroup && isAlreadyResponProduk(chats, db_respon_produk)) {
         var get_data_respon = getDataResponProduk(chats, db_respon_produk)
         liwirya.sendMessage(from, {
            image: {
               url: get_data_respon.image_url
            },
            caption: get_data_respon.response
         }, {
            quoted: msg
         })
      }

      const sendContact = (jid, numbers, name, quoted, mn) => {
         let number = numbers.replace(/[^0-9]/g, '')
         const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + name + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
            'END:VCARD'
         return liwirya.sendMessage(from, {
            contacts: {
               displayName: name,
               contacts: [{
                  vcard
               }]
            },
            mentions: mn ? mn : []
         }, {
            quoted: quoted
         })
      }

      const fkontak = {
         key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(from ? {
               remoteJid: "status@broadcast"
            } : {})
         },
         message: {
            'contactMessage': {
               'displayName': `Bot Created By ${global.ownerName}\n`,
               'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.namaStore},;;;\nFN:Halo ${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
               'jpegThumbnail': {
                  url: `${global.qris}`
               }
            }
         }
      }

      function parseMention(text = '') {
         return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
      }

      //====================================//

      if (isListMessage === "payqris") {
         if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
            var deposit_object = {
               ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
               session: "amount",
               date: new Date().toLocaleDateString("ID", {
                  timeZone: "Asia/Jakarta"
               }),
               number: sender,
               payment: "QRIS",
               data: {
                  iddepo: "",
                  qr: "",
                  amount_deposit: "",
                  nominal: "",
                  pajak: "",
                  exp: ""
               }
            }
            await fs.writeFileSync(`${depositPath + sender.split("@")[0]}.json`, JSON.stringify(deposit_object, null, 2))
            return reply(`*💰Oke, Kak! Mau deposit berapa?*\n\n
📝 *Contoh:* 1000`)
         } else {
            reply(`⚠️ *Peringatan:*  
Jika proses deposit kamu masih ada yang belum terselesaikan, ketik *Batal* untuk membatalkan. ❌`)
         }
      } else if (isListMessage === "paymanual") {
         if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
            var deposit_object = {
               ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
               session: "amount",
               date: new Date().toLocaleDateString("ID", {
                  timeZone: "Asia/Jakarta"
               }),
               number: sender,
               payment: "Manual",
               data: {
                  amount_deposit: ""
               }
            }
            fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
            reply(`*💰Oke, Kak! Mau deposit berapa?*\n\n
📝 *Contoh:* 1000`)
         } else {
            reply(`⚠️ *Peringatan:*  
Jika proses deposit kamu masih ada yang belum terselesaikan, ketik *Batal* untuk membatalkan. ❌`)
         }
      }

      if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
         if (!msg.key.fromMe) {
            let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"));
            if (data_deposit.session === "amount") {
               if (isNaN(chats)) return reply("Masukan hanya angka ya");
               data_deposit.data.amount_deposit = Number(chats);
               if (data_deposit.data.amount_deposit < 1000) return reply(`Deposit Minimal Rp 1000`);
               if (data_deposit.data.amount_deposit > 500000000) return reply(`Nominal Deposit terlalu tinggi`);
               data_deposit.session = "konfirmasi_deposit";
               await fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 2));
               if (data_deposit.payment === "QRIS") {
                  let pajakny = 0.01 * data_deposit.data.amount_deposit;
                  let key = new URLSearchParams()
                  key.append("api_key", apikeyAtlantic)
                  key.append("reff_id", data_deposit.ID);
                  key.append("nominal", data_deposit.data.amount_deposit + Number(pajakny));
                  key.append("type", "ewallet")
                  key.append("metode", "qrisfast")
                  fetch("https://atlantich2h.com/deposit/create", {
                        method: "POST",
                        body: key,
                        redirect: 'follow'
                     })
                     .then(response => response.json())
                     .then(async res => {
                        let qrisname = `${depositPath}/qris/${sender}.jpg`
                        QRCode.toFile(qrisname, res.data.qr_string, {
                           margin: 2,
                           scale: 10
                        })
                        if (!res.status) return reply(res.message)
                        data_deposit.result = res.status
                        data_deposit.data.iddepo = res.data.id
                        data_deposit.data.qr = qrisname
                        data_deposit.data.pajak = res.data.nominal - data_deposit.data.amount_deposit
                        data_deposit.data.nominal = res.data.nominal
                        data_deposit.data.exp = res.data.expired_at
                        await fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 2));
                        liwirya.sendMessage(from, {
                           text: `🌟「 *KONFIRMASI DEPOSIT* 」🌟

📋 *ID Transaksi:* ${data_deposit.ID}  
📱 *Nomor:* ${data_deposit.number.split('@')[0]}  
💳 *Metode Pembayaran:* ${data_deposit.payment}  
💰 *Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}  
🧾 *Pajak Admin:* Rp${toRupiah(res.data.nominal - data_deposit.data.amount_deposit)}  
💵 *Total Pembayaran:* Rp${toRupiah(res.data.nominal)}  

➡️ Ketik *lanjut* _untuk melanjutkan_  
❌ Ketik *batal* _untuk membatalkan_`
                        }, {
                           quoted: msg
                        })
                     })
               } else {
                  liwirya.sendMessage(from, {
                     text: `✨「 *KONFIRMASI DEPOSIT* 」✨

📌 *ID Transaksi:* ${data_deposit.ID}  
📱 *Nomor:* ${data_deposit.number.split('@')[0]}  
💳 *Metode Pembayaran:* ALL PAYMENT  
💰 *Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}  
🧾 *Pajak Admin:* Rp0  
💵 *Total Pembayaran:* Rp${toRupiah(data_deposit.data.amount_deposit)}  

➡️ Ketik *lanjut* _untuk melanjutkan_  
❌ Ketik *batal* _untuk membatalkan_`
                  }, {
                     quoted: msg
                  })
               }
            } else if (data_deposit.session === "konfirmasi_deposit") {
               if (chats.toLowerCase() === "lanjut") {
                  if (data_deposit.payment === "QRIS") {
                     var qr_fexf = `🌟━[ *PAYMENT QRIS* ]━🌟

📋 *ID Transaksi:* ${data_deposit.ID}  
📱 *Nomor:* ${data_deposit.number.split("@")[0]}  
💰 *Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}  
🧾 *Pajak Admin:* Rp${toRupiah(data_deposit.data.pajak)}  
💵 *Total Pembayaran:* Rp${toRupiah(data_deposit.data.nominal)}  
⏰ *Berlaku Hingga:* ${data_deposit.data.exp}

🔒 *Silakan scan QRIS untuk menyelesaikan pembayaran!* 🔒\n
❌️ Ingin batalkan transaksi, ketik *batal* untuk membatalkan trx`
                     let {
                        key
                     } = await liwirya.sendMessage(from, {
                        image: fs.readFileSync(data_deposit.data.qr),
                        caption: qr_fexf
                     }, {
                        quoted: msg
                     })
                     await fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 2));
                     setTimeout(async () => {
                        if (sender in intervals) {
                           await liwirya.sendMessage(from, {
                              delete: key
                           })
                           await liwirya.sendMessage(from, {
                              text: "✨ Maaf, pembayaran Anda telah dibatalkan karena belum diselesaikan dalam waktu 1 jam. ⏰ Silakan coba lagi untuk melakukan transaksi kembali! 🚀"
                           })
                           await fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
                           fs.existsSync(data_deposit.data.qr) && fs.unlinkSync(data_deposit.data.qr)
                           clearInterval(intervals[sender]);
                           delete intervals[sender]
                        }
                     }, 3600000)

                  } else if (data_deposit.payment === "Manual") {
                     const tanggal = new Date();
                     const hari = tanggal.toLocaleDateString('id-ID', {
                        weekday: 'long'
                     });
                     const tglFormat = tanggal.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                     });
                     const jam = tanggal.toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Asia/Jakarta'
                     });

                     var py_dana = `
🌟 *Berikut Metode Pembayaran* 🌟
📅 *Tanggal*: ${hari}, ${tglFormat}
🕛 *Waktu*: ${jam}

💳 *Metode Transfer*:
📱 *Dana*: ${global.dana}
📱 *Ovo*: ${global.ovo}
📱 *Gopay*: ${global.gopay}
📱 *ShopeePay*: ${global.shopeepay}
🏦 *SeaBank*: ${global.seabank}
👤 *Atas Nama*: ${global.payment?.all?.atas_nama || 'Tidak tersedia'}

🔗 *QRIS All Payment*:
➡️ https://files.catbox.moe/azkjmg.png ⬅️

📌 *Instruksi*:
1. Lakukan transfer menggunakan salah satu metode di atas atau scan QRIS.
2. Kirim bukti transfer dengan caption *Bukti* untuk diverifikasi admin.

Terima kasih atas pembayarannya! 🙏`
                     reply(py_dana)
                  }
               } else if (chats.toLowerCase() === "batal") {
                  let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
                  let key = new URLSearchParams()
                  key.append("api_key", apikeyAtlantic)
                  key.append("id", data_deposit.data.iddepo);
                  fetch("https://atlantich2h.com/deposit/cancel", {
                        method: "POST",
                        body: key,
                        redirect: 'follow'
                     })
                     .then(response => response.json())
                     .then(async res => {
                        await reply(`Baik kak, deposit dengan ID: ${data_deposit.ID} dibatalkan`)
                        if ((sender in intervals)) {
                           clearInterval(intervals[sender]);
                           delete intervals[sender]
                        }
                        fs.existsSync(data_deposit.data.qr) && fs.unlinkSync(data_deposit.data.qr)
                        fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
                     })
               }
            }
         }
      }


      if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
         let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
         if (data_deposit.payment === "QRIS" && data_deposit.data.iddepo?.length > 0) {
            if (!(sender in intervals)) {
               intervals[sender] = setInterval(function() {
                  let key = new URLSearchParams()
                  key.append("api_key", apikeyAtlantic)
                  key.append("id", data_deposit.data.iddepo);
                  fetch("https://atlantich2h.com/deposit/status", {
                        method: "POST",
                        body: key,
                        redirect: 'follow'
                     })
                     .then(response => response.json())
                     .then(async res => {
                        console.log(res); // For Debugging
                        console.log(color("[DEPOSIT QRIS]", "green"), `-> ${sender}`) // For Debugging
                        if (res.status == false) {
                           await fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
                           await reply(res.message + "\n_pembayaran dibatalkan_")
                           clearInterval(intervals[sender]);
                           delete intervals[sender]
                        } else if (res.data.status === "success") {
                           await reply(`
🎉 *DEPOSIT BERHASIL!* 🎉
━━━━━━━━━━━━━━━━━━━━━━━
✅ *Status:* Sukses 🚀
📋 *ID Transaksi:* ${data_deposit.ID}
📱 *Nomor:* ${data_deposit.number.split("@")[0]}
💰 *Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}
🧾 *Pajak Admin:* Rp${toRupiah(data_deposit.data.pajak)}
💵 *Total Pembayaran:* Rp${toRupiah(data_deposit.data.nominal)}
━━━━━━━━━━━━━━━━━━━━━━━
🌟 *Terima kasih, Kak, atas depositnya!* 😊\n
🛒 *Yuk, lanjut belanja atau topup lagi!* 💬`)
                           await addSaldo(sender, Number(data_deposit.data.amount_deposit), db_saldo)
                           await fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
                           await fs.unlinkSync(data_deposit.data.qr)
                           clearInterval(intervals[sender]);
                           delete intervals[sender]
                           return;
                        } else if (res.data.status === "expired") {
                           console.log(res)
                           await reply(`Deposit anda telah *Expired*`)
                           await fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
                           fs.existsSync(data_deposit.data.qr) && fs.unlinkSync(data_deposit.data.qr)
                           clearInterval(intervals[sender]);
                           delete intervals[sender]
                           return;
                        } else if (res.data.status === "cancel") {
                           if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
                           fs.existsSync(data_deposit.data.qr) && fs.unlinkSync(data_deposit.data.qr)
                           clearInterval(intervals[sender]);
                           delete intervals[sender]
                           return;
                        }
                     })
               }, 3000)
            }
         }
      }

      if (fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
         if (!msg.key.fromMe) {
            let data_topup = JSON.parse(fs.readFileSync(topupPath + sender.split("@")[0] + ".json"));
            if (data_topup.session === "target") {
               let chats = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
               let target = chats.trim();

               if (!target || target.includes(" ") || target.includes("(") || isNaN(target)) {
                  return reply(`⚠️ *HANYA MASUKKAN NOMOR/ID* ⚠️
━━━━━━━━━━━━━━━━━━━━━━━
🚫 *Perhatian:* Tidak boleh ada spasi atau karakter lain!\n
🔄 *Petunjuk:*  
Jika ingin membatalkan, masukkan *Nomor/ID* terlebih dahulu, lalu pilih *Batalkan*. ✅
━━━━━━━━━━━━━━━━━━━━━━━
😊 *Pastikan input Anda benar, Kak!*\n
🛠️ *Kami siap membantu proses Anda!* 🚀`);
               }

               data_topup.data.target = target;
               data_topup.session = "konfirmasi_topup";
               fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));

               liwirya.sendMessage(from, {
                  text: `✨ *🎯 TARGET PEMBELIAN 🎯* ✨
━━━━━━━━━━━━━━━━━━━━━━━
📱 *Nomor/ID Tujuan:* ${data_topup.data.target}\n
⚠️ *Perhatian:*  
Pastikan *ID/Nomor* yang dimasukkan *benar* untuk kelancaran transaksi! ✅
━━━━━━━━━━━━━━━━━━━━━━━
😊 *Kami siap memproses pesanan Anda, Kak!*\n
🚀 *Yuk, lanjutkan untuk topup sekarang!* 🛒`,
                  buttonText: "Tekan di Sini! 🚀",
                  sections: [{
                     title: "Lanjutkan atau Batalkan? 🤔",
                     rows: [{
                           title: "Lanjutkan Transaksi ✅",
                           rowId: "lanjut",
                           description: "Klik untuk melanjutkan dan selesaikan pembayaran Anda!"
                        },
                        {
                           title: "Batalkan Transaksi ❌",
                           rowId: "batal",
                           description: "Klik untuk membatalkan transaksi ini."
                        }
                     ]
                  }]
               });
            } else if (data_topup.session === "konfirmasi_topup") {
               if (isListMessage === "lanjut") {
                  let key = new URLSearchParams();
                  key.append("api_key", apikeyAtlantic);
                  key.append("code", data_topup.data.code);
                  key.append("reff_id", require("crypto").randomBytes(5).toString("hex").toUpperCase());
                  key.append("target", data_topup.data.target);

                  fetch("https://atlantich2h.com/transaksi/create", {
                        method: "POST",
                        body: key,
                        redirect: 'follow'
                     })
                     .then(response => response.json())
                     .then(res => {
                        if (!res.status) return reply('Server maintenance.');
                        let persen = (untung / 100) * res.data.price;
                        data_topup.result = res.status;
                        data_topup.data.idtopup = res.data.id;
                        data_topup.data.id = res.data.reff_id;
                        data_topup.data.price = res.data.price + Number(Math.ceil(persen));
                        data_topup.data.layanan = res.data.layanan;
                        fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
                        reply(`✨ *「 ${res.message.toUpperCase()} 」* ✨
━━━━━━━━━━━━━━━━━━━━━━━
📩 *Pesan:*  
⏳ _Tunggu sejenak, Bot sedang memproses pesanan Anda_ ✅
━━━━━━━━━━━━━━━━━━━━━━━
😊 *Terima kasih atas kesabaran Anda, Kak!*\n
💬 Kami akan segera memberi kabar! 🚀`);
                     })
                     .catch(err => {
                        console.error(`Error creating transaction for ${sender}:`, err);
                        reply(`⚠️ *Terjadi kesalahan saat memproses transaksi.*\nSilakan coba lagi nanti atau hubungi kami! 📞`);
                     });

                  if (!(sender in intervals)) {
                     intervals[sender] = setInterval(async () => {
                        let key = new URLSearchParams();
                        key.append("api_key", apikeyAtlantic);
                        key.append("id", data_topup.data.idtopup);
                        key.append("type", "prabayar");

                        try {
                           const response = await fetch("https://atlantich2h.com/transaksi/status", {
                              method: "POST",
                              body: key,
                              redirect: 'follow'
                           });
                           const resss = await response.json();

                           if (!data_topup.lastStatus || data_topup.lastStatus !== resss.data?.status) {
                              console.log(`[TRANSAKSI] Status untuk ${sender}: ${resss.data?.status || 'unknown'} | ID: ${data_topup.data.idtopup}`);
                              data_topup.lastStatus = resss.data?.status;
                              fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
                           }

                           if (!resss.status) {
                              clearInterval(intervals[sender]);
                              delete intervals[sender];
                              return reply('⚠️ *Gagal memeriksa status transaksi.*\nSilakan hubungi kami! 📞');
                           }

                           if (resss.data.status === "success") {
                              let persen = (untung / 100) * resss.data.price;
                              await reply(`🎉 *TOPUP BERHASIL!* 🎉
━━━━━━━━━━━━━━━━━━━━━━━
✅ *Status:* Sukses! 🚀
📌 *ID Order:* ${resss.data.reff_id}
📦 *Layanan:* ${resss.data.layanan}
📱 *Nomor Tujuan:* ${resss.data.target}
💸 *Harga:* Rp${toRupiah(Number(resss.data.price) + Number(Math.ceil(persen)))}
🔑 *Serial Number (SN):* ${resss.data.sn}
━━━━━━━━━━━━━━━━━━━━━━━
🌟 *Terima kasih, Kak, atas kepercayaannya!* 😊\n
🛒 *Yuk, order lagi dan nikmati layanan kami!* 💬`);
                              await minSaldo(sender, (Number(resss.data.price) + Number(Math.ceil(persen))), db_saldo);
                              fs.unlinkSync(topupPath + sender.split("@")[0] + ".json");
                              clearInterval(intervals[sender]);
                              delete intervals[sender];
                           } else if (resss.data.status === "failed" || resss.data.status === "cancel") {
                              await reply(`⚠️ *PESANAN DIBATALKAN* ⚠️
━━━━━━━━━━━━━━━━━━━━━━━
❌ *Status:* Dibatalkan
📋 *Alasan:* ${resss.data.message || 'Tidak diketahui'}
━━━━━━━━━━━━━━━━━━━━━━━
😔 *Mohon maaf atas ketidaknyamanannya, Kak!*\n
💬 Ada pertanyaan? Hubungi kami, ya! 📞`);
                              fs.unlinkSync(topupPath + sender.split("@")[0] + ".json");
                              clearInterval(intervals[sender]);
                              delete intervals[sender];
                           } else if (resss.data.status === "pending") {
                              if (!data_topup.notifiedPending) {
                                 await reply(`⏳ *Transaksi Sedang Diproses* ⏳
━━━━━━━━━━━━━━━━━━━━━━━
📌 *ID Order:* ${resss.data.reff_id}
📱 *Nomor Tujuan:* ${resss.data.target}
📦 *Layanan:* ${resss.data.layanan}
━━━━━━━━━━━━━━━━━━━━━━━
😊 *Mohon tunggu sebentar, Kak! Kami sedang memproses transaksi Anda.*`);
                                 data_topup.notifiedPending = true;
                                 fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
                              }
                           }
                        } catch (err) {
                           console.error(`Error checking status for ${sender}:`, err);
                           clearInterval(intervals[sender]);
                           delete intervals[sender];
                           await reply(`⚠️ *Terjadi kesalahan saat memeriksa status transaksi.*\nSilakan hubungi kami! 📞`);
                        }
                     }, 5000);
                  }
               } else if (isListMessage === "batal") {
                  await reply(`Pesanan dibatalkan!`);
                  if (sender in intervals) {
                     clearInterval(intervals[sender]);
                     delete intervals[sender];
                  }
                  fs.existsSync(topupPath + sender.split("@")[0] + ".json") && fs.unlinkSync(topupPath + sender.split("@")[0] + ".json");
               }
            }
         }
      }

      //===============================================
      // Fungsi untuk menambahkan transaksi ke riwayat
      function tambahRiwayatTransaksi(pengguna, produk, harga) {
         let riwayatTransaksi = {};
         if (fs.existsSync('./database/RiwayatTransaksi.json')) {
            riwayatTransaksi = JSON.parse(fs.readFileSync('./database/RiwayatTransaksi.json', 'utf8'));
         }

         // Jika pengguna belum memiliki riwayat, inisialisasi array
         if (!riwayatTransaksi[pengguna]) {
            riwayatTransaksi[pengguna] = [];
         }

         // Tambahkan transaksi baru
         riwayatTransaksi[pengguna].push({
            produk,
            harga,
            tanggal: new Date().toLocaleString()
         });

         // Simpan ke file
         fs.writeFileSync('./database/RiwayatTransaksi.json', JSON.stringify(riwayatTransaksi, null, 2));
      }

      // autoreply
      const autoReply = {
         'jam berapa': `🕒 Sekarang jam ${moment().tz("Asia/Jakarta").format("HH:mm:ss")} WIB! Jangan lupa istirahat kalau udah larut, ya! 😄`,
         'tanggal berapa': `📅 Hari ini tanggal ${moment().tz("Asia/Jakarta").format("dddd, DD MMMM YYYY")} di Jakarta! Apa rencana seru hari ini? 😉`,
         'cara deposit': `💸 Mau deposit? Gampang banget! Ketik **.deposit** di chat, nanti aku kasih panduan lengkapnya. Yuk, isi saldo sekarang biar bisa belanja sepuasnya! 🚀`,
         'cara beli': `🛒 Pengen beli produk keren? Ketik **.pricelist** buat lihat daftar harga terbaru. Kalau bingung, tinggal tanya aku lagi, ya! 😎`,
         'halo': `👋 Halo bro, apa kabar? Siap belanja atau cuma pengen ngobrol sama aku? 😜, ingin melihat produk Ketik *.pricelist* aja, nanti muncul semua produk!`,
         'promo': `🔥 Mau tahu promo terbaru? Ketik *.promo* buat cek penawaran spesial hari ini! Jangan sampai ketinggalan, ya! 🤑`,
         'status': `📡 Status sistem: Semua lancar jaya! 🚀 Kalau ada kendala, ketik *.bantuan* atau hubungi admin kami. 😊`
      };

      if (autoReply[chats.toLowerCase()]) {
         reply(autoReply[chats.toLowerCase()]);
      }

      const kataKata = pushname.split(' ');
      let namaPengguna = '';
      if (kataKata[0].length <= 12) {
         namaPengguna = kataKata.slice(0, 2).join(' ');
      } else {
         namaPengguna = kataKata[0];
      }
      // Console
      if (isGroup && isCmd) {
         console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time, ) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
      }

      if (!isGroup && isCmd) {
         console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time, ) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
      }

      //====================================//
      switch (command) {
         //====================================//
         case 'menu': {
            if (!cekUser("id", sender)) {
               return liwirya.sendMessage(from, {
                  text: `🚫 *Akses Ditolak*\n\nAnda belum terdaftar. Silakan ketik *.daftar* untuk membuat akun terlebih dahulu.`
               }, {
                  quoted: fkontak
               });
            }

            const user = db_user.find(u => u.id === sender);
            const userName = user?.name || 'Pengguna';
            const userBalance = toRupiah(cekSaldo(sender, db_saldo));
            const totalTransaksi = (JSON.parse(fs.readFileSync('./database/RiwayatTransaksi.json'))[sender] || []).length;

            const profileCard = `
Halo, *${userName}*! ${ucapanWaktu}

╭─── 💳 *Dasbor Anda* ───╮
│                                 
│  💰 *Saldo Saat Ini:*
│      *Rp${userBalance},-*
│
│  📊 *Riwayat Transaksi:*
│      *${totalTransaksi} Kali Transaksi*
│
╰────────────────╯
`;

            const footerText = `Powered by ✨ ${global.namaStore}`;

            if (isGroup) {
               const groupMessage = `
╔══════════════════════╗
║      *MENU TERBATAS DI GRUP* ║
╚══════════════════════╝

Halo *${userName}*! 👋

Untuk menjaga kenyamanan bersama, fitur menu lengkap hanya dapat diakses melalui *chat pribadi* dengan bot.

Klik tombol di bawah untuk membuka menu utama dan menikmati semua layanan kami!
        `;
               const templateButtons = [{
                  index: 1,
                  urlButton: {
                     displayText: 'Buka Menu di Chat Pribadi',
                     url: `https://wa.me/${botNumber.split('@')[0]}?text=.menu`
                  }
               }];
               const templateMessage = {
                  text: groupMessage,
                  footer: footerText,
                  templateButtons: templateButtons
               };
               return liwirya.sendMessage(from, templateMessage, {
                  quoted: msg
               });
            }

            const menuSections = [{
                  title: "LAYANAN UTAMA",
                  rows: [{
                        title: "🛍️ Katalog Produk",
                        rowId: "#pricelist",
                        description: "Lihat semua daftar produk & harga terbaru."
                     },
                     {
                        title: "💳 Dompet & Keuangan",
                        rowId: "#dompet",
                        description: "Manajemen saldo: deposit, transfer, dan cek riwayat."
                     }
                  ]
               },
               {
                  title: "INFORMASI & BANTUAN",
                  rows: [{
                        title: "🏆 Papan Peringkat",
                        rowId: "#topsaldo",
                        description: "Lihat 5 pengguna dengan saldo tertinggi."
                     },
                     {
                        title: "📞 Kontak & Bantuan",
                        rowId: "#owner",
                        description: "Hubungi Owner jika ada kendala atau pertanyaan."
                     },
                     {
                        title: "📜 Syarat & Ketentuan",
                        rowId: "#bantuan",
                        description: "Pahami aturan penggunaan layanan kami."
                     }
                  ]
               }
            ];

            if (isOwner) {
               menuSections.push({
                  title: "👑 AREA KHUSUS OWNER",
                  rows: [{
                     title: "📈 Panel Admin",
                     rowId: ".adminpanel",
                     description: "Akses fitur administratif bot."
                  }]
               });
            }

            const listMessage = {
               text: profileCard,
               footer: footerText,
               title: "Silakan pilih layanan yang Anda butuhkan:",
               buttonText: "Tampilkan Pilihan",
               sections: menuSections,
            };

            liwirya.sendMessage(from, listMessage, {
               quoted: msg
            });
            break;
         }
         break

         case 'cekidgroup': {
            if (!isGroup) {
               return liwirya.sendMessage(from, {
                  text: '❌ *Perintah Gagal*\n\nFitur ini dirancang khusus untuk digunakan di dalam grup.'
               }, {
                  quoted: msg
               });
            }

            try {
               const metadata = await liwirya.groupMetadata(from);
               const groupId = metadata.id;
               const groupName = metadata.subject;
               const groupOwner = metadata.owner ? metadata.owner : null;
               const totalMembers = metadata.participants.length;
               const admins = metadata.participants.filter(p => p.admin !== null);
               const totalAdmins = admins.length;

               let adminListText = '';
               const mentions = [];
               admins.forEach((admin, index) => {
                  if (index < 10) {
                     adminListText += `\n│ ${index + 1}. @${admin.id.split('@')[0]}`;
                  }
                  mentions.push(admin.id);
               });
               if (admins.length > 10) {
                  adminListText += `\n│ ... dan ${admins.length - 10} admin lainnya.`;
               }

               const header = `╔═══ ≪ *GROUP IDENTITY* ≫ ═══╗`;

               const mainDetailsCard = `
│
├─ 📌 *DETAIL UTAMA*
│
│  🏢 *Nama Grup:*
│  \`\`\`${groupName}\`\`\`
│
│  🆔 *ID Grup:*
│  (Terkirim di bawah, tap untuk copy)
│
│  👑 *Pembuat Grup:*
│  ${groupOwner ? `@${groupOwner.split('@')[0]}` : 'Tidak Terdeteksi'}
│`;

               // Kartu Statistik
               const statsCard = `
├─ 📊 *STATISTIK*
│
│  👥 *Total Anggota:* ${totalMembers} Orang
│  👮 *Jumlah Admin:* ${totalAdmins} Orang
│`;

               const adminCard = `
├─ 👑 *DAFTAR ADMIN*
${adminListText}
│`;

               const timestamp = new Date().toLocaleString('id-ID', {
                  timeZone: 'Asia/Jakarta'
               });
               const footer = `
╚═ Requested by @${sender.split('@')[0]}
     ╚═ Pada: ${timestamp}`;

               const finalMessage = `${header}${mainDetailsCard}${statsCard}${adminCard}${footer}`;

               if (groupOwner) mentions.push(groupOwner);
               mentions.push(sender);

               await liwirya.sendMessage(from, {
                  text: finalMessage,
                  mentions: mentions
               }, {
                  quoted: msg
               });

               await liwirya.sendMessage(from, {
                  text: groupId
               });

            } catch (error) {
               console.error("Error di case 'cekidgroup' v2:", error);
               liwirya.sendMessage(from, {
                  text: 'Ups! Terjadi kesalahan teknis saat mencoba memuat data grup.'
               }, {
                  quoted: msg
               });
            }

            break;
         }
         break
      
         case 'menu2':
         case 'allmenu': {
            const mark_slebew = '0@s.whatsapp.net';
            const more = String.fromCharCode(8206);
            const strip_ny = more.repeat(4001);

            if (cekUser("id", sender) == null) {
               return liwirya.sendMessage(from, {
                  text: mess.OnlyUser,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const totalUsers = db_user.length;
            const user_name = `${totalUsers}`;
            let object_user = {
               id: sender,
               name: user_name,
               premium: false
            };
            fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user));

            const totalTransaksi = db_saldo[sender]?.riwayat?.length || 0;

            const simbol = pickRandom(['✦', '➤', '★', '◇', '⚡']);
            const footer_nya = `🌟 *Powered by ${global.ownerName}* | © 2025`;

            const header = `
${simbol} *${global.namaStore.toUpperCase()}* ${simbol}
╭─「 *Selamat Datang* 」─╮
│ 👋 ${ucapanWaktu}, *${namaPengguna}!*
│ 📅 ${tanggal}  |  🕒 ${jam}
├──────────────────────┤
│ 💼 *Profil Pengguna*
│ 💰 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}
│ 📊 *Total Transaksi*: ${totalTransaksi}x
│ 👥 *Total Pengguna*: ${user_name}
╰──────────────────────╯`;
            const menu = `
${header}

╭─「 *📋 Daftar Semua Menu* 」─╮
│ 🌈 *Pilih fitur favoritmu di bawah!* 
├──────────────────────┤

╭─「 *🛒 Store Menu* 」─╮
│ ${simbol} *Pricelist*  
│   └ 📜 Menampilkan daftar produk  
│ ${simbol} *Transfer*  
│   └ 💸 Transfer saldo antar pengguna  
│ ${simbol} *Saldo*  
│   └ 💰 Cek saldo akunmu  
│ ${simbol} *Topsaldo*  
│   └ 🏆 Lihat 10 pengguna dengan saldo terbesar  
│ ${simbol} *List*  
│   └ 📋 Daftar semua produk tersedia  
│ ${simbol} *Payment*  
│   └ 💳 Lihat opsi pembayaran  
│ ${simbol} *Deposit*  
│   └ ➕ Tambah saldo akun  
│ ${simbol} *Proses*  
│   └ ⏳ Cek status transaksi oleh admin  
│ ${simbol} *Bukti*  
│   └ 📸 Unggah bukti transfer  
│ ${simbol} *Done*  
│   └ ✅ Tandai transaksi selesai  
╰──────────────────────╯

╭─「 *🧮 Kalkulator Menu* 」─╮
│ ${simbol} *Tambah*  
│   └ ➕ Operasi pertambahan  
│ ${simbol} *Kurang*  
│   └ ➖ Operasi pengurangan  
│ ${simbol} *Kali*  
│   └ ✖️ Operasi perkalian  
│ ${simbol} *Bagi*  
│   └ ➗ Operasi pembagian  
╰──────────────────────╯

╭─「 *🎉 Main Menu* 」─╮
│ ${simbol} *Donasi*  
│   └ 🤝 Dukung kami dengan donasi  
│ ${simbol} *Sticker*  
│   └ 🎨 Buat sticker keren  
│ ${simbol} *Saran*  
│   └ 💡 Kirim saran untuk bot  
╰──────────────────────╯

╭─「 *👥 Group Menu* 」─╮
│ ${simbol} *Hidetag*  
│   └ 📢 Tag semua anggota dengan pesan  
│ ${simbol} *Welcome*  
│   └ 👋 Ucapkan selamat datang untuk anggota baru  
│ ${simbol} *Group open*  
│   └ 🔓 Buka grup untuk semua  
│ ${simbol} *Group close*  
│   └ 🔒 Tutup grup untuk anggota  
│ ${simbol} *Opentime*  
│   └ ⏰ Buka grup dengan timer  
│ ${simbol} *Closetime*  
│   └ ⏱️ Tutup grup dengan timer  
│ ${simbol} *Antilink*  
│   └ 🚫 Blokir tautan promosi di grup  
│ ${simbol} *Kick*  
│   └ 🚷 Keluarkan anggota dari grup  
│ ${simbol} *Linkgc*  
│   └ 🔗 Bagikan tautan grup  
│ ${simbol} *Tagall*  
│   └ 📣 Tag semua anggota grup  
│ ${simbol} *Revoke*  
│   └ 🔄 Atur ulang tautan grup  
│ ${simbol} *Delete*  
│   └ 🗑️ Hapus pesan di grup  
╰──────────────────────╯

╭─「 *ℹ️ Informasi Tambahan* 」─╮
│ 📺 *Creator/Pembuat*: @Liwirya
│ 👑 *Owner*: ${global.kontakOwner}  
│ 🌐 *Total Pengguna*: ${user_name}  
╰──────────────────────╯
`;
            liwirya.sendMessage(from, {
               image: fs.readFileSync('./gambar/thumb.jpg'),
               caption: menu,
               footer: footer_nya
            }, {
               quoted: msg
            });
         }
         break

         case 'syarat': {
            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            const teks_syarat = `
📜 *Syarat dan Ketentuan Penggunaan Bot* 📜
📅 *Tanggal*: ${hari}, ${tglFormat}
🕛 *Waktu*: ${jam}

👋 Selamat datang di *${global.namaStore}*! Berikut adalah syarat dan ketentuan penggunaan bot kami:

1️⃣ *Pendaftaran Pengguna*:
   - Semua pengguna harus mendaftar dengan perintah *${prefix}daftar* untuk mengakses fitur bot.
   - Pastikan nomor WhatsApp aktif dan valid.

2️⃣ *Transaksi Deposit*:
   - Deposit hanya dapat dilakukan melalui metode pembayaran resmi (lihat *${prefix}payment*).
   - Bukti transfer harus dikirim dengan perintah *${prefix}bukti* untuk verifikasi oleh owner.
   - Deposit akan diproses setelah dikonfirmasi oleh admin.

3️⃣ *Penggunaan Saldo*:
   - Saldo hanya dapat digunakan untuk transaksi di *${global.namaStore}*.
   - Tidak ada pengembalian dana untuk saldo yang sudah dikonfirmasi.

4️⃣ *Kebijakan Privasi*:
   - Data pengguna (nomor, nama, saldo) disimpan dengan aman dan tidak akan dibagikan ke pihak ketiga.
   - Nomor pengguna hanya ditampilkan untuk keperluan transaksi atau verifikasi.

5️⃣ *Kontak dan Dukungan*:
   - Jika ada masalah, hubungi owner melalui *${prefix}hubown* atau @${global.ownerNumber.split('@')[0]}.
   - Join grup resmi di *${prefix}gc* untuk update dan diskusi.

📌 *Penting*:
- Pengguna yang melanggar syarat (misalnya, mencoba manipulasi saldo) akan diblokir.
- Bot ini dikelola oleh *${global.ownerName}* dan beroperasi 24/7, kecuali saat maintenance.

Terima kasih telah menggunakan bot kami! 😊
Ketik *${prefix}menu* untuk melihat semua perintah.
    `;

            await liwirya.sendMessage(from, {
               text: teks_syarat,
               mentions: [global.ownerNumber]
            }, {
               quoted: fkontak
            });
            break;
         }
         break

         case 'bantuan': {
            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            const teks_bantuan = `
🆘 *Pusat Bantuan ${global.namaStore}* 🆘
📅 *Tanggal*: ${hari}, ${tglFormat}
🕛 *Waktu*: ${jam}

😔 Mengalami masalah? Berikut panduan untuk menyelesaikan masalah umum:

1️⃣ *Tidak Bisa Mendaftar*:
   - Pastikan kamu menggunakan perintah *${prefix}daftar* dengan nomor WhatsApp yang valid.
   - Jika masih gagal, cek apakah nomor sudah terdaftar dengan *${prefix}saldo* atau hubungi owner (@${global.ownerNumber.split('@')[0]}).

2️⃣ *Deposit Tidak Terkonfirmasi*:
   - Kirim bukti transfer dengan perintah *${prefix}bukti* (pastikan gambar jelas dan caption "Bukti").
   - Tunggu konfirmasi dari owner. Jika lebih dari 24 jam, hubungi owner melalui *${prefix}hubown*.

3️⃣ *Saldo Tidak Bertambah*:
   - Pastikan deposit sudah dikonfirmasi oleh admin (*${prefix}accdepo*).
   - Cek saldo dengan *${prefix}saldo*. Jika ada masalah, laporkan ke owner.

4️⃣ *Perintah Tidak Berfungsi*:
   - Pastikan kamu menggunakan perintah yang benar (lihat *${prefix}menu*).
   - Jika bot tidak merespons, cek apakah bot sedang maintenance atau hubungi owner.

5️⃣ *Lupa Perintah atau Informasi*:
   - Gunakan *${prefix}menu* untuk daftar perintah.
   - Cek syarat dan ketentuan dengan *${prefix}syart*.

📞 *Kontak Bantuan*:
- Owner: @${global.ownerNumber.split('@')[0]} (*${prefix}hubown*)
- Grup Resmi: *${prefix}gc*
- Saluran Update: *${prefix}saluran*

📌 *Tips*:
- Selalu simpan bukti transfer sampai deposit dikonfirmasi.
- Jika masalah berlanjut, kirim pesan ke owner dengan detail lengkap.

Kami siap membantu! Terima kasih atas kepercayaanmu! 😊
    `;

            await liwirya.sendMessage(from, {
               text: teks_bantuan,
               mentions: [global.ownerNumber]
            }, {
               quoted: fkontak
            });
            break;
         }
         break

         case 'saran': {
            if (!q) {
               return reply(`
╭───「 *Kirim Saran* 」───╮
│ ✨ Tulis saran Anda untuk kami!
│ 📝 *Format*: .saran <saran Anda>
│ 💡 *Contoh*: .saran Tambahkan fitur hack satelit min!
╰───────────────╯`);
            }

            const saran = q;
            const pengirim = sender;

            liwirya.sendMessage(global.ownerNumber, {
               text: `
${simbol} *Saran Baru Diterima* ${simbol}
╭───────────────
│ 👤 *Pengirim*: ${pengirim}
│ 💡 *Saran*: ${saran}
│ 🕒 *Waktu*: ${jam} - ${tanggal}
╰───────────────╯`
            });

            reply(`
${simbol} *Saran Terkirim!* ${simbol}
╭───────────────
│ ✅ Saran Anda telah dikirim ke admin!
│ 🙏 Terima kasih atas masukan Anda!
╰───────────────╯`);
         }
         break;

         case 'balassaran': {
            if (!isOwner) {
               return reply(`
╭───「 *Akses Ditolak* 」───╮
│ 🚫 *Perintah ini khusus untuk Owner!*
╰───────────────╯`);
            }

            if (!q) {
               return reply(`
╭───「 *Balas Saran* 」───╮
│ 📨 *Format*: .balassaran <nomor> | <balasan>
│ 💡 *Contoh*: .balassaran 6281234567890 | Terima kasih atas sarannya!
╰───────────────╯`);
            }

            const [nomor, balasan] = q.split("|");

            if (!nomor || !balasan) {
               return reply(`
╭───「 *Format Salah* 」───╮
│ ⚠️ Format tidak sesuai!
│ 📝 *Gunakan*: .balassaran <nomor> | <balasan>
│ 💡 *Contoh*: .balassaran 6281234567890 | Saran diterima, akan kami pertimbangkan!
╰───────────────╯`);
            }

            liwirya.sendMessage(nomor, {
               text: `
${simbol} *Balasan dari Admin* ${simbol}
╭───────────────
│ 👑 *Admin*: ${global.ownerName}
│ 📬 *Balasan*: ${balasan}
│ 🕒 *Waktu*: ${jam} - ${tanggal}
╰───────────────╯`
            });

            reply(`
${simbol} *Balasan Terkirim!* ${simbol}
╭───────────────
│ ✅ Balasan telah dikirim ke ${nomor}!
│ 📜 *Isi*: ${balasan}
╰───────────────╯`);
         }
         break;

         case 'sticker':
         case 's':
         case 'stiker': {
            if (isImage || isQuotedImage) {
               let media = await downloadAndSaveMediaMessage('image', `./gambar/${tanggal}.jpg`)
               reply(mess.wait)
               liwirya.sendImageAsSticker(from, media, msg, {
                  packname: `${global.namaStore}`,
                  author: `Store Bot`
               })
            } else if (isVideo || isQuotedVideo) {
               let media = await downloadAndSaveMediaMessage('video', `./sticker/${tanggal}.mp4`)
               reply(mess.wait)
               liwirya.sendVideoAsSticker(from, media, msg, {
                  packname: `${global.namaStore}`,
                  author: `ig@liwirya11`
               })
            } else {
               reply(`Kirim/reply gambar/vidio dengan caption *${prefix+command}*`)
            }
         }
         break

         case 'ownermenu': {
            if (!isOwner) return reply(mess.OnlyOwner)
            let simbol = '➤'
            reply(`┏━━|[  *\`⌜ LIST OWNER MENU ⌟\`*  ]|━━━
┃
┃🖥️ *COMMANDS:*
┃ ┃ 
┃ ┏❐  *\`⌜ Owner Menu ⌟\`*  ❐
┃ ┃ ${simbol} *Addsaldo*
┃ ┃   ᘇ Menambahkan Saldo User
┃ ┃ ${simbol} *Minsaldo*
┃ ┃   ᘇ Mengurasi Saldo User
┃ ┃ ${simbol} *Listsaldo*
┃ ┃   ᘇ Menampilkan Saldo Pengguna
┃ ┃ ${simbol} *Addproduk*
┃ ┃   ᘇ Add Produk (Support Gambar)
┃ ┃ ${simbol} *Delproduk*
┃ ┃   ᘇ Menghapus Produk
┃ ┃ ${simbol} *Addtesti*
┃ ┃   ᘇ Tambah Testimoni
┃ ┃ ${simbol} *Deltesti*
┃ ┃   ᘇ Hapus Testimoni
┃ ┃ ${simbol} *balassaran*
┃ ┃   ᘇ Untuk Membalas Pesan User
┃ ┃ ${simbol} *Join*
┃ ┃   ᘇ Untuk Masuk Group
┃ ┃ ${simbol} *Sendbyr* 62xxx
┃ ┃   ᘇ Suruh Untuk Membayar
┃ ┃ ${simbol} *Block* 62xxx
┃ ┃   ᘇ Blockir Nomor
┃ ┃ ${simbol} *Unblock* 62xxx
┃ ┃   ᘇ Membuka Blockiran Nomor
┃ ┃ ${simbol} *Cekip*
┃ ┃   ᘇ Cek IP Provider
┃ ┃ ${simbol} *Ceksaldo*
┃ ┃   ᘇ Cek Saldo Akun Admin
┃ ┃ ${simbol} *Setprofit*
┃ ┃   ᘇ Setting Keuntungan Provider
┃ ┗❐
┃
┗━━━━━━━━━━━━━━━━━━━━━━`)
         }
         break

         case 'owner': {
            const owner_Nya = global.ownerNumber;
            await sendContact(from, owner_Nya, global.ownerName, msg);
            await liwirya.sendMessage(from, {
               text: `📞 *Itu nomor ownerku, kak!* 😊\nJangan ragu untuk chat, ownerku ramah kok! 😉`
            }, {
               quoted: msg
            });
            break;
         }
         break

         case 'hubown': {
            const teks_hubown = `
👋 *Halo, Kak!*
Jika ada bug atau masalah, langsung lapor ke owner ya! 😊

📞 *Kontak Owner*: ${global.kontakOwner}
✨ Terima kasih atas kerja samanya! 🙏
    `;
            await liwirya.sendMessage(from, {
               text: teks_hubown
            }, {
               quoted: msg
            });
            break;
         }
         break

         case 'saluran':
         case 'ch': {
            const teks_saluran = `
📢 *Ikuti Saluran Resmi Kami, Kak!* 😉

🌟 *Saluran Utama*: ${global.linkch}
🛒 *Saluran Store*: ${global.linkch1}

🙏 Jangan lupa join untuk update terbaru ya! ✨
    `;
            await liwirya.sendMessage(from, {
               text: teks_saluran
            }, {
               quoted: msg
            });
            break;
         }
         break

         case 'gc':
         case 'groupadmin': {
            const teks_group = `
👥 *Grup Resmi ${global.ownerName}*

🔗 *Link Grup*: ${global.linkgroup}

📌 Ayo gabung untuk diskusi seru dan info eksklusif! 😎
    `;
            await liwirya.sendMessage(from, {
               text: teks_group
            }, {
               quoted: msg
            });
            break;
         }
         break

         case 'join': {
            if (!isOwner) return reply('🚫 *Maaf, hanya owner yang bisa menggunakan perintah ini!*');
            if (!q) return reply(`❗ Kirim perintah *${prefix + command} linkgrup* (contoh: ${prefix + command} https://chat.whatsapp.com/xxx)`);

            try {
               const ini_urrrl = q.split('https://chat.whatsapp.com/')[1];
               await liwirya.groupAcceptInvite(ini_urrrl);
               await reply('✅ *Berhasil bergabung ke grup!*');
            } catch (err) {
               await reply('❌ *Error:* Bot mungkin telah di-kick dari grup atau link tidak valid.');
            }
            break;
         }
         break

         case 'tambah':
            if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var num_one = q.split(' ')[0]
            var num_two = q.split(' ')[1]
            if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            var nilai_one = Number(num_one)
            var nilai_two = Number(num_two)
            reply(`${nilai_one + nilai_two}`)
            break

         case 'kurang':
            if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var num_one = q.split(' ')[0]
            var num_two = q.split(' ')[1]
            if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            var nilai_one = Number(num_one)
            var nilai_two = Number(num_two)
            reply(`${nilai_one - nilai_two}`)
            break

         case 'kali':
            if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var num_one = q.split(' ')[0]
            var num_two = q.split(' ')[1]
            if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            var nilai_one = Number(num_one)
            var nilai_two = Number(num_two)
            reply(`${nilai_one * nilai_two}`)
            break

         case 'bagi':
            if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var num_one = q.split(' ')[0]
            var num_two = q.split(' ')[1]
            if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
            var nilai_one = Number(num_one)
            var nilai_two = Number(num_two)
            reply(`${nilai_one / nilai_two}`)
            break

         case 'hidetag':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            let mem = [];
            groupMembers.map(i => mem.push(i.id))
            liwirya.sendMessage(from, {
               text: q ? q : '',
               mentions: mem
            })
            break

         case 'antilink': {
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (!args[0]) return reply(`Kirim perintah *${command}* _options_\nOptions : on & off\nContoh : *${command}* on`)
            if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
               if (isAntiLink) return reply('Antilink sudah aktif')
               antilink.push(from)
               fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
               reply('Successfully Activate Antilink In This Group')
            } else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
               if (!isAntiLink) return reply('Antilink belum aktif')
               let anu = antilink.indexOf(from)
               antilink.splice(anu, 1)
               fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
               reply('Successfully Disabling Antilink In This Group')
            } else {
               reply('Kata kunci tidak ditemukan!')
            }
         }
         break

         case 'closetime':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args[1] == "detik") {
               var timer = args[0] * `1000`
            } else if (args[1] == "menit") {
               var timer = args[0] * `60000`
            } else if (args[1] == "jam") {
               var timer = args[0] * `3600000`
            } else if (args[1] == "hari") {
               var timer = args[0] * `86400000`
            } else {
               return reply("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")
            }
            reply(`Close time ${q} dimulai dari sekarang`)
            setTimeout(() => {
               const close = `*Tepat waktu* grup ditutup oleh admin\nsekarang hanya admin yang dapat mengirim pesan`
               liwirya.groupSettingUpdate(from, 'announcement')
               reply(close)
            }, timer)
            break

         case "opentime": {
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args[1] == 'detik') {
               var timer = args[0] * `1000`
            } else if (args[1] == 'menit') {
               var timer = args[0] * `60000`
            } else if (args[1] == 'jam') {
               var timer = args[0] * `3600000`
            } else if (args[1] == 'hari') {
               var timer = args[0] * `86400000`
            } else {
               return reply('*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik')
            }
            reply(`Open Time ${q} Dimulai Dari Sekarang`)
            setTimeout(() => {
               const nomor = m.participant
               const open = `*Tepat Waktu* Grup Dibuka Oleh Admin\nSekarang Member Dapat Mengirim Pesan`
               liwirya.groupSettingUpdate(from, 'not_announcement')
               reply(open)
            }, timer)
         }
         break

         case 'tagall':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Teks?\nContoh *Tagall* hallo`)
            let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
            for (let mem of participants) {
               teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
            }
            liwirya.sendMessage(from, {
               text: teks_tagall,
               mentions: participants.map(a => a.id)
            }, {
               quoted: msg
            })
            break

         case 'fitnah':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!q) return reply(`Kirim perintah *${command}* @tag|pesantarget|pesanbot`)
            var org = q.split("|")[0]
            var target = q.split("|")[1]
            var bot = q.split("|")[2]
            if (!org.startsWith('@')) return reply('Tag orangnya')
            if (!target) return reply(`Masukkan pesan target!`)
            if (!bot) return reply(`Masukkan pesan bot!`)
            var mens = parseMention(target)
            var msg1 = {
               key: {
                  fromMe: false,
                  participant: `${parseMention(org)}`,
                  remoteJid: from ? from : ''
               },
               message: {
                  extemdedTextMessage: {
                     text: `${target}`,
                     contextInfo: {
                        mentionedJid: mens
                     }
                  }
               }
            }
            var msg2 = {
               key: {
                  fromMe: false,
                  participant: `${parseMention(org)}`,
                  remoteJid: from ? from : ''
               },
               message: {
                  conversation: `${target}`
               }
            }
            liwirya.sendMessage(from, {
               text: bot,
               mentions: mentioned
            }, {
               quoted: mens.length > 2 ? msg1 : msg2
            })
            break

         case 'del':
         case 'delete':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
            if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
            liwirya.sendMessage(from, {
               delete: {
                  fromMe: true,
                  id: quotedMsg.id,
                  remoteJid: from
               }
            })
            break
         case 'linkgrup':
         case 'linkgc':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var url = await liwirya.groupInviteCode(from).catch(() => reply(mess.error.api))
            url = 'https://chat.whatsapp.com/' + url
            reply(url)
            break

         case 'revoke':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            await liwirya.groupRevokeInvite(from)
               .then(res => {
                  reply(`Sukses menyetel tautan undangan grup ini`)
               }).catch(() => reply(mess.error.api))
            break
         case 'group':
         case 'grup':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (!q) return reply(`Kirim perintah *${command}* _options_\nOptions : close & open\nContoh : *${command}* close`)
            if (args[0] == "close") {
               liwirya.groupSettingUpdate(from, 'announcement')
               reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
            } else if (args[0] == "open") {
               liwirya.groupSettingUpdate(from, 'not_announcement')
               reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
            } else {
               reply(`Kirim perintah *${command}* _options_\nOptions : close & open\nContoh : *${command}* close`)
            }
            break

         case 'kick':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
            if (mentionUser.length !== 0) {
               number = mentionUser[0]
               liwirya.groupParticipantsUpdate(from, [number], "remove")
                  .then(res =>
                     reply(`*Sukses mengeluarkan member..!*`))
                  .catch((err) => reply(mess.error.api))
            } else if (isQuotedMsg) {
               number = quotedMsg.sender
               liwirya.groupParticipantsUpdate(from, [number], "remove")
                  .then(res =>
                     reply(`*Sukses mengeluarkan member..!*`))
                  .catch((err) => reply(mess.error.api))
            } else {
               reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            break

         case 'welcome': {
            if (!isGroup) return reply('Khusus Group!')
            if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Mau ngapain?, Fitur ini khusus admin")
            if (!args[0]) return reply('*Kirim Format*\n\n.welcome on\n.welcome off')
            if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
               if (isWelcome) return reply('Sudah aktif✓')
               welcome.push(from)
               fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
               reply('Suksess mengaktifkan welcome di group:\n' + groupName)
            } else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
               var posi = welcome.indexOf(from)
               welcome.splice(posi, 1)
               fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
               reply('Success menonaktifkan welcome di group:\n' + groupName)
            } else {
               reply('Kata kunci tidak ditemukan!')
            }
         }
         break

         case 'block': {
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
            let nomorNya = q
            await liwirya.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
            reply('Sukses Block Nomor')
         }
         break

         case 'unblock': {
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
            let nomorNya = q
            await liwirya.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
            reply('Sukses Unblock Nomor')
         }
         break

         case 'shop':
         case 'list':
            if (!isGroup) {
               return reply(mess.OnlyGrup);
            }
            if (db_respon_list.length === 0) {
               return reply(`Belum ada list message di database`);
            }
            if (!isAlreadyResponListGroup(from, db_respon_list)) {
               return reply(`Belum ada list message yang terdaftar di group ini`);
            }
            var arr_rows = [];
            for (let x of db_respon_list) {
               if (x.id === from) {
                  arr_rows.push({
                     title: x.key,
                     rowId: x.key
                  });
               }
            }
            let tekny = `Hai @${sender.split("@")[0]}\nBerikut list item yang tersedia di group ini!\n\nSilahkan ketik nama produk yang diinginkan!\n\n`;
            for (let i of arr_rows) {
               tekny += `Produk : ${i.title}\n\n`;
            }
            var listMsg = {
               text: tekny,
            };
            liwirya.sendMessage(from, listMsg);
            break;

         case 'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n*${command}* tes@apa\n\nAtau kalian bisa Reply/Kasih Image dengan caption: *${command}* tes@apa`)
            if (isImage || isQuotedImage) {
               if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
               let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender.split('@')[0]}.jpg`)
               let url = await TelegraPh(media)
               console.log(url)
               addResponList(from, args1, args2, true, url, db_respon_list)
               reply(`Berhasil menambah List menu : *${args1}*`)
               if (fs.existsSync(media)) return fs.unlinkSync(media)
            } else {
               if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
               addResponList(from, args1, args2, false, '-', db_respon_list)
               reply(`Berhasil menambah List menu : *${args1}*`)
            }
            break

         case 'dellist': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            var arr_rows = [];
            for (let x of db_respon_list) {
               if (x.id === from) {
                  arr_rows.push({
                     title: x.key,
                     rowId: `#hapuslist ${x.key}`
                  })
               }
            }
            let tekny = `Hai @${sender.split("@")[0]}\nSilahkan Hapus list dengan Mengetik *hapuslist* Nama list\n\nContoh: *hapuslist* Tes\n\n`;
            for (let i of arr_rows) {
               tekny += `List : ${i.title}\n\n`;
            }
            var listMsg = {
               text: tekny,
            };
            liwirya.sendMessage(from, listMsg)
         }
         break

         case 'hapuslist':
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            break
         case 'testi': {
            if (isGroup) return reply(mess.OnlyPM)
            if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
            var teks = `Hi @${sender.split("@")[0]}\nBerikut list testi\n\n`
            for (let x of db_respon_testi) {
               teks += `*LIST TESTI:* ${x.key}\n\n`
            }
            teks += `_Ingin melihat listnya?_\n_Ketik List Testi yang ada di atas_`
            var listMsg = {
               text: teks,
               mentions: [sender]
            }
            liwirya.sendMessage(from, listMsg, {
               quoted: msg
            })
         }
         break

         case 'addtesti':
            if (isGroup) return reply(mess.OnlyPM)
            if (!isOwner) return reply(mess.OnlyOwner)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (isImage || isQuotedImage) {
               if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} testi1@testimoni sc bot`)
               if (isAlreadyResponTesti(args1, db_respon_testi)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
               let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
               let tphurl = await TelegraPh(media)
               addResponTesti(args1, args2, true, tphurl, db_respon_testi)
               reply(`Berhasil menambah List testi *${args1}*`)
               if (fs.existsSync(media)) return fs.unlinkSync(media)
            } else {
               reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
            }
            break

         case 'deltesti':
            if (isGroup) return reply(mess.OnlyPM)
            if (!isOwner) return reply(mess.OnlyOwner)
            if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
            if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} testi1`)
            if (!isAlreadyResponTesti(q, db_respon_testi)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
            delResponTesti(q, db_respon_testi)
            reply(`Sukses delete list testi dengan key *${q}*`)
            break
         case 'listproduk':
         case 'produk': {
            if (isGroup) return reply(mess.OnlyPM)
            if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
            var teks = `Hi @${sender.split("@")[0]}\nBerikut list produk\n\n`
            for (let x of db_respon_produk) {
               teks += `*LIST PRODUK:* ${x.key}\n\n`
            }
            teks += `_Ingin melihat listnya?_\n_Ketik List Produk yang ada di atss_`
            var listMsg = {
               text: teks,
               mentions: [sender]
            }
            liwirya.sendMessage(from, listMsg, {
               quoted: msg
            })
         }
         break

         case 'addproduk':
            if (isGroup) return reply(mess.OnlyPM)
            if (!isOwner) return reply(mess.OnlyOwner)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (isImage || isQuotedImage) {
               if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} diamond_ml@list mu`)
               if (isAlreadyResponProduk(args1, db_respon_produk)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
               let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
               let tphurl = await TelegraPh(media)
               addResponProduk(args1, args2, true, tphurl, db_respon_produk)
               reply(`Berhasil menambah List Produk *${args1}*`)
               if (fs.existsSync(media)) return fs.unlinkSync(media)
            } else {
               reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
            }
            break

         case 'delproduk':
            if (isGroup) return reply(mess.OnlyPM)
            if (!isOwner) return reply(mess.OnlyOwner)
            if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
            if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} diamond_ml`)
            if (!isAlreadyResponProduk(q, db_respon_produk)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
            delResponProduk(q, db_respon_produk)
            reply(`Sukses delete list testi dengan key *${q}*`)
            break

         case 'deposit':
         case 'depo': {
            if (cekUser("id", sender) == null) {
               return liwirya.sendMessage(from, {
                  text: `🚫 Maaf, Anda belum terdaftar! Silakan hubungi admin untuk mendaftar.\n👤 Kontak: @${global.ownerNumber}`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            if (isGroup) {
               return reply(`🔒 Perintah ini hanya bisa digunakan di *Private Message*!`);
            }

            const rows = [{
                  title: "💳 Pembayaran Otomatis ✅",
                  rowId: "payqris",
                  description: "⚡Proses Otomatis Dan Bakal Di Cek Sistem "
               },
               {
                  title: "🧾 Pembayaran Manual ✅",
                  rowId: "paymanual",
                  description: "📋 Proses Manual Dan Diverifikasi Oleh Owner"
               }
            ];

            const dep_but = {
               text: `🌟 *Deposit Saldo* 🌟\n\n👋 Halo, ${sender.split('@')[0]}! \n\nIngin mengisi saldo?\n\nPilih metode pembayaran di bawah ini untuk melanjutkan:\n`,
               footer: `📌 Pastikan Anda mengikuti petunjuk untuk setiap metode!\n📩 Hubungi admin jika ada kendala.`,
               buttonText: "Pilih Metode 💸",
               sections: [{
                  title: "🔥 Pilihan Metode Deposit",
                  rows
               }]
            };

            liwirya.sendMessage(from, dep_but);
            break;
         }
         break

         case 'bukti':
            if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
               return reply(`⚠️ *Maaf, @${sender.split('@')[0]}!* \nSepertinya kamu belum pernah melakukan deposit. Silakan lakukan deposit terlebih dahulu. 🙏`);
            }
            if (isImage && isQuotedImage) {
               return reply(`📸 Kirim gambar dengan caption *Bukti* atau reply gambar yang sudah dikirim dengan caption *Bukti*.`);
            }

            await liwirya.downloadAndSaveMediaMessage(msg, "image", `./database/deposit/${sender.split('@')[0]}.jpg`);

            let oke_bang = fs.readFileSync(`./database/deposit/${sender.split('@')[0]}.jpg`);
            let data_depo = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"));

            let caption_bukti = `
🌟 *DEPOSIT USER* 🌟
━━━━━━━━━━━━━━━━━━━━━━
🆔 *ID*: ${data_depo.ID}
📱 *Nomor*: @${data_depo.number.split('@')[0]}
💳 *Metode Pembayaran*: ${data_depo.payment}
📅 *Tanggal*: ${data_depo.date.split(' ')[0]}
💰 *Jumlah Deposit*: Rp${toRupiah(data_depo.data.amount_deposit)}
🧾 *Pajak Admin*: Rp0
💵 *Total Pembayaran*: Rp${toRupiah(data_depo.data.amount_deposit)}
━━━━━━━━━━━━━━━━━━━━━━
📢 *Informasi*: 
Ada deposit baru nih, Kak! Mohon cek saldo pembayaran\n. Jika sudah masuk, konfirmasi dengan tombol *accdepo*.\n Jika belum, batalkan dengan mengetik *rejectdepo*.`;

            let bukti_bayar = {
               image: oke_bang,
               caption: caption_bukti,
               mentions: [data_depo.number],
               title: 'Bukti pembayaran',
               footer: 'Press The Button Below',
               headerType: 5
            }
            liwirya.sendMessage(`${global.ownerNumber}`, bukti_bayar)
            reply(`Mohon tunggu ya kak, sampai di Konfirmasi oleh owner ☺`)
            fs.unlinkSync(`./database/deposit/${sender.split('@')[0]}.jpg`)

            break

         case 'accdepo': {
            if (!isOwner) return reply('🚫 *Maaf, hanya owner yang bisa menggunakan perintah ini!*');
            if (!q) return reply(`❗ Contoh: *${prefix + command} 628xxx*`);

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });
            const orang = q.split(",")[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            const depositFile = depositPath + orang.split('@')[0] + '.json';

            try {
               const data_deposit = JSON.parse(fs.readFileSync(depositFile));

               addSaldo(data_deposit.number, Number(data_deposit.data.amount_deposit), db_saldo);

               const text_sukses = `
✅ *Deposit Berhasil Dikonfirmasi* ✅
📅 *Tanggal*: ${hari}, ${tglFormat}
🕛 *Waktu*: ${jam}

🆔 *ID Deposit*: ${data_deposit.ID}
👤 *Nomor*: @${data_deposit.number.split('@')[0]}
💳 *Metode Pembayaran*: ${data_deposit.payment}
📅 *Tanggal Deposit*: ${data_deposit.date.split(' ')[0]}
💰 *Jumlah Deposit*: Rp${toRupiah(data_deposit.data.amount_deposit)}
        `;

               await reply(text_sukses);

               await liwirya.sendMessage(data_deposit.number, {
                  text: `${text_sukses}\n\n🎉 Deposit kamu telah dikonfirmasi oleh admin!\nSilakan cek saldo dengan ketik *${prefix}saldo*.`,
                  mentions: [data_deposit.number]
               });

               fs.unlinkSync(depositFile);
            } catch (err) {
               await reply(`❌ *Error:* File deposit tidak ditemukan atau data tidak valid.`);
            }
            break;
         }
         break

         case 'rejectdepo': {
            if (!isOwner) return reply('🚫 *Maaf, hanya owner yang bisa menggunakan perintah ini!*');
            if (!q) return reply(`❗ Contoh: *${prefix + command} 628xxx*`);

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            const orang = q.split(",")[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            const depositFile = depositPath + orang.split('@')[0] + '.json';

            try {
               const data_deposit = JSON.parse(fs.readFileSync(depositFile));

               const text_reject = `
❌ *Deposit Ditolak* ❌
📅 *Tanggal*: ${hari}, ${tglFormat}
🕛 *Waktu*: ${jam}

🆔 *ID Deposit*: ${data_deposit.ID}
👤 *Nomor*: @${data_deposit.number.split('@')[0]}
📌 *Catatan*: Maaf, deposit kamu ditolak. Silakan hubungi owner di @${global.ownerNumber.split('@')[0]} untuk info lebih lanjut.
        `;

               await reply('✅ *Deposit berhasil ditolak.*');

               await liwirya.sendMessage(data_deposit.number, {
                  text: text_reject,
                  mentions: [data_deposit.number, global.ownerNumber]
               });

               fs.unlinkSync(depositFile);
            } catch (err) {
               await reply(`❌ *Error:* File deposit tidak ditemukan atau data tidak valid.`);
            }
            break;
         }
         break

         case 'saldo': {
    if (cekUser("id", sender) == null) {
        return await reply('🚫 *Anda Belum Terdaftar!*\nSilakan ketik *.daftar* untuk membuat akun.');
    }

    try {
        const user = db_user.find(u => u.id === sender);
        const userName = user?.name || pushname;
        const userBalance = toRupiah(cekSaldo(sender, db_saldo));
        const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', dateStyle: 'long', timeStyle: 'short' });

        const balanceCard = `
╔═════════════════╗
║  💳 *INFORMASI SALDO ANDA* ║
╚═════════════════╝

Halo, *${userName}*. Berikut adalah rincian saldo Anda saat ini.

╭─── 💰 *Detail Saldo* ───╮
│
│   *Saldo Tersedia:*
│   
│   *Rp${userBalance},-*
│   
╰───────────────╯
`;

        await liwirya.sendMessage(from, { text: balanceCard }, { quoted: msg });

    } catch (error) {
        console.error("Error di case 'saldo':", error);
        await reply('⚠️ Terjadi kesalahan saat memuat informasi saldo Anda.');
    }
    break;
}
         break

         case 'listsaldo': {
            if (!isOwner) return reply('🚫 *Maaf, hanya owner yang bisa menggunakan perintah ini!*');

            try {
               const tanggal = new Date();
               const hari = tanggal.toLocaleDateString('id-ID', {
                  weekday: 'long'
               });
               const tglFormat = tanggal.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
               });
               const jam = tanggal.toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Jakarta'
               });
               const daftarSaldo = db_saldo.sort((a, b) => b.saldo - a.saldo);
               if (daftarSaldo.length === 0) return reply('📉 *Daftar saldo kosong.*');

               let teks = `
💰 *Daftar Saldo Pengguna* 💰
📅 *Tanggal*: ${hari}, ${tglFormat}
🕛 *Waktu*: ${jam}

📋 *Daftar (Top ${Math.min(daftarSaldo.length, 20)} Pengguna)*:
        `;
               daftarSaldo.slice(0, 20).forEach((user, index) => {
                  const saldo = user?.saldo ?? 0;
                  teks += ` ${index + 1}. ${user.id.split('@')[0]} - Rp${toRupiah(saldo)}\n`;
               });
               teks += `
📌 *Catatan*: Hanya menampilkan maksimal 20 pengguna dengan saldo tertinggi.
        `;

               await liwirya.sendMessage(from, {
                  text: teks
               }, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in listsaldo:', error);
               await reply('❌ *Terjadi kesalahan saat memuat daftar saldo.* Silakan coba lagi.');
            }
            break;
         }
         break

         case 'topsaldo': {
    try {
        if (db_saldo.length === 0) return reply('📉 Papan peringkat masih kosong.');

        const topSaldoUsers = db_saldo.sort((a, b) => b.saldo - a.saldo).slice(0, 10);
        const timestamp = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

        let leaderboardText = `
╔═════════════════╗
║    🏆 *TOP 10 SULTAN ${global.namaStore.toUpperCase()}* 🏆 ║
╚═════════════════╝

Berikut adalah 10 pengguna dengan saldo tertinggi per tanggal ${timestamp}. Terus tingkatkan transaksimu!

`;

        topSaldoUsers.forEach((user, index) => {
            const userData = db_user.find(u => u.id === user.id);
            let displayName = `User-${user.id.substring(4, 8)}`;
            if (userData && userData.name) {
                const nameParts = userData.name.split(' ');
                displayName = nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1].charAt(0)}.` : nameParts[0];
            }
            
            let rank;
            if (index === 0) rank = '🥇';
            else if (index === 1) rank = '🥈';
            else if (index === 2) rank = '🥉';
            else rank = ` ${index + 1}.`;

            leaderboardText += `\n ${rank} *${displayName}* - Rp${toRupiah(user.saldo)}`;
        });
        
        leaderboardText += `\n\n- - - - - - - - - - - - - - - - - - - - -
*Nama pengguna disamarkan untuk menjaga privasi.*`;

        await liwirya.sendMessage(from, { text: leaderboardText }, { quoted: msg });
        
    } catch (error) {
        console.error('Error in topsaldo:', error);
        await reply('❌ Terjadi kesalahan saat memuat papan peringkat.');
    }
    break;
}
         break;

         case 'addsaldo': {
    if (!isOwner) return reply('🚫 Perintah ini khusus untuk Owner.');

    if (!q || !q.includes('|')) {
        const usageCard = `
⚙️ *Perintah: Tambah Saldo* ⚙️
Menambahkan saldo ke akun pengguna.

*Format:*
\`\`\`${prefix}addsaldo [nomor]|[jumlah]\`\`\`

*Contoh:*
\`\`\`${prefix}addsaldo 6281234567890|50000\`\`\`

*Penting:* Gunakan nomor tanpa awalan '+' atau spasi.`;
        return reply(usageCard);
    }

    const [phoneNumber, amountStr] = q.split('|');
    if (!/^\d+$/.test(phoneNumber) || !/^\d+$/.test(amountStr)) {
        return reply('❌ *Format Salah!*\nPastikan nomor dan jumlah hanya berisi angka.');
    }

    const userId = `${phoneNumber}@s.whatsapp.net`;
    const amount = Number(amountStr);
    const userExists = db_user.find(u => u.id === userId);
    if (!userExists) return reply(`❌ *Pengguna Tidak Terdaftar!*\nNomor ${phoneNumber} belum terdaftar di bot.`);

    try {
        const balanceBefore = cekSaldo(userId, db_saldo);
        addSaldo(userId, amount, db_saldo);
        const balanceAfter = cekSaldo(userId, db_saldo);
        const userName = userExists.name;
        
        const ownerReceipt = `
✅ *TRANSAKSI ADMIN BERHASIL* ✅

Tipe: *PENAMBAHAN SALDO*
Tanggal: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}

╭─── *Rincian Transaksi* ───╮
│
│  👤 *Untuk:* ${userName} (@${phoneNumber})
│  💰 *Jumlah:* +Rp${toRupiah(amount)}
│
│  *Saldo Awal:* Rp${toRupiah(balanceBefore)}
│  *Saldo Akhir:* Rp${toRupiah(balanceAfter)}
│
╰────────────────╯`;
        await liwirya.sendMessage(from, { text: ownerReceipt, mentions: [userId] }, { quoted: msg });

        const userNotification = `
🎉 *SELAMAT, SALDO ANDA BERTAMBAH!* 🎉

Admin telah menambahkan saldo ke akun Anda.

╭─── *Rincian Penambahan* ───╮
│
│  💰 *Jumlah Diterima:*
│      *+Rp${toRupiah(amount)}*
│
│  💳 *Saldo Anda Sekarang:*
│      *Rp${toRupiah(balanceAfter)}*
│
╰─────────────────╯

Gunakan perintah *.menu* untuk mulai bertransaksi.`;
        await liwirya.sendMessage(userId, { text: userNotification }, {});

    } catch (error) {
        console.error('Error adding saldo:', error);
        await reply('⚠️ Gagal memproses penambahan saldo.');
    }
    break;
}

case 'minsaldo': {
    if (!isOwner) return reply('🚫 Perintah ini khusus untuk Owner.');

    if (!q || !q.includes('|')) {
        const usageCard = `
⚙️ *Perintah: Kurangi Saldo* ⚙️
Mengurangi saldo dari akun pengguna.

*Format:*
\`\`\`${prefix}minsaldo [nomor]|[jumlah]\`\`\`

*Contoh:*
\`\`\`${prefix}minsaldo 6281234567890|10000\`\`\`
`;
        return reply(usageCard);
    }
    
    const [phoneNumber, amountStr] = q.split('|');
    if (!/^\d+$/.test(phoneNumber) || !/^\d+$/.test(amountStr)) {
        return reply('❌ *Format Salah!*\nPastikan nomor dan jumlah hanya berisi angka.');
    }

    const userId = `${phoneNumber}@s.whatsapp.net`;
    const amount = Number(amountStr);
    const balanceBefore = cekSaldo(userId, db_saldo);
    const userExists = db_user.find(u => u.id === userId);
    
    if (!userExists) return reply(`❌ *Pengguna Tidak Terdaftar!*\nNomor ${phoneNumber} tidak ada di database.`);
    if (balanceBefore < amount) return reply(`⚠️ *Saldo Tidak Cukup!*\nSaldo pengguna (@${phoneNumber}) hanya Rp${toRupiah(balanceBefore)}.`, { mentions: [userId] });

    try {
        minSaldo(userId, amount, db_saldo);
        const balanceAfter = cekSaldo(userId, db_saldo);
        const userName = userExists.name;
        
        const ownerReceipt = `
✅ *TRANSAKSI ADMIN BERHASIL* ✅

Tipe: *PENGURANGAN SALDO*
Tanggal: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}

╭─── *Rincian Transaksi* ───╮
│
│  👤 *Untuk:* ${userName} (@${phoneNumber})
│  💰 *Jumlah:* -Rp${toRupiah(amount)}
│
│  *Saldo Awal:* Rp${toRupiah(balanceBefore)}
│  *Saldo Akhir:* Rp${toRupiah(balanceAfter)}
│
╰─────────────────╯`;
        await liwirya.sendMessage(from, { text: ownerReceipt, mentions: [userId] }, { quoted: msg });

        const userNotification = `
📄 *INFORMASI SALDO* 📄

Admin telah melakukan penyesuaian saldo pada akun Anda.

╭─── *Rincian Pengurangan* ───╮
│
│  💰 *Jumlah Dikurangi:*
│      *-Rp${toRupiah(amount)}*
│
│  💳 *Sisa Saldo Anda:*
│      *Rp${toRupiah(balanceAfter)}*
│
╰─────────────────╯

Hubungi admin jika ini adalah sebuah kesalahan.`;
        await liwirya.sendMessage(userId, { text: userNotification }, {});
        
    } catch (error) {
        console.error('Error reducing saldo:', error);
        await reply('⚠️ Gagal memproses pengurangan saldo.');
    }
    break;
}
break

         break

         case 'topup': {
            if (cekUser("id", sender) == null) {
               return liwirya.sendMessage(from, {
                  text: `🚫 *Akses Ditolak!* \nKamu bukan pengguna terdaftar. Hubungi admin: @${global.ownerNumber}`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            if (cekSaldo(sender, db_saldo) < 1) {
               return reply(`❌ *Saldo Kosong!* \nMaaf *${pushname}*, saldo kamu *Rp${toRupiah(cekSaldo(sender, db_saldo))}*. \nSilakan lakukan *Deposit* terlebih dahulu! 💸`);
            }

            if (!q) {
               return reply(`📝 *Ingin Topup?* \nKetik *Pricelist* untuk melihat daftar produk! 🛍️`);
            }

            if (!fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
               let cekhar = new URLSearchParams();
               cekhar.append("api_key", apikeyAtlantic);
               cekhar.append("type", "prabayar");

               fetch("https://atlantich2h.com/layanan/price_list", {
                     method: "POST",
                     body: cekhar,
                     redirect: 'follow'
                  })
                  .then(responsee => responsee.json())
                  .then(ress => {
                     let listproduk = false;
                     for (let x of ress.data) {
                        if (x.code === q.split(",")[0]) {
                           listproduk = x;
                        }
                     }

                     if (!listproduk) {
                        return reply(`⚠️ *Kode Invalid!* \nKode produk *${q.split(",")[0]}* tidak ditemukan. Cek *Pricelist*!`);
                     }

                     let kntungan = (untung / 100) * listproduk.price.replace(/[^0-9]/g, '');
                     let totalHarga = Number(listproduk.price.replace(/[^0-9]/g, '')) + Number(Math.ceil(kntungan));
                     if (cekSaldo(sender, db_saldo) < totalHarga) {
                        return reply(`❌ *Saldo Kurang!* \nMaaf *${pushname}*, saldo kamu kurang dari *Rp${toRupiah(totalHarga)}*. \nKetik *Deposit* untuk isi saldo! 💳`);
                     }

                     let object_buy = {
                        session: "target",
                        number: sender,
                        result: "",
                        data: {
                           target: "",
                           code: q,
                           idtopup: "",
                           id: "",
                           price: "",
                           layanan: ""
                        }
                     };

                     fs.writeFile(topupPath + sender.split("@")[0] + ".json", JSON.stringify(object_buy, null, 3), () => {
                        reply(`✅ *Siap Topup!* \nMasukkan *ID/Nomor Target* sekarang: 📲`);
                     });
                  })
                  .catch(err => {
                     reply(`🚨 *Error!* \nTerjadi kesalahan saat memproses topup. Coba lagi nanti!`);
                     console.error(err);
                  });
            } else {
               return reply(`⏳ *Sesi Topup Sedang Berlangsung!* \nMohon tunggu hingga proses topup selesai.`);
            }
         }
         break

         case 'setprofit': {
            if (!isOwner) {
               return reply('🚫 *Akses Ditolak!*\nPerintah ini hanya untuk Owner.');
            }

            if (!q || !q.includes('%')) {
               const usageCard = `
╔═══ ≪ *PENGATURAN PROFIT* ≫ ═══╗
║
║   ⚙️ *Cara Menggunakan Perintah:*
║   \`\`\`${prefix + command} [persentase]% \`\`\`
║
║   *Contoh:*
║   \`\`\`${prefix + command} 15% \`\`\`
║
║   *Fungsi:*
║   Mengatur persentase keuntungan
║   yang akan ditambahkan pada harga
║   dasar dari produk H2H.
║
╚══════════════════════╝`;
               return reply(usageCard);
            }

            const profitPercentage = parseInt(q.replace(/[^0-9]/g, ''));

            if (isNaN(profitPercentage) || profitPercentage < 1 || profitPercentage > 99) {
               return reply('❌ *Input Tidak Valid!*\nHarap masukkan persentase antara 1% hingga 99%.');
            }

            try {
               fs.writeFileSync('./database/profit', profitPercentage.toString());
               const successCard = `
✅ *PENGATURAN BERHASIL* ✅

Persentase keuntungan (profit) untuk semua transaksi telah berhasil diperbarui.

*Profit Baru:*
> *${profitPercentage}%*

Perubahan ini akan berlaku untuk semua transaksi berikutnya.`;
               await reply(successCard);
            } catch (error) {
               console.error('Error writing to profit database:', error);
               await reply('⚠️ *Operasi Gagal!*\nTerjadi kesalahan internal saat mencoba menyimpan pengaturan profit.');
            }
            break;
         }
         break

         case 'pricelist': {
            if (isGroup) return await reply('🚫 Katalog produk hanya bisa dilihat di *chat pribadi*.');

            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 Anda belum terdaftar. Silakan ketik *.daftar* dulu, ya.`
               }, {
                  quoted: msg
               });
            }

            // --- Cek Keanggotaan Grup (UI Diperbarui) ---
            // (Letakkan logika pengecekan grup Anda di sini, jika masih diperlukan)
            // ...
            // Contoh pesan penolakan yang baru:
            /*
    if (!isMember) {
        const joinCard = `
╔═══ ≪ *AKSES DIBUTUHKAN* ≫ ═══╗
║
║   Untuk melihat katalog produk, Anda
║   wajib bergabung ke grup komunitas
║   kami terlebih dahulu.
║
║   *Grup Wajib:*
${missingGroups.map((link, i) => `║   ${i + 1}. ${link}`).join('\n')}
║
║   Silakan bergabung, lalu coba lagi
║   perintah ini. Terima kasih! 🙏
║
╚═════════════════════════════╝`;
        return await liwirya.sendMessage(from, { text: joinCard }, { quoted: msg });
    }
    */

            const user = db_user.find(u => u.id === sender);
            const catalogHeader = `
Halo, *${user?.name || pushname}*! 👋

Selamat datang di katalog produk *${global.namaStore}*. Silakan pilih kategori yang Anda minati di bawah ini.`;

            const sections = [{
               title: "Kategori Produk Digital",
               rows: [{
                     title: "🎮 Top Up Game",
                     rowId: `${prefix}game`,
                     description: "Diamond ML, FF, UC PUBG, Valorant, dll."
                  },
                  {
                     title: "💸 E-Wallet & Voucher",
                     rowId: `${prefix}ewallet`,
                     description: "Saldo DANA, GoPay, OVO, Voucher Google, dll."
                  },
                  {
                     title: "📡 Kuota & Pulsa",
                     rowId: `${prefix}kuota`,
                     description: "Paket data & pulsa semua operator."
                  },
                  {
                     title: "📺 Streaming & Aplikasi",
                     rowId: `${prefix}streaming`,
                     description: "Netflix, YouTube, Spotify, Canva Pro, dll."
                  }
               ]
            }];

            const listMessage = {
               text: catalogHeader,
               footer: `Pilih kategori untuk melihat daftar produknya.`,
               title: "Katalog Produk & Layanan",
               buttonText: 'Lihat Kategori',
               sections: sections
            };

            await liwirya.sendMessage(from, listMessage, {
               quoted: msg
            });
            break;
         }
         break

         case 'game': {
            if (isGroup) return await reply('🚫 Silakan lihat produk di *chat pribadi*.');
            if (cekUser("id", sender) == null) return;

            const title = "🎮 *TOP UP GAME* 🎮";
            const sections = [{
               title: "Pilih Game Favoritmu",
               rows: [{
                     title: 'Free Fire',
                     rowId: `${prefix}ff`,
                     description: '🔥 Top up FF murah, siap booyah tiap hari!'
                  },
                  {
                     title: 'PUBG Mobile',
                     rowId: `${prefix}pubg`,
                     description: '🎯 UC PUBG hemat, dominasi medan perang!'
                  },
                  {
                     title: 'Mobile Legends (Lokal)',
                     rowId: `${prefix}mlid`,
                     description: '⚔️ Diamond ML lokal, murah & cepat!'
                  },
                  {
                     title: 'Mobile Legends (Global)',
                     rowId: `${prefix}mlgb`,
                     description: '🌍 Diamond ML global, stok selalu ada!'
                  },
                  {
                     title: 'Call of Duty Mobile',
                     rowId: `${prefix}cod`,
                     description: '🔫 CP CODM murah, gaspol ke battlefield!'
                  },
                  {
                     title: 'Genshin Impact',
                     rowId: `${prefix}genshin`,
                     description: '✨ Genesis Crystal untuk gacha impianmu!'
                  },
                  {
                     title: 'Stumble Guys',
                     rowId: `${prefix}stumble`,
                     description: '🤩 Gems SG, lari seru tanpa jatuh!'
                  },
                  {
                     title: 'Point Blank',
                     rowId: `${prefix}pb`,
                     description: '💥 Cash PB, jadi trooper legendaris!'
                  },
                  {
                     title: 'Asphalt 9',
                     rowId: `${prefix}asphalt`,
                     description: '🏎️ Token Asphalt 9, kebut di lintasan!'
                  },
                  {
                     title: 'Astral Guardian',
                     rowId: `${prefix}astralg`,
                     description: '🌌 Top up Astral Guardian, kuasai galaksi!'
                  },
                  {
                     title: 'Honor of Kings',
                     rowId: `${prefix}hok`,
                     description: '🏆 Token HoK, jadi legenda di arena!'
                  },
                  {
                     title: 'Ace Racer',
                     rowId: `${prefix}arc`,
                     description: '🚗 Koin Ace Racer, kejar podium juara!'
                  },
                  {
                     title: '8 Ball Pool',
                     rowId: `${prefix}8bl`,
                     description: '🎱 Cash 8 Ball Pool, kuasai meja biliar!'
                  },
                  {
                     title: 'Arena Breakout',
                     rowId: `${prefix}ab`,
                     description: '🔪 Top up Arena Breakout, taklukkan musuh!'
                  },
                  {
                     title: 'Arena of Valor',
                     rowId: `${prefix}aov`,
                     description: '⚡ Voucher AoV, menuju kemenangan epik!'
                  },
                  {
                     title: 'Valorant',
                     rowId: `${prefix}valorant`,
                     description: '🎯 Valorant Points, unlock skin & agent kece!'
                  },
                  {
                     title: 'Garena Undawn',
                     rowId: `${prefix}undawn`,
                     description: '🧟‍♂️ RC Undawn, bertahan dari serangan zombie!'
                  },
                  {
                     title: 'Zepeto',
                     rowId: `${prefix}zepeto`,
                     description: '💃 ZEMs & Coins, style avatar kerenmu!'
                  },
                  {
                     title: 'Roblox',
                     rowId: `${prefix}roblox`,
                     description: '🎮 Robux, ciptakan petualangan epikmu!'
                  },
                  {
                     title: 'Werewolf (Party Game)',
                     rowId: `${prefix}werewolf`,
                     description: '🐺 Top up Werewolf, jadi alpha di pesta!'
                  },
                  {
                     title: 'Watcher of Realms',
                     rowId: `${prefix}watcherofrealms`,
                     description: '🛡️ Gems Watcher, taklukkan dunia fantasi!'
                  },
                  {
                     title: 'Tower of Fantasy',
                     rowId: `${prefix}tof`,
                     description: '🌌 Tanium ToF, jelajahi dunia open-world!'
                  },
                  {
                     title: 'Tom and Jerry: Chase',
                     rowId: `${prefix}tnj`,
                     description: '🐱‍👤 Koin TnJ, kejar atau lari seru!'
                  },
                  {
                     title: 'The Ants: Underground Kingdom',
                     rowId: `${prefix}ants`,
                     description: '🐜 Diamond Ants, bangun kerajaan semute!'
                  },
                  {
                     title: 'Super Sus',
                     rowId: `${prefix}supersus`,
                     description: '🚀 Gold Super Sus, unggul di luar angkasa!'
                  },
                  {
                     title: 'State of Survival',
                     rowId: `${prefix}sos`,
                     description: '🧟 Biocaps SoS, bertahan di dunia zombie!'
                  },
                  {
                     title: 'Speed Drifters',
                     rowId: `${prefix}speeddrifters`,
                     description: '🏁 Koin Speed Drifters, gaspol di lintasan!'
                  },
                  {
                     title: 'Snowbreak: Containment Zone',
                     rowId: `${prefix}snowbreak`,
                     description: '❄️ Crystal Snowbreak, lawan titan di masa depan!'
                  },
                  {
                     title: 'Dragonheir: Silent Gods',
                     rowId: `${prefix}dragonheir`,
                     description: '🐉 Heliolite Dice, petualang di dunia fantasi!'
                  },
                  {
                     title: 'Hatsune Miku: Colorful Stage!',
                     rowId: `${prefix}hatsunemiku`,
                     description: '🎤 Crystals Miku, mainkan ritme dengan Vocaloid!'
                  },
                  {
                     title: 'Honkai Impact 3',
                     rowId: `${prefix}honkai`,
                     description: '🌌 Crystals Honkai, bertarung dengan Valkyrie!'
                  },
                  {
                     title: 'Light of Thel: New Era',
                     rowId: `${prefix}thel`,
                     description: '⚡ Diamonds Thel, kuasai dunia MMORPG epik!'
                  },
                  {
                     title: 'Auto Chess',
                     rowId: `${prefix}autochess`,
                     description: '♟️ Candies Auto Chess, atur strategi di papan catur!'
                  },
                  {
                     title: 'King God Palace',
                     rowId: `${prefix}kinggod`,
                     description: '🏰 Gems KGP, menang di auto chess epik!'
                  },
                  {
                     title: 'Be The King',
                     rowId: `${prefix}betheking`,
                     description: '👑 Jade Be The King, jadi raja di kerajaan!'
                  },
                  {
                     title: 'Bleach Mobile 3D',
                     rowId: `${prefix}bleach`,
                     description: '⚔️ Crystals Bleach, bertarung ala Soul Reaper!'
                  },
                  {
                     title: 'Bullet Angel',
                     rowId: `${prefix}bulletangel`,
                     description: '🔫 Diamonds Bullet Angel, tembak di battle royale!'
                  },
                  {
                     title: 'Chaos Crisis',
                     rowId: `${prefix}chaoscrisis`,
                     description: '🌪️ Gems Chaos Crisis, kuasai kekacauan epik!'
                  },
                  {
                     title: 'Clash of Clans',
                     rowId: `${prefix}coc`,
                     description: '🏰 Gems CoC, bangun desa tak terkalahkan!'
                  },
                  {
                     title: 'Clash Royale',
                     rowId: `${prefix}clashroyale`,
                     description: '🎴 Gems Clash Royale, menang di arena kartu!'
                  },
                  {
                     title: 'Cloud Song',
                     rowId: `${prefix}cloudsong`,
                     description: '☁️ Diamonds Cloud Song, petualang di dunia awan!'
                  },
                  {
                     title: 'Dark Continent Mist',
                     rowId: `${prefix}darkcontinent`,
                     description: '🌫️ Gems Dark Continent, jelajahi kabut misterius!'
                  },
                  {
                     title: 'Dragon Raja - SEA',
                     rowId: `${prefix}dragonraja`,
                     description: '🐉 Coupons Raja, dominasi dunia MMORPG!'
                  },
                  {
                     title: 'Eggy Party',
                     rowId: `${prefix}eggyparty`,
                     description: '🥚 Egg Coins, pesta seru ala Fall Guys!'
                  },
                  {
                     title: 'Ensemble Stars Music',
                     rowId: `${prefix}ensemble`,
                     description: '🎶 Diamonds Ensemble, gacha idol terbaik!'
                  },
                  {
                     title: 'EOS RED',
                     rowId: `${prefix}eosred`,
                     description: '⚔️ Gems EOS RED, petualangan MMORPG epik!'
                  },
                  {
                     title: 'Era of Celestial',
                     rowId: `${prefix}eraofcelestial`,
                     description: '🌌 Diamonds Celestial, kuasai alam semesta!'
                  },
                  {
                     title: 'Eternal City',
                     rowId: `${prefix}eternalcity`,
                     description: '🏰 Gems Eternal City, jelajahi kota abadi!'
                  },
                  {
                     title: 'Farlight 84',
                     rowId: `${prefix}farlight`,
                     description: '🔫 Diamonds Farlight, menang di battle royale!'
                  },
                  {
                     title: 'FC Mobile',
                     rowId: `${prefix}fcmobile`,
                     description: '⚽ FIFA Points, jadi bintang lapangan!'
                  },
                  {
                     title: 'Football Master 2',
                     rowId: `${prefix}footballmaster`,
                     description: '⚽ Gems FM2, kelola tim juara!'
                  },
                  {
                     title: 'Goddess of Victory: Nikke',
                     rowId: `${prefix}nikke`,
                     description: '🔫 Gems Nikke, tembak dengan waifu!'
                  },
                  {
                     title: 'Growtopia',
                     rowId: `${prefix}growtopia`,
                     description: '🌱 Gems Growtopia, bangun dunia kreatif!'
                  },
                  {
                     title: 'Hago',
                     rowId: `${prefix}hago`,
                     description: '🎮 Diamonds Hago, seru main & ngobrol!'
                  },
                  {
                     title: 'Harry Potter: Magic Awakened',
                     rowId: `${prefix}harrypotter`,
                     description: '🪄 Gems HP, sihir di dunia Hogwarts!'
                  },
                  {
                     title: 'Heroes Evolved',
                     rowId: `${prefix}heroes`,
                     description: '⚡ Tokens Heroes, menang di arena MOBA!'
                  },
                  {
                     title: 'Honkai Star Rail',
                     rowId: `${prefix}starrail`,
                     description: '🌌 Stellar Jade, gacha di galaksi epik!'
                  },
                  {
                     title: 'Hyper Front',
                     rowId: `${prefix}hyperfront`,
                     description: '🔫 Credits Hyper Front, tembak ala Valorant!'
                  },
                  {
                     title: 'Identity V',
                     rowId: `${prefix}identityv`,
                     description: '🕵️‍♂️ Echoes Identity V, selamat dari horor!'
                  },
                  {
                     title: 'Ragnarok X Next Generation',
                     rowId: `${prefix}ragnarokx`,
                     description: '🛡️ Top up Ragnarok X: Next Generation cepat & aman!'
                  },
                  {
                     title: 'Ragnarok Origin',
                     rowId: `${prefix}ragnarokorigin`,
                     description: '⚔️ Top up Ragnarok Origin langsung masuk!'
                  },
                  {
                     title: 'Ragnarok M: Eternal Love',
                     rowId: `${prefix}ragnarokm`,
                     description: '💖 Top up Ragnarok M: Eternal Love tanpa ribet!'
                  },
                  {
                     title: 'Sausage Man',
                     rowId: `${prefix}sausageman`,
                     description: '🌭 Top up Sausage Man cepat & harga bersahabat!'
                  },
                  {
                     title: 'Rise of Kingdoms',
                     rowId: `${prefix}riseofkingdoms`,
                     description: '🏰 Top up Rise of Kingdoms cepat dan terpercaya!'
                  },
               ]
            }];

            const listMessage = {
               text: title,
               footer: "Klik produk untuk melihat daftar harganya.",
               title: "Daftar Game",
               buttonText: "Lihat Produk Game",
               sections: sections
            };

            await liwirya.sendMessage(from, listMessage, {
               quoted: msg
            });
            break;
         }
         break

         case 'ewallet': {
            if (isGroup) return await reply('🚫 Silakan lihat produk di *chat pribadi*.');
            if (cekUser("id", sender) == null) return;

            const title = "💸 *TOP UP E-Wallet & Voucher* 💸";
            const sections = [{
               title: "Pilih Ewallet Favoritmu",
               rows: [{
                     title: 'OVO',
                     rowId: `${prefix}ovo`,
                     description: '💰 Top up OVO, transaksi mudah & cepat!'
                  },
                  {
                     title: 'GoPay',
                     rowId: `${prefix}gopay`,
                     description: '🚀 Isi GoPay, nikmati kemudahan bayar!'
                  },
                  {
                     title: 'DANA',
                     rowId: `${prefix}dana`,
                     description: '💳 Saldo DANA, bayar apa saja gampang!'
                  },
                  {
                     title: 'ShopeePay',
                     rowId: `${prefix}shopeepay`,
                     description: '🛍️ Isi ShopeePay, belanja tanpa batas!'
                  },
                  {
                     title: 'LinkAja',
                     rowId: `${prefix}linkaja`,
                     description: '🔗 Top up LinkAja, serba praktis!'
                  },
                  {
                     title: 'AstraPay',
                     rowId: `${prefix}astrapay`,
                     description: '💸 Isi AstraPay, bayar cepat & aman!'
                  },
                  {
                     title: 'BRI BRIZZI',
                     rowId: `${prefix}brizzi`,
                     description: '💳 Top up BRIZZI, transaksi praktis!'
                  },
                  {
                     title: 'DOKU',
                     rowId: `${prefix}doku`,
                     description: '💰 Saldo DOKU, bayar dengan mudah!'
                  },
                  {
                     title: 'Grab',
                     rowId: `${prefix}grab`,
                     description: '🚗 Top up Grab, perjalanan & pesanan lancar!'
                  },
                  {
                     title: 'Maxim',
                     rowId: `${prefix}maxim`,
                     description: '🚕 Top up Maxim, perjalanan & pesanan lebih hemat!'
                  },
                  {
                     title: 'i.saku',
                     rowId: `${prefix}isaku`,
                     description: '🛒 Saldo i.saku, belanja di Indomaret!'
                  },
                  {
                     title: 'Google Play Indonesia',
                     rowId: `${prefix}googleplayid`,
                     description: '🎫 Voucher Google Play ID, beli app & game!'
                  },
                  {
                     title: 'Google Play Korea Selatan',
                     rowId: `${prefix}googleplaykr`,
                     description: '🎫 Voucher Google Play KR, eksklusif Korea!'
                  },
                  {
                     title: 'Google Play US Region',
                     rowId: `${prefix}googleplayus`,
                     description: '🎫 Voucher Google Play US, konten global!'
                  },
                  {
                     title: 'Indomaret',
                     rowId: `${prefix}indomaret`,
                     description: '🛒 Voucher Indomaret, belanja kebutuhan harian!'
                  },
                  {
                     title: 'HOTELMURAH',
                     rowId: `${prefix}hotelmurah`,
                     description: '🏨 Booking HOTELMURAH, liburan hemat!'
                  },
               ]
            }];

            const listMessage = {
               text: title,
               footer: "Klik produk untuk melihat daftar harganya.",
               title: "Daftar E-Wallet & Voucher",
               buttonText: "Lihat Produk Ewallet",
               sections: sections
            };

            await liwirya.sendMessage(from, listMessage, {
               quoted: msg
            });
            break;
         }
         break
         
         case 'kuota': {
    if (isGroup) return await reply('🚫 Silakan lihat produk di *chat pribadi*.');
    if (cekUser("id", sender) == null) return; 

    const title = "📡 *TOP UP KOUTA & PULSA* 📡";
    const sections = [{
        title: "Pilih Kuota & Pulsa Favoritmu",
        rows: [
            {
                        title: 'Pulsa Smartfren',
                        rowId: `${prefix}pul_smartfren`,
                        description: '📲 Pulsa Smartfren, cepat masuk, siap pakai!'
                     },
                     {
                        title: 'Pulsa Telkomsel',
                        rowId: `${prefix}pul_telkomsel`,
                        description: '☎️ Pulsa Telkomsel, semua nominal ready!'
                     },
                     {
                        title: 'Pulsa Indosat',
                        rowId: `${prefix}pul_indosat`,
                        description: '📞 Pulsa IM3, instan & harga bersahabat!'
                     },
                     {
                        title: 'Pulsa Axis',
                        rowId: `${prefix}pul_axis`,
                        description: '🔋 Pulsa Axis, langsung aktif tanpa nunggu!'
                     },
                     {
                        title: 'Pulsa Three',
                        rowId: `${prefix}pul_three`,
                        description: '⚡ Pulsa Tri, kilat masuk, no lemot!'
                     },
                     {
                        title: 'Pulsa By.U',
                        rowId: `${prefix}pul_byu`,
                        description: '📱 Paket data By.U, simpel & hemat kuota!'
                     },
                     {
                        title: 'Smartfren',
                        rowId: `${prefix}smartfren`,
                        description: '📶 Kuota Smartfren, streaming tanpa buffering!'
                     },
                     {
                        title: 'Telkomsel',
                        rowId: `${prefix}telkomsel`,
                        description: '📱 Paket Telkomsel, internet stabil & kencang!'
                     },
                     {
                        title: 'Indosat',
                        rowId: `${prefix}indosat`,
                        description: '💛 Kuota IM3, internetan hemat setiap hari!'
                     },
                     {
                        title: 'Axis',
                        rowId: `${prefix}axis`,
                        description: '🟣 Paket Axis, kuota melimpah harga murah!'
                     },
                     {
                        title: 'Three',
                        rowId: `${prefix}three`,
                        description: '3️⃣ Kuota Tri, online nonstop 24/7!'
                     },
                     {
                        title: 'By.U',
                        rowId: `${prefix}byu`,
                        description: '📱 Paket data By.U, simpel & hemat kuota!'
                     },
        ]
    }];
    
    const listMessage = {
        text: title,
        footer: "Klik produk untuk melihat daftar harganya.",
        title: "Daftar Kuota & Pulsa",
        buttonText: "Lihat Produk Kuota & Pulsa",
        sections: sections
    };
    
    await liwirya.sendMessage(from, listMessage, { quoted: msg });
    break;
}
break

case 'streaming': {
    if (isGroup) return await reply('🚫 Silakan lihat produk di *chat pribadi*.');
    if (cekUser("id", sender) == null) return; 

    const title = "📺 *TOP UP Streaming & Buy Aplikasi Premium* 📺";
    const sections = [{
        title: "Pilih Streaming & Aplikasi Premium Favoritmu",
        rows: [
             {
                        title: 'Viu',
                        rowId: `${prefix}viu`,
                        description: '📺 Viu Premium, drakor & film tanpa iklan!'
                     },
                     {
                        title: 'Alight Motion',
                        rowId: `${prefix}alight`,
                        description: '🎬 Alight Motion Pro, edit video ala profesional!'
                     },
                     {
                        title: 'YouTube Premium',
                        rowId: `${prefix}yt`,
                        description: '🎥 YouTube Premium, streaming bebas iklan & offline!'
                     },
                     {
                        title: 'Vidio Premium',
                        rowId: `${prefix}vd`,
                        description: '📽️ Vidio Premium, olahraga & hiburan lokal terbaik!'
                     },
                     {
                        title: 'WIFI ID',
                        rowId: `${prefix}wifiid`,
                        description: '📶 Voucher WIFI ID, internet cepat di mana saja!'
                     },
                     {
                        title: 'Transvision',
                        rowId: `${prefix}transvision`,
                        description: '📡 Transvision, TV satelit dengan channel premium!'
                     },
                     {
                        title: 'TIX ID',
                        rowId: `${prefix}tixid`,
                        description: '🎫 TIX ID, tiket bioskop & event seru instan!'
                     },
                     {
                        title: 'Starpass',
                        rowId: `${prefix}starpass`,
                        description: '🌟 Starpass, buka fitur premium aplikasi favoritmu!'
                     },
                     {
                        title: 'StarMaker',
                        rowId: `${prefix}starmaker`,
                        description: '🎤 StarMaker, koin untuk karaoke sosial seru!'
                     },
                     {
                        title: 'Spotify',
                        rowId: `${prefix}spotify`,
                        description: '🎶 Spotify Premium, musik tanpa batas & iklan!'
                     },
                     {
                        title: 'CapCut',
                        rowId: `${prefix}capcut`,
                        description: '🎥 CapCut Pro, edit video kece tanpa watermark!'
                     },
                     {
                        title: 'Bigo Live',
                        rowId: `${prefix}bigo`,
                        description: '📽️ Diamonds Bigo, dukung streamer favorit!'
                     },
                     {
                        title: 'Canva',
                        rowId: `${prefix}canva`,
                        description: '🎨 Canva Pro, desain keren tanpa batas!'
                     },
                     {
                        title: 'Disney+',
                        rowId: `${prefix}disney`,
                        description: '🎥 Langganan Disney+, tonton film & serial!'
                     },
                     {
                        title: 'Netflix',
                        rowId: `${prefix}netflix`,
                        description: '🎬 Langganan Netflix, nonton film & series sepuasnya!'
                     },
                     {
                        title: 'Zoom Pro',
                        rowId: `${prefix}zoom`,
                        description: '💻 Langganan Zoom Pro, meeting tanpa batas waktu!'
                     },
                     {
                        title: 'Youku VIP',
                        rowId: `${prefix}youku`,
                        description: '📺 Langganan Youku VIP, nikmati drama & film Asia!'
                     },
                     {
                        title: 'ExpressVPN Premium',
                        rowId: `${prefix}expressvpn`,
                        description: '🔒 Langganan ExpressVPN, internet aman & cepat!'
                     },
                     {
                        title: 'HMA VPN',
                        rowId: `${prefix}hmavpn`,
                        description: '🔒 Langganan HMA VPN, jelajahi internet tanpa batas!'
                     },
                     {
                        title: 'Surfshark VPN',
                        rowId: `${prefix}surfsharkvpn`,
                        description: '🔒 Langganan Surfshark VPN, privasi & keamanan terjamin!'
                     },
                     {
                        title: 'Spotify Premium',
                        rowId: `${prefix}spotify`,
                        description: '🎵 Langganan Spotify Premium, musik tanpa iklan!'
                     },
                     {
                        title: 'Scribd Premium',
                        rowId: `${prefix}scribd`,
                        description: '📚 Langganan Scribd Premium, akses buku & dokumen!'
                     },
                     {
                        title: 'Remini Pro',
                        rowId: `${prefix}remini`,
                        description: '🖼️ Langganan Remini Pro, edit foto jadi lebih tajam!'
                     },
                     {
                        title: 'Prime Video',
                        rowId: `${prefix}primevideo`,
                        description: '📺 Langganan Prime Video, tonton film & series eksklusif!'
                     },
                     {
                        title: 'Iqiyi VIP',
                        rowId: `${prefix}iqiyi`,
                        description: '📺 Langganan Iqiyi VIP, nikmati drama Asia & film!'
                     },
                     {
                        title: 'HBOGO & MAX',
                        rowId: `${prefix}hbogo`,
                        description: '📺 Langganan HBOGO & MAX, streaming film & series premium!'
                     },
                     {
                        title: 'HBO',
                        rowId: `${prefix}hbo`,
                        description: '📺 Langganan HBO, nikmati film & series blockbuster!'
                     },
                     {
                        title: 'G Suite',
                        rowId: `${prefix}gsuite`,
                        description: '💼 Langganan G Suite, produktivitas bisnis tanpa batas!'
                     },
                     {
                        title: 'Gemini',
                        rowId: `${prefix}gemini`,
                        description: '🤖 Langganan Gemini, akses AI canggih untuk kebutuhanmu!'
                     },
                     {
                        title: 'GDrive Lifetime',
                        rowId: `${prefix}gdrive`,
                        description: '💾 Langganan GDrive Lifetime, penyimpanan cloud tanpa batas!'
                     },
                     {
                        title: 'Duolingo Plus',
                        rowId: `${prefix}duolingo`,
                        description: '📚 Langganan Duolingo Plus, belajar bahasa tanpa iklan!'
                     },
                     {
                        title: 'DramaBox Premium',
                        rowId: `${prefix}dramabox`,
                        description: '📺 Langganan DramaBox Premium, tonton drama pendek seru!'
                     },
                     {
                        title: 'ChatGPT Plus',
                        rowId: `${prefix}chatgpt`,
                        description: '🤖 Langganan ChatGPT Plus, AI cerdas untuk semua kebutuhan!'
                     },
                     {
                        title: 'Bstation Premium',
                        rowId: `${prefix}bstation`,
                        description: '📺 Langganan Bstation Premium, nikmati anime & drama!'
                     },
                     {
                        title: 'Apple Music',
                        rowId: `${prefix}applemusic`,
                        description: '🎵 Langganan Apple Music, streaming musik tanpa batas!'
                     },
                     {
                        title: 'AI Perplexity Pro',
                        rowId: `${prefix}perplexity`,
                        description: '🤖 Langganan AI Perplexity Pro, pencarian AI canggih!'
                     },
                     {
                        title: 'AI Blackbox',
                        rowId: `${prefix}blackbox`,
                        description: '🤖 Langganan AI Blackbox, solusi AI premium untukmu!'
                     },
                     {
                        title: 'WeTV VIP',
                        rowId: `${prefix}wetv`,
                        description: '📺 Langganan WeTV VIP, tonton drama Asia bebas iklan!'
                     },
                     {
                        title: 'PicsArt Pro',
                        rowId: `${prefix}picsart`,
                        description: '🖼️ Langganan PicsArt Pro, edit foto & video dengan fitur premium!'
                     },
        ]
    }];
    
    const listMessage = {
        text: title,
        footer: "Klik produk untuk melihat daftar harganya.",
        title: "Daftar Streaming & Aplikasi Premium",
        buttonText: "Lihat Produk Streaming & Aplikasi Premium",
        sections: sections
    };
    
    await liwirya.sendMessage(from, listMessage, { quoted: msg });
    break;
}
break

         case 'daftar': {
            if (cekUser("id", sender) !== null) {
               return reply('🚫 Anda sudah terdaftar. Silakan ketik *.menu* untuk memulai.');
            }

            const seriUnik = makeid(10);
            const namaDefault = `User-${db_user.length + 1}`;
            const tanggalRegistrasi = new Date();
            const object_user = {
               id: sender,
               name: namaDefault,
               seri: seriUnik,
               premium: false,
               registered_at: tanggalRegistrasi.toISOString() 
            };
            db_user.push(object_user);
            fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 2));

            const tgl = tanggalRegistrasi.toLocaleDateString('id-ID', {
               day: '2-digit',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggalRegistrasi.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit'
            });

            const welcomeCard = `
╔══════════════════════╗
║     *PENDAFTARAN BERHASIL* ║
╚══════════════════════╝

Selamat datang di *${global.namaStore}*, *${namaDefault}*!

Akun Anda telah berhasil dibuat. Berikut adalah detail akun Anda:

╭─ 📂 *Data Akun Anda*
│
│  👤 *Nama Pengguna:*
│  \`\`\`${namaDefault}\`\`\`
│
│  🔑 *Serial Unik:*
│  \`\`\`${seriUnik}\`\`\`
│
│  📅 *Tanggal Daftar:* ${tgl}
│  ⏰ *Waktu Daftar:* ${jam} WIB
│
╰─────────────────╯

Silakan klik tombol di bawah untuk memulai perjalanan Anda bersama kami.
    `;

            const buttons = [{
                  buttonId: '.menu',
                  buttonText: {
                     displayText: '✅ Buka Menu'
                  },
                  type: 1
               },
               {
                  buttonId: '.owner',
                  buttonText: {
                     displayText: '💬 Hubungi Bantuan'
                  },
                  type: 1
               }
            ];

            const buttonMessage = {
               text: welcomeCard,
               footer: `Terima kasih telah bergabung! ✨`,
               buttons: buttons,
               headerType: 1
            };

            await liwirya.sendMessage(from, buttonMessage, {
               quoted: msg
            });
            break;
         }
         break;
         
         case 'gantinama': {
    if (cekUser("id", sender) == null) {
        return reply('🚫 *Akses Ditolak!*\nAnda harus terdaftar untuk menggunakan fitur ini. Silakan ketik *.daftar* terlebih dahulu.');
    }

    const newName = q.trim();

    if (!newName) {
        const currentUser = db_user.find(u => u.id === sender);
        const usageCard = `
╔═══ ≪ *GANTI NAMA PENGGUNA* ≫ ═══╗
║
║   Fitur ini digunakan untuk mengubah
║   nama panggilan Anda di sistem kami.
║
║   *Nama Anda Saat Ini:*
║   \`\`\`${currentUser.name}\`\`\`
║
║   *Cara Menggunakan:*
║   \`\`\`${prefix}gantinama [Nama Baru]\`\`\`
║
║   *Contoh:*
║   \`\`\`${prefix}gantinama Budi Gaming\`\`\`
║
╚══════════════════════════════╝`;
        return reply(usageCard);
    }

    if (newName.length < 3) {
        return reply('❌ *Nama Terlalu Pendek!*\nNama pengguna harus memiliki minimal 3 karakter.');
    }
    if (newName.length > 20) {
        return reply('❌ *Nama Terlalu Panjang!*\nNama pengguna tidak boleh lebih dari 20 karakter.');
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(newName)) {
        return reply('❌ *Karakter Tidak Valid!*\nNama hanya boleh mengandung huruf (A-Z), angka (0-9), dan spasi.');
    }

    try {
        const userIndex = db_user.findIndex(u => u.id === sender);
        const oldName = db_user[userIndex].name;

        if (oldName.toLowerCase() === newName.toLowerCase()) {
            return reply(`💡 Nama Anda sudah *${newName}*. Tidak ada perubahan yang dilakukan.`);
        }

        db_user[userIndex].name = newName;
        fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 2));

        const successCard = `
✅ *NAMA BERHASIL DIPERBARUI* ✅

Informasi nama panggilan Anda di *${global.namaStore}* telah berhasil diubah.

╭─── *Rincian Perubahan* ───╮
│
│  *Nama Lama:*
│  > ${oldName}
│
│  *Nama Baru:*
│  > *${newName}*
│
╰───────────────────────╯

Perubahan ini akan langsung terlihat saat Anda menggunakan perintah *.menu* berikutnya.`;
        
        await reply(successCard);

    } catch (error) {
        console.error("Error di case 'gantinama':", error);
        await reply('⚠️ *Operasi Gagal!*\nTerjadi kesalahan internal saat mencoba memperbarui nama Anda. Silakan hubungi Owner.');
    }
    
    break;
}

         case 'topupgame': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            if (isGroup) {
               return await reply('🚫 *Maaf, perintah ini hanya bisa digunakan di private chat (PM)!*');
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const sections = [{
                  title: '🎮 Top Up Game Favorit',
                  rows: [{
                        title: 'Free Fire',
                        rowId: `${prefix}ff`,
                        description: '🔥 Top up FF murah, siap booyah tiap hari!'
                     },
                     {
                        title: 'PUBG Mobile',
                        rowId: `${prefix}pubg`,
                        description: '🎯 UC PUBG hemat, dominasi medan perang!'
                     },
                     {
                        title: 'Mobile Legends (Lokal)',
                        rowId: `${prefix}mlid`,
                        description: '⚔️ Diamond ML lokal, murah & cepat!'
                     },
                     {
                        title: 'Mobile Legends (Global)',
                        rowId: `${prefix}mlgb`,
                        description: '🌍 Diamond ML global, stok selalu ada!'
                     },
                     {
                        title: 'Call of Duty Mobile',
                        rowId: `${prefix}cod`,
                        description: '🔫 CP CODM murah, gaspol ke battlefield!'
                     },
                     {
                        title: 'Genshin Impact',
                        rowId: `${prefix}genshin`,
                        description: '✨ Genesis Crystal untuk gacha impianmu!'
                     },
                     {
                        title: 'Stumble Guys',
                        rowId: `${prefix}stumble`,
                        description: '🤩 Gems SG, lari seru tanpa jatuh!'
                     },
                     {
                        title: 'Point Blank',
                        rowId: `${prefix}pb`,
                        description: '💥 Cash PB, jadi trooper legendaris!'
                     },
                     {
                        title: 'Asphalt 9',
                        rowId: `${prefix}asphalt`,
                        description: '🏎️ Token Asphalt 9, kebut di lintasan!'
                     },
                     {
                        title: 'Astral Guardian',
                        rowId: `${prefix}astralg`,
                        description: '🌌 Top up Astral Guardian, kuasai galaksi!'
                     },
                     {
                        title: 'Honor of Kings',
                        rowId: `${prefix}hok`,
                        description: '🏆 Token HoK, jadi legenda di arena!'
                     },
                     {
                        title: 'Ace Racer',
                        rowId: `${prefix}arc`,
                        description: '🚗 Koin Ace Racer, kejar podium juara!'
                     },
                     {
                        title: '8 Ball Pool',
                        rowId: `${prefix}8bl`,
                        description: '🎱 Cash 8 Ball Pool, kuasai meja biliar!'
                     },
                     {
                        title: 'Arena Breakout',
                        rowId: `${prefix}ab`,
                        description: '🔪 Top up Arena Breakout, taklukkan musuh!'
                     },
                     {
                        title: 'Arena of Valor',
                        rowId: `${prefix}aov`,
                        description: '⚡ Voucher AoV, menuju kemenangan epik!'
                     },
                     {
                        title: 'Valorant',
                        rowId: `${prefix}valorant`,
                        description: '🎯 Valorant Points, unlock skin & agent kece!'
                     },
                     {
                        title: 'Garena Undawn',
                        rowId: `${prefix}undawn`,
                        description: '🧟‍♂️ RC Undawn, bertahan dari serangan zombie!'
                     },
                     {
                        title: 'Zepeto',
                        rowId: `${prefix}zepeto`,
                        description: '💃 ZEMs & Coins, style avatar kerenmu!'
                     },
                     {
                        title: 'Roblox',
                        rowId: `${prefix}roblox`,
                        description: '🎮 Robux, ciptakan petualangan epikmu!'
                     },
                     {
                        title: 'Werewolf (Party Game)',
                        rowId: `${prefix}werewolf`,
                        description: '🐺 Top up Werewolf, jadi alpha di pesta!'
                     },
                     {
                        title: 'Watcher of Realms',
                        rowId: `${prefix}watcherofrealms`,
                        description: '🛡️ Gems Watcher, taklukkan dunia fantasi!'
                     },
                     {
                        title: 'Tower of Fantasy',
                        rowId: `${prefix}tof`,
                        description: '🌌 Tanium ToF, jelajahi dunia open-world!'
                     },
                     {
                        title: 'Tom and Jerry: Chase',
                        rowId: `${prefix}tnj`,
                        description: '🐱‍👤 Koin TnJ, kejar atau lari seru!'
                     },
                     {
                        title: 'The Ants: Underground Kingdom',
                        rowId: `${prefix}ants`,
                        description: '🐜 Diamond Ants, bangun kerajaan semute!'
                     },
                     {
                        title: 'Super Sus',
                        rowId: `${prefix}supersus`,
                        description: '🚀 Gold Super Sus, unggul di luar angkasa!'
                     },
                     {
                        title: 'State of Survival',
                        rowId: `${prefix}sos`,
                        description: '🧟 Biocaps SoS, bertahan di dunia zombie!'
                     },
                     {
                        title: 'Speed Drifters',
                        rowId: `${prefix}speeddrifters`,
                        description: '🏁 Koin Speed Drifters, gaspol di lintasan!'
                     },
                     {
                        title: 'Snowbreak: Containment Zone',
                        rowId: `${prefix}snowbreak`,
                        description: '❄️ Crystal Snowbreak, lawan titan di masa depan!'
                     },
                     {
                        title: 'Dragonheir: Silent Gods',
                        rowId: `${prefix}dragonheir`,
                        description: '🐉 Heliolite Dice, petualang di dunia fantasi!'
                     },
                     {
                        title: 'Hatsune Miku: Colorful Stage!',
                        rowId: `${prefix}hatsunemiku`,
                        description: '🎤 Crystals Miku, mainkan ritme dengan Vocaloid!'
                     },
                     {
                        title: 'Honkai Impact 3',
                        rowId: `${prefix}honkai`,
                        description: '🌌 Crystals Honkai, bertarung dengan Valkyrie!'
                     },
                     {
                        title: 'Light of Thel: New Era',
                        rowId: `${prefix}thel`,
                        description: '⚡ Diamonds Thel, kuasai dunia MMORPG epik!'
                     },
                     {
                        title: 'Auto Chess',
                        rowId: `${prefix}autochess`,
                        description: '♟️ Candies Auto Chess, atur strategi di papan catur!'
                     },
                     {
                        title: 'King God Palace',
                        rowId: `${prefix}kinggod`,
                        description: '🏰 Gems KGP, menang di auto chess epik!'
                     },
                     {
                        title: 'Be The King',
                        rowId: `${prefix}betheking`,
                        description: '👑 Jade Be The King, jadi raja di kerajaan!'
                     },
                     {
                        title: 'Bleach Mobile 3D',
                        rowId: `${prefix}bleach`,
                        description: '⚔️ Crystals Bleach, bertarung ala Soul Reaper!'
                     },
                     {
                        title: 'Bullet Angel',
                        rowId: `${prefix}bulletangel`,
                        description: '🔫 Diamonds Bullet Angel, tembak di battle royale!'
                     },
                     {
                        title: 'Chaos Crisis',
                        rowId: `${prefix}chaoscrisis`,
                        description: '🌪️ Gems Chaos Crisis, kuasai kekacauan epik!'
                     },
                     {
                        title: 'Clash of Clans',
                        rowId: `${prefix}coc`,
                        description: '🏰 Gems CoC, bangun desa tak terkalahkan!'
                     },
                     {
                        title: 'Clash Royale',
                        rowId: `${prefix}clashroyale`,
                        description: '🎴 Gems Clash Royale, menang di arena kartu!'
                     },
                     {
                        title: 'Cloud Song',
                        rowId: `${prefix}cloudsong`,
                        description: '☁️ Diamonds Cloud Song, petualang di dunia awan!'
                     },
                     {
                        title: 'Dark Continent Mist',
                        rowId: `${prefix}darkcontinent`,
                        description: '🌫️ Gems Dark Continent, jelajahi kabut misterius!'
                     },
                     {
                        title: 'Dragon Raja - SEA',
                        rowId: `${prefix}dragonraja`,
                        description: '🐉 Coupons Raja, dominasi dunia MMORPG!'
                     },
                     {
                        title: 'Eggy Party',
                        rowId: `${prefix}eggyparty`,
                        description: '🥚 Egg Coins, pesta seru ala Fall Guys!'
                     },
                     {
                        title: 'Ensemble Stars Music',
                        rowId: `${prefix}ensemble`,
                        description: '🎶 Diamonds Ensemble, gacha idol terbaik!'
                     },
                     {
                        title: 'EOS RED',
                        rowId: `${prefix}eosred`,
                        description: '⚔️ Gems EOS RED, petualangan MMORPG epik!'
                     },
                     {
                        title: 'Era of Celestial',
                        rowId: `${prefix}eraofcelestial`,
                        description: '🌌 Diamonds Celestial, kuasai alam semesta!'
                     },
                     {
                        title: 'Eternal City',
                        rowId: `${prefix}eternalcity`,
                        description: '🏰 Gems Eternal City, jelajahi kota abadi!'
                     },
                     {
                        title: 'Farlight 84',
                        rowId: `${prefix}farlight`,
                        description: '🔫 Diamonds Farlight, menang di battle royale!'
                     },
                     {
                        title: 'FC Mobile',
                        rowId: `${prefix}fcmobile`,
                        description: '⚽ FIFA Points, jadi bintang lapangan!'
                     },
                     {
                        title: 'Football Master 2',
                        rowId: `${prefix}footballmaster`,
                        description: '⚽ Gems FM2, kelola tim juara!'
                     },
                     {
                        title: 'Goddess of Victory: Nikke',
                        rowId: `${prefix}nikke`,
                        description: '🔫 Gems Nikke, tembak dengan waifu!'
                     },
                     {
                        title: 'Growtopia',
                        rowId: `${prefix}growtopia`,
                        description: '🌱 Gems Growtopia, bangun dunia kreatif!'
                     },
                     {
                        title: 'Harry Potter: Magic Awakened',
                        rowId: `${prefix}harrypotter`,
                        description: '🪄 Gems HP, sihir di dunia Hogwarts!'
                     },
                     {
                        title: 'Heroes Evolved',
                        rowId: `${prefix}heroes`,
                        description: '⚡ Tokens Heroes, menang di arena MOBA!'
                     },
                     {
                        title: 'Honkai Star Rail',
                        rowId: `${prefix}starrail`,
                        description: '🌌 Stellar Jade, gacha di galaksi epik!'
                     },
                     {
                        title: 'Hyper Front',
                        rowId: `${prefix}hyperfront`,
                        description: '🔫 Credits Hyper Front, tembak ala Valorant!'
                     },
                     {
                        title: 'Identity V',
                        rowId: `${prefix}identityv`,
                        description: '🕵️‍♂️ Echoes Identity V, selamat dari horor!'
                     },
                     {
                        title: 'IndoPlay',
                        rowId: `${prefix}indoplay`,
                        description: '🎲 Chips IndoPlay, menang di mini-game seru!'
                     }
                  ]
               }];

               const listMessage = {
                  text: `
🎮 *Top Up Game Favorit Anda!* 🎮\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Pilih game di bawah, lalu ikuti instruksi.
            `,
                  footer: `⚡ Total Game: ${sections[0].rows.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Game',
                  sections,
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in topupgame:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar game.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'dompet': {
            if (!cekUser("id", sender)) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Akses Ditolak*\n\nAkun Anda tidak ditemukan. Silakan daftar terlebih dahulu dengan mengetik *.daftar*`
               }, {
                  quoted: msg
               });
            }

            if (isGroup) {
               return await reply('🚫 Fitur dompet hanya bisa diakses melalui *chat pribadi* untuk menjaga privasi Anda.');
            }

            try {
               const user = db_user.find(u => u.id === sender);
               const userName = user?.name || pushname; 
               const userSerial = user?.seri || 'Tidak ada';
               const userBalance = toRupiah(cekSaldo(sender, db_saldo));

               const walletCard = `
╔══════════════════╗
║    💳 *DOMPET DIGITAL ANDA*
╚══════════════════╝

Berikut adalah rincian saldo dan informasi akun Anda saat ini.

╭─── 👤 *Profil Keuangan* ───╮
│
│   *Saldo Anda Saat Ini:*
│   
│   💰 *Rp${userBalance},-*
│   
│   ───────────────
│   *Nama:* ${userName}
│   *ID Akun:* \`${userSerial}\`
│
╰────────────────╯
`;

               const sections = [{
                  title: "Pilih tindakan yang ingin Anda lakukan:",
                  rows: [{
                        title: '➕ Deposit / Isi Saldo',
                        rowId: `${prefix}deposit`,
                        description: 'Tambah saldo Anda melalui berbagai metode pembayaran.'
                     },
                     {
                        title: '➖ Tarik Saldo',
                        rowId: `${prefix}narikmas`,
                        description: 'Tarik dana dari saldo Anda ke rekening pribadi.'
                     },
                     {
                        title: '📄 Cek Riwayat Mutasi',
                        rowId: `${prefix}riwayat`,
                        description: 'Lihat semua catatan transaksi dana yang masuk & keluar.'
                     }
                  ]
               }];

               const timestamp = new Date().toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Jakarta'
               });

               const listMessage = {
                  text: walletCard,
                  footer: `Data diambil pada: ${timestamp} WIB`,
                  title: "Kelola Dompet Anda",
                  buttonText: 'Pilih Opsi Dompet',
                  sections: sections
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: msg
               });

            } catch (error) {
               console.error('Error di case dompet:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ Terjadi kesalahan saat memuat menu dompet. Mohon coba beberapa saat lagi.`
               }, {
                  quoted: msg
               });
            }

            break;
         }
         break

         case 'pulpaket': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            if (isGroup) {
               return await reply('🚫 *Maaf, perintah ini hanya bisa digunakan di private chat (PM)!*');
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const sections = [{
                     title: '📡 Kuota Internet',
                     rows: [{
                           title: 'Smartfren',
                           rowId: `${prefix}smartfren`,
                           description: '📶 Kuota Smartfren, streaming tanpa buffering!'
                        },
                        {
                           title: 'Telkomsel',
                           rowId: `${prefix}telkomsel`,
                           description: '📱 Paket Telkomsel, internet stabil & kencang!'
                        },
                        {
                           title: 'Indosat',
                           rowId: `${prefix}indosat`,
                           description: '💛 Kuota IM3, internetan hemat setiap hari!'
                        },
                        {
                           title: 'Axis',
                           rowId: `${prefix}axis`,
                           description: '🟣 Paket Axis, kuota melimpah harga murah!'
                        },
                        {
                           title: 'Three',
                           rowId: `${prefix}three`,
                           description: '3️⃣ Kuota Tri, online nonstop 24/7!'
                        },
                        {
                           title: 'By.U',
                           rowId: `${prefix}byu`,
                           description: '📱 Paket data By.U, simpel & hemat kuota!'
                        },
                     ]
                  },
                  {
                     title: '📞 Pulsa',
                     rows: [{
                           title: 'Smartfren',
                           rowId: `${prefix}pul_smartfren`,
                           description: '📲 Pulsa Smartfren, cepat masuk, siap pakai!'
                        },
                        {
                           title: 'Telkomsel',
                           rowId: `${prefix}pul_telkomsel`,
                           description: '☎️ Pulsa Telkomsel, semua nominal ready!'
                        },
                        {
                           title: 'Indosat',
                           rowId: `${prefix}pul_indosat`,
                           description: '📞 Pulsa IM3, instan & harga bersahabat!'
                        },
                        {
                           title: 'Axis',
                           rowId: `${prefix}pul_axis`,
                           description: '🔋 Pulsa Axis, langsung aktif tanpa nunggu!'
                        },
                        {
                           title: 'Three',
                           rowId: `${prefix}pul_three`,
                           description: '⚡ Pulsa Tri, kilat masuk, no lemot!'
                        },
                        {
                           title: 'By.U',
                           rowId: `${prefix}pul_byu`,
                           description: '📱 Paket data By.U, simpel & hemat kuota!'
                        },
                     ]
                  }
               ];

               const listMessage = {
                  text: `
📱 *Isi Ulang Pulsa & Kuota* 📱\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Pilih provider di bawah untuk melihat daftar pulsa atau kuota:*
            `,
                  footer: `⚡ Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Provider',
                  sections,
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pulpaket:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar pulsa & kuota.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break;

         case 'narikmas':
         case 'cairbre': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            if (isGroup) {
               return await reply('🚫 *Maaf, perintah ini hanya bisa digunakan di private chat (PM)!*');
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            const sections = [{
               title: '🛍️ Metode Penarikan Saldo',
               rows: [{
                     title: 'Dana',
                     rowId: `${prefix}dana`,
                     description: '💳 Penarikan saldo ke Dana, cepat dan aman!'
                  },
                  {
                     title: 'Gopay',
                     rowId: `${prefix}gopay`,
                     description: '🟢 Tarik saldo ke Gopay untuk kebutuhan harian!'
                  },
                  {
                     title: 'Ovo',
                     rowId: `${prefix}ovo`,
                     description: '🟣 Penarikan ke Ovo, praktis untuk transaksi!'
                  },
                  {
                     title: 'ShopeePay',
                     rowId: `${prefix}shopeepay`,
                     description: '🛍️ Tarik saldo ke ShopeePay untuk belanja!'
                  },
                  {
                     title: 'LinkAja',
                     rowId: `${prefix}linkaja`,
                     description: '🔗 Penarikan ke LinkAja, mudah dan cepat!'
                  }
               ]
            }];

            const listMessage = {
               text: `
💸 *Daftar Metode Penarikan Saldo* 💸\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam}
👤 *Nama*: ${pushname}
💰 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Penarikan*: Pilih metode di bawah, lalu ikuti instruksi.
        `,
               footer: `⚡ Hubungi @${global.ownerNumber.split('@')[0]} jika ada pertanyaan!`,
               buttonText: '🔍 Pilih Metode',
               sections,
               mentions: [global.ownerNumber]
            };

            await liwirya.sendMessage(from, listMessage, {
               quoted: fkontak
            });
            break;
         }
         break

         case 'mlid': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'MOBILE LEGENDS' && item.category !== 'Membership' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💎 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Mobile Legends (Lokal) yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚔️ *Daftar Harga Topup Mobile Legends (Lokal)* ⚔️\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup ML100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\nHubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Mobile Legends (Lokal) - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in mlid:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Mobile Legends (Lokal).* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'mlgb': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }


               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'MOBILE LEGENDS GLOBAL' && item.category !== 'Membership' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💎 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Mobile Legends (Global) yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌍 *Daftar Harga Topup Mobile Legends (Global)* 🌍\n


📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Catatan*: Khusus untuk server luar Indonesia.\n
💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup MLGB100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\nHubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Mobile Legends (Global) - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Mobile Legend Global:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Mobile Legends (Global).* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'ff': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'FREE FIRE' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💎 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Free Fire yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎮 *Daftar Harga Topup Free Fire* 🎮\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam} 
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup FF100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\nHubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Free Fire - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Free Fire:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Free Fire.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'pubg': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'PUBG MOBILE' && item.category !== 'Voucher' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎯 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup PUBG Mobile yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎯 *Daftar Harga Topup PUBG Mobile* 🎯\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup PUBG60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\nHubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 PUBG Mobile - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pubg:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga PUBG Mobile.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'cod': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Call of Duty MOBILE' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔫 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Call of Duty Mobile yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔫 *Daftar Harga Topup Call of Duty Mobile* 🔫\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup COD80*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\nHubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Call of Duty Mobile - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in cod:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Call of Duty Mobile.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'stumble': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Stumble Guys' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🤣 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Stumble Guys yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🤣 *Daftar Harga Topup Stumble Guys* 🤣\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup SG100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\nHubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Stumble Guys - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in stumble:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Stumble Guys.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'genshin': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Genshin Impact' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `✨ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Genshin Impact yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
✨ *Daftar Harga Topup Genshin Impact* ✨\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Jam*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup GI60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\nHubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Genshin Impact - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in genshin:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Genshin Impact.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'pb': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'POINT BLANK' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💥 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💥 *Daftar Harga Topup Point Blank* 💥 \n
📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup PB1000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Point Blank - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pb:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         case 'asphalt': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Asphalt 9' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏎️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏎️ *Daftar Harga Topup Asphalt 9* 🏎️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ASPT40*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏎️ Asphalt 9 - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Asphalt 9:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         case 'astralg': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Astral Guardians' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🚘 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌌 *Daftar Harga Topup Astral Guardians* 🌌 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup AGD1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🌌 Astral Guardian - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Astral Guardian', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         case 'hok': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Honor of Kings' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏆 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏆 *Daftar Harga Topup Honor of Kings* 🏆 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup AGD1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏆 Honor of Kings - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Honor of Kings', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         case 'arc': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Ace Racer' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🚗 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🚗 *Daftar Harga Topup Ace Racer* 🚗 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ACE60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🚗 Ace Racer - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Ace Racer', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         case '8bl': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === '8 Ball Pool' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎱 *Daftar Harga Topup 8 Ball Pool* 🎱 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup EBP250*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎱 8 Ball Pool - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in 8 Ball Pool', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         case 'abr': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Arena Breakout' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🗡 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🗡 *Daftar Harga Topup Arena Breakout* 🗡 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ABR60*)
            `,
                  footer: `🗡 Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🗡 Arena Breakout - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Arena Breakout', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         case 'aov': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Arena of Valor' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `⚡ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚡ *Daftar Harga Topup Arena Of Valor* ⚡ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup AOV40*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '⚡ Arena Of Valor - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Arena Of Valor', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'valorant': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Valorant' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎯 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎯 *Daftar Harga Topup Valorant* 🎯 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup AOV40*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎯 Valorant - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Valorant', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'undawn': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Undawn' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🧟‍♂️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Point Blank yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🧟‍♂️ *Daftar Harga Topup Garena Undawn* 🧟‍♂️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup AOV40*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🧟‍♂️ Garena Undawn - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Garena Undawn', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Point Blank.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'werewolf': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Werewolf (Party Game)' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🐺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Werewolf (Party Game) yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🐺 *Daftar Harga Topup Werewolf (Party Game)* 🐺 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup WW300*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🐺 Werewolf (Party Game) - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Werewolf (Party Game)', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Werewolf (Party Game).* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'roblox': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Roblox' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎮 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Roblox yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎮 *Daftar Harga Topup Roblox* 🎮 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup RBX100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎮 Roblox - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Roblox', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Roblox.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'zepeto': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  BODY: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Zepeto' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `✨ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Zepeto yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
✨ *Daftar Harga Topup Zepeto* ✨ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ZPT50*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '✨ Zepeto - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Zepeto', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Zepeto.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'watcherofrealms': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Watcher of Realms' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🛡️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Watcher of Realms yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🛡️ *Daftar Harga Topup Watcher of Realms* 🛡️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup WORG499*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🛡️ Watcher of Realms - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Watcher of Realms', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Watcher of Realms.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'tof': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Tower of Fantasy' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🗼 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Tower of Fantasy yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🗼 *Daftar Harga Topup Tower of Fantasy* 🗼 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup TFRS*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🗼 Tower of Fantasy - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Tower of Fantasy', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Tower of Fantasy.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'tnj': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Tom and Jerry: Chase' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🐱🐭 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Tom and Jerry: Chase yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🐱🐭 *Daftar Harga Topup Tom and Jerry: Chase* 🐱🐭 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup TAJ3000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🐱🐭 Tom and Jerry: Chase - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Tom and Jerry: Chase', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Tom and Jerry: Chase.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'ants': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'The Ants Underground Kingdom' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🐜 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup The Ants Underground Kingdom yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🐜 *Daftar Harga Topup The Ants Underground Kingdom* 🐜 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup TAC1500*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🐜 The Ants Underground Kingdom - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in The Ants Underground Kingdom', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga The Ants Underground Kingdom.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'supersus': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Super Sus' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🚀 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Super Sus yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🚀 *Daftar Harga Topup Super Sus* 🚀 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SSSW*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🚀 Super Sus - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Super Sus', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Super Sus.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'sos': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'State of Survival' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🧟 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup State of Survival yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🧟 *Daftar Harga Topup State of Survival* 🧟 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SOSD3*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🧟 State of Survival - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in State of Survival', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga State of Survival.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'speeddrifters': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Speed Drifters' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏎️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Speed Drifters yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏎️ *Daftar Harga Topup Speed Drifters* 🏎️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SD63000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏎️ Speed Drifters - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Speed Drifters', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Speed Drifters.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'snowbreak': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Snowbreak Containment Zone' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `❄️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Snowbreak Containment Zone yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
❄️ *Daftar Harga Topup Snowbreak Containment Zone* ❄️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SNB110*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '❄️ Snowbreak Containment Zone - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Snowbreak Containment Zone', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Snowbreak Containment Zone.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'dragonheir': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Dragonheir Silent Gods' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🐉 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Dragonheir Silent Gods yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🐉 *Daftar Harga Topup Dragonheir Silent Gods* 🐉 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup DRH70*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🐉 Dragonheir Silent Gods - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Dragonheir Silent Gods', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Dragonheir Silent Gods.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'hatsunemiku': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Hatsune Miku Colorful Stage' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎤 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Hatsune Miku Colorful Stage yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎤 *Daftar Harga Topup Hatsune Miku Colorful Stage* 🎤 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HMC70*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎤 Hatsune Miku Colorful Stage - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Hatsune Miku Colorful Stage', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Hatsune Miku Colorful Stage.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'honkai': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Honkai Impact 3' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `⚔️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Honkai Impact 3 yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚔️ *Daftar Harga Topup Honkai Impact 3* ⚔️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HIC65C*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '⚔️ Honkai Impact 3 - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Honkai Impact 3', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Honkai Impact 3.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'thel': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Light of Thel New Era' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `✨ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Light of Thel New Era yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
✨ *Daftar Harga Topup Light of Thel New Era* ✨ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup LOTC90*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '✨ Light of Thel New Era - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Light of Thel New Era', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Light of Thel New Era.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'autochess': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Auto Chess' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `♟️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Auto Chess yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
♟️ *Daftar Harga Topup Auto Chess* ♟️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ACD30*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '♟️ Auto Chess - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Auto Chess', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Auto Chess.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'betheking': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Be The King' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `👑 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Be The King yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
👑 *Daftar Harga Topup Be The King* 👑 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup BTK60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '👑 Be The King - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Be The King', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Be The King.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'bleach': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Bleach Mobile 3D' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🗡️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Bleach Mobile 3D yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🗡️ *Daftar Harga Topup Bleach Mobile 3D* 🗡️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup BMK30*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🗡️ Bleach Mobile 3D - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Bleach Mobile 3D', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Bleach Mobile 3D.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'bulletangel': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Bullet Angel' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔫 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Bullet Angel yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔫 *Daftar Harga Topup Bullet Angel* 🔫 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup BAG75*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔫 Bullet Angel - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Bullet Angel', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Bullet Angel.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'chaoscrisis': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Chaos Crisis' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🌌 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Chaos Crisis yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌌 *Daftar Harga Topup Chaos Crisis* 🌌 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup CC120*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🌌 Chaos Crisis - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Chaos Crisis', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Chaos Crisis.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'coc': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Clash of Clans' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏰 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Clash of Clans yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏰 *Daftar Harga Topup Clash of Clans* 🏰 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup COCG80*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏰 Clash of Clans - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Clash of Clans', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Clash of Clans.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'clashroyale': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Clash Royale' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `⚔️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Clash Royale yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚔️ *Daftar Harga Topup Clash Royale* ⚔️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup CRL80*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '⚔️ Clash Royale - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Clash Royale', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Clash Royale.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'darkcontinent': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Dark Continent Mist' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🌫️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Dark Continent Mist yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌫️ *Daftar Harga Topup Dark Continent Mist* 🌫️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup DCM160*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🌫️ Dark Continent Mist - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Dark Continent Mist', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Dark Continent Mist.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'dragonraja': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'DRAGON RAJA - SEA' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🐉 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup DRAGON RAJA - SEA yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🐉 *Daftar Harga Topup DRAGON RAJA - SEA* 🐉 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup DGR66*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🐉 DRAGON RAJA - SEA - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in DRAGON RAJA - SEA', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga DRAGON RAJA - SEA.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'eggyparty': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Eggy Party' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🥚 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Eggy Party yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🥚 *Daftar Harga Topup Eggy Party* 🥚 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup EPYW*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🥚 Eggy Party - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Eggy Party', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Eggy Party.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'cloudsong': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Cloud Song' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `☁️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Cloud Song yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
☁️ *Daftar Harga Topup Cloud Song* ☁️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup CST16K*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '☁️ Cloud Song - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Cloud Song', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Cloud Song.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'ensemble': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Ensemble Stars Music' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎵 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Ensemble Stars Music yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎵 *Daftar Harga Topup Ensemble Stars Music* 🎵 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ESM50*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎵 Ensemble Stars Music - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Ensemble Stars Music', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Ensemble Stars Music.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'eosred': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'EOS RED' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🗡️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup EOS RED yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🗡️ *Daftar Harga Topup EOS RED* 🗡️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup EOSR120*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🗡️ EOS RED - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in EOS RED', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga EOS RED.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'eraofcelestial': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Era of Celestial' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🌌 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Era of Celestial yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌌 *Daftar Harga Topup Era of Celestial* 🌌 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup EOC70*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🌌 Era of Celestial - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Era of Celestial', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Era of Celestial.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'eternalcity': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Eternal City' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏰 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Eternal City yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏰 *Daftar Harga Topup Eternal City* 🏰 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ECG70*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏰 Eternal City - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Eternal City', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Eternal City.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'farlight': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Farlight 84' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔫 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Farlight 84 yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔫 *Daftar Harga Topup Farlight 84* 🔫 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup FRL5*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔫 Farlight 84 - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Farlight 84', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Farlight 84.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'fcmobile': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'FC Mobile' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `⚽ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup FC Mobile yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚽ *Daftar Harga Topup FC Mobile* ⚽ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup FCM100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '⚽ FC Mobile - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in FC Mobile', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga FC Mobile.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'footballmaster': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Football Master 2' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `⚽ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Football Master 2 yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚽ *Daftar Harga Topup Football Master 2* ⚽ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup FBM12*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '⚽ Football Master 2 - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Football Master 2', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Football Master 2.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'nikke': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Goddess of Victory Nikke' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔫 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Goddess of Victory Nikke yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔫 *Daftar Harga Topup Goddess of Victory Nikke* 🔫 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GOVN60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔫 Goddess of Victory Nikke - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Goddess of Victory Nikke', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Goddess of Victory Nikke.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'growtopia': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Growtopia' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🌱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Growtopia yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌱 *Daftar Harga Topup Growtopia* 🌱 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GRTF*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🌱 Growtopia - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Growtopia', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Growtopia.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'hago': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'HAGO' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎮 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup HAGO yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎮 *Daftar Harga Topup HAGO* 🎮 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HG6*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎮 HAGO - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in HAGO', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga HAGO.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'harrypotter': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Harry Potter Magic Awakened' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🪄 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Harry Potter Magic Awakened yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🪄 *Daftar Harga Topup Harry Potter Magic Awakened* 🪄 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HPMA60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🪄 Harry Potter Magic Awakened - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Harry Potter Magic Awakened', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Harry Potter Magic Awakened.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'heroes': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Heroes Evolved' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🛡️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Heroes Evolved yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🛡️ *Daftar Harga Topup Heroes Evolved* 🛡️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HET100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🛡️ Heroes Evolved - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Heroes Evolved', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Heroes Evolved.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'starrail': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Honkai Star Rail' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🚂 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Honkai Star Rail yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🚂 *Daftar Harga Topup Honkai Star Rail* 🚂 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HKRES2*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🚂 Honkai Star Rail - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Honkai Star Rail', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Honkai Star Rail.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'hyperfront': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Hyper Front' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔫 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Hyper Front yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔫 *Daftar Harga Topup Hyper Front* 🔫 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HFS60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔫 Hyper Front - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Hyper Front', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Hyper Front.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'identityv': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Identity V' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🕵️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Identity V yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🕵️ *Daftar Harga Topup Identity V* 🕵️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup IDV66*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🕵️ Identity V - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Identity V', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Identity V.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'ragnarokx': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Ragnarok X Next Generation' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🛡️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Ragnarok X Next Generation yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🛡️ *Daftar Harga Topup Ragnarok X Next Generation* 🛡️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup RGNX2450*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🕵️ Ragnarok X Next Generation - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Ragnarok X Next Generation', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Ragnarok X Next Generation.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'ragnarokorigin': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Ragnarok Origin' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `⚔️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Ragnarok Origin yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚔️ *Daftar Harga Topup Ragnarok Origin* ⚔️ \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup RGNO210*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '⚔️ Ragnarok Origin - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Ragnarok Origin', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Ragnarok Origin.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'ragnarokm': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Ragnarok M: Eternal Love' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💖 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Ragnarok M: Eternal Love yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💖 *Daftar Harga Topup Ragnarok M: Eternal Love* 💖 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup RGNX2450*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💖 Ragnarok M: Eternal Love - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Ragnarok M: Eternal Love', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Ragnarok M: Eternal Love.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'sausageman': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Sausage Man' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🌭 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Sausage Man yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌭 *Daftar Harga Topup Sausage Man* 🌭 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SUMN60*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🌭 Sausage Man - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Sausage Man', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Sausage Man.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'riseofkingdoms': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Rise of Kingdom' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏰 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Ragnarok X Next Generation yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏰 *Daftar Harga Topup Rise of Kingdom* 🏰 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ROKG200*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏰 Rise of Kingdom - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Rise of Kingdom', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Rise of Kingdom.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         //E WALLET
         case 'pln': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'PLN' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `⚡ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar token PLN yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
⚡ *Daftar Harga Token PLN* \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Pembelian*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup PLN20*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Token PLN - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pln:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga token PLN.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'dana': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'DANA' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💳 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup saldo Dana yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💳 *Daftar Harga Topup Saldo Dana* 💳\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup DANA10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Saldo Dana - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in dana:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga saldo Dana.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'gopay': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GOPAY' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🟢 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup saldo Gopay yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🟢 *Daftar Harga Topup Saldo Gopay* 🟢\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup GOPAY10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Saldo Gopay - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in gopay:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga saldo Gopay.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'ovo': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'OVO' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🟣 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup saldo OVO yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🟣 *Daftar Harga Topup Saldo OVO* 🟣\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup OVO10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Saldo OVO - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in ovo:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga saldo OVO.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'shopeepay': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'SHOPEEPAY' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🛍️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup saldo ShopeePay yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🛍️ *Daftar Harga Topup Saldo ShopeePay* 🛍️\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup SPAY10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔥 Saldo ShopeePay - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in shopeepay:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga saldo ShopeePay.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'astrapay': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'AstraPay' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💳 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup AstraPay yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💳 *Daftar Harga Topup AstraPay* 💳 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ASPAY20*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💳 AstraPay - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in AstraPay', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga AstraPay.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'brizzi': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'BRI BRIZZI' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💸 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup BRI BRIZZI yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💸 *Daftar Harga Topup BRI BRIZZI* 💸 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup BRIZZI20*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💸 BRI BRIZZI - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in BRI BRIZZI', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga BRI BRIZZI.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'doku': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'DOKU' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💳 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup DOKU yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💳 *Daftar Harga Topup DOKU* 💳 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup MXD10*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💳 DOKU - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in DOKU', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga DOKU.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'googleplayid': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GOOGLE PLAY INDONESIA' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎮 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Google Play Indonesia yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎮 *Daftar Harga Topup Google Play Indonesia* 🎮 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GPCIN5*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎮 Google Play Indonesia - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Google Play Indonesia', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Google Play Indonesia.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'googleplaykr': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GOOGLE PLAY KOREA SELATAN' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎮 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Google Play Korea Selatan yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎮 *Daftar Harga Topup Google Play Korea Selatan* 🎮 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GPK100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎮 Google Play Korea Selatan - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Google Play Korea Selatan', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Google Play Korea Selatan.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'googleplayus': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GOOGLE PLAY US REGION' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎮 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Google Play US Region yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎮 *Daftar Harga Topup Google Play US Region* 🎮 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GPCUS10*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎮 Google Play US Region - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Google Play US Region', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Google Play US Region.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'grab': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GRAB' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎮 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Grab yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🚖 *Daftar Harga Topup Grab* 🚖 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GRAB20*)`,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎮 Grab - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Grab', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Grab.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'maxim': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'MAXIM' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🚕 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Maxim yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🚖 *Daftar Harga Topup Maxim* 🚖 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup MXDV5*)`,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🚕 Maxim - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Maxim', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Maxim.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'isaku': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'i.saku' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💳 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup i.saku yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💳 *Daftar Harga Topup i.saku* 💳 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ISK100*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💳 i.saku - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in i.saku', error);
               await liwirya.sendMessage(from, {
                  text: `❌ ci kesalahan saat memuat daftar harga i.saku.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'indomaret': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'INDOMARET' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏪 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup INDOMARET yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏪 *Daftar Harga Topup INDOMARET* 💸 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup VI25*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏪 INDOMARET - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in INDOMARET', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga INDOMARET.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'hotelmurah': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'HOTELMURAH' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🏪 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup HOTELMURAH yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🏪 *Daftar Harga Topup HOTELMURAH* 💸 \n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup VHM10K*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🏪 INDOMARET - Pilih Nominal Topup',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in HOTELMURAH', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga HOTELMURAH.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         //Data Internet
         case 'smartfren': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'SMARTFREN' &&
                     item.type !== 'Pulsa Transfer' &&
                     item.category !== 'Pulsa Reguler' &&
                     item.type !== 'Voucher' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar kuota Smartfren yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📶 *Daftar Harga Kuota Smartfren* 📶\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup SFRN10GB*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Kuota',
                  sections: [{
                     title: '🌐 Kuota Smartfren - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in smartfren:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar kuota Smartfren.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'telkomsel': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               // Filter dan urutkan data kuota Telkomsel
               const listny = res.data
                  .filter(item => item.provider === 'TELKOMSEL' &&
                     item.type !== 'Pulsa Transfer' &&
                     item.category !== 'Pulsa Reguler' &&
                     item.type !== 'Voucher' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar kuota Telkomsel yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📶 *Daftar Harga Kuota Telkomsel* 📶\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup TSEL10GB*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Kuota',
                  sections: [{
                     title: '🌐 Kuota Telkomsel - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in telkomsel:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar kuota Telkomsel.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'axis': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'AXIS' &&
                     item.type !== 'Pulsa Transfer' &&
                     item.category !== 'Pulsa Reguler' &&
                     item.type !== 'Voucher' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar kuota Axis yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📶 *Daftar Harga Kuota Axis* 📶
📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup AXIS5GB*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Kuota',
                  sections: [{
                     title: '🌐 Kuota Axis - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in axis:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar kuota Axis.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'indosat': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'INDOSAT' &&
                     item.type !== 'Pulsa Transfer' &&
                     item.category !== 'Pulsa Reguler' &&
                     item.type !== 'Voucher' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar kuota Indosat yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📶 *Daftar Harga Kuota Indosat* 📶
📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup INDO5GB*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Kuota',
                  sections: [{
                     title: '🌐 Kuota Indosat - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in indosat:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar kuota Indosat.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'three': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'TRI' &&
                     item.type !== 'Pulsa Transfer' &&
                     item.category !== 'Pulsa Reguler' &&
                     item.type !== 'Voucher' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar kuota Three yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📶 *Daftar Harga Kuota Three* 📶
📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup TRI5GB*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Kuota',
                  sections: [{
                     title: '🌐 Kuota Three - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in three:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar kuota Three.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'byu': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'by.U' &&
                     item.type !== 'Pulsa Transfer' &&
                     item.category !== 'Pulsa Reguler' &&
                     item.type !== 'Voucher' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar kuota by.U yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📶 *Daftar Harga Kuota by.U* 📶\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup BYU5GB*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Kuota',
                  sections: [{
                     title: '🌐 Kuota by.U - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in byu:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar kuota by.U.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         //Pulsa
         case 'pul_smartfren': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               // Fungsi untuk mengurutkan harga
               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               // Filter dan urutkan data pulsa Smartfren
               const listny = res.data
                  .filter(item => item.provider === 'SMARTFREN' &&
                     item.category === 'Pulsa Reguler' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar pulsa Smartfren yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📱 *Daftar Harga Pulsa Smartfren* 📱\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup SFRN10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Pulsa',
                  sections: [{
                     title: '📞 Pulsa Smartfren - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pul_smartfren:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar pulsa Smartfren.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'pul_telkomsel': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'TELKOMSEL' &&
                     item.category === 'Pulsa Reguler' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar pulsa Telkomsel yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📱 *Daftar Harga Pulsa Telkomsel* 📱\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup TSEL10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Pulsa',
                  sections: [{
                     title: '📞 Pulsa Telkomsel - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pul_telkomsel:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar pulsa Telkomsel.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'pul_axis': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'AXIS' &&
                     item.category === 'Pulsa Reguler' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar pulsa Axis yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📱 *Daftar Harga Pulsa Axis* 📱\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup AXIS10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Pulsa',
                  sections: [{
                     title: '📞 Pulsa Axis - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pul_axis:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar pulsa Axis.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'pul_indosat': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'INDOSAT' &&
                     item.category === 'Pulsa Reguler' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar pulsa Indosat yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📱 *Daftar Harga Pulsa Indosat* 📱\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup INDO10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Pulsa',
                  sections: [{
                     title: '📞 Pulsa Indosat - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pul_indosat:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar pulsa Indosat.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'pul_three': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'TRI' &&
                     item.category === 'Pulsa Reguler' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar pulsa Three yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📱 *Daftar Harga Pulsa Three* 📱\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup TRI10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Pulsa',
                  sections: [{
                     title: '📞 Pulsa Three - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pul_three:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar pulsa Three.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'pul_byu': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'by.U' &&
                     item.category === 'Pulsa Reguler' &&
                     item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📱 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar pulsa by.U yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📱 *Daftar Harga Pulsa by.U* 📱\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* (contoh: *${prefix}topup BYU10000*)
            `,
                  footer: `⚡ Total Item: ${listny.length} | Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Pulsa',
                  sections: [{
                     title: '📞 Pulsa by.U - Pilih Nominal',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in pul_byu:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar pulsa by.U.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break
         //SOSIAL MEDIA
         case 'viu': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Viu' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💛 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar pembelian viu prem yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💛 *Daftar Harga Viu Premium* 💛\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup VIU1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💛 Viu Premium - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Viu:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga viu premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'alight': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Alight Motion' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎬 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar am prem yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎬 *Daftar Harga Aligth Montion Pro* 🎬\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ALM1T*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎬 Alight Motion - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Alight Motion:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga am prem.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'yt': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Youtube Premium' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎥 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar youtube prem yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎥 *Daftar Harga Youtube Premium* 🎥\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup YTP1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎥 Youtube - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Youtube:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga saldo Gopay.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'vd': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Vidio' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎥 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup saldo Gopay yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎥 *Daftar Harga Vidio Premium* 🎥\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ALM1T*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎥 Vidio - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Vidio', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga saldo Gopay.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'wifiid': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'WIFI ID' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar wifi id yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📶 *Daftar Harga WIFI ID* 📶\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup WIFI1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📶 WIFI ID - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in WIFI ID', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga wifi id.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'transvision': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Transvision' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📡 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar transvision yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📡 *Daftar Harga Transvision* 📡\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup STRD12*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📡 Transvision - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Transvision', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga transvision.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'tixid': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'TIX ID' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎫 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Tix Id yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎫 *Daftar Harga TIX ID* 🎫\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup TIXID1000*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎫 TIX ID - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in TIX ID', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Tix Id.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'starpass': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Starpass' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🌟 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup saldo Gopay yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🌟 *Daftar Harga Starpass* 🌟\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup STP400*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🌟 Starpass - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Starpass', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Starpass.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'starmaker': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'StarMaker' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎤 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup StarMaker yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎤 *Daftar Harga StarMaker* 🎤\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup STMC4K*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎤 StarMaker - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in StarMaker', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga StarMaker.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'spotify': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'SPOTIFY' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎶 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar SPOTIFY Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎶 *Daftar Harga SPOTIFY Premium* 🎶\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SPFP1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎶 SPOTIFY - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in SPOTIFY', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga SPOTIFY.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'capcut': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Capcut' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎥 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar aplikasi Capcut yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎥 *Daftar Harga Capcut Premium* 🎥\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup CCP14BS*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎥 Capcut - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Capcut', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Capcut.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'bigo': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Bigo Live' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📽️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar topup Bigo Live yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📽️ *Daftar Harga Bigo Live* 📽️\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup BGL20*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📽️ Bigo Live - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Bigo Live', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Bigo Live.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'canva': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'canva' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎨 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Canva Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎨 *Daftar Harga Canva Premium* 🎨\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup CNV1T*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎨 Canva - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in canva', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga canva.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'disney': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Disney' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎥 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Disney Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎥 *Daftar Harga Disney Premium* 🎥\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup DSN1BS*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎥 Disney - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Disney', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Disney Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'netflix': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Netflix' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎥 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Netflix Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎥 *Daftar Harga Netflix Premium* 🎥\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup NTFS1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎥 Netflix - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Netflix', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Netflix Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'wetv': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'WETV' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar WeTV Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga WeTV Premium* 📺\n
📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup WTVS1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 WeTV - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in WeTV', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga WeTV Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'picsart': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'PICSART' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎨 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar PicsArt Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎨 *Daftar Harga PicsArt Premium* 🎨\n
📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup PSC01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎨 PicsArt - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in PicsArt', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga PicsArt Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'zoom': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'ZOOM PRO' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💻 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Zoom Pro yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💻 *Daftar Harga Zoom Pro* 💻\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup ZOO1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💻 Zoom Pro - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Zoom Pro', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Zoom Pro.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'youku': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'YOUKU' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Youku VIP yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga Youku VIP* 📺\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup YK01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 Youku VIP - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Youku', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Youku VIP.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'expressvpn': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'VPN Express Premium' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔒 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar ExpressVPN Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔒 *Daftar Harga ExpressVPN Premium* 🔒\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup VPN02*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔒 ExpressVPN Premium - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in ExpressVPN', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga ExpressVPN Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'hmavpn': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'VPN HMA' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔒 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar HMA VPN yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔒 *Daftar Harga HMA VPN* 🔒\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HMA1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔒 HMA VPN - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in HMA VPN', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga HMA VPN.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'surfsharkvpn': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'VPN SURFSHARK' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🔒 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Surfshark VPN yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🔒 *Daftar Harga Surfshark VPN* 🔒\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SURF7*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🔒 Surfshark VPN - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Surfshark VPN', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Surfshark VPN.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'scribd': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'SCRIBD' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📚 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Scribd Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📚 *Daftar Harga Scribd Premium* 📚\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup SCR1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📚 Scribd Premium - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Scribd', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Scribd Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'remini': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'REMINI PRO' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🖼️ Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Remini Pro yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🖼️ *Daftar Harga Remini Pro* 🖼️\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup REMI01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🖼️ Remini Pro - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Remini', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Remini Pro.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'primevideo': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Prime Video' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Prime Video yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga Prime Video* 📺\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup PRV1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 Prime Video - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Prime Video', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Prime Video.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'iqiyi': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'Iqiyi' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Iqiyi VIP yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga Iqiyi VIP* 📺\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup IQY1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 Iqiyi VIP - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Iqiyi', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Iqiyi VIP.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'hbogo': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'HBOGO&MAX' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar HBOGO & MAX yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga HBOGO & MAX* 📺\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HBOGO1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 HBOGO & MAX - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in HBOGO & MAX', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga HBOGO & MAX.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'hbo': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'HBO' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar HBO yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga HBO* 📺\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup HBO2*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 HBO - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in HBO', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga HBO.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'gsuite': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GSUITE X PSC' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💼 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar G Suite yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💼 *Daftar Harga G Suite* 💼\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GSU01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💼 G Suite - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in G Suite', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga G Suite.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'gemini': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GEMINI' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🤖 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Gemini yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🤖 *Daftar Harga Gemini* 🤖\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GM15B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🤖 Gemini - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Gemini', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Gemini.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'gdrive': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'GDRIVE LIFETIME' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `💾 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar GDrive Lifetime yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
💾 *Daftar Harga GDrive Lifetime* 💾\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GD01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '💾 GDrive Lifetime - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in GDrive', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga GDrive Lifetime.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'duolingo': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'DUOLINGGO' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📚 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Duolingo Plus yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📚 *Daftar Harga Duolingo Plus* 📚\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup DO1B*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📚 Duolingo Plus - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Duolingo', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Duolingo Plus.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'dramabox': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'DRAMABOX' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar DramaBox Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga DramaBox Premium* 📺\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup DBX1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 DramaBox Premium - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in DramaBox', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga DramaBox Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'chatgpt': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'CHATGPT' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🤖 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar ChatGPT Plus yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🤖 *Daftar Harga ChatGPT Plus* 🤖\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup GPT01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🤖 ChatGPT Plus - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in ChatGPT', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga ChatGPT Plus.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'bstation': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'BSTATION' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `📺 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Bstation Premium yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
📺 *Daftar Harga Bstation Premium* 📺\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup BST1*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '📺 Bstation Premium - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Bstation', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Bstation Premium.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'applemusic': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'APPLE MUSIC' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🎵 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar Apple Music yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🎵 *Daftar Harga Apple Music* 🎵\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup APL01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🎵 Apple Music - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in Apple Music', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga Apple Music.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'perplexity': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'AI PERPLEXITY' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🤖 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar AI Perplexity Pro yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🤖 *Daftar Harga AI Perplexity Pro* 🤖\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup XITY01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🤖 AI Perplexity Pro - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in AI Perplexity', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga AI Perplexity Pro.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'blackbox': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);
               key.append('type', 'prabayar');

               const response = await fetch('https://atlantich2h.com/layanan/price_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await liwirya.sendMessage(from, {
                     text: `⚠️ *Server sedang maintenance.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });

                  await liwirya.sendMessage(global.ownerNumber, {
                     text: `⚠️ *Peringatan Server*: Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider.`,
                     mentions: [global.ownerNumber]
                  });
                  return;
               }

               const sortByPrice = (a, b) => {
                  const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ''));
                  const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ''));
                  return aPrice - bPrice;
               };

               const listny = res.data
                  .filter(item => item.provider === 'AI BLACKBOX' && item.status === 'available')
                  .sort(sortByPrice)
                  .map(item => {
                     const profit = (untung / 100) * Number(item.price);
                     return {
                        title: item.name,
                        rowId: `${prefix}topup ${item.code}`,
                        description: `🤖 Harga: Rp${toRupiah(Number(item.price) + Math.ceil(profit))} | Status: ✅`
                     };
                  });

               if (listny.length === 0) {
                  return await liwirya.sendMessage(from, {
                     text: `⚠️ *Maaf, tidak ada daftar AI Blackbox yang tersedia saat ini.* Silakan coba lagi nanti atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                     mentions: [global.ownerNumber]
                  }, {
                     quoted: fkontak
                  });
               }

               const listMessage = {
                  text: `
🤖 *Daftar Harga AI Blackbox Pro* 🤖\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Cara Topup*: Ketik *${prefix}topup [kode]* 
(contoh: *${prefix}topup BOX01*)
            `,
                  footer: `⚡ Total Item: ${listny.length}\n Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Item',
                  sections: [{
                     title: '🤖 AI Blackbox - Pilih Kategori Dibawah Ini ',
                     rows: listny
                  }],
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in AI Blackbox', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar harga AI Blackbox.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break

         case 'getprofil':
         case 'ceksaldo': {
            if (!isOwner) return reply(`Maaf, Anda tidak dapat menggunakan fitur ini, khusus *Owner*.`);
            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {
               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);

               const response = await fetch('https://atlantich2h.com/get_profile', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const res = await response.json();

               if (!res.status) {
                  await reply(`⚠️ *Server sedang maintenance.* Silakan sambungkan IP (${res.message.replace(/[^0-9.]+/g, '')}) ke provider atau coba lagi nanti.`);
                  return;
               }

               const profileMessage = `
👤 *Profil Mahiru Shinaa PPOB* 👤
📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${res.data.name}
📋 *Username*: ${res.data.username}
📧 *Email*: ${res.data.email}
💸 *Sisa Saldo*: Rp${toRupiah(res.data.balance)}

💡 Hubungi support jika ada masalah dengan akun!
        `;

               await liwirya.sendMessage(from, {
                  text: profileMessage,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });

            } catch (error) {
               console.error('Error in getprofil/ceksaldo:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat profil atau saldo.* Silakan coba lagi atau hubungi support teknis.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break;

         case 'listbank': {
            if (cekUser("id", sender) == null) {
               return await liwirya.sendMessage(from, {
                  text: `🚫 *Maaf, kamu belum terdaftar!* Silakan daftar terlebih dahulu dengan *${prefix}daftar* atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber, sender]
               }, {
                  quoted: fkontak
               });
            }

            if (isGroup) {
               return await reply('🚫 *Maaf, perintah ini hanya bisa digunakan di private chat (PM)!*');
            }

            const tanggal = new Date();
            const hari = tanggal.toLocaleDateString('id-ID', {
               weekday: 'long'
            });
            const tglFormat = tanggal.toLocaleDateString('id-ID', {
               day: 'numeric',
               month: 'long',
               year: 'numeric'
            });
            const jam = tanggal.toLocaleTimeString('id-ID', {
               hour: '2-digit',
               minute: '2-digit',
               timeZone: 'Asia/Jakarta'
            });

            try {

               const key = new URLSearchParams();
               key.append('api_key', apikeyAtlantic);

               // Mengambil data bank dari API
               const response = await fetch('https://atlantich2h.com/transfer/bank_list', {
                  method: 'POST',
                  body: key,
                  redirect: 'follow'
               });

               const data = await response.json();

               // Memeriksa apakah respons API berhasil
               if (!data.status || !data.data) {
                  throw new Error('Gagal mengambil daftar bank dari API: ' + data.message);
               }

               // Membuat sections untuk daftar bank dan e-wallet
               const sections = [{
                  title: '🏦 Daftar Bank & E-Wallet',
                  rows: data.data.map(item => ({
                     title: item.bank_name,
                     rowId: `${prefix}${item.type}_${item.bank_code}`,
                     description: `💳 ${item.bank_name} - Kode: ${item.bank_code} (${item.type})`
                  }))
               }];

               const listMessage = {
                  text: `
🏦 *Daftar Bank & E-Wallet Tersedia* 🏦\n

📅 *Tanggal*: ${hari}, ${tglFormat} 
🕛 *Waktu*: ${jam}
👤 *Nama*: ${pushname}
💸 *Saldo*: Rp${toRupiah(cekSaldo(sender, db_saldo))}

💡 *Pilih bank atau e-wallet di bawah untuk melanjutkan:*
            `,
                  footer: `⚡ Hubungi @${global.ownerNumber.split('@')[0]} untuk bantuan!`,
                  buttonText: '🔍 Pilih Bank/E-Wallet',
                  sections,
                  mentions: [global.ownerNumber]
               };

               await liwirya.sendMessage(from, listMessage, {
                  quoted: fkontak
               });
            } catch (error) {
               console.error('Error in listbank:', error);
               await liwirya.sendMessage(from, {
                  text: `❌ *Terjadi kesalahan saat memuat daftar bank & e-wallet.* Silakan coba lagi atau hubungi owner di @${global.ownerNumber.split('@')[0]}.`,
                  mentions: [global.ownerNumber]
               }, {
                  quoted: fkontak
               });
            }
            break;
         }
         break;


         //=================================
         case 'riwayat': {
            console.log('📜 Menampilkan Riwayat Transaksi...');
            const nomorTelekat = msg.from;
            const filePath = './database/RiwayatTransaksi.json';

            if (fs.existsSync(filePath)) {
               const riwayatTransaksi = JSON.parse(fs.readFileSync(filePath, 'utf8'));

               if (riwayatTransaksi[nomorTelekat] && riwayatTransaksi[nomorTelekat].length > 0) {
                  let teks = '✨ *───「 RIWAYAT TRANSAKSI ANDA 」───* ✨\n\n';
                  teks += `📊 *Total Transaksi:* ${riwayatTransaksi[nomorTelekat].length} transaksi\n\n`;

                  riwayatTransaksi[nomorTelekat].forEach((transaksi, index) => {
                     teks += `📝 *Transaksi #${index + 1}*\n`;
                     teks += `📦 *Produk:* ${transaksi.produk}\n`;
                     teks += `💰 *Harga:* Rp${toRupiah(transaksi.harga)}\n`;
                     teks += `📅 *Tanggal:* ${transaksi.tanggal}\n`;
                     teks += '──────────────────────────────\n';
                  });
                  teks += '🌟 Terima kasih telah bertransaksi! 🌟';
                  reply(teks);
               } else {
                  reply('😔 Maaf, Anda belum memiliki riwayat transaksi.');
               }
            } else {
               reply('❌ Database riwayat transaksi tidak ditemukan. Silakan hubungi admin! 🙏');
            }
            break;
         }

         case 'searchtransaction': {
            if (!isOwner) return reply('⚠️ Perintah ini hanya untuk owner! 🔒');
            if (!args[0]) return reply('📋 Format: *.searchtransaction <kriteria>*\n📌 Contoh: *.searchtransaction 2023-10-01* atau *.searchtransaction Produk*');

            const criteria = args[0].toLowerCase();
            const filePath = './database/RiwayatTransaksi.json';

            if (!fs.existsSync(filePath)) return reply('❌ Database riwayat transaksi tidak ditemukan. Silakan hubungi admin! 🙏');

            const transactions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const allTransactions = Object.values(transactions).flat();
            const filteredTransactions = allTransactions.filter(trx =>
               trx.tanggal.toLowerCase().includes(criteria) ||
               trx.produk.toLowerCase().includes(criteria)
            );

            if (filteredTransactions.length === 0) {
               return reply('😔 Tidak ada transaksi yang cocok dengan kriteria *' + criteria + '*. Coba kriteria lain! 🔍');
            }

            let resultMessage = '🔍 *Hasil Pencarian Transaksi* 🔍\n\n';
            filteredTransactions.forEach((trx, index) => {
               resultMessage += `📝 *Transaksi #${index + 1}*\n`;
               resultMessage += `📅 *Tanggal:* ${trx.tanggal}\n`;
               resultMessage += `📦 *Produk:* ${trx.produk}\n`;
               resultMessage += `💰 *Harga:* Rp${toRupiah(trx.harga)}\n`;
               resultMessage += '──────────────────────────────\n';
            });
            resultMessage += `✅ *Ditemukan:* ${filteredTransactions.length} transaksi`;
            reply(resultMessage);
            break;
         }

         case 'customerhistory': {
            if (!isOwner) return reply('⚠️ Perintah ini hanya untuk owner! 🔒');
            if (!args[0]) return reply('📋 Format: *.customerhistory <nomor>*\n📌 Contoh: *.customerhistory 6281234567890*');

            const customerNumber = args[0] + '@s.whatsapp.net';
            const filePath = './database/RiwayatTransaksi.json';

            if (!fs.existsSync(filePath)) return reply('❌ Database riwayat transaksi tidak ditemukan. Silakan hubungi admin! 🙏');

            const transactions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const customerTransactions = transactions[customerNumber];

            if (!customerTransactions || customerTransactions.length === 0) {
               return reply(`😔 Tidak ada transaksi untuk pelanggan dengan nomor *${args[0]}*.`);
            }

            let resultMessage = '📊 *Riwayat Transaksi Pelanggan* 📊\n\n';
            resultMessage += `👤 *Nomor:* ${args[0]}\n`;
            resultMessage += `📈 *Total Transaksi:* ${customerTransactions.length}\n\n`;

            customerTransactions.forEach((trx, index) => {
               resultMessage += `📝 *Transaksi #${index + 1}*\n`;
               resultMessage += `📅 *Tanggal:* ${trx.tanggal}\n`;
               resultMessage += `📦 *Produk:* ${trx.produk}\n`;
               resultMessage += `💰 *Harga:* Rp${toRupiah(trx.harga)}\n`;
               resultMessage += '──────────────────────────────\n';
            });

            resultMessage += '✅ Terima kasih telah menggunakan layanan kami! 🌟';
            reply(resultMessage);
            break;
         }

         case 'produkme':
         case 'listprodukme': {
            if (db_produk.length === 0) return reply('😔 Belum ada produk yang terdaftar. Silakan tambahkan produk terlebih dahulu! 📦');

            const sections = [{
               title: "📋 DAFTAR PRODUK KAMI",
               rows: []
            }];

            db_produk.forEach((produk, index) => {
               sections[0].rows.push({
                  title: `📦 ${produk.nama}`,
                  description: `💰 Harga: Rp${toRupiah(produk.harga)} | 📝 Deskripsi: ${produk.deskripsi} | 📈 Stok: ${produk.stock}`,
                  rowId: `#beli ${produk.id}`
               });
            });

            const listMessage = {
               text: `✨ *━━ KATALOG PRODUK KAMI ━━* ✨\n\n📊 Total Produk: ${db_produk.length}\nSilakan pilih produk untuk melihat detail atau melakukan pembelian!`,
               footer: '🌟 Klik tombol di bawah untuk menjelajahi katalog!',
               buttonText: "🛒 Buka Katalog",
               sections
            };

            liwirya.sendMessage(from, listMessage);
            break;
         }

         case 'editproduk': {
            if (!isOwner) return reply('⚠️ Perintah ini hanya untuk owner! 🔒');

            const [id, nama, harga, stock, deskripsi] = q.split('|');

            if (!id || !nama || !harga || !stock || !deskripsi) {
               return reply('❌ Format salah! Contoh: *.editproduk abc123|Emot Baru|20000|50|Crot*');
            }

            const produk = cariProduk(id);
            if (!produk) return reply(`😔 ID produk *${id}* tidak ditemukan!`);

            produk.nama = nama;
            produk.harga = parseInt(harga);
            produk.stock = parseInt(stock);
            produk.deskripsi = deskripsi;

            try {
               fs.writeFileSync('./database/produk.json', JSON.stringify(db_produk, null, 2));
               reply(`✅ Produk *${produk.nama}* berhasil diperbarui! 🎉\n📦 Detail: Harga Rp${toRupiah(produk.harga)}, Stok ${produk.stock}, Deskripsi: ${produk.deskripsi}`);
            } catch (error) {
               reply(`❌ Gagal memperbarui produk: ${error.message}. Silakan coba lagi! 🙏`);
            }
            break;
         }
         break;
         // --- CASE HAPUSPRODUK ---
         case 'hapusproduk': {
            if (!isOwner) return reply('⚠️ Perintah ini hanya untuk owner! 🔒');

            const id = q;
            const index = db_produk.findIndex(p => p.id === id);

            if (index === -1) return reply(`😔 ID produk *${id}* tidak ditemukan!`);

            const namaProduk = db_produk[index].nama;
            db_produk.splice(index, 1);

            try {
               fs.writeFileSync('./database/produk.json', JSON.stringify(db_produk, null, 2));
               reply(`✅ Produk *${namaProduk}* berhasil dihapus dari katalog! 🎉`);
            } catch (error) {
               reply(`❌ Gagal menghapus produk: ${error.message}. Silakan coba lagi! 🙏`);
            }
            break;
         }

         case 'detailproduk': {
            const id = args[0];
            const produk = cariProduk(id);

            if (!produk) return reply('😔 Produk dengan ID *' + id + '* tidak ditemukan! Silakan periksa kembali ID.');

            const buttons = [{
                  buttonId: `#beli ${produk.id}`,
                  buttonText: {
                     displayText: '🛒 Beli Sekarang'
                  },
                  type: 1
               },
               {
                  buttonId: `#listprodukme`,
                  buttonText: {
                     displayText: '📋 Lihat Katalog'
                  },
                  type: 1
               }
            ];

            const msgProduk = {
               text: `✨ *🔍 DETAIL PRODUK* ✨\n\n` +
                  `📦 *Nama:* ${produk.nama}\n` +
                  `💰 *Harga:* Rp${toRupiah(produk.harga)}\n` +
                  `📈 *Stok:* ${produk.stock}\n` +
                  `📝 *Deskripsi:* ${produk.deskripsi}\n` +
                  `🆔 *ID:* ${produk.id}`,
               footer: '🌟 Klik tombol di bawah untuk membeli atau kembali ke katalog!',
               buttons: buttons,
               headerType: 1
            };

            liwirya.sendMessage(from, msgProduk);
            break;
         }

         case 'tambahproduk': {
            if (!isOwner) return reply('⚠️ Perintah ini hanya untuk owner! 🔒');

            const [nama, harga, stock, deskripsi] = q.split('|');

            if (!nama || !harga || !stock || !deskripsi) {
               return reply('❌ Format salah! Contoh: *.tambahproduk Emot MLP|15000|23|Terbaru dan keren!*');
            }

            if (isNaN(harga) || isNaN(stock) || parseInt(harga) <= 0 || parseInt(stock) < 0) {
               return reply('❌ Harga dan stok harus berupa angka positif!');
            }

            try {
               tambahProduk(nama, parseInt(harga), parseInt(stock), deskripsi);
               fs.writeFileSync('./database/produk.json', JSON.stringify(db_produk, null, 2));
               reply(`✅ Produk *${nama}* berhasil ditambahkan! 🎉\n` +
                  `💰 Harga: Rp${toRupiah(harga)}\n` +
                  `📈 Stok: ${stock}\n` +
                  `📝 Deskripsi: ${deskripsi}`);
            } catch (error) {
               reply(`❌ Gagal menambahkan produk: ${error.message}. Silakan coba lagi! 🙏`);
            }
            break;
         }

         case 'beli': {
            if (args.length < 1) return reply(`📋 Format: *${prefix}beli <ID Produk>*\n📌 Contoh: *${prefix}beli abc123*`);

            const idProduk = args[0];
            const produk = cariProduk(idProduk);

            if (!produk) return reply(`😔 Produk dengan ID *${idProduk}* tidak ditemukan! Silakan periksa kembali ID.`);
            if (produk.stock <= 0) return reply(`❌ Maaf, stok *${produk.nama}* habis! Coba produk lain. 📦`);
            if (cekSaldo(sender, db_saldo) < produk.harga) return reply(`💸 Saldo Anda tidak cukup untuk membeli *${produk.nama}*! Saldo dibutuhkan: Rp${toRupiah(produk.harga)}`);

            const trxID = `trx-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

            const tempData = {
               id: trxID,
               pembeli: sender,
               idProduk: idProduk,
               namaProduk: produk.nama,
               hargaSatuan: produk.harga,
               jumlah: 1, // Default
               status: "pending"
            };

            try {
               fs.writeFileSync(`${tempTrxPath}${trxID}.json`, JSON.stringify(tempData));
            } catch (error) {
               return reply(`❌ Gagal memulai transaksi: ${error.message}. Silakan coba lagi! 🙏`);
            }

            const sections = [{
               title: "🔢 Pilih Jumlah Pembelian",
               rows: [{
                     title: "1 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 1`
                  },
                  {
                     title: "2 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 2`
                  },
                  {
                     title: "3 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 3`
                  },
                  {
                     title: "4 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 4`
                  },
                  {
                     title: "5 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 5`
                  },
                  {
                     title: "6 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 6`
                  },
                  {
                     title: "7 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 7`
                  },
                  {
                     title: "8 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 8`
                  },
                  {
                     title: "9 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 9`
                  },
                  {
                     title: "10 Pcs",
                     rowId: `${prefix}setjumlah ${trxID} 10`
                  },
                  {
                     title: "🔧 Custom Jumlah",
                     rowId: `${prefix}setjumlah ${trxID} custom`
                  }
               ]
            }];

            liwirya.sendMessage(from, {
               text: `✨ *Produk Pilihan:* ${produk.nama} ✨\n` +
                  `💰 *Harga per Pcs:* Rp${toRupiah(produk.harga)}\n` +
                  `📈 *Stok Tersedia:* ${produk.stock}\n\n` +
                  `Silakan pilih jumlah yang ingin dibeli:`,
               footer: '🌟 Klik *Custom Jumlah* untuk membeli lebih dari 10 pcs!',
               buttonText: "🛒 PILIH JUMLAH",
               sections
            });

            break;
         }
         break

         case 'setjumlah': {
            if (args.length < 2) return reply(`📋 Format: *${prefix}setjumlah <ID_Transaksi> <jumlah>*\n📌 Contoh: *${prefix}setjumlah trx-12345 5*`);

            const trxID = args[0];
            const jumlah = args[1];
            const filePath = `${tempTrxPath}${trxID}.json`;

            if (!fs.existsSync(filePath)) return reply('😔 Transaksi dengan ID *' + trxID + '* tidak valid atau sudah kadaluarsa! Silakan mulai transaksi baru. 🛒');

            let tempData;
            try {
               tempData = JSON.parse(fs.readFileSync(filePath));
            } catch (error) {
               return reply(`❌ Gagal membaca data transaksi: ${error.message}. Silakan coba lagi! 🙏`);
            }

            const produk = cariProduk(tempData.idProduk);
            if (!produk) return reply(`😔 Produk *${tempData.namaProduk}* tidak ditemukan! Transaksi dibatalkan.`);

            if (jumlah === 'custom') {
               tempData.menungguInput = true;
               try {
                  fs.writeFileSync(filePath, JSON.stringify(tempData));
                  return reply(`🔢 Silakan masukkan jumlah yang ingin dibeli (contoh: 5):\n*Produk:* ${tempData.namaProduk}\n*Stok Tersedia:* ${produk.stock}`);
               } catch (error) {
                  return reply(`❌ Gagal menyimpan data transaksi: ${error.message}. Silakan coba lagi! 🙏`);
               }
            }

            const jumlahInt = parseInt(jumlah);
            if (isNaN(jumlahInt) || jumlahInt <= 0) {
               return reply('❌ Jumlah harus berupa angka positif! Contoh: *5*');
            }
            if (jumlahInt > produk.stock) {
               return reply(`❌ Jumlah melebihi stok tersedia (*${produk.stock}*). Silakan pilih jumlah yang lebih kecil!`);
            }

            try {
               prosesPembelian(tempData, jumlahInt, filePath);
            } catch (error) {
               return reply(`❌ Gagal memproses pembelian: ${error.message}. Silakan coba lagi! 🙏`);
            }
            break;
         }

         case 'cekidproduk': {
            if (!isOwner) return reply('⚠️ Perintah ini hanya untuk owner! 🔒');

            if (db_produk.length === 0) return reply('😔 Belum ada produk yang terdaftar. Silakan tambahkan produk terlebih dahulu! 📦');

            const sections = [{
               title: "📋 DAFTAR ID PRODUK",
               rows: db_produk.map((produk, index) => ({
                  title: `#${index + 1} ${produk.nama}`,
                  description: `🆔 ID: ${produk.id} | 💰 Harga: Rp${toRupiah(produk.harga)} | 📈 Stok: ${produk.stock}`,
                  rowId: `#copyid ${produk.id}`
               }))
            }];

            liwirya.sendMessage(from, {
               text: `✨ *KATALOG ID PRODUK* ✨\n\n📊 Total Produk: ${db_produk.length}\nKlik tombol di bawah untuk menyalin ID produk!`,
               footer: '🌟 Gunakan ID untuk mengelola produk (edit/hapus).',
               buttonText: '🛠️ Buka List ID',
               sections
            });
            break;
         }
         break
         //===============
         default:
            if (budy.startsWith('>')) {
               if (!isOwner) return;
               let kode = budy.trim().split(/ +/)[0];
               let teks;
               try {
                  let q = budy.slice(kode.length).trim();
                  teks = await new Function('return ' + q)();
               } catch (e) {
                  teks = `Error: ${e.message}`;
               } finally {
                  await reply(require('util').format(teks));
               }
            }

            if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
               liwirya.sendMessage(from, {
                  text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`
               })
            }
            if ((budy) && ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(budy) && !isCmd) {
               liwirya.sendMessage(from, {
                  text: `${runtime(process.uptime())}*⏰`
               })
            }
      }
   } catch (err) {
      console.log(color('[ERROR]', 'red'), err)
      const isGroup = msg.key.remoteJid.endsWith('@g.us')
      const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
      const moment = require("moment-timezone");
      const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
      const tanggal = moment().tz("Asia/Jakarta").format("ll")
      let kon_erorr = {
         "tanggal": tanggal,
         "jam": jam,
         "error": err,
         "user": sender
      }
      db_error.push(kon_erorr)
      fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
      var errny = `*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
      liwirya.sendMessage(`${global.ownerNumber}`, {
         text: errny,
         mentions: [sender]
      })
   }
}