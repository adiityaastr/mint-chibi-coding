const idle = {
  text: 'Mint Chibi siap',
  icon: 'bot',
  tone: 'neutral',
  tooltip: 'Menunggu perubahan status agen Orca.'
};

const responses = {
  blocked: { label: 'butuh bantuan', icon: 'warning', tone: 'warning', priority: 4 },
  waiting: { label: 'menunggu masukan', icon: 'bell', tone: 'warning', priority: 4 },
  failure: { label: 'gagal. Cek hasilnya', icon: 'bug', tone: 'danger', priority: 3 },
  success: { label: 'selesai. Siap dicek', icon: 'check', tone: 'success', priority: 2 },
  interrupted: { label: 'terhenti', icon: 'pause', tone: 'neutral', priority: 2 },
  done: { label: 'selesai. Cek hasilnya', icon: 'info', tone: 'neutral', priority: 2 },
  working: { label: 'sedang bekerja', icon: 'code', tone: 'accent', priority: 1 }
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
  const panes = new Map();
  let pending = Promise.resolve();
  let lastMessage;

  function refresh() {
    const ordered = [...panes.values()].sort((a, b) =>
      b.response.priority - a.response.priority || b.receivedAt - a.receivedAt
    );
    const first = ordered[0];
    let message = idle;
    if (first) {
      const { icon, tone, label } = first.response;
      const additional = ordered.filter(pane => pane.response.priority === 4).length - 1;
      const suffix = first.response.priority === 4 && additional > 0 ? ' (+' + additional + ')' : '';
      message = {
        icon,
        tone,
        text: first.title.slice(0, 30) + ' ' + label + suffix,
        tooltip: ordered.slice(0, 5).map(pane => pane.title + ': ' + pane.response.label).join('\n')
      };
    }
    const signature = JSON.stringify(message);
    if (signature === lastMessage) return pending;
    lastMessage = signature;
    pending = pending
      .then(() => orca.host.call('statusBar.update', { id: 'response', ...message }))
      .catch(error => {
        if (lastMessage === signature) lastMessage = undefined;
        console.error('Mint Chibi status update failed:', error.message);
      });
    return pending;
  }

  orca.events.on('agent.status.changed', event => {
    const response = responses[responseKey(event)];
    const previous = panes.get(event.paneKey);
    if (!response || !event.paneKey || event.receivedAt < (previous?.receivedAt ?? 0)) return;

    clearTimeout(previous?.timer);
    const entry = {
      response,
      receivedAt: event.receivedAt,
      title: event.title?.trim().slice(0, 64) || previous?.title || 'Agen Orca'
    };
    panes.set(event.paneKey, entry);

    if (event.state === 'done') {
      entry.timer = setTimeout(() => {
        if (panes.get(event.paneKey) !== entry) return;
        panes.delete(event.paneKey);
        return refresh();
      }, 12000);
    }
    return refresh();
  });
}
