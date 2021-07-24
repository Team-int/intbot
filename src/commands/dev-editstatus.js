const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
module.exports = {
  name: '점검',
  aliases: ['wjarja', 'jumgum', '온라인'],
  description: '인트봇 점검합니다',
  usage: '인트야 점검',
  category: '개발자',
  run: async (client, message, args) => {
    if (!client.developers.includes(message.author.id))
      return message.channel.send(
        `${client.user.username} 개발자만 사용할 수 있어요.`
      )
    if (client.status.includes('정상 운영중')) {
		 let embed = new MessageEmbed()
          .setTitle('정말로 점검 모드로 전환하시겠습니까?')
          .setColor('YELLOW')
          .setDescription('점검 모드로 전환시 일부 기능이 제한됩니다.')
          .setTimestamp()
          .setFooter(
            `${message.author.tag}\u200b`,
            message.author.displayAvatarURL({
              dynamic: true,
            })
          )
        let chkMsg = await message.channel.send({
          embed: embed,
        })
        chkMsg.react('✅').then(() => chkMsg.react('❌'))
		  const filter = (reaction, user) => {
          return (
            ['✅', '❌'].includes(reaction.emoji.name) &&
            user.id === message.author.id
          )
        }
		  
		  chkMsg
          .awaitReactions(filter, { max: 1 })
          .then((collected) => {
            const reaction = collected.first()

            if (reaction.emoji.name === '✅') {
              embed
                .setTitle('안내사항')
                .setDescription('점검모드로 전환되었습니다.')
                .setColor('RED')
                .setFooter(
                  `점검모드로 전환될시 일부 기능이 제한됩니다.`,
                  message.author.displayAvatarURL({
                    dynamic: true,
                  })
                )
                .setTimestamp()
				  client.status = "점검중"
              chkMsg.edit({
                embed: embed,
              })
            } else {
              embed
                .setTitle('취소 완료')
                .setDescription('일반 모드로 진행중입니다...')
					 .setColor('GREEN')
              chkMsg.edit({
                embed: embed,
              })
            }
          })
    }
if (!client.status.includes('정상 운영중')) {
		 let embed = new MessageEmbed()
          .setTitle('정말로 일반 모드로 전환하시겠습니까?')
          .setColor('YELLOW')
          .setDescription('일반 모드로 전환시 이용자들이 모든 기능을 이용할수 있게 됩니다.')
          .setTimestamp()
          .setFooter(
            `${message.author.tag}\u200b`,
            message.author.displayAvatarURL({
              dynamic: true,
            })
          )
        let chkMsg = await message.channel.send({
          embed: embed,
        })
        chkMsg.react('✅').then(() => chkMsg.react('❌'))
		  const filter = (reaction, user) => {
          return (
            ['✅', '❌'].includes(reaction.emoji.name) &&
            user.id === message.author.id
          )
        }
		  
		  chkMsg
          .awaitReactions(filter, { max: 1 })
          .then((collected) => {
            const reaction = collected.first()

            if (reaction.emoji.name === '✅') {
              embed
                .setTitle('안내사항')
                .setDescription('일반 모드로 전환되었습니다.')
                .setColor('GREEN')
                .setFooter(
                  `이제 모든 기능을 이용할수 있어요!`,
                  message.author.displayAvatarURL({
                    dynamic: true,
                  })
                )
                .setTimestamp()
				  client.status = '정상 운영중'
              chkMsg.edit({
                embed: embed,
              })
            } else {
              embed
                .setTitle('취소 완료')
                .setDescription('점검 모드로 진행중입니다...')
					 .setColor('RED')
              chkMsg.edit({
                embed: embed,
              })
            }
          })
    }
  },
}
