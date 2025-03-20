const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prarambhcell.official@gmail.com",
    pass: "odaz paal hhnq bbxe",
  },
});

// Function to send welcome email
const sendWelcomeEmail = async (email, name, ctf_id, password) => {
  try {
    const mailOptions = {
        from: `"Prarambh Development Cell Official" <prarambhcell.official@gmail.com>`,
        to: email,
        subject: "Welcome to ZeroDay Workshop",
      html: `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      padding: 40px 0;
    }
    .content {
      width: 90%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      text-align: center;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .banner {
      width: 100%;
      height: auto;
      margin-bottom: 20px;
      border-radius: 5px;
    }
    h1 {
      color: #00ff41;
      font-size: 26px;
      margin-bottom: 10px;
      font-family: Arial, sans-serif;
    }
    p {
      color: #333333;
      font-size: 16px;
      line-height: 1.5;
      margin: 8px 0;
      font-family: Arial, sans-serif;
    }
    .highlight {
      color: #00ff41;
      font-weight: bold;
    }
    .credentials {
      background-color: #f2f2f2;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .credentials p {
      margin: 8px 0;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #888;
      font-family: Arial, sans-serif;
    }
    .footer img {
      margin-top: 10px;
      width: 120px;
      height: auto;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f9f9f9">
    <tr>
      <td align="center">
        <div class="email-container">
          <div class="content">
            <img src="https://res.cloudinary.com/dan454ywo/image/upload/v1742455127/Zero_mczmqt.png" alt="Zero Day Banner" class="banner" />

            <h1>Hola Cyber Warriors! 🐧</h1>
            <p>Dear ${name},</p>
            <p>We are excited to inform you that we are conducting the intense and thrilling <span class="highlight">HackWars CTF</span> as part of the <span class="highlight">ZERO DAY Workshop</span>! 🎯</p>
            <p>The CTF will be held on <span class="highlight">21st March, 2025</span>, marking the grand finale on the last day of the workshop. It will focus on applying all the concepts related to <span class="highlight">Cyber Security</span> covered throughout the workshop. 🛡️💻</p>

            <h2 style="color:#00ff41; margin-top: 25px;">Your Access Credentials:</h2>
            <div class="credentials">
              <p>CTF ID: <span class="highlight">${ctf_id}</span></p>
              <p>Password: <span class="highlight">${password}</span></p>
            </div>

            <p><strong>Note:</strong> Please keep these credentials confidential and do not share them with anyone.</p>
            <p>For any assistance, feel free to contact us.</p>

            <div class="footer">
              <p>Regards,</p>
              <p><strong>Prarambh Development Cell, DYPCET</strong></p>
              <img src="https://res.cloudinary.com/dan454ywo/image/upload/v1742455386/prarambhlogo_pddqvv.png" alt="Prarambh Logo" />
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>





      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${email}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = { sendWelcomeEmail };
