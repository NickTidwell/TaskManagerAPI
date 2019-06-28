const sgMail = require('@sendgrid/mail')
const sendgridApiKey = process.env.SENGRID_API_KEY

sgMail.setApiKey(sendgridApiKey)


const sendWelcomeMessage = (email, name) =>{

    sgMail.send({
        to: email,
        from: 'nicktidwell@gmail.com',
        subject: 'Welcome Message',
        text: `Welcome to my website ${name}`
    })
}

const sendCancelationEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'nicktidwell52@gmail.com',
        subject: 'cancel email',
        text: `Bye Bye ${name}`
    })
}

module.exports = {
    sendWelcomeMessage,
    sendCancelationEmail
}