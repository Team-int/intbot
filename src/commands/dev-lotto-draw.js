const Discord = require('discord.js');
const { EventEmitter } = require('events');


module.exports = {
	name: '추첨',
	aliases: ['로또 추첨', 'cncja', '로또추첨'],
	description: '로또 추첨 가즈아!!!!!!',
	usage: '인트야 추첨',
	category: '개발자',
	run: async (client, message, args) => {
		const event = new EventEmitter();

		event.on('filtering', async (numbers, chkMsg, embed) => {
			const users = await client.db.find().toArray();
			numbers.main.pop();
			numbers.bonus.pop();
			for (let user of users) {
				if (user.lotto) {
					user.lotto.map((l) => {
						Object.values(l).filter(x => {
							x.bonus === '5'
						})
					});
					
				}
				//  { num: [ '1', '9', '7', '8' ], bonus: [ '4' ] }
			}
		});
		if (!client.developers.includes(message.author.id))
			return message.channel.send(`${client.user.username} 개발자만 사용할 수 있어요.`);
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
			.setDescription(`이번주 판매된 로또 : ${client.lotto.count}장`)
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

		chkMsg.awaitReactions(filter, { max: 1 }).then(async (collected) => {
			const reaction = collected.first();

			if (reaction.emoji.name === '✅') {
				embed
					.setTitle('안내사항')
					.setDescription('이번주 인또(인트 로또) 숫자 추첨을 진행합니다...')
					.setColor('YELLOW')
					.setFooter(`추첨후 자동으로 공지가 됩니다.`)
					.setTimestamp()
					.addField('추첨 번호', '\u200b', true)
					.addField('보너스 번호', '\u200b', true);

				chkMsg = await chkMsg.edit({ embed: embed });

				for (let i = 1; ; i++) {
					embed.fields[0].value += randomIndex([1, 2, 3, 4, 5, 6, 7, 8, 9]) + ' ';

					if (i >= 4) {
						embed.fields[1].value += randomIndex([1, 2, 3, 4, 5, 6, 7, 8, 9]) + ' ';
						break;
					}
					chkMsg = await chkMsg.edit({ embed: embed });
				}
				embed.description = `로또 추첨 상태: 완료 :white_check_mark:\n로또 결합 상태: 로딩중... :repeat:`;

				let numbers = { main: [], bonus: [] };
				numbers.main = embed.fields[0].value.split(' ');
				numbers.bonus = embed.fields[1].value.split(' ');

				chkMsg = await chkMsg.edit({ embed: embed });

				event.emit('filtering', numbers, chkMsg, embed);
			} else {
				embed
					.setTitle('취소 완료')
					.setDescription('로또 추첨을 종료합니다...')
					.setColor('GREEN');
				chkMsg.edit({
					embed: embed,
				});
			}
		});
	},
};

function randomIndex(array) {
	return array[Math.floor(Math.random() * array.length)];
}