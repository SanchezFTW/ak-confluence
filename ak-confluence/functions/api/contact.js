const TO_EMAIL = 'info@akconfluence.com';
const FROM_EMAIL = 'AK Confluence <info@akconfluence.com>';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const message = (payload.message || '').trim();

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return Response.json({ error: 'Please enter a valid email address' }, { status: 400 });
  }

  if (!env.RESEND_API_KEY) {
    return Response.json({ error: 'Email service is not configured' }, { status: 500 });
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `New contact form message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error('Resend error:', errorBody);
    return Response.json({ error: 'Failed to send message' }, { status: 502 });
  }

  return Response.json({ success: true });
}
