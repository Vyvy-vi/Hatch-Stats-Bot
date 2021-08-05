const { Client } = require('discord.js')
const hatchInfo = require('./handlers/funds')
require('dotenv').config()

const client = new Client()

const hatchUpdate = async () => {
  const server = await client.guilds.fetch(process.env.DISCORD_SERVER_ID)
  const bot = await server.members.fetch(client.user.id)
  const { funds, state } = await hatchInfo()
  bot.setNickname(`Raised: ${funds} WXDAI`)
  client.user.setActivity(
    `Hatch: ${state}`,
    { type: 'WATCHING' }
  )
}
client.on('ready', () => {
  console.log(`${client.user.tag} has logged in!`)
  hatchUpdate()
})

client.setInterval(() => hatchUpdate(), process.env.UPDATE_FREQUENCY * 1000)

client.login(process.env.DISCORDJS_BOT_TOKEN)
