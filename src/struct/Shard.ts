import { ShardingManager } from 'discord.js'
require('dotenv').config()

const shard = new ShardingManager('./index.js', {
  token: process.env.BOT_TOKEN
})

shard.on(
  'shardCreate',
  shard => console.log(`[SHARD] Shard ${shard.id}`))

shard.spawn()
