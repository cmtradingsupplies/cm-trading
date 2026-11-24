const showcaseBrands = [
  {
    "name": "UltraTech",
    "logo": "logos/ultratech.png",
    "product": "Cement"
  },
  {
    "name": "Shree Cement",
    "logo": "logos/shree-cement.jpg",
    "product": "Cement"
  },
  {
    "name": "Ambuja",
    "logo": "logos/ambuja.png",
    "product": "Cement"
  },
  {
    "name": "Tata Tiscon",
    "logo": "logos/tata-tiscon.webp",
    "product": "TMT bars & steel reinforcement"
  },
  {
    "name": "JSW Neosteel",
    "logo": "logos/jsw-neosteel.svg",
    "product": "TMT bars & steel reinforcement"
  },
  {
    "name": "Jindal Panther",
    "logo": "logos/jindal-panther.png",
    "product": "TMT bars & steel reinforcement"
  },
  {
    "name": "Jaquar",
    "logo": "logos/jaquar.svg",
    "product": "Bathroom fixtures"
  },
  {
    "name": "CERA",
    "logo": "logos/cera.svg",
    "product": "Bathroom fixtures"
  },
  {
    "name": "Kohler",
    "logo": "logos/kohler.svg",
    "product": "Bathroom fixtures"
  },
  {
    "name": "Ashirvad",
    "logo": "logos/ashirvad.webp",
    "product": "Pipes & fittings"
  },
  {
    "name": "Supreme",
    "logo": "logos/supreme.png",
    "product": "Pipes & fittings"
  },
  {
    "name": "Astral",
    "logo": "logos/astral-full.png",
    "product": "Pipes & fittings"
  },
  {
    "name": "LEP",
    "logo": "logos/lep.png",
    "product": "Pipes & fittings"
  },
  {
    "name": "Polycab",
    "logo": "logos/polycab.png",
    "product": "Electrical wires"
  },
  {
    "name": "Finolex",
    "logo": "logos/finolex.svg",
    "product": "Electrical wires"
  },
  {
    "name": "Havells",
    "logo": "logos/havells.svg",
    "product": "Electrical wires"
  },
  {
    "name": "GM Modular",
    "logo": "logos/gm-modular.svg",
    "product": "Switches & sockets"
  },
  {
    "name": "Anchor by Panasonic",
    "logo": "logos/anchor-by-panasonic.png",
    "product": "Switches & sockets"
  },
  {
    "name": "Legrand",
    "logo": "logos/legrand.png",
    "product": "Switches & sockets"
  },
  {
    "name": "Asian Paints",
    "logo": "logos/asian-paints.avif",
    "product": "Painting"
  },
  {
    "name": "Berger",
    "logo": "logos/berger.webp",
    "product": "Painting"
  },
  {
    "name": "Nerolac",
    "logo": "logos/nerolac.webp",
    "product": "Painting"
  },
  {
    "name": "Godrej Interio",
    "logo": "logos/godrej-interio.png",
    "product": "Furniture"
  },
  {
    "name": "Nilkamal",
    "logo": "logos/nilkamal.png",
    "product": "Furniture"
  },
  {
    "name": "Durian",
    "logo": "logos/durian.svg",
    "product": "Furniture"
  },
  {
    "name": "Kajaria",
    "logo": "logos/kajaria.svg",
    "product": "Tiles & granite"
  },
  {
    "name": "Somany",
    "logo": "logos/somany.svg",
    "product": "Tiles & granite"
  },
  {
    "name": "H&R Johnson",
    "logo": "logos/h-r-johnson.png",
    "product": "Tiles & granite"
  },
  {
    "name": "Crompton",
    "logo": "logos/crompton.webp",
    "product": "Fans, lighting & home appliances"
  }
];
const brandTrack = document.getElementById('brand-track');
function buildLogoGroup(duplicate = false) {
  const group = document.createElement('div');
  group.className = 'brand-logo-group';
  if (duplicate) {
    group.setAttribute('aria-hidden', 'true');

  }
  for (const {name, product, logo} of showcaseBrands) {
    const link = document.createElement('a');
    link.className = 'brand-logo-card';
    if (duplicate) link.tabIndex = -1;
    link.href = '#inquiry';
    link.dataset.brandEnquiry = name;
    link.dataset.product = product;
    link.setAttribute('aria-label', name + ' enquiry');
    if (logo) {
      const image = document.createElement('img');
      image.src = logo;
      image.alt = name;
      image.width = 140;
      image.height = 60;
      link.append(image);
    } else {
      link.textContent = name;
    }
    group.append(link);
  }
  return group;
}
brandTrack.append(buildLogoGroup(), buildLogoGroup(true));
