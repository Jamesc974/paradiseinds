const Discord = require("discord.js");
const setting = require("./setting.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const embed = new Discord.RichEmbed();
bot.commands = new Discord.Collection();
prefix = "!";

fs.readdir("./commands/", (err, files) => {
    
      if(err) console.log(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
      }
    
      jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
      });
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
  if (message.content === prefix + "rolelist") {
    var iconb = bot.user.avatarURL;
    var iconm = message.author.avatarURL
    var name = message.guild.id
    var statsmsg = new Discord.RichEmbed()
    .setAuthor("InfoRoles - Loup Omega", iconb)
    .addField(`Roles¬`, '`'+ bot.guilds.get(name).roles.map(r => r.name).join(", ") + '`')
    .setColor("#A901DB")
    .setFooter(`Demandé par ${message.author.tag}`, iconm)
    
    message.delete().catch(O_o=>{});
    message.channel.sendMessage(statsmsg);
  }
}); 

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = setting.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});


bot.on("ready", async () => {
    console.log(`${bot.user.username} est en ligne !`);
});

//-----------------------------------------------------------------------------------------
//-----------------------------------Réglements--------------------------------------------
//-----------------------------------------------------------------------------------------

bot.on('message', message => {
  if (message.content.startsWith(prefix + "reglement")) {
    if(message.author.id == "404351381093351425") {
      let args = message.content.split(" ").slice(1);
      let thingToEcho = args.join(" ")
      var iconm = message.author.avatarURL
      var embed1 = new Discord.RichEmbed()
        .setTitle("Règlement")
        .setDescription(`La communauté possède un règlement qui se doit d'être respecté, afin de maintenir une bonne ambiance au sein du serveur. Toute infraction au règlement résultera à une sanction adaptée à la gravité de vos actes. Le Staff se réserve le droit s'il en juge nécessaire, de sanctionner tout comportement incorrect, même si celui-ci ne rentre pas dans le règlement`)
        .setColor("#CD2929")
      var embed2 = new Discord.RichEmbed()
        .setTitle("__**Les règles générales (s'appliquent en vocal et à l'ecrit)**__")
        .setDescription(
        `
        Sont interdits les comportements suivant (le non-respect de ces interdictions peuvent s'ensuivre d'un ban)
        • Le troll
        • Tout comportement discriminatoire/haine/insultant (homophobie "Kowine", racisme, sexisme, etc...)
        • Tout message ou photo de profil à caractère pornographique, pédophile.
        • Le partage d'informations privées sans le consentement de la personne concernée.
        • Les double comptes
        • Le contournement de mute, ban, et autres sanctions.
        `)
        .setColor("#CD2929")
      var embed5 = new Discord.RichEmbed()
        .setAuthor("Bienvenue !", iconm)
        .addField("si votre compte Discord n'a pas son adresse e-mail de vérifiée, vous ne serrez pas apte à ècrire dans ce salon. une fois ceci fait,", "vous n'aurez plus qu'a entrer sois `" + `!accepte` + "` sois `" + `!refuser` + "`")
        .setColor("#A901DB")
        .setTimestamp()
        .setFooter("Create by Zεяsтöяυη")
      message.delete().catch(O_o=>{});
      message.guild.channels.find("name", "sécurité").sendEmbed(embed1)
      message.guild.channels.find("name", "sécurité").sendEmbed(embed2)
      message.guild.channels.find("name", "sécurité").sendEmbed(embed5)
    }else{
      return message.reply("Tu n'as pas la permission.")
  }}});

//-----------------------------------------------------------------------------------------
//-------------------------------Accepte / refuser-----------------------------------------
//-----------------------------------------------------------------------------------------

