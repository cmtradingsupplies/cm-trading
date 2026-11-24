const form = document.querySelector('#inquiry-form');
const inquiryStatus = document.querySelector('#inquiry-status');
const materials = form.elements.namedItem('materials');
const buildStage = form.elements.namedItem('stage');
const materialChoice = form.elements.namedItem('product');

for (const stage of Object.keys(groups)) {
  buildStage.add(new Option(stage, stage));
}
function updateMaterialChoices() {
  const options = groups[buildStage.value] || [];
  materialChoice.replaceChildren(new Option(options.length ? 'Select a material' : 'Select a build stage first', ''));
  for (const [name] of options) materialChoice.add(new Option(name, name));
  materialChoice.disabled = !options.length;
}
buildStage.addEventListener('change', updateMaterialChoices);
updateMaterialChoices();

document.querySelector('#attach-list').addEventListener('click', () => {
  const selected = products
    .filter(({name}) => quantities.has(name))
    .map(({name, unit}) => name + ' — ' + quantities.get(name) + ' ' + unit);
  if (!selected.length) {
    inquiryStatus.textContent = 'Add materials to your quote list first.';
    return;
  }
  const existing = materials.value.split('\n');
  const combined = [...existing.filter(line => line.trim()), ...selected.filter(line => !existing.includes(line))].join('\n');
  if (combined.length > materials.maxLength) {
    inquiryStatus.textContent = 'The combined list is too long. Shorten your message or share the downloaded list through WhatsApp.';
    return;
  }
  materials.value = combined;
  inquiryStatus.textContent = 'Quote list added to your inquiry.';
  materials.focus();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const get = field => String(data.get(field) || '').trim();
  if (!get('name') || !get('location') || !groups[get('stage')]?.some(([name]) => name === get('product')) || get('phone').replace(/\D/g, '').length < 10) {
    inquiryStatus.textContent = 'Enter your name, site location, a phone number with at least 10 digits, and select a build stage and material.';
    return;
  }
  const message = [
    'Hello CM Trading, I would like a quote for construction materials.',
    '',
    'Name: ' + get('name'),
    'Site location: ' + get('location'),
    'Phone: ' + get('phone'),
    'Build stage: ' + get('stage'),
    'Material: ' + get('product'),
    '',
    'Additional details:',
    get('materials') || 'None provided',
  ].join('\n');
  const body = encodeURIComponent(message);
  if (event.submitter?.value === 'email') {
    const subject = encodeURIComponent('Construction materials inquiry');
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=cmtradingsupplies%40gmail.com&su=' + subject + '&body=' + body;
    document.querySelector('#open-gmail').href = gmailUrl;
    document.querySelector('#use-email-app').href = 'mailto:cmtradingsupplies@gmail.com?subject=' + subject + '&body=' + body;
    document.querySelector('#email-options').hidden = false;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    inquiryStatus.textContent = 'Review and send your inquiry in Gmail. If it did not open, use the Gmail link below or choose another email app.';
    return;
  }
  window.open('https://wa.me/916361551956?text=' + body, '_blank', 'noopener,noreferrer');
  inquiryStatus.textContent = 'Review the prepared message in WhatsApp and tap Send.';
});

document.addEventListener('click', event => {
  const link = event.target.closest('[data-brand-enquiry]');
  if (!link) return;
  const product = products.find(item => item.name === link.dataset.product);
  if (!product) return;
  buildStage.value = product.stage;
  updateMaterialChoices();
  materialChoice.value = product.name;
  const preference = 'Preferred brand: ' + link.dataset.brandEnquiry;
  if (!materials.value.split('\n').includes(preference)) {
    const updated = [materials.value.trim(), preference].filter(Boolean).join('\n');
    if (updated.length <= materials.maxLength) materials.value = updated;
  }
  inquiryStatus.textContent = 'Your brand and material are selected. Add your details to contact CM Trading.';
});
