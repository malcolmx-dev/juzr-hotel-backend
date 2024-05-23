const bcrypt = require('bcryptjs')
const User = require('../model/User')
const createError = require('../utils/error')
const nodemailer= require("nodemailer")
const {v4: uuidv4}= require("uuid")
const jwt= require('jsonwebtoken')
const UserVerification = require('../model/UserVerification')
const path = require("path")


require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})
transporter.verify((error, success)=> {
    if(error){
        console.log(error)
    }else{
        console.log("Ready for Messages")
        console.log(success)
    }
}) 

const register = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            surname: req.body.surname,
            password: hash,
            verified: false,
        });
        user.save()
          .then((result) =>sendVerificationEmail(result, res))
          .catch((error) => res.status(400).json( error ));
      })
      .catch((error) => res.status(500).json( error ));
}
const sendVerificationEmail= ({_id, email, name}, res) => {
    const currentUrl= "http://localhost:10000/"

    const uniqueString= uuidv4() + _id;

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Bienvenue ${name}! Vérifiez votre adresse e-mail pour terminer l'inscription et vous connecter à votre compte.</p><p>Ce lien <b> expire dans 6 heures</b>.</p>
        <p>Appuie <a href=${
            currentUrl + "api/auth/verify/" + _id + "/" + uniqueString
        }>ici</a> pour poursuivre</p>`
    }
    bcrypt.hash(uniqueString, 10)
        .then((hashedUniqueString)=> {
            const newVerification = new UserVerification({
                userId:_id,
                uniqueString:hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now()+ 21600000
            });

            newVerification.save()
                .then(() => {
                    transporter.sendMail(mailOptions)
                    .then(() => {
                        res.json({
                            status:"PENDING",
                            message:"Verification email sent!",
                            
                            
                        })
                        return
                    })
                    .catch((error) => {
                        console.log(error)
                        res.json({
                            status:"FAILED",
                            message:"Verification email failed!"
                        })
                        return
                    })
                } )
                .catch((error)=>{
                    console.log(error)
                    res.json({
                        status:"FAILED",
                        message:"Couldn't save verification email data!"
                    })
                    return
                })
        })
        .catch(()=>{
            res.json({
            status:"FAILED",
            message:"An error occurred while hashing email data!"
        }) 
        return
    }
        )

  }
const verify =  (req, res) => {
    let {userId, uniqueString} = req.params;

    UserVerification.find({userId})
        .then((result) => {
            if (result.length > 0 ) {
                
                const {expiresAt}= result[0];
                

                if (expiresAt < Date.now()) {
                    UserVerification.deletOne({userId})
                        .then(result => {
                            User.deletOne({_id: userId})
                                .then(()=> {
                                    let message = "Link has expired. Please sign up again"
                                    res.redirect(`/api/auth/verified?error=true&message=${message}`)
                                })
                                .catch(error => {
                                    
                                    let message = "Clearing User with expired unique string failed"
                                    res.redirect(`/api/auth/verified?error=true&message=${message}`)
                                })

                        } )
                        .catch((error) => {
                            console.log(error)
                            let message = "An error occurred while clering expired user verification record "
                            res.redirect(`/api/auth/verified?error=true&message=${message}`)
                        })
                }else{

                    bcrypt.compare(uniqueString, result[0].uniqueString)
                        .then(result => {
                            if (result) {

                                User.updateOne({_id: userId}, {verified: true})
                                    .then(() => {
                                        UserVerification.deleteOne({userId})
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "../views/verified.html"));
                                                
                                            } )
                                            .catch(error => {  
                                                console.log(error)
                                                let message = "An error occurred while finalizing succesful verification."
                                                res.redirect(`/api/auth/verified?error=true&message=${message}`)
                                            })
                                    })
                                    .catch(error => {  
                                        console.log(error)
                                        let message = "An error occurred while updating user record to show verified."
                                        res.redirect(`/api/auth/verified?error=true&message=${message}`)
                                    })


                            }else{

                                let message = "Invalid validation details passed. Check your inbox"
                                res.redirect(`/api/auth/verified?error=true&message=${message}`)
                            }
                        })
                        .catch((error) => { 
                            console.log(error)
                            let message = "An error occurred while comparing unique strings"
                            res.redirect(`/api/auth/verified?error=true&message=${message}`)
                            
                        })
                }
            }else{
                let message = "Account record doesn't exist  or has been verified already. Please sign up or log in "
                res.redirect(`/api/auth/verified?error=true&message=${message}`)
            }
        })
        .catch((error) => {
            console.log(error)
            let message = "An error occurred while checking for existing user verification record"
            res.redirect(`/api/auth/verified?error=true&message=${message}`)
        })
  }

const verified = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/verified.html"))
  }


const login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ 
                    status: 'FAILED',
                    message: 'Utilisateur non trouvé !' })
                    return
            }
            if(!user.verified){
                res.status(401).json({
                    status:"FAILED",
                    message:"L'e-mail n'a pas encore été vérifié. Vérifiez votre boîte de réception"
                })
                return
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ 
                            status: "FAILED",
                            message: 'Mot de passe ou e-mail incorrect !' });
                    }
                    const token= jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)



                    const {password, ...otherDetails} = user._doc
                    res.cookie('access_token', token, {
                        sameSite: "none",
                        secure: "true",
                        
                    }).status(200).json({...otherDetails, access_token:token })
                
        }).catch(error => res.status(500).json('Erreur2'));
        
 } ).catch(error => res.status(500).json('Erreur'));
}

module.exports= {register, login, verify, verified}