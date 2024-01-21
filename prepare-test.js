import  fs from 'fs'
fs.copyFile('babel.config.cjs.tmp', 'babel.config.cjs', (err) => {
    if (err) throw err;
    console.log('done copy');
  });