bot.on('message', message => {
  if (message.content === '!accepte') {
    if(message.channel.id == "484039928494424085") {
      var RoleToAdd = message.guild.roles.find('name', '🌟 Membres');
      let nRole = message.guild.roles.find(`name`,'👤 Visiteur');
      var memberCount = bot.users.size;
      var iconb = bot.user.avatarURL
      var iconm = message.author.avatarURL
      var servercount = bot.guilds.size;
      message.delete().catch(O_o=>{});
      message.member.addRole(RoleToAdd);
      message.member.removeRole(nRole);
    }
  }
});

bot.on('message', message => {
  if (message.content === '!refuser') {
    if(message.channel.id == "484039928494424085") {
      var RoleToAdd = message.guild.roles.find('name', '📛 Membre bloquer');
      let nRole = message.guild.roles.find(`name`,'👤 Visiteur');
      var memberCount = bot.users.size;
      var iconb = bot.user.avatarURL
      var iconm = message.author.avatarURL
      var servercount = bot.guilds.size;
      message.delete().catch(O_o=>{});
      message.member.addRole(RoleToAdd);
      message.member.removeRole(nRole);
    }
  }
});

//-----------------------------------------------------------------------------------------
//--------------------------------------Role-----------------------------------------------
//-----------------------------------------------------------------------------------------

bot.on('message', message => {
  if (message.content.startsWith(prefix + "roleinfo")) {
    if(message.author.id == "404351381093351425") {
      let args = message.content.split(" ").slice(1);
      let thingToEcho = args.join(" ")
      var iconm = message.author.avatarURL
      var embed11 = new Discord.RichEmbed()
        .addField(":bust_in_silhouette: Visiteur", "Il s’agit du rôle que vous obtenez en arrivant sur le serveur. Il ne vous confère aucune permission mais celui-ci indique que vous êtes présent sur le serveur.")
        .setColor("#151414")
      var embed22 = new Discord.RichEmbed()
        .addField(":underage: 18+",
        `Pour avoir ce rôle il vous faut déjà être membre et ensuite avoir plus de 18 ans. Mais ce n’est pas tout, il vous donne l’accès au salon #general-18+ qui est un salon regroupant des discussions plus adultes et nous attendons de vous que vous le soyez.`)
        .addField("Condition", `Avoir le rôle Membre`)
        .addField("Pour avoir le grade", `faite !18+, ensuite un staff viendra vous parlez`)
        .setColor("#6B1979")
      var embed33 = new Discord.RichEmbed()
        .addField(":paintbrush: Artiste",
        `Pour disposer de ce rôle, il faut que vous soyez créateur de contenus originaux. En passant du dessin, à l'écriture, sans oublier la photographie, les différents.
        Ce rôles vous donnera la possibilité de participer au salon #créations.`)
        .setColor("#10D56C")
      var role = new Discord.RichEmbed()
        .addField(":milky_way: Rôles général", 'Ces différents rôles peuvent être obtenu en ajoutant la réaction qui lui est associé.\nSi tu cherhe as avoir un role fait `' + `!role` +'`')
        .setColor("#4354C0")
      var jeu = new Discord.RichEmbed()
        .addField("🎮 Rôles Jeux", 'Ces différents rôles peuvent être obtenu en ajoutant la réaction qui lui est associé. Si tu cherhe as avoir un role jeu fait `' + `!jeux` +'`')
        .setColor("#0E8CB3")
      message.delete().catch(O_o=>{});
      message.guild.channels.find("name", "les-rôles").sendEmbed(embed11)
      message.guild.channels.find("name", "les-rôles").sendEmbed(embed22)
      message.guild.channels.find("name", "les-rôles").sendEmbed(embed33)
      message.guild.channels.find("name", "les-rôles").sendEmbed(role)
      message.guild.channels.find("name", "les-rôles").sendEmbed(jeu)
    }else{
      return message.reply("Tu n'as pas la permission.")
  }}});

//-----------------------------------------------------------------------------------------
//-----------------------------------postes pro--------------------------------------------
//-----------------------------------------------------------------------------------------

