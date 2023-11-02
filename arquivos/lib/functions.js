const fs = require('fs');
const cfonts = require("cfonts")
const moment = require("moment-timezone")
//const { color } = require('./color')
//const config = JSON.parse(fs.readFileSync("./info/infobot.json"))
//prefix = config.prefix
//prefixo = config.prefix





const banner = cfonts.render(("Nero|V1"), {
font: "block",
align: "center",
colors: ["red", "yellow"]
})

const getBuffer = async (url, opcoes) => {
try {
opcoes ? opcoes : {}
const post = await axios({
method: "get",
url,
headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
	'DNT': 1,
	'Upgrade-Insecure-Request': 1
},
...opcoes,
responseType: 'arraybuffer'
})
return post.data
} catch (erro) {
console.log(`Erro identificado: ${erro}`)
}
}
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const getExtension = async (type) => {
	return await mimetype.extension(type)
}

//======//


function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}


module.exports = { TelegraPh }





const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time2 > "00:00:00"){
var time = '♧ Boa madruga ♧'
}
if(time2 > "05:30:00"){
var time = '♧ Bom dia ♧'
}
if(time2 > "12:00:00"){
var time = '♧ Boa tarde ♧'
}
if(time2 > "19:00:00"){
var time = '♧ Boa noite ♧'
}
const timee = moment.tz("America/Sao_Paulo").format("HH:mm:ss")

const banner2 = cfonts.render((`${time}`), {
font: "console",
align: "center",
})

resposta = {
espere: "💦 Aguarde...enviando ",
dono: "💦 Esse comando so pode ser usado pelo meu dono!!! ",
grupo: "💦 Esse comando só pode ser usado em grupo ",
privado: "💦 Esse comando só pode ser usado no privado ",
adm: "💦 Esse comando só pode ser usado por administradores de grupo",
botadm: " 💦 Este comando só pode ser usado quando o bot se torna administrador ",
//registro: `[⚙️️] Você não se registrou utilize ${prefixo}rg para se registrar `,
norg: "[⚙️️] Você ja está registrado ",
erro: "💦 Error, tente novamente mais tarde "
}


module.exports = {
banner,
banner2
}
