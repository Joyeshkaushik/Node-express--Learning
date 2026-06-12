const { Client, Events, GatewayIntentBits } =require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

client.on("messageCreate",(message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith("create")){
        const url=message.content.split("create")[1];
        return message.reply({
            content:"Generating short ID for "+url,
        });
    }
  message.reply({
    content:"Hi From Bot",
  });
});
client.on("interactionCreate",(interaction)=>{
    console.log(interaction);
    interaction.reply("Pong!!");
})
client.login(
   "MTUxNDkxNTgzMTI3MDYwODk5Ng.GkMFSx.vrR4JpZgK_WLA164-d5uG8DoP69-8YplG_LKEA"
);