bot.on('message', message => {
  if (message.content.startsWith(prefix + "pap")) {
    if(message.author.id == "404351381093351425") {
      if(message.channel.id == "484044429288538134") {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var iconm = message.author.avatarURL
        var poste = new Discord.RichEmbed()
          .addField(":warning: Les postes à pourvoirs", 
          `Ce salon a pour objectif de parler des recrutements non conventionnels qui sont ouverts sur le serveur.
          Nous vous informerons des nouveaux postes le plus rapidement possible.`)
          .setColor("#C0013D")
        message.delete().catch(O_o=>{});
        message.guild.channels.find("name", "postes-disponible").sendEmbed(poste)
      }
    }else{
      return message.reply("Tu n'as pas la permission.")
  }}});

//-----------------------------------------------------------------------------------------
//------------------------------------Annonces---------------------------------------------
//-----------------------------------------------------------------------------------------

bot.on('message', message => {
  if (message.content.startsWith(prefix + "annonce")) {
    if(message.author.id == "104935392658137088", "271376054122315786" ) {
      if(message.channel.id == "499511821695188992") {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var iconm = message.author.avatarURL
        var embed = new Discord.RichEmbed()
          .setAuthor("📄 annonce", iconm)
          .addField("Nouvelle annonce:", thingToEcho)
          .setColor("#A901DB")
          .setTimestamp()
          .setFooter(`Par ${message.author.tag}`)
        message.delete().catch(O_o=>{});
        message.guild.channels.find("name", "🔖annonces").sendEmbed(embed)
        .then(function (message) {
          message.react("👍")
          message.react("👎")
      }).catch(function() {
      });
    }else{
      return message.reply("Tu n'as pas la permission.")
  }};
}});

bot.on('message', message => {
    if (message.content.startsWith(prefix + "discord")) {
      if(message.author.id == "104935392658137088", "271376054122315786" ) {
        if(message.channel.id == "499511821695188992") {
          let args = message.content.split(" ").slice(1);
          let thingToEcho = args.join(" ")
          var iconm = message.author.avatarURL
          var embed = new Discord.RichEmbed()
            .setAuthor("📡 annonce discord", iconm)
            .addField("Nouvelle annonce:", thingToEcho)
            .setColor("#A901DB")
            .setTimestamp()
            .setFooter(`Par ${message.author.tag}`)
          message.delete().catch(O_o=>{});
          message.guild.channels.find("name", "📡-annonce-discord").sendEmbed(embed)
          .then(function (message) {
            message.react("👍")
            message.react("👎")
        }).catch(function() {
        });
      }else{
        return message.reply("Tu n'as pas la permission.")
    }};
  }});

  bot.on('message', message => {
    if (message.content.startsWith(prefix + "staff")) {
      if(message.channel.id == "486971745727938581") {
        var iconm = message.author.avatarURL
        var embed = new Discord.RichEmbed()
          .setAuthor(`Un joueur demande un staff`, iconm)
          .addField("Utilisateur¬", `${message.author.tag}`, true)
          .addField("Channel¬", message.channel, true)
          .setColor("#A901DB")
          .setTimestamp()
          .setFooter(`Par ${message.author.tag}`)
        message.delete().catch(O_o=>{});
        message.guild.channels.find("name", "log-serveur").sendEmbed(embed)
      };
    };
  });

//-----------------------------------------------------------------------------------------
//--------------------------------------Idées----------------------------------------------
//-----------------------------------------------------------------------------------------


bot.on('message', message => {
    if (message.content.startsWith(prefix + "idee")) {
      if(message.channel.id == "486971745727938581") {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var iconm = message.author.avatarURL
        var idee = new Discord.RichEmbed()
          .setAuthor(`${message.author.tag}`, iconm)
          .addField("Idée:", thingToEcho)
          .setColor("#A901DB")
          .setTimestamp()
          .setFooter(`•`)
        message.delete().catch(O_o=>{});
        message.guild.channels.find("name", "voir-les-idées").sendEmbed(idee)
        .then(function (message) {
          message.react("👍")
          message.react("👎")
        })
      }
    }
  });

