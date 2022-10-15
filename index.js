const { create, Client } = require("@open-wa/wa-automate");
const axios = require("axios")

function start(client) {
  // ! ==============================
  //  ? BOT FEATURES FOR PUBLIC USE
  // ! ==============================
  client.onMessage(async (message) => {
    if (message.body === "hi") {
      // * ==============================
      //  ! GREETINGS PART
      // * ==============================
      console.log("hi");
      // ============ GREETINGS ends here ====================
    } else if (message.body === ".sticker" && message.quotedMsgObj !== null) {
      // * ==============================
      //  ! STICKER GENERATOR PART
      // * ==============================

      // ^============ video stickers  =====================
      if (message.quotedMsgObj.type === "video") {
        try {
          await client.sendMp4AsSticker(
            message.to,
            message.quotedMsg.body,
            message.id
          );
        } catch (error) {
          await client.reply(
            message.to,
            " STICKER PROCESSING ERROR!!",
            message.id
          );
        }

        // ^============ errors messages  =====================
      } else if (message.quotedMsgObj.type === "chat") {
        await client.reply(
          message.to,
          "No media Found on qouted message !!",
          message.id
        );
        // ^============ image stickers  =====================
      } else {
        try {
          await client.sendImageAsStickerAsReply(
            message.to,
            message.quotedMsg.body,
            message.id
          );
        } catch (error) {
          await client.reply(
            message.to,
            " STICKER PROCESSING ERROR!!",
            message.id
          );
        }
      }
      // ============ STICKER ends here =====================
    }
  });
  // ! ==============================
  //  ? BOT FEATURES FOR OWNER USE
  // ! ==============================
  client.onAnyMessage(async (message) => {
    if (message.fromMe) {
      if (message.body === "hi") {
        // * ==============================
        //  ! GREETINGS PART
        // * ==============================
        console.log("hi");
        // ============ GREETINGS ends here ====================
      } else if (message.body === ".sticker" && message.quotedMsgObj !== null) {
        // * ==============================
        //  ! STICKER GENERATOR PART
        // * ==============================

        // ^============ video stickers  =====================
        if (message.quotedMsgObj.type === "video") {
          try {
            // const url = await client.download( message.quotedMsg.body)
            await client.sendMp4AsSticker(
              message.to,
              message.quotedMsg.body ,
              message.id
            );
          } catch (error) {
            await client.reply(
              message.to,
              " STICKER PROCESSING ERROR!!",
              message.id
            );
          }

          // ^============ errors messages  =====================
        } else if (message.quotedMsgObj.type === "chat") {
          await client.reply(
            message.to,
            "No media Found on qouted message !!",
            message.id
          );
          // ^============ image stickers  =====================
        } else {
          try {
            await client.sendImageAsStickerAsReply(
              message.to,
              message.quotedMsg.body,
              message.id
            );
          } catch (error) {
            await client.reply(
              message.to,
              " STICKER PROCESSING ERROR!!",
              message.id
            );
          }
        }
        // ============ STICKER ends here =====================
      } else if (message.body === ".create-group") {
        // * ==============================
        //  ! CREATING A GROUP PART
        // * ==============================
        try {
          const created = await client.createGroup("Cool new group", [
            ...message.mentionedJidList,
            message.from,
          ]);
          if (created) {
            await client.reply(
              message.to,
              `Group successfully created`,
              message.id
            );
          }
        } catch (error) {
          await client.reply(
            message.to,
            `An error occured while trying to create the group`,
            message.id
          );
        }
        // ============ CREATING A GROUP ends here ====================
      } else if (message.body.startsWith(".kick ") && message.isGroupMsg) {
        // * ==============================
        //  ! REMOVE FROM GROUP PART
        // * ==============================
        try {
          const group = await client.getChatById(message.chatId);
          const kicked = await client.removeParticipant(
            group.id,
            message.mentionedJidList[0]
          );
          if (kicked) {
            await client.reply(
              message.to,
              `Successfully kicked the participant`,
              message.id
            );
          }
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/_/g, " ")}`,
            message.id
          );
        }
        // ============ REMOVE FROM GROUP ends here ====================
      } else if (message.body.startsWith(".promote ") && message.isGroupMsg) {
        // * ==============================
        //  ! PROMOTE TO  GROUP ADMIN PART
        // * ==============================
        try {
          const group = await client.getChatById(message.chatId);
          const kicked = await client.promoteParticipant(
            group.id,
            message.mentionedJidList[0]
          );
          if (kicked) {
            await client.reply(
              message.to,
              `Successfully promoted participant the participant to Admin`,
              message.id
            );
          }
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/_/g, " ")}`,
            message.id
          );
        }
        // ============ PROMOTE TO  GROUP ADMIN ends here ====================
      } else if (message.body.startsWith(".demote ") && message.isGroupMsg) {
        // * ==============================
        //  ! DEMOTE FROM GROUP ADMIN PART
        // * ==============================
        try {
          const group = await client.getChatById(message.chatId);
          const kicked = await client.demoteParticipant(
            group.id,
            message.mentionedJidList[0]
          );
          if (kicked) {
            await client.reply(
              message.to,
              `Successfully demoted participant the participant from Admin`,
              message.id
            );
          }
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/_/g, " ")}`,
            message.id
          );
        }
        // ============ DEMOTE FROM GROUP ADMIN ends here ====================
      } else if (message.body.startsWith(".add ") && message.isGroupMsg) {
        // * ==============================
        //  ! ADD TO GROUP PART
        // * ==============================
        try {
          const group = await client.getChatById(message.chatId);
          const parent = await message.body.split(" ");
          const user = `${parent[1]}@c.us`;

          const added = await client.addParticipant(group.id, user);
          if (added) {
            await client.reply(
              message.to,
              `Successfully added the participant`,
              message.id
            );
          }
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/_/g, " ")}`,
            message.id
          );
        }
        // ============  ADD TO GROUP ends here ====================
      } else if (message.body.startsWith(".admins") && message.isGroupMsg) {
        // * ==============================
        //  !  GROUP ADMINS PART
        // * ==============================
        try {
          const group = await client.getChatById(message.chatId);
          const admins = await client.getGroupAdmins(group.id);

          let adminlist = admins?.toString()?.replace(/@c.us,/g, "\n");

          await client.reply(message.to, adminlist, message.id);
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/@c.us,/g, "\n")}`,
            message.id
          );
        }
        // ============  GROUP  ADMINS ends here ====================
      } else if (message.body === ".clear") {
        // * ==============================
        //  ! CLEAR ALL MESSAGES IN CHAT
        // * ==============================
        await client.clearChat(message.chatId);
      } else if (message.body === ".block" && !message.isGroupMsg) {
        // * ==============================
        //  ! BLOCK PERSON
        // * ==============================
        await client.contactBlock(message.to);
      } else if (message.body === ".unblock" && !message.isGroupMsg) {
        // * ==============================
        //  ! UNBLOCK PERSON
        // * ==============================
        await client.contactUnblock(message.to);
      } else if (message.body === ".darkmode") {
        // * ==============================
        //  ! DARK MODE
        // * ==============================
        await client.darkMode(true);
      } else if (message.body === ".lightmode") {
        // * ==============================
        //  ! LIGHT MODE
        // * ==============================
        await client.darkMode(false);
      } else if (message.body === ".deletestatus") {
        // * ==============================
        //  ! DELETE ALL STATUS
        // * ==============================
        await client.deleteAllStatus();
      } else if (message.body === ".deletechat") {
        // * ==============================
        //  ! DELETE THE CHAT 
        // * ==============================
        await client.deleteChat(message.chatId);
      } else if (message.body === ".delete") {
        // * ==============================
        //  ! DELETE ONE MESSAGE
        // * ==============================
        await client.deleteMessage(message.chatId , message.quotedMsgObj.id);
      } else if (message.body === ".battery") {
        // * ==============================
        //  ! GET BATTERY PERCENTAGE
        // * ==============================
      const battery = await client.getBatteryLevel();
      await client.reply(
        message.to,
        `${battery}`,
        message.id
      );
      } else if (message.body.startsWith(".invitelink") && message.isGroupMsg) {
        // * ==============================
        //  !  GROUP INVITE LINK PART
        // * ==============================
        try {
          const groupLink = await client.getGroupInviteLink(message.chatId);

          await client.reply(message.to, groupLink, message.id);
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/@c.us,/g, "\n")}`,
            message.id
          );
        }
        // ============  GROUP  ADMINS ends here ====================
      } else if (message.body.startsWith(".join ") && message.isGroupMsg) {
        // * ==============================
        //  ! JOIN A GROUP PART
        // * ==============================
        try {
          const parent = await message.body.split(" ");
          const link = parent[1]

          await client.joinGroupViaLink(link);
      
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/_/g, " ")}`,
            message.id
          );
        }
        // ============  ADD TO GROUP ends here ====================
      } else if (message.body.startsWith(".leave") && message.isGroupMsg) {
        // * ==============================
        //  ! LEAVE A  GROUP PART
        // * ==============================
        try {
          const group = await client.getChatById(message.chatId);
          await client.leaveGroup(group.id);
      
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/_/g, " ")}`,
            message.id
          );
        }
        // ============  ADD TO GROUP ends here ====================
      } else if (message.body === ".pin") {
        // * ==============================
        //  ! PIN THE CHAT 
        // * ==============================
        await client.pinChat(message.chatId);
      } else if (message.body.startsWith(".carbon") && message.quotedMsgObj !== null) {
        // * ==============================
        //  ! CARBON TEXT 
        // * ==============================
        try {
          async function carbon(text) {

            let respoimage = await axios.get(`https://carbonnowsh.herokuapp.com/?code=${text.replace(/ /gi,"+")}&theme=darcula&backgroundColor=rgba(36, 75, 115)`, { responseType: 'arraybuffer' }).catch(function(error) {
                return "error";
            });
        
            return ({
                mimetype: "image/png",
                data: Buffer.from(respoimage.data).toString('base64'),
                filename: "carbon"
            });
         }
         let data;
         data = await carbon(message.quotedMsgObj.body);
         if (data == "error") {
          await client.reply(message.to, `🙇‍♂️ *Error*\n\n` + "```Something Unexpected Happened to create the Carbon.```");
      } else {
          await client.sendImage(message.chatId, `data:${data.mimetype};base64,${data.data};${data.filename}`, data.filename , "carbon" , message.id );
      }
        } catch (error) {
          await client.reply(
            message.to,
            `${error.message?.toLowerCase()?.replace(/_/g, " ")}`,
            message.id
          );
        }
        // ============ REMOVE FROM GROUP ends here ====================
      } else if (message.body.startsWith(".crypto ")){
          // * ==============================
      //  ! CRYPTO COINS PRICE  
      // * ==============================
        async function getPrice(cryptoCode) {
          cryptoCode = cryptoCode.toUpperCase();
          let mainconfig = {
              method: 'get',
              url: 'https://public.coindcx.com/market_data/current_prices'
          };
          return axios(mainconfig)
              .then(async function (response) {
                  let data = response.data;
                  // let cryptoCodeINR = cryptoCode + "KSH";
                  if (data[cryptoCode] != undefined) {
                      // cryptoCode = data[cryptoCode] == undefined ? cryptoCodeINR : cryptoCode;
                      let out = ({
                          name: cryptoCode,
                          price: data[cryptoCode] + " USDT"
                      });
                      return out;
                  } else {
                      return "unsupported";
                  }
              })
              .catch(function (error) {
                  return "error";
              });
       }
       let code = message.body.split(" ");
       let crycode = code[1]
       let data = await getPrice(crycode);

    if (data == "error") {
        await client.reply(message.to, `🙇‍♂️ *Error*\n\n` + "```Something unexpected happened while fetching Cryptocurrency Price```" , message.id);
    }
    if (data == "unsupported") {
        await client.reply(message.to, `🙇‍♂️ *Error*\n\n` + "```Support for this CryptoCurrency is not yet added```", message.id);
    }
    else {
        let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        await client.reply(message.to, `Price of *${data.name}* as of ${date} is *${data.price}*`, message.id);
    }
          // ============ CRYPTO END  =====================

      } else if (message.body.startsWith(".movieinfo ")){
        // * ==============================
    //  ! MOVIES START HERE 
    // * ==============================
    try {
      const [first, ...rest] = message.body.split(' ');

      let query = rest.join(" ");
      const imdb_host = `https://imdb-api.tprojects.workers.dev`;
      let data = await axios.get(`${imdb_host}/search?query=${query}`);
      data = data.data;
      if (data.results.length == 0) throw new Error("No results found.");
      let result = data.results[0];
  
      result = await axios.get(`${imdb_host}${result.api_path}`);
      result = await result.data;
      

      let text = `*${result.title}*\n_${
        result.contentType === "Movie"
          ? `Movie · ${result.contentRating} · ${result.runtime} · ${result.year}`
          : result.contentType
      }_\n_*${result.rating.star}* ⭐ - *${formatNum(
        result.rating.count
      )}* Ratings_\n\n*Genre:* ${result.genre.join(", ")}\n*Plot:* ${
        result.plot
      }\n${await result.top_credits.map((x) => `*${x.name}:* ${x.value.join(", ")}`)}\n\n*IMDB Link:* ${result.imdb}`
  
     await client.reply(message.to , text , message.id)   
     const image = await client.download( result.image)
      await client.sendImage(
        message.chatId,
        image,
       `${result.title}.jpg`,
         text,
         message.id
      );
    } catch (error) {
      let messagetosend = `Something went wrong to get this content\n\n${error?.message}`;
      await client.reply(message.to, messagetosend);
    }
        // ============ MOVIES END  =====================

      } else if ( message.body.startsWith(".shorten ") ){
        // * ==============================
      //  ! SHORTEN LINK PART  
      // * ==============================
      async function getShortURL(input) {
        let mainconfig = {
            method: 'get',
            url: `https://da.gd/s?url=${input}` 
        };
        return axios(mainconfig)
            .then(async function (response) {
                let shortened = response.data;
                let out = ({
                    input: input,
                    short: shortened.replace(/\n/g, '')
                });
                return out;
            })
            .catch(function (error) {
                return "error";
            });
    }

    if( message.quotedMsgObj !== null ){
      data = await getShortURL(message.quotedMsgObj.body);
  }
  else{
     const [first, ...rest] = message.body.split(' ');
      
      data = await getShortURL(rest);
  }

  if (data == "error") {
      await client.reply(message.to, `🙇‍♂️ *Error*\n\n` + "```Please make sure the entered URL is in correct format.```" , message.id);
  }
  else {
      await client.reply(message.to, `Short URL for ${data.input} is 👇\n${data.short}`, message.id);
  }

    }


      // ^=================================
    }
  });
  // ! ====================================
  //  ? BOT FEATURES FOR FUN ISSUES
  // ! ================================
  client.onBattery((battery) => {
    console.log(battery);
  });

  client.onPlugged((plugged) => {
    console.log(plugged);
  });
}

create({
  sessionId: "SOSYFY",
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  logConsole: false,
  popup: true,
  qrTimeout: 0,
}).then(start);
