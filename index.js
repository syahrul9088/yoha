const fetch = require('node-fetch')
var randomize = require('randomatic');
const crypto = require('crypto');
const readline = require('readline-sync');

const functionSendOtp = (randIp, nomor) => new Promise((resolve, reject) => {
    const bodys = {
        "mobile":`62${nomor}`,
        "tag":"register",
        "ip":randIp,
        "v":"2.0.7.2",
        "l":"in"
    }

    fetch(`https://api.yoha.pro/api/sms/verify-code`, { 
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

const functionRegister = (randIp, nomor, reffCode, otp) => new Promise((resolve, reject) => {
    const bodys = {
        "user_login":`62${nomor}`,
        "user_pass":"jajang908",
        "user_pass2":"jajang908",
        "source":"android",
        "referral_code":reffCode,
        "channel_code":"8",
        "unique_code":`${randomize('0', 13)}-${randomize('0', 19)}`,
        "code":otp,
        "pasteboard":"",
        "device_code":`${crypto.randomBytes(16).toString('hex')}`,
        "guest_code":"",
        "ip":randIp,
        "v":"2.0.7.2",
        "l":"in"
    }

    fetch(`https://api.yoha.pro/api/auth/register`, { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'X-Forwarded-For': `${randIp}`,
            'Host': 'api.yoha.pro',
            'accept': 'application/json',
            'content-type': 'application/json; charset=utf-8',
            'content-length': '333',
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

const functionGetDetailUserLive = (randIp, token) => new Promise((resolve, reject) => {
    const bodys = {
        "ip":randIp,
        "v":"2.0.7.2",
        "l":"in"
    }

    fetch(`https://tech04.yoha.pro/live/list?type=0&page=1&per_page=9&ip=${randIp}&v=2.0.7.2&l=in`, { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'X-Forwarded-For': `${randIp}`,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': 47,
            'Host': 'tech04.yoha.pro',
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

const functionSendGift = (randIp, token, streamId, liveId) => new Promise((resolve, reject) => {
    const bodys = {
        "gift_id":"3",
        "num":"1",
        "type":"0",
        "combo":"false",
        "stream":streamId,
        "live_uid":liveId,
        "ip":randIp,
        "v":"2.0.7.2",
        "l":"in"
    }

    fetch(`https://tech04.yoha.pro/live/sendGift`, { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'X-Forwarded-For': `${randIp}`,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': 47,
            'Host': 'tech04.yoha.pro',
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
    var reffCode = readline.question("Kode reff : ")
    var jmlReff = readline.question("Jumlah reff: ")

    console.log("")

    for(var i = 0; i < jmlReff; i++){
        try {
            const randIp = `${randomize('0', 3)}.${randomize('0', 3)}.${randomize('0', 2)}.${randomize('0', 2)}`
            const nomor = readline.question('Nomor (ex: 819XXXX): ')
    
            const sendOtp = await functionSendOtp(randIp, nomor)
            if(sendOtp.status == 'success'){
                console.log("OTP berhasil dikirim")
                const otp = readline.question("OTP : ")
                const register = await functionRegister(randIp, nomor, reffCode, otp)
                if(register.status == 'success'){
                    console.log("Reff sukses")
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
                            const getUser = await functionGetDetailUserLive(randIp, token)
                            var randomUser = getUser.data.list[Math.floor(Math.random()*getUser.data.list.length)]
                            const streamId = randomUser.stream
                            const liveId = randomUser.uid
    
                            const sendGift = await functionSendGift(randIp, token, streamId, liveId)
                            if(sendGift.code == 200){
                                console.log(`Berhasil send gift ke ${randomUser.user_nicename}`)
                                console.log("")
                            } else {
                                console.log("Gagal send gift, saldo mungkin kurang.")
                                console.log("")
                            }
                        } else {
                            console.log("CLaim gagal, coba esok hari")
                            console.log("")
                        }
                    } else {
                        console.log("Login gagal, password atau nomor salah.")
                        console.log("")
                    }
                } else {
                    console.log("Reff gagal")
                    console.log("")
                }
            } else {
                console.log("OTP gagal dikirim")
                console.log("")
            }
        } catch (error) {
            console.log(error);
        }
    }
})();