bot.on('message', message => {
  if (message.content.startsWith(prefix + "prixts")) {
    if(message.channel.id == "486971745727938581") {
      message.delete().catch(O_o=>{});
      message.reply("Voici les prix", {
        file: "Prixts.png"
      });
    }
  }
});

bot.on('message', message => {
  if (message.content.startsWith(prefix + "prixmc")) {
    if(message.channel.id == "486971745727938581") {
      message.delete().catch(O_o=>{});
      message.reply("Voici les prix", {
        file: "Prixmc.png"
      });
    }
  }
});

bot.on('message', message => {
  if (message.content.startsWith(prefix + "prixgmod")) {
    if(message.channel.id == "486971745727938581") {
      message.delete().catch(O_o=>{});
      message.reply("Voici les prix", {
        file: "Prixgmod.png"
      });
    }
  }
});

bot.on('message', message => {
  if (message.content.startsWith(prefix + "prixrust")) {
    if(message.channel.id == "486971745727938581") {
      message.delete().catch(O_o=>{});
      message.reply("Voici les prix", {
        file: "Prixarmarust.png"
      });
    }
  }
});

bot.on('message', message => {
  if (message.content.startsWith(prefix + "prixarma")) {
    if(message.channel.id == "486971745727938581") {
      message.delete().catch(O_o=>{});
      message.reply("Voici les prix", {
        file: "Prixarmarust.png"
      });
    }
  }
});


bot.on('guildMemberAdd', member => {
    console.log('User ' + member.username + 'à rejoins le serveur ')
    var role = member.guild.roles.find('name', '👤  Membre');
    member.addRole(role)
});

// bot.on('guildMemberAdd', member => {
 //  var welcomemsg = new Discord.RichEmbed()
 //  .setColor("#009900")
  // .setDescription(
  // `${member}, nous te souhaitons la bienvenue :wave:  !
  // Nous t'invitons à lire le salon #informations pour en savoir plus sur la communauté et passer par le salon #les-rôles pour t'assigner les rôles que tu souhaites avoir.
  // S'il te reste des questions tu peux toujours faire appel à un membre du <@&483023705648136192>`)
  // var welcomemsgsend = member.guild.channels.find("name", "salon-accueil")
  // if(!welcomemsgsend) return;

  // welcomemsgsend.sendEmbed(welcomemsg);
// });

// bot.on('guildMemberRemove', member => {
  // var welcomemsg = new Discord.RichEmbed()
  // .setColor("#bc0000")
  // .setDescription(`${member}, nous a quitté. :wave: ! `)
  // var welcomemsgsend = member.guild.channels.find(`name`, "salon-accueil")
  // if(!welcomemsgsend) return;

  // welcomemsgsend.sendEmbed(welcomemsg);
// });

//-----------------------------------------------------------------------------------------
//---------------------------------systeme role--------------------------------------------
//-----------------------------------------------------------------------------------------

//Embed for error
function sendError(message, description) {
	embed.setColor("0xCC0000").setDescription(':x: ' + description);
	return message.channel.send({ embed: embed }).then(msg => msg.delete(10000)).catch(console.error);

}

//embed for short text
function sendEmbed(message, description, type, suppression) {
	colorList = ["AQUA", "GREEN", "BLUE", "PURPLE", "GOLD", "ORANGE", "0xFF7F00", "0xFFFF00", "0x22FF00", "0x2200FF", "0x663399", "0x7851a9"];
	var color = colorList[Math.floor(Math.random() * colorList.length)];
	var embed = new Discord.RichEmbed();
	embed.setColor(color).setDescription(description);

	if (type === 'send') {
		return message.channel.send({ embed: embed }).then((msg) => { if (suppression) { msg.delete(10000) } }).catch(console.error);
	}
	if (type === 'reply') {
		return message.reply({ embed: embed }).then(msg => { if (suppression) { msg.delete(10000) } }).catch(console.error);
	}

}
