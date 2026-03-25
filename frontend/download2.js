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

const options = {
  headers: {
    'User-Agent': 'CoolBot/1.0 (https://example.org/ mycontact@example.org) Node.js/16.0'
  }
};

Object.entries(images).forEach(([filename, url]) => {
  const dest = dir + '/' + filename;
  
  const req = https.get(url, options, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      https.get(res.headers.location, options, (res2) => {
        const file = fs.createWriteStream(dest);
        res2.pipe(file);
      });
    } else {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
    }
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
});
