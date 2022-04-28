const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY
const fromEmail = process.env.SENDGRID_YOUR_EMAIL

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) =>{
     sgMail.send({
         to: email,
         from: fromEmail,
         subject: 'Thanks for joining in!',
         text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
     })
}

const sendCancelationEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: fromEmail,
        subject: 'Cancelation Confirmation',
        text: `Goodbye ${name}. Please let us know why you choose to leave us T^T.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}