const groups = {
  Foundation: [
    ['Cement', 'For concrete, mortar and plaster mixes.', 'bags'],
    ['Sand', 'Fine aggregate for mortar, plaster and concrete.', 'm³'],
    ['Crushed stone', 'Coarse aggregate for concrete and compacted bases.', 'm³'],
    ['TMT bars & steel reinforcement', 'Reinforcement bars for slabs, footings and columns.', 'lengths'],
  ],
  Structure: [
    ['Bricks & AAC blocks', 'Clay bricks and lightweight aerated concrete blocks.', 'pieces'],
    ['Doors & windows', 'Door and window units and frames.', 'units'],
    ['Roofing materials', 'Roof sheets and roofing accessories.', 'units'],
  ],
  Services: [
    ['Bathroom fixtures', 'Bathware, basins, taps and bathroom fittings.', 'units'],
    ['Pipes & fittings', 'Drainage pipes, water supply pipes and compatible fittings.', 'units'],
    ['Electrical wires', 'House wiring for lighting and power circuits.', 'rolls'],
  ],
  Finishing: [
    ['Tiles & granite', 'Tile and granite for floors, walls and countertops.', 'm²'],
    ['Painting', 'Interior and exterior painting materials and supplies.', 'units'],
    ['Furniture', 'Living room, bedroom, dining and storage furniture.', 'units'],
    ['Switches & sockets', 'Switches, sockets and modular accessories.', 'pieces'],
    ['Fans, lighting & home appliances', 'Fans, lighting, home appliances and smart home accessories.', 'units'],
  ],
};

const products = Object.entries(groups).flatMap(([stage, items]) =>
  items.map(([name, description, unit]) => ({stage, name, description, unit}))
);
const byId = id => document.getElementById(id);
const search = byId('search');
const filters = byId('filters');
const browseStage = byId('browse-stage');
const cards = byId('products');
const quote = byId('quote');
const quoteItems = byId('quote-items');
const notes = byId('notes');
const download = byId('download');
const storageKey = 'one-step-quote-v1';
let stage = 'All materials';
let saved = {};
try {
  saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {};
} catch {
  // The quote remains usable if browser storage is unavailable.
}
const quantities = new Map();
products.forEach(({name}) => {
  const formerNames = {'TMT bars & steel reinforcement': 'Steel rebar', 'Electrical wires': 'Electrical wire', 'Tiles & granite': 'Floor & wall tiles', 'Fans, lighting & home appliances': 'Fans, lighting & gadgets'};
  const quantity = saved.items?.[name] ?? saved.items?.[formerNames[name]];
  if (Number.isSafeInteger(quantity) && quantity > 0) {
    quantities.set(name, quantity);
  }
});
notes.value = typeof saved.notes === 'string' ? saved.notes : '';

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      items: Object.fromEntries(quantities), notes: notes.value,
    }));
  } catch {
    // Keep the current quote in memory.
  }
  byId('count').textContent = quantities.size;
}

function renderCatalog() {
  browseStage.value = stage;
  for (const button of filters.children) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === stage));
  }
  const terms = search.value.toLowerCase().trim().split(/\s+/);
  const visible = products.filter(product => {
    const searchable = [product.name, product.description, product.stage, brandOptions[product.name]?.map(option => option[0]).join(' ')].join(' ').toLowerCase();
    return (stage === 'All materials' || product.stage === stage) &&
      terms.every(term => searchable.includes(term));
  });
  byId('results').textContent = visible.length + (visible.length === 1 ? ' material' : ' materials');
  cards.innerHTML = visible.map(({stage, name, description, unit}) => {
    const added = quantities.has(name);
    return '<article class="card"><small>' + stage + ' · ' + unit + '</small><h3>' +
      name + '</h3><p>' + description + '</p>' + renderBrands(name) + '<button class="outline" data-item="' +
      name.replace(/&/g, '&amp;') + '" aria-label="' + (added ? 'Review ' : 'Add ') + name +
      ' in quote list">' + (added ? 'In quote list' : '+ Add to quote') + '</button></article>';
  }).join('') || '<p class="empty">No materials found. Try a different search or select another build stage.</p>';

}


