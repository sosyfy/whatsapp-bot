const axios = require("axios");
const cheerio = require("cheerio");
const link = `https://www.jumia.co.ke/home-kitchen-furniture/?page=${1}#catalog-listing`;

async function furniture(page) {
  let products = [];

  for (let index = 0; index < page; index++) {
    const response = await axios.get(
      `https://www.jumia.co.ke/home-kitchen-furniture/?page=${index}#catalog-listing`
    );
    let $ = cheerio.load(response.data);

    $(
      'div[class="-paxs row _no-g _4cl-3cm-shs"] article[class="prd _fb col c-prd"] a'
    ).each((i, prod) => {
      const prodlink = $(prod).attr("href");
      const tittle = $(prod).find('div[class="info"] > h3').text();
      const cost = $(prod).find('div[class="info"] > .prc').text();
      const discount = $(prod)
        .find('div[class="info"] > .s-prc-w > div[class="bdg _dsct _sm"]')
        .text();

      products.push({
        link: link + prodlink,
        tittle,
        cost,
        discount,
      });
    });
  }

  return products;
}

const happymod = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://www.happymod.com/search.html?q=" + query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const nama = [];
        const link = [];
        const rating = [];
        const thumb = [];
        const format = [];
        $(
          "body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > h3 > a"
        ).each(function (a, b) {
          nem = $(b).text();
          nama.push(nem);
          link.push("https://happymod.com" + $(b).attr("href"));
        });
        $(
          "body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > div.clearfix > span"
        ).each(function (c, d) {
          rat = $(d).text();
          rating.push(rat);
        });
        $(
          "body > div.container-row.clearfix.container-wrap > div.container-left > section > div > a > img"
        ).each(function (e, f) {
          thumb.push($(f).attr("data-original"));
        });
        for (let i = 0; i < link.length; i++) {
          format.push({
            judul: nama[i],
            thumb: thumb[i],
            rating: rating[i],
            link: link[i],
          });
        }
        const result = {
          creator: "Hanya Orang Biasa",
          data: format,
        };
        resolve(result);
      })
      .catch(reject);
  });
};

exports.ghuser = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://github.com/search?q=" + query + "&type=users")
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const username = [];
        const link = [];
        const result = [];
        const thumb = [];
        $(
          "#user_search_results > div > div > div.flex-auto > div > div.f4.text-normal > a.color-text-secondary"
        ).each(function (a, b) {
          link.push("https://github.com/" + $(b).attr("href"));
          usr = $(b).text();
          username.push(usr);
        });
        $(
          "#user_search_results > div > div > div.flex-shrink-0.mr-2 > a > img"
        ).each(function (c, d) {
          thumb.push($(d).attr("src").replace("s=40&", ""));
        });
        for (let i = 0; i < link.length; i++) {
          result.push({
            name: username[i],
            thumb: thumb[i],
            link: link[i],
          });
        }
        resolve(result);
      })
      .catch(reject);
  });
};
exports.wallpapercave = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://wallpapercave.com/search?q=" + query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        $("div.imgrow > a").each(function (a, b) {
          if (!$(b).find("img").attr("src").includes(".gif")) {
            result.push(
              "https://wallpapercave.com/" +
                $(b).find("img").attr("src").replace("fuwp", "uwp")
            );
          }
        });
        resolve(result);
      })
      .catch(reject);
  });
};

exports.wallpapercraft = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://wallpaperscraft.com/search/?query=" + query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        $("span.wallpapers__canvas").each(function (a, b) {
          result.push($(b).find("img").attr("src"));
        });
        resolve(result);
      })
      .catch(reject);
  });
};

exports.wallpaperhd = (chara) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://wall.alphacoders.com/search.php?search=" +
          chara +
          "&filter=4K+Ultra+HD"
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        $("div.boxgrid > a > picture").each(function (a, b) {
          result.push($(b).find("img").attr("src").replace("thumbbig-", ""));
        });
        resolve(result);
      })
      .catch(reject);
  });
};


exports.apkmody = (query) => {
  return new Promise((resolve,reject) => {
          axios.get('https://apkmody.io/?s=' + query)
          .then(({ data }) => {
            //console.log(data)
                  const $ = cheerio.load(data)
                  const nama = [];
                  const link = [];
                  const mod = [];
                  const thumb = [];
                  const format = [];
                  $('#primary > section:nth-child(3) > div > div > div > article > a > div > div > div > h2').each(function(a,b) {
                    nem = $(b).text();
                    nama.push(nem)
                  })
                  $('#primary > section:nth-child(3) > div > div > div > article > a > div > div > p').each(function(c,d) {
                    modd = $(d).text();
                    mod.push(modd.split('\n')[1])
                  })
                  $('#primary > section:nth-child(3) > div > div > div > article > a > div > img').each(function(e,f) {
                    thumb.push($(f).attr('src'))
                  })
                  $('#primary > section:nth-child(3) > div > div > div > article > a').each(function(g,h) {
                    link.push($(h).attr('href'))
                  })
                  for(let i=0; i<link.length; i++){
                    format.push({
                      judul : nama[i],
                      infomod : mod[i], 
                      thumb : thumb[i],
                      link : link[i]
                    })
                  }
                 const result = {
                  creator : 'Hanya Orang Biasa',
                  data : format
                 }

            resolve(result)
          })
          .catch(reject)
  })
}


/*
TO DO  LIST 
const link = await axios.get(`https://www.gsmarena.com/res.php3?sSearch=${querry}`)
const link =  await axios.get(`https://id.wikipedia.org/wiki/${querry}`)



*/ 
module.exports = { furniture, happymod };
