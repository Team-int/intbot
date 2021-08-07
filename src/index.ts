// Start Up
process.title = `Intbot - Ver. ${require('../package.json').version}, ${process.platform}-${process.arch}`

// Dependencies
import Discord from 'discord.js'
import Event from './event'
import {
  handler,
  dataBase,
  dokdo,
  colorData
} from './modules'
import { NewClient } from './typings/Client'
const client: NewClient = new Discord.Client()

// Variables 
require('dotenv').config()
// const PORT = process.env.PORT || 3000
const prefix = process.env.PREFIX || '인트야 '
client.status = '오프라인'
const Modules: any = {}

// Discord bot client
client.aliases = new Discord.Collection()
client.developers = [
  '687866011013218349',
  '745758911012929550',
  '714736989106208791',
  '418677556322107412',
  '552103947662524416',
  '647736678815105037',
  '694131960125325374',
  '358204005316296706'
]
client.commands = new Discord.Collection()
client.module = {
  handler,
  dataBase,
  dokdo,
  colorData
}
client.color = color

// Function
function color(color: string, ...string: any) {
  if(!Modules.colorData[color])
    throw new TypeError(`There is no color ${color}`)
  else 
    return `${Modules.colorData[color]}${string.join(' ')}${Modules.colorData.reset}`
}

// Booting
(async () => {
  client.status = '부팅중...'
  await Modules.dataBase.connect()
  const db = Modules.dataBase.db

  console.clear()
  console.log('---------------------------------------------------------------------')
  console.log('Author(s) : chul0721, sujang958, MadeGOD')
  console.log('(C) Team Int. All rights reserved.')
  console.log('---------------------------------------------------------------------')
  console.log(client.color('blue', '[System] '), process.title)

  client.login(process.env.BOT_TOKEN)
  await Event.ready(client)
  await Modules.handler(client, prefix, Modules)
  // await Modules.web(client, PORT)
})()
