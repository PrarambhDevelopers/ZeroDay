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
      from: "prarambhcell.official@gmail.com",
      to: email,
      subject: "Welcome to ZeroDay Workshop",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f9;
                }
                .email-container {
                    width: 80%;
                    max-width: 600px; /* You can adjust this value */
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .email-body {
                    text-align: center;
                }
                .banner {
                    width: 100%;
                    height: auto;
                    margin-bottom: 20px;
                }
                h1 {
                    color: #5c2d91;
                    font-size: 28px;
                }
                h2 {
                    color: #333;
                    font-size: 24px;
                }
                p {
                    color: #333;
                    font-size: 16px;
                    line-height: 1.6;
                }
                .credentials {
                    background-color: #f2f2f2;
                    padding: 15px;
                    border-radius: 8px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 14px;
                    color: #888;
                }
                .footer a {
                    color: #5c2d91;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-body">
                    <!-- Banner Image -->
                    <img src="YOUR_BANNER_LINK_HERE" alt="Event Banner" class="banner">

                    <h1>Hello ${name}! 🐧</h1>
                    <p>We are pleased to inform you that we are going to conduct Wargames of MetaMorphosis 2K25 this coming weekend! 🎉</p>
                    <p>It will be held on 23rd of March, 2025, focusing on Docker & Kubernetes.💜</p>

                    <h2>Event Details:</h2>
                    <p>Date: 21st of March, 2025</p>

                    <h2>The Credentials for the Wargames:</h2>
                    <div class="credentials">
                        <p>Ctf_id: <strong>${ctf_id}</strong></p>
                        <p>Password: <strong>${password}</strong></p>
                    </div>

                    <p>Please do not hesitate to contact us if you have any queries about the event. We will be happy to assist you in any way we can.</p>
                    <p>All the best to you!🥳</p>
                    <p>We look forward to your participation there!</p>

                    <div class="footer">
                        <p>Thanks and regards,</p>
                        <p><strong>Prarambh Development Cell, DYPCET</strong></p>
                    </div>
                </div>
            </div>
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
