const chalk = require("chalk");

const fs = require("fs");

// 🌟 Konfigurasi Pembayaran

const payment = {

    all: {

        atas_nama: "wira" // 📛 Nama untuk transaksi

    }

};

// 🔑 API Key untuk Atlantic, Linode, & Digital Ocean

const apikeyAtlantic = "isi apikey Atlantic"; // 🔐 Masukkan API Key Atlantic di sini

// ⚙️ Pengaturan Bot

global.ownerNumber = "6283879152564@s.whatsapp.net"; // 📱 Nomor WhatsApp Owner

global.kontakOwner = "6283879152564"; // 📞 Kontak Owner

global.emailowner = "wiraliwirya222210@gmail.com"; // 📧 Email Owner

global.untung = parseInt(fs.readFileSync("./database/profit", "utf8")); // 💰 Profit dari database

global.namaStore = "Mahiru Shinaa Pedia"; // 🏪 Nama Store

global.ownerName = "Liwirya"; // 👤 Nama Owner

global.linkgroup = "https://chat.whatsapp.com/G2wtnSYYBv5IyYgrmpsuWx"; // 🔗 Link Grup WhatsApp

global.linkch = "https://whatsapp.com/channel/0029VadHRVCEQIagiLHVJV0d"; // 📢 Link Saluran WhatsApp

global.linkch1 = "https://whatsapp.com/channel/0029VadHRVCEQIagiLHVJV0d"; // 📢 Link Saluran WhatsApp (cadangan)

global.dana = "08568782064"; // 💸 Nomor DANA

global.ovo = "08568782064"; // 💸 Nomor OVO

global.gopay = "08568782064"; // 💸 Nomor GoPay

global.shopeepay = "08568782064"; // 💸 Nomor ShopeePay

global.seabank = "ytta"; // 💸 Nomor SeaBank

global.sawer = "08568782064"; // 🎁 Nomor untuk Donasi

// 🖥️ Konfigurasi Panel Pterodactyl

global.apido = ""; // 🔑 API Key Digital Ocean

// 🖥️ Panel 1: Konfigurasi Utama

global.egg = "15"; // 🥚 Egg ID

global.eggpm = "16"; // 🥚 Egg ID untuk PM2

global.eggpyton = "17"; // 🥚 Egg ID untuk Python

global.nestid = "5"; // 🪺 Nest ID

global.loc = "1"; // 📍 Location ID

global.domain = "https://"; // 🌐 Domain Panel

global.apikey = "ptla_"; // 🔐 API Key (ptla)

global.capikey = "ptlc_"; // 🔐 Client API Key (ptlc)

// 🖥️ Panel 2: Konfigurasi Tambahan

global.egg2 = "15"; // 🥚 Egg ID

global.nestid2 = "5"; // 🪺 Nest ID

global.loc2 = "1"; // 📍 Location ID

global.domain2 = "https://"; // 🌐 Domain Panel

global.apikey2 = "ptla_"; // 🔐 API Key (ptla)

global.capikey2 = "ptlc_"; // 🔐 Client API Key (ptlc)

// 🖥️ Panel 3: Khusus Reseller

global.egg3 = "15"; // 🥚 Egg ID

global.nestid3 = "5"; // 🪺 Nest ID

global.loc3 = "1"; // 📍 Location ID

global.domain3 = "https://"; // 🌐 Domain Panel

global.apikey3 = "ptla_"; // 🔐 API Key (ptla)

global.capikey3 = "ptlc_"; // 🔐 Client API Key (ptlc)

// 🔄 File Watcher untuk Auto-Update

let file = require.resolve(__filename);

fs.watchFile(file, () => {

    fs.unwatchFile(file);

    console.log(chalk.redBright(`🔄 Update '${__filename}'`));

    delete require.cache[file];

    require(file);

});

// 📦 Ekspor Modul

module.exports = {
    payment,
    apikeyAtlantic
};