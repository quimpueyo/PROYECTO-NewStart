const https = require('https');
const fs = require('fs');

const images = {
  'berlin.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Brandenburger_Tor_abends.jpg',
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

Object.entries(images).forEach(([filename, url]) => {
  const dest = dir + '/' + filename;
  const file = fs.createWriteStream(dest);
  
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
            res2.pipe(file);
        });
    } else {
        response.pipe(file);
    }
  }).on('error', (err) => {
    console.error('Error downloading ' + filename, err);
  });
});
