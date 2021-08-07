import { Client, SnowflakeUtil } from 'discord.js'

interface NewClient extends Client {
  status?: string,
  aliases?: any,
  developers?: Array<string>,
  commands?: any,
  module?: object,
  color?: any,
  stock?: any,
  lastStockUpdate?: any,
  dbchannels?: any,
  db?: any
}

export type { 
  NewClient
}
