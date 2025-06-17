const fs = require('fs')

exports.groupResponse_Remove = async (maskhan, update) => {
try {
ppuser = await maskhan.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
}
const metadata = await maskhan.groupMetadata(update.id)
for (let participant of update.participants) {
try{
let metadata = await maskhan.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'remove'){
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Bye👋'}, type: 1 }]
await maskhan.sendMessage(
update.id, 
{
text: `🌟 *Selamat Berpisah* 🌟  
🏡 *Grup *: ${metadata.subject}  

🙏 @${num.split("@")[0]},  
Kami mengucapkan salam perpisahan dengan hangat dan doa terbaik untuk langkahmu ke depan. Terima kasih atas kenangan dan kebersamaan di komunitas ini, walau hanya sebentar. 😊  

Kamu akan selalu menjadi bagian dari cerita kami. 💖 Semoga kebahagiaan dan kedamaian menyertaimu di setiap perjalanan. Sampai jumpa di lain waktu! 🌈`,
footer: metadata.subject, 
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Welcome = async (maskhan, update) => {
try {
ppuser = await maskhan.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
}
const metadata = await maskhan.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await maskhan.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'add') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Welcome👋'}, type: 1 }]
await maskhan.sendMessage(
update.id, 
{ 
text: `✨ Selamat Bergabung di Komunitas Kami! ✨  
🏡 *Grup*: ${metadata.subject}  

Halo @${num.split("@")[0]}!  
Kami sangat senang menyambutmu di keluarga kami! 😊 Terima kasih telah menjadi bagian dari komunitas ini.  

*Apa yang Menanti Kamu?*
🔔 *Update & Promo Eksklusif*: Dapatkan penawaran spesial yang sayang untuk dilewatkan!  
💡 *Informasi Menarik*: Konten bermanfaat yang siap menambah wawasanmu.  
🛍 *Belanja Praktis*: Temukan produk terbaik dengan harga istimewa.  

😊 *Yuk, Mulai Petualanganmu!* 
Ingin belanja? Hubungi bot kami di:  
📱 *+6283879152564*  
Ketik *Menu* untuk lihat daftar produk unggulan! 📦  

Selamat menikmati pengalaman seru bersama kami. Happy shopping & stay remarkable! 🚀`,
footer: metadata.subject,
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Promote = async (maskhan, update) => {  
const metadata = await maskhan.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await maskhan.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'promote') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Selamat🎉'}, type: 1 }]
await maskhan.sendMessage(
update.id, 
{ 
text: `*@${num.split("@")[0]} Ciee Ada Yang Jadi Admin Nich*`,
footer: metadata.subject,
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}
  
exports.groupResponse_Demote = async (maskhan, update) => {  
const metadata = await maskhan.groupMetadata(update.id)   
for (let participant of update.participants) {
try{
let metadata = await maskhan.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'demote') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Selamat🎉'}, type: 1 }]
await maskhan.sendMessage(
update.id, 
{ 
text: `*@${num.split("@")[0]} Kasian Juga Ya Doi Udah Ga Jadi Admin, Ketawain Kuy*`,
footer: metadata.subject,
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}   
}