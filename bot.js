require('dotenv').config();

const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();

const version = '0.1.2';

client.on('ready', () => {
  console.log('Connected as ' + client.user.tag);
});

client.on('message', (message) => {
  // const statusPrefix = '!status';
  // if (message.content.startsWith(statusPrefix)) {
  //   const args = message.content.slice(statusPrefix.length).split(/ +/);
  //   const command = args.shift().toLowerCase();

  //   if (args.length === 0){
  //     getStatus('24.5.218.137', '25565', message, ':monkey:', ':monkey_face:');
  //     getStatus('24.5.218.137', '25566', message, ':soap:', ':poo:');
  //   } else
  // }

  switch (message.content) {
    case '!status':
      getStatus(
        'apetogethermc.v3dsims.com',
        '25565',
        message,
        ':monkey:',
        ':monkey_face:'
      );
      break;
    case '!version':
      message.channel.send(version);
      break;
  }
});

function getStatus(ip, port, message, runningEmoji, playersEmoji) {
  axios
    .get(`https://mcapi.us/server/status?ip=${ip}&port=${port}`)
    .then(function ({ data }) {
      let resMsg = '';
      resMsg += data.online
        ? `${runningEmoji}  Server is running on ${ip}:${port}`
        : ':x: Server is Down!';
      resMsg += '\n';
      resMsg +=
        data.players.now > 0
          ? `${playersEmoji}  There are ${data.players.now}/20 players online right now`
          : ':x:  Nobody is playing';
      message.channel.send(resMsg);
    })
    .catch(function (error) {
      console.error(error);
    });
}

client.login(process.env.DISCORD_TOKEN);
