import nodemailer from "nodemailer";

interface Email {
  source: string;
  destination: string;
  subject: string;
  text: string;
}

export default async function sendEmail({
  source,
  destination,
  subject,
  text,
}: Email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    //Mila ovaina le pass fa tsy mety mahazo mot de passe application za
    auth: {
      user: "briceprivat292@gmail.com",
      pass: "amge ozcj ogfc zese",
    },
  });

  const mailOptions = {
    from: source,
    to: destination,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès : %s", info.messageId);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
}
