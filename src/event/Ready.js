const Stock = require('../modules/Stock')

module.exports = async (client) => {
  const randomIndex = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }
  client.on('ready', async () => {
    // TODO 이거 코드 정리 마렵네
    console.log(client.color('cyan', '[Bot]'), `Logged on ${client.user.username}`)
    setInterval(() => {
      switch (Math.floor(Math.random() * 6)) {
      case 0:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: `${client.guilds.cache.size}개의 서버에서 활동중!`,
            type: 'PLAYING',
          },
        })
        break
      case 1:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: '이 말은 10초마다 바뀐다는 사실을 아셨나요?',
            type: 'PLAYING',
          },
        })
        break
      case 2:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: '접두사는 인트야 입니다!',
            type: 'PLAYING',
          },
        })
        break
      case 3:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: '이 봇은 사실 아직 베타 버전이랍니다!',
            type: 'PLAYING',
          },
        })
        break
      case 4:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: '인트봇의 문의/신고는 인트야 문의 [내용]!',
            type: 'PLAYING',
          },
        })
        break
      case 5:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: '인트야 초대로 인트봇을 자신의 서버에 초대해보세요!',
            type: 'PLAYING',
          },
        })
        break
      case 6:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: '인트야 도움',
            type: 'PLAYING',
          },
        })
        break
      }
    }, 10000)
  })

  client.on('ready', async () => {
<<<<<<< HEAD
    if (client.mode == 'hosting') {
      setTimeout(async () => {
        client.status = '정상 운영중...'
        client.lastStockUpdate = Date.now()
        const stock_v = 5000
        const stock_min = stock_v - 2000

        const stocks = await client.stock.find().toArray()
        let stockAvg = 0
        client.lastStockUpdate = Date.now()

        for (let stock of stocks) {
          client.stock.updateOne(
            { _id: stock._id },
            {
              $set: {
                money:
                  float2int(Math.random() * (stock_min * -2) + stock_min) +
                  stock_v,
                previous: stock.money,
              },
            }
          )
          stockAvg += stock.money
        }

        console.log(
          client.color('gray', '[Stock] ') + 'Update',
          stockAvg / stocks.length
        )
      }, 1000)
    } else {
      client.status = '정상 운영중...'
    }

=======
    const stockUpdateRate = 1000 * 60 // 600000
    setTimeout(async () => {
      client.status = '정상 운영중...'
      client.lastStockUpdate = Date.now()
      Stock.update(client)
    }, 1000)
    setInterval(() => Stock.update(client), stockUpdateRate)
>>>>>>> master
    setTimeout(async () => {
      const season = await client.data.findOne({ _id: 'season' })
      client.season = season.data
      client.status = '정상 운영중...'
    }, 2000)
  })
<<<<<<< HEAD
}

function float2int(value) {
  return value | 0
}
=======
}
>>>>>>> master
