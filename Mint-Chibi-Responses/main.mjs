const idle = { text: 'Mint Chibi siap', icon: 'bot', tone: 'neutral',
  tooltip: 'Menunggu perubahan status agen Orca.' };

const responses = {
  working: { text: 'Aku lagi ngoding!', icon: 'code', tone: 'accent' },
  blocked: { text: 'Aku butuh bantuanmu', icon: 'warning', tone: 'warning' },
  waiting: { text: 'Aku menunggu masukanmu', icon: 'bell', tone: 'warning' },
  success: { text: 'Beres! Kodenya siap dicek', icon: 'check', tone: 'success' },
  failure: { text: 'Ada yang gagal. Yuk, cek hasilnya', icon: 'bug', tone: 'danger' },
  interrupted: { text: 'Pekerjaan terhenti', icon: 'pause', tone: 'neutral' },
  done: { text: 'Agen selesai. Yuk, cek hasilnya', icon: 'info', tone: 'neutral' }
};

function responseKey(event) {
  if (event.state !== 'done') return event.state;
  switch (event.mainAgent?.outcome) {
    case 'success': return 'success';
    case 'failure': return 'failure';
    case 'cancellation':
    case 'interruption':
    case 'superseded': return 'interrupted';
    default: return 'done';
  }
}

export default function activate(orca) {
  let resetTimer;
  let latestAt = 0;
  let updates = Promise.resolve();

  function show(message) {
    updates = updates
      .then(() => orca.host.call('statusBar.update', { id: 'response', ...message }))
      .catch(error => console.error('Mint Chibi status update failed:', error.message));
    return updates;
  }

  orca.events.on('agent.status.changed', event => {
    const key = responseKey(event);
    const response = responses[key];
    if (!response || event.receivedAt < latestAt) return;
    latestAt = event.receivedAt;

    clearTimeout(resetTimer);
    const title = event.title?.trim().slice(0, 80) || 'Agen Orca';
    const update = show({ ...response, tooltip: title + ' | ' + response.text });
    if (event.state === 'done') {
      resetTimer = setTimeout(() => show(idle), 12000);
    }
    return update;
  });
}
