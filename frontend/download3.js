const https = require('https');
const fs = require('fs');

const images = {
  'bremen.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bremen_Rathaus_Roland_vorn.jpg',
  'lubeck.jpg': 'https://upload.wikimedia.org/wikipedia/commons/6/67/L%C3%BCbeck_Holstentor_2011.jpg',
  'oslo.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Oslo_skyline_from_Ekeberg_2016.jpg',
  'bergen.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Bryggen_in_Bergen%2C_Norway.jpg',
  'stavanger.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Stavanger_Gamle_Stavanger_01.jpg',
  'marseille.jpg': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Marseille_Vieux_Port.jpg',
  'toulouse.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Capitole_de_Toulouse_01.jpg',
  'tours.jpg': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Place_Plumereau_%28Tours%29.jpg'
};

const dir = 'public/assets/img/destinations';
const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' };

function download(url, dest) {
  https.get(url, { headers }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let newUrl = res.headers.location;
        if (!newUrl.startsWith('http')) newUrl = 'https://upload.wikimedia.org' + newUrl;
        download(newUrl, dest);
    } else if (res.statusCode === 200) {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log('Downloaded', dest); });
    } else {
      console.log('Failed:', url, res.statusCode);
    }
  }).on('error', err => console.error(err));
}

Object.entries(images).forEach(([name, url]) => download(url, dir + '/' + name));
