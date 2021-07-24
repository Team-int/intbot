const Discord = require('discord.js');
module.exports = {
	name: '추첨',
	aliases: ['로또 추첨', 'cncja', '로또추첨'],
	description: '로또 추첨 가즈아!!!!!!',
	usage: '인트야 추첨',
	category: '개발자',
	run: async (client, message, args) => {
		if (!client.developers.includes(message.author.id))
      return message.channel.send(
        `${client.user.username} 개발자만 사용할 수 있어요.`
      )
		let embed = new Discord.MessageEmbed()
			.setTitle('잠시만 기다려주세요...')
			.setColor('ORANGE')
			.setDescription('기본 세팅중...\n\n로또 카운팅 중..')
			.setTimestamp()
			.setFooter(
				`${message.author.tag}\u200b`,
				message.author.displayAvatarURL({
					dynamic: true,
				})
			);
		let chkMsg = await message.channel.send({
			embed: embed,
		});
		
		embed
					.setTitle('주의하세요!')
					.setDescription('로또 구매')
					.setColor('RED')
					.setFooter(`로또 시스템은 딱 1번만 동의문이 나옵니다.`)
					.setTimestamp();
				chkMsg.edit({
					embed: embed,
				});
		chkMsg.react('✅').then(() => chkMsg.react('❌'));
		const filter = (reaction, user) => {
			return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		chkMsg.awaitReactions(filter, { max: 1 }).then((collected) => {
			const reaction = collected.first();

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
					.setTimestamp();
				chkMsg.edit({
					embed: embed,
				});
			}
		});
	},
};