function selectStage(nextStage) {
  stage = nextStage;
  renderCatalog();
}

function renderQuote() {
  const selected = products.filter(({name}) => quantities.has(name));
  quoteItems.innerHTML = selected.map(({name, unit}) =>
    '<div class="quote-row"><div><strong>' + name + '</strong><small>' + unit +
    '</small></div><input type="number" min="1" step="1" required value="' + quantities.get(name) +
    '" aria-label="Quantity for ' + name + '" data-quantity="' + name.replace(/&/g, '&amp;') +
    '"><button class="outline" data-remove="' + name.replace(/&/g, '&amp;') +
    '" aria-label="Remove ' + name + '">Remove</button></div>'
  ).join('') || '<p class="empty">Your list is empty. Browse materials to add your first item.</p>';
  download.disabled = selected.length === 0;
}

function openQuote() {
  renderQuote();
  byId('message').textContent = '';
  quote.showModal();
}

browseStage.innerHTML = ['All materials', ...Object.keys(groups)].map(name =>
  '<option value="' + name + '">' + (name === 'Services' ? 'Services · Plumbing & wiring' : name) + '</option>'
).join('');
browseStage.addEventListener('change', () => selectStage(browseStage.value));
filters.innerHTML = ['All materials', ...Object.keys(groups)].map(name =>
  '<button data-filter="' + name + '">' + name + '</button>'
).join('');
filters.addEventListener('click', event => {
  if (event.target.dataset.filter) selectStage(event.target.dataset.filter);
});
search.addEventListener('input', renderCatalog);
document.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => {
  search.value = '';
  selectStage(button.dataset.stage);
  byId('materials').scrollIntoView();
  search.focus({preventScroll: true});
}));
document.querySelectorAll('[data-quote]').forEach(button => button.addEventListener('click', openQuote));
let toastTimer;
cards.addEventListener('click', event => {
  const name = event.target.dataset.item;
  if (!name) return;
  if (quantities.has(name)) {
    openQuote();
    return;
  }
  quantities.set(name, 1);
  save();
  renderCatalog();
  [...cards.querySelectorAll('button')].find(button => button.dataset.item === name)?.focus();
  byId('toast').textContent = name + ' added to your quote list.';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { byId('toast').textContent = ''; }, 2600);
});
quoteItems.addEventListener('click', event => {
  const name = event.target.dataset.remove;
  if (!name) return;
  quantities.delete(name);
  save();
  event.target.closest('.quote-row').remove();
  if (!quantities.size) renderQuote();
  renderCatalog();
  (quoteItems.querySelector('button') || notes).focus();
});
quoteItems.addEventListener('input', event => {
  const input = event.target;
  if (input.dataset.quantity && input.validity.valid && Number.isSafeInteger(input.valueAsNumber)) {
    quantities.set(input.dataset.quantity, input.valueAsNumber);
    save();
  }
});
notes.addEventListener('input', save);
download.addEventListener('click', () => {
  for (const input of quoteItems.querySelectorAll('input')) {
    if (!input.reportValidity()) return;
    if (!Number.isSafeInteger(input.valueAsNumber)) {
      input.focus();
      byId('message').textContent = 'Enter a smaller quantity.';
      return;
    }
  }
  const lines = ['CM Trading', 'Materials list for a quote', ''];
  products.forEach(({name, unit}) => {
    if (quantities.has(name)) lines.push(name + ' — ' + quantities.get(name) + ' ' + unit);
  });
  if (notes.value.trim()) lines.push('', 'Project notes', notes.value.trim());
  const url = URL.createObjectURL(new Blob([lines.join('\n') + '\n'], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cm-trading-materials-list.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  byId('message').textContent = 'Your materials list is ready to share.';
});

save();
renderCatalog();
