const brandOptions = {
  "Cement": [
    [
      "UltraTech"
    ],
    [
      "Shree Cement"
    ],
    [
      "Ambuja"
    ]
  ],
  "TMT bars & steel reinforcement": [
    [
      "Tata Tiscon"
    ],
    [
      "JSW Neosteel"
    ],
    [
      "Jindal Panther"
    ]
  ],
  "Bathroom fixtures": [
    [
      "Jaquar"
    ],
    [
      "CERA"
    ],
    [
      "Kohler"
    ]
  ],
  "Pipes & fittings": [
    [
      "Ashirvad"
    ],
    [
      "Supreme"
    ],
    [
      "Astral"
    ],
    [
      "LEP"
    ]
  ],
  "Electrical wires": [
    [
      "Polycab"
    ],
    [
      "Finolex"
    ],
    [
      "Havells"
    ]
  ],
  "Switches & sockets": [
    [
      "GM Modular"
    ],
    [
      "Anchor by Panasonic"
    ],
    [
      "Legrand"
    ]
  ],
  "Painting": [
    [
      "Asian Paints"
    ],
    [
      "Berger"
    ],
    [
      "Nerolac"
    ]
  ],
  "Furniture": [
    [
      "Godrej Interio"
    ],
    [
      "Nilkamal"
    ],
    [
      "Durian"
    ]
  ],
  "Tiles & granite": [
    [
      "Kajaria"
    ],
    [
      "Somany"
    ],
    [
      "H&R Johnson"
    ]
  ],
  "Fans, lighting & home appliances": [
    [
      "Havells"
    ],
    [
      "Crompton"
    ],
    [
      "GM Modular"
    ]
  ]
};

function escapeBrandText(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function renderBrandIdentity(name) {
  const logo = brandLogos[name];
  return logo
    ? '<img class="brand-wordmark" src="' + logo + '" alt="' + escapeBrandText(name) + '" width="144" height="48">'
    : '<strong>' + escapeBrandText(name) + '</strong>';
}

const brandCycleMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function renderBrands(product) {
  const options = brandOptions[product];
  if (!options) return '';
  const slides = options.map(([name], index) => {
    const title = escapeBrandText(name);
    const material = escapeBrandText(product);
    const downloads = catalogDownloads[name] || [];
    const catalogLinks = downloads.map(([path, label]) =>
      '<a class="catalog-file" href="' + path + '" download>' + label + '</a>'
    ).join('');
    const enquiry = '<a class="brand-enquiry" href="#inquiry" data-brand-enquiry="' +
      title + '" data-product="' + material + '">' +
      (downloads.length ? 'Ask for a quote' : 'Request catalogue & quote') + '</a>';
    const active = index === 0 || brandCycleMotion.matches;
    return '<div class="material-brand-slide' + (active ? ' is-active' : '') +
      '" aria-hidden="' + !active + '"' + (active ? '' : ' inert') + '><a class="brand-logo-link" href="#inquiry" data-brand-enquiry="' +
      title + '" data-product="' + material + '" aria-label="' + title + ' enquiry">' +
      renderBrandIdentity(name) + '</a><div class="material-brand-actions">' + catalogLinks + enquiry + '</div></div>';
  }).join('');
  return '<section class="material-brands" data-brand-index="0" aria-label="' + escapeBrandText(product) +
    ' brands"><div class="material-brands-heading"><span>Explore brands</span>' +
    '</div><div class="material-brand-window">' +
    '<div class="material-brand-list">' + slides + '</div></div></section>';
}

function showMaterialBrand(section, index) {
  const slides = [...section.querySelectorAll('.material-brand-slide')];
  section.dataset.brandIndex = index;
  slides.forEach((slide, position) => {
    const active = brandCycleMotion.matches || position === index;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
    slide.inert = !active;
  });
}

setInterval(() => {
  if (document.hidden || brandCycleMotion.matches) return;
  document.querySelectorAll('.material-brands').forEach(section => {
    if (section.matches(':hover, :focus-within')) return;
    const count = section.querySelectorAll('.material-brand-slide').length;
    showMaterialBrand(section, (Number(section.dataset.brandIndex) + 1) % count);
  });
}, 3000);

brandCycleMotion.addEventListener('change', () => {
  document.querySelectorAll('.material-brands').forEach(section => {
    showMaterialBrand(section, Number(section.dataset.brandIndex));
  });
});
