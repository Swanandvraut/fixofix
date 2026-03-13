app.post("/send-email-otp", async (req, res) => {

  try {

    console.log("FULL BODY:", req.body);
    console.log("EMAIL:", req.body.email);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await pool.query(
      "SELECT id FROM service_providers WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiry = new Date(Date.now() + 5 * 60000);

    await pool.query(
      `UPDATE service_providers
       SET email_otp=$1, otp_expiry=$2
       WHERE email=$3`,
      [otp, expiry, email]
    );

    // ✅ SEND EMAIL
    await sendEmail(
      email,
      "FixoFix Email Verification OTP",
      `Your OTP is ${otp}. It expires in 5 minutes.`,
      `<h2>Your OTP is <b>${otp}</b></h2>
       <p>This OTP will expire in 5 minutes.</p>`
    );

    console.log("✅ OTP Email Sent:", otp);

    res.json({ success: true });

  } catch (err) {

    console.error("Send OTP Error:", err);

    res.status(500).json({ error: "Server error" });
  }

});