const fetch = require('node-fetch')
var randomize = require('randomatic');
const crypto = require('crypto');
const readline = require('readline-sync');

const functionLogin = (randIp, nomor) => new Promise((resolve, reject) => {
    const bodys = {
        "user_login":`62${nomor}`,
        "user_pass":"jajang908",
        "user_email":"",
        "source":"android",
        "ip":randIp,
        "v":"2.0.7.2",
        "l":"in"
    }

    fetch(`https://api.yoha.pro/api/auth/login`, { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'X-Forwarded-For': `${randIp}`,
            'Host': 'api.yoha.pro',
            'accept': 'application/json',
            'content-type': 'application/json; charset=utf-8',
            'content-length': 87,
            'accept-encoding': 'gzip',
            'user-agent': 'okhttp/5.0.0-alpha.2'
        }
   })
   .then(res => res.json())
   .then(result => {
       resolve(result);
   })
   .catch(err => reject(err))
});

const functionCheckTask = (randIp, token) => new Promise((resolve, reject) => {
    fetch(`https://api.yoha.pro/api/signs/init?ip=${randIp}&v=2.0.7.2&l=in`, { 
        method: 'GET', 
        headers: {
            'X-Forwarded-For': `${randIp}`,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Host': 'api.yoha.pro',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/5.0.0-alpha.2'
        }
   })
   .then(res => res.json())
   .then(result => {
       resolve(result);
   })
   .catch(err => reject(err))
});

const functionClaim = (randIp, totalClaim, token) => new Promise((resolve, reject) => {
    const bodys = {
        "ip":randIp,
        "v":"2.0.7.2",
        "l":"in"
    }

    fetch(`https://api.yoha.pro/api/signs/store?day=${totalClaim}&sign_id=${totalClaim}&ip=${randIp}&v=2.0.7.2&l=in`, { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'X-Forwarded-For': `${randIp}`,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': 47,
            'Host': 'api.yoha.pro',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/5.0.0-alpha.2'
        }
   })
   .then(res => res.json())
   .then(result => {
       resolve(result);
   })
   .catch(err => reject(err))
});

(async () => {
    try {
        const randIp = `${randomize('0', 3)}.${randomize('0', 3)}.${randomize('0', 2)}.${randomize('0', 2)}`
        const nomor = readline.question('Nomor (ex: 819XXXX): ')
    
        const login = await functionLogin(randIp, nomor)
        if(login.code == 200){
            console.log("Login sukses")
            const token = login.data.access_token
            const checkTask = await functionCheckTask(randIp, token)
            const totalClaim = checkTask.data.toDayStatus + 1
            console.log(`Reward yang telah diclaim : ${checkTask.data.toDayStatus} hari`)
            const claim = await functionClaim(randIp, totalClaim, token)
            if(checkTask.code == 200 && claim.code == 200){
                console.log(`Claim harian sukses, reward : ${claim.data.amount}`)
                console.log("")
            } else {
                console.log("CLaim gagal, coba esok hari")
                console.log("")
            }
        } else {
            console.log("Login gagal, password atau nomor salah.")
            console.log("")
        }
    } catch (error) {
        console.log(error);
    }
})();