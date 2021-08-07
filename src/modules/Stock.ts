import { EventEmitter } from 'events'
const event = new EventEmitter()
import { NewClient } from '../typings/Client'

event.on('stockUpdate', async (client: NewClient) => {
  const stock_v = 5000
  const stock_min = stock_v - 2000

  const stocks = await client.stock.find().toArray()
  let stockAvg = 3000
  client.lastStockUpdate = Date.now()

  for (let stock of stocks) {
    const stockMoney = float2int(Math.random() * (stock_min * -2) + stock_min) + stock_v
    stock.lastStockUpdateData?.length > 10 && await client.stock.updateOne({_id: stock._id}, {
      $pop: { lastStockUpdateData: -1 }
    })
    client.stock.updateOne(
      { _id: stock._id },
      {
        $set: {
          money: stockMoney,
          previous: stock.money,
        },
        $push: {
          lastStockUpdateData: {
            x: new Date().getTime(),
            y: stockMoney
          }
        }
      }
    )
    stockAvg += stock.money
  }

  console.log(client.color('gray', '[Stock] ') + 'Update', stockAvg / stocks.length)
})

export default {
  update(client: NewClient) {
    event.emit('stockUpdate', client)
  }
}

function float2int(value: number) {
  return value | 0
}
