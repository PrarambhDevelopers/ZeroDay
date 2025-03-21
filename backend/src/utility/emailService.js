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
              background-color:#ffffff;
              margin: 0;
              padding: 0; 
              color: #ffffff;
              font-family: Arial, sans-serif;
            }
            .email-container {
              width: 100%;
              padding: 40px 0;
              background-color: #ffffff;
            }
            .content {
              width: 90%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #000000;
              border:2px solid #00ff41;
              border-radius: 8px;
              color:#fefefe;
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
              color: #fdfdfd;
              font-size: 16px;
              line-height: 1.5;
              margin: 8px 0;
            
            }
            .highlight {
              color: #00ff41;
              font-weight: bold;
            }
            .credentials {
              background-color: #121212;
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

                    <h1>Konnichiwa Cyber Warriors! 🐧</h1>
                    <p>Dear <span class="highlight"><b>${name}</b></span>,</p>
                    <p>We are excited to inform you that we are conducting the intense and thrilling <span class="highlight">HackWars [CTF]</span> as part of the <span class="highlight">ZERO DAY Workshop</span>! 🎯</p>
                    <p>The HackWars will be held on <span class="highlight">24th March, 2025</span>, Monday marking the grand finale on the last day of the workshop. It will focus on applying all the concepts related to <span class="highlight">Cyber Security</span> covered throughout the workshop. 🛡️💻</p>

                    <h2 style="color:#00ff41; margin-top: 25px;">Your Access Credentials:</h2>
                    <div class="credentials">
                      <p>CTF ID: <span class="highlight">${ctf_id}</span></p>
                      <p>Password: <span class="highlight">${password}</span></p>
                    </div>

                    <p><strong>Note:</strong> Please keep these <span class="highlight"> credentials confidential</span>  and <span class="highlight">do not share</span> them with anyone.</p>
                    <p>For any assistance, feel free to contact us.</p>

                  <div class="footer">
                          <p>Regards,</p>
                          <p><strong>Prarambh Development Cell, DYPCET</strong></p>
                        
                          <img src="https://res.cloudinary.com/dan454ywo/image/upload/v1742546436/prarambhlogo_zux1cu.png" alt="Prarambh Logo" style="margin-top: 10px; width: 120px; height: auto;" />
                            <!-- Social Media Handles -->
              <div >
                  <a href="https://www.instagram.com/prarambh_dypcet/" target="_blank" style="margin: 0 8px; text-decoration: none;">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="vertical-align: middle; width: 30px; height: 30px; max-width: 100%; display: inline-block;" />
                  </a>
                  <a href="https://chat.whatsapp.com/BOO3ZVrG8F93uwGAPygifn" target="_blank" style="margin: 0 8px; text-decoration: none;">
                    <img src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt="WhatsApp" style="vertical-align: middle; width: 30px; height: 30px; max-width: 100%; display: inline-block;" />
                  </a>
                </div>

            
                          
                          
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
