require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.on('ready', () => {
  console.log('Connected as ' + client.user.tag);
});

client.on('message', (message) => {
  if (message.content === '!status') {
    axios
      .get('https://mcapi.us/server/status?ip=24.5.218.137')
      .then(function ({ data }) {
        let resMsg = '';
        resMsg += data.online
          ? ' :monkey:  Server is running on 24.5.218.137'
          : ':x: Server is Down!';
        resMsg += '\n';
        resMsg +=
          data.players.now > 0
            ? `:monkey_face:  There are ${data.players.now}/20 players online right now`
            : ':x:  Nobody is playing';
        message.channel.send(resMsg);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
