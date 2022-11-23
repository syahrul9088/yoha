const fetch = require('node-fetch')
var randomize = require('randomatic');
const readline = require('readline-sync');
const fs = require('fs-extra');
const getIPRange = require('get-ip-range');

const functionSendOtp = (randIp, nomor) => new Promise((resolve, reject) => {
    const bodys = {
        "mobile":`62${nomor}`,
        "tag":"register"
    }

    fetch(`https://php.btliveroom.live/api/sms/verify-code`, { 
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
            'content-length': 43,
            'v': '1.0.0',
            'host': 'php.btliveroom.live',
            'l': 'in'
        }
   })
   .then(res => res.json())
   .then(result => {
       resolve(result);
   })
   .catch(err => reject(err))
});

const functionRegister = (randIp, nomor, reffCode, otp) => new Promise((resolve, reject) => {

    const time = new Date().getTime()
    const unique_code = `${time}-${randomize("0", 19)}`
    const guest_code = `${time}${randomize("0", 10)}`

    const bodys = {
        "device_code": "",
        "channel_code": "1",
        "code": otp,
        "unique_code": unique_code,
        "guest_code": guest_code,
        "pasteboard": `\"device_code\": \"\",\n  \"channel_code\": \"1\",\n  \"code\": \"${reffCode}\",\n  \"unique_code\": \"${unique_code}\",\n  \"guest_code\": \"${guest_code}\",\n  \"pasteboard\": \"https://java.btliveroom.live/auth/v1.0/register\",\n  \"referral_code\": \"${reffCode}\",\n  \"user_login\": \"62${nomor}\",\n  \"user_pass\": \"jajang908\"`,
        "referral_code": reffCode,
        "user_login": `62${nomor}`,
        "user_pass": "jajang908"
    }

    fetch(`https://java.btliveroom.live/auth/v1.0/register`, { 
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
            'content-length': 43,
            'v': '1.0.0',
            'host': 'php.btliveroom.live',
            'l': 'in'
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
        "user_login": `62${nomor}`,
        "user_pass": 'jajang908'
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
    var reffCode = readline.question("Kode reff : ")
    var jmlReff = readline.question("Jumlah reff: ")

    console.log("")

    for(var i = 0; i < jmlReff; i++){
        try {
            const listIp = await JSON.parse(fs.readFileSync('./ip.json'))  
            const chooseIp = listIp[Math.floor(Math.random()*listIp.length)]
            const start = chooseIp.start
            const end = chooseIp.end
            const genIp = getIPRange(`${start}`, `${end}`);
            const randIp = genIp[Math.floor(Math.random()*genIp.length)]
            const nomor = readline.question('Nomor (ex: 819XXXX): ')

            console.log(`Mencoba regist 0${nomor} => IP address ${randIp}`)
    
            const sendOtp = await functionSendOtp(randIp, nomor)
            if(sendOtp.status == 'success'){
                console.log(`OTP berhasil dikirim`)
                const otp = readline.question("OTP : ")
                const register = await functionRegister(randIp, nomor, reffCode, otp)
                if(register.status == 'success'){
                    console.log("Berhasil mendaftar")
                    const login = await functionLogin(randIp, nomor)
                    if(login.code == 200){
                        console.log(`Login sukses | ID => ${login.data.user_info.id}`)
                    } else {
                        console.log(`Login gagal, ${login.message}`)
                        console.log("")
                    }
                } else {
                    console.log(`Gagal mendaftar, ${register.message}`)
                    console.log("")
                }
            } else {
                console.log(`OTP gagal dikirim, ${sendOtp.message}`)
                console.log("")
            }
        } catch (error) {
            console.log(error);
        }
    }
})();
