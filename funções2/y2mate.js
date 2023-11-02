const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;

async function post(url, formdata) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: new URLSearchParams(Object.entries(formdata))
  });
  return res;
}

async function yt(url, quality, type, bitrate, server = 'en68') {
  const ytId = ytIdRegex.exec(url);
  const y2mateUrl = `https://www.y2mate.com/mates/${server}`;

  const res = await post(`${y2mateUrl}/analyze/ajax`, {
    url: `https://youtu.be/${ytId[1]}`,
    q_auto: 0,
    ajax: 1
  });
  const json = await res.json();
  const { document } = new JSDOM(json.result).window;
  const tables = document.querySelectorAll('table');
  const table = tables[type === 'mp3' ? 1 : 0];
  let list = {};
  switch (type) {
    case 'mp4':
      list = Object.fromEntries(
        [...table.querySelectorAll('td > a[href="#"]')]
          .filter(v => !/\.3gp/.test(v.innerHTML))
          .map(v => [v.innerHTML.match(/.*?(?=\()/)[0].trim(), v.parentElement.nextSibling.nextSibling.innerHTML])
      );
      break;
    case 'mp3':
      list = { '128kbps': table.querySelector('td > a[href="#"]').parentElement.nextSibling.nextSibling.innerHTML };
      break;
  }
  const filesize = list[quality];
  const id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', ''];
  const thumb = document.querySelector('img').src;
  const title = document.querySelector('b').innerHTML;

  const res2 = await post(`${y2mateUrl}/convert`, {
    type: 'youtube',
    _id: id[1],
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: type,
    fquality: bitrate
  });
  const json2 = await res2.json();
  const KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize));
  const resUrl = /<a.+?href="(.+?)"/.exec(json2.result)[1];

  return {
    dl_link: resUrl.replace(/https/g, 'http'),
    thumb,
    title,
    filesizeF: filesize,
    filesize: KB
  };
}

module.exports = {
  yt,
  ytIdRegex,
  /**
   * Download YouTube Video as Audio via y2mate
   * @param {String} url YouTube Video URL
   * @param {String} server (avaiable: `id4`, `en60`, `en61`, `en68`)
   */
  yta(url, resol = '128kbps', server = 'en154') { return yt(url, resol, 'mp3', resol.endsWith('kbps') ? resol.replace(/kbps/g, '') : resol, server) },
  /**
   * Download YouTube Video as Video via y2mate
   * @param {String} url YouTube Video URL
   * @param {String} server (avaiable: `id4`, `en60`, `en61`, `en68`)
   */
  ytv(url, resol = '360p', server = 'en154') { return yt(url, resol, 'mp4', resol.endsWith('p') ? resol.replace(/p/g, '') : resol, server) },
  servers: ['en136', 'id4', 'en60', 'en61', 'en68']
}