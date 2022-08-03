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

(async () => {
    try {
        const randIp = `${randomize('0', 3)}.${randomize('0', 3)}.${randomize('0', 2)}.${randomize('0', 2)}`
        const reffCode = readline.question("Kode reff : ")
        const nomor = readline.question('Nomor (ex: 819XXXX): ')

        const sendOtp = await functionSendOtp(randIp, nomor)
        if(sendOtp.status == 'success'){
            console.log("OTP berhasil dikirim")
            const otp = readline.question("OTP : ")
            const register = await functionRegister(randIp, nomor, reffCode, otp)
            if(register.status == 'success'){
                console.log("Reff sukses")
                console.log("")
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
})();