@@ -103,6 +103,7 @@ const connectToWhatsApp = async () => {
	conn.multi = true
	conn.nopref = false
	conn.prefa = 'anjing'
	conn.mode = 'public'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store, welcome)
	})
	conn.ev.on('connection.update', (update) => {
          if (global.qr !== update.qr) {
           global.qr = update.qr
          }
          const { connection, lastDisconnect } = update
            if (connection === 'close') {
                lastDisconnect.error?output?statusCode !== DisconnectReason.loggedOut ? connectToWhatsApp() : console.log('connection logged out...')
            }
        })
	conn.ev.on('creds.update', await saveCreds)
	
        conn.ev.on('group-participants.update', async (data) => {
          const isWelcome = welcome.includes(data.id) ? true : false
          if (isWelcome) {
            try {
              for (let i of data.participants) {
                try {
                  var pp_user = await conn.profilePictureUrl(i, 'image')
                } catch {
                  var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                if (data.action == "add") {
                  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Welcome @${i.split("@")[0]}`, mentions: [i] })
                } else if (data.action == "remove") {
                  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Sayonara @${i.split("@")[0]}`, mentions: [i] })
                }
              }
            } catch (e) {
              console.log(e)
            }
          }
        })
	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })
	return conn
}
connectToWhatsApp()
.catch(err => console.log(err))
}
fanStart()
