const { EventEmitter } = require('events')
const event = new EventEmitter()

event.on('stockUpdate', async client => {
  const stock_v = 5000
  const stock_min = stock_v - 2000

  const stocks = await client.stock.find().toArray()
  let stockAvg = 3000
  client.lastStockUpdate = Date.now()

  for (let stock of stocks) {
    const stockMoney = float2int(Math.random() * (stock_min * -2) + stock_min) + stock_v
    client.stock.updateOne(
      { _id: stock._id },
      {
        $set: {
          money: stockMoney,
          previous: stock.money,
        }
      }
    )
    stockAvg += stock.money
  }

  console.log(client.color('gray', '[Stock] ') + 'Update', stockAvg / stocks.length)
})

module.exports = client => event.emit('stockUpdate', client)

function float2int(value) {
  return value | 0
}
