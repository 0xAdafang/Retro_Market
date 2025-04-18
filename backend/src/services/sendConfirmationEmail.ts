const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    ignoreTLS: true
});

const sendConfirmationEmail = async (email: string, token: string) => {
    const confirmUrl = `${process.env.FRONTEND_URL}/confirm-email/${token}`;
    const mailOptions = {
        from: "no-reply@retromarket.com",
        to: email,
        subject: 'Confirmez votre inscription',
        html: `<p>Bienvenue ! Cliquez sur ce lien pour confirmer votre compte :</p>
           <a href="${confirmUrl}">${confirmUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);
};
export default sendConfirmationEmail;