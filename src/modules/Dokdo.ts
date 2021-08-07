import Discord, { Client } from 'discord.js'
import Dokdo from 'dokdo'

export default async function (client: Client, prefix: string){
  client.on('message', async (message) => {
    const DokdoHandler = new Dokdo(client, {
      aliases: ['dokdo', 'dok', '독도', '독'],
      prefix: prefix,
      owners: [
        '687866011013218349',
        '745758911012929550',
        '714736989106208791',
        '418677556322107412',
        '552103947662524416',
        '647736678815105037',
        '694131960125325374',
        '358204005316296706'
      ],
      noPerm: (message) => message.reply('🚫 해당 명령어는 인트봇 관리자 전용 명령어입니다.'),
    })

    DokdoHandler.run(message)
  })
}
