const router = require('express').Router();
const nodemailer = require('nodemailer');
require("dotenv").config();


router.post('/contact', (req,res) =>{
    let data = req.body;
    if (data.nome.length === 0 || data.email.length === 0 || data.mensagem.length === 0) {
        return res.json({ msg: "por favor complete todos os campos.." })
    } 

        let smtpTransporter = nodemailer.createTransport({
            service: 'gmail',
            port:465,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
      /*  const stpTransporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'peggie57@ethereal.email',
                pass: 'JwBrCyBnjDu1pFAjsS'
            }
        });*/
        let mailOptions = {
            from:data.email,
            to:'codenamtec@gmail.com',
            subject: `mensagem de ${data.nome}`,
            html:`
                <h3>Informações<h3/>
                <ul>
                    <li>Nome: ${data.nome}</li>
                    <li>Email: ${data.email}</li>
                </ul>
                <h3>Mensagem<h3/>
                <p>${data.mensagem}<p/>
            `
        }

        smtpTransporter.sendMail(mailOptions, (error)=>{
            try {
                if(error) return res.status(400).json({msg: 'Por Favor complete todos os campos..'})
                res.status(200).json({msg: 'Muito grato por seu contato..'})

            } catch (error) {
                if(error) return res.status(500).json({msg: "Existe erro no servidor"})
            }
        })
})
module.exports=router;