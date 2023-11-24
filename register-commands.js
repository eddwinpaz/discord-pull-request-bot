import { REST, Routes } from 'discord.js';

const TOKEN = "MTE3Njc0NTMwMzg0ODc4ODA0OA.GTK3KE.g2KGsgcX2ilTFT-LBTZWfWGyXAmZAK54bMfbA0"
const CLIENT_ID = "1176745303848788048"

const commands = [
  {
    name: 'pr-front',
    description: 'Replies with screenshot of all pull requests from frontend!',
  },
  {
    name: 'pr-back',
    description: 'Replies with screenshot of all pull requests from backend!',
  },
  {
    name: 'pr-tl-approve-front',
    description: 'Approves a Pull request as your Technical Lead. (Be wise)!!!',
    options: [
      {
        name: 'number',
        description: 'The number of the pull request to approve',
        type: 4,
        required: true
      }
    ]
  },
  {
    name: 'pr-tl-approve-back',
    description: 'Approves a Pull request as your Technical Lead. (Be wise)!!!',
    options: [
      {
        name: 'number',
        description: 'The number of the pull request to approve',
        type: 4,
        required: true
      }
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}