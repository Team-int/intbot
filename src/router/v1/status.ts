const statusRouter = async (req: any, res: any) => {
  const client = req.app.get('discord_client')
  res.status(200).send({
    guilds: client.guilds.cache.size,
    status: client.status,
    users: client.users.cache.size,
  })
}

module.exports = statusRouter