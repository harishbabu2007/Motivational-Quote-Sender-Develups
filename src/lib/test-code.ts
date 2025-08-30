async function test_send_email() {
  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "b25bb1012@iitj.ac.in",
        subject: "🚀 Test Email",
        text: "🔥 Keep going, you're unstoppable!",
      }),
    });

    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

async function test_subscribe() {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "b25bb1012@iitj.ac.in",
      }),
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

async function test_send_all_recipients() {
  try {
    const res = await fetch("/api/send-daily-emails", {
      method: "GET",
    });
  } catch (err) {
    console.error("Error:", err);
  }
}