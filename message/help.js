const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.allmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount) => {
	return `*── 「 ${setting.botName} - MD Beta 」 ──*
	
  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

    Library : *Baileys-MD*.
    Prefix : ( ${prefix} )
    Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
    Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

	Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
	Limit Harian : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
	Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
	Balance : $${toCommas(getBalance(sender, balance))}

  *Feature Main Menu*
  > ${prefix}menu
  > ${prefix}owner
  > ${prefix}donasi
  > ${prefix}speed
  > ${prefix}runtime
  > ${prefix}cekprem
  > ${prefix}listprem

  *Feature Converter/Tools*
  > ${prefix}sticker
  > ${prefix}toimg
  > ${prefix}tovid

  *Feature Downloader*
  > ${prefix}play
  > ${prefix}tiktok
  > ${prefix}ytmp4
  > ${prefix}ytmp3
  > ${prefix}getvideo
  > ${prefix}getmusic
  > ${prefix}instagram
  > ${prefix}facebook
  
  *Feature Random Menu*
  > ${prefix}quote
  > ${prefix}cecan
  > ${prefix}cogan
  
  *Feature Search Menu*
  > ${prefix}lirik
  > ${prefix}grupwa
  > ${prefix}ytsearch
  
  *Feature Game Menu*
  > ${prefix}tictactoe
  > ${prefix}delttc
  > ${prefix}tebakgambar
  
  *Feature Payment & Bank*
  > ${prefix}buylimit
  > ${prefix}buyglimit
  > ${prefix}transfer
  > ${prefix}limit
  > ${prefix}balance
  
  *Feature Group Menu*
  > ${prefix}linkgrup
  > ${prefix}setppgrup
  > ${prefix}fullgc [ setpp full ]
  > ${prefix}setnamegc
  > ${prefix}setdesc
  > ${prefix}group
  > ${prefix}revoke
  > ${prefix}hidetag
  
  *Feature Owner Menu*
  > evalcode
  x evalcode-2
  $ executor
  > ${prefix}join
  > ${prefix}broadcast
  > ${prefix}setppbot
  > ${prefix}full [ setpp bot full ]
  > ${prefix}exif
  > ${prefix}leave
  > ${prefix}addprem
  > ${prefix}delprem

  \`\`\`Xy Bot\`\`\`

`+'     \`\`\`Have A Nice Day\`\`\`'
}
 