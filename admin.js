const keyForm = document.getElementById('keyForm');
const results = document.getElementById('results');

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

keyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const key = document.getElementById('adminKey').value;

  results.innerHTML = '<p class="empty">Loading...</p>';

  try {
    const res = await fetch('/api/messages', {
      headers: { 'x-admin-key': key },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to load messages.');
    }

    const messages = await res.json();

    if (messages.length === 0) {
      results.innerHTML = '<p class="empty">No messages yet.</p>';
      return;
    }

    const rows = messages.map(m => `
      <tr>
        <td>${m.id}</td>
        <td>${escapeHtml(m.name)}</td>
        <td>${escapeHtml(m.email)}</td>
        <td>${escapeHtml(m.message)}</td>
        <td>${escapeHtml(m.created_at)}</td>
      </tr>
    `).join('');

    results.innerHTML = `
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Received</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } catch (err) {
    results.innerHTML = `<p class="empty">${escapeHtml(err.message)}</p>`;
  }
});
