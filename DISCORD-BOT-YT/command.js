const {REST,Routes}=require("discord.js");
const commands = [
  {
    name: 'create',
    description: 'Creates a new short URL!',
  },
];
const rest = new REST({ version: '10' }).setToken("MTUxNDkxNTgzMTI3MDYwODk5Ng.GkMFSx.vrR4JpZgK_WLA164-d5uG8DoP69-8YplG_LKEA");
(async()=>{


try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1514915831270608996"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
})();