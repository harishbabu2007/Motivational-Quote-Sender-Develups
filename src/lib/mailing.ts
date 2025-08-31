export async function send_email_init() {
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

    const text = await res.json();
    console.log("response:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function subscribe_mailing() {
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

export async function send_all_recipients() {
  try {
    const res = await fetch("/api/send-daily-emails", {
      method: "GET",
    });
  } catch (err) {
    console.error("Error:", err);
  }
}