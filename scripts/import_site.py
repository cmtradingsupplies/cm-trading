"""Import the approved CM Trading public website; verify every file before committing."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import time

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / "public"
BASE = "https://one-step-construction-supply.leafykangaroo4.chatgpt.site/"
MANIFEST = json.loads(r'''{"brand-logos.js":"7a3dd594543bdddbd452668a6da132f78a714934fee79867f6583b4b4bc10f99","brand-strip.js":"f4b9f74f3a9f8a1977891ac082a8e6a05b7961dd2257ec34c10e3b16da488527","brands.js":"7f84e36cfa3b918f80332c24723ca31358cfaf891a3df501d1c11f02f6990a32","catalog-downloads.js":"b85c0b10f202c4b795885fccd8222d4f2affc6ab6087d15c167db7974f15ed5d","catalog.js":"647018434473869e2b069f1ed13f2c4fff7e8d3962171f0bcce84f9e83668518","catalogs/ashirvad.pdf":"845fe8226ad9688823b6548a5670a5daf001f3d098a1b479cff20d25afc250fd","catalogs/jaquar-part-1.pdf":"b478a829b95ba02c34ca78c31d4967fc63ebb068520a79895848463574496393","catalogs/jaquar-part-2.pdf":"73a2fcb54cb917f9d8e3a6e4efbb65d5071b71fe50dc459d93da851b6d72bf9e","catalogs/kohler-part-1.pdf":"5b082fb5a373b966749a2cdb5c3159a841061c3228ab2845a0bdb4391635dd1a","catalogs/kohler-part-2.pdf":"c1bd3dddc90ea4e5bd12f56596950d969e5a5fca0d0ff3855b157c9f8fa932bc","catalogs/lep-frp.pdf":"e3c7d0cd46084f65cc1c9abada5299c3c16eaa907f16385a41949e857fa932d8","catalogs/supreme.pdf":"2399d7baf823f092a2f9dd6450f3935cc713db455d37a327a452810f9c5fb357","cm-trading.png":"fda5da3b95e6afe53ec87f35754fdadccdc9954612a7de9472e6bf5baa0c8ef4","index.html":"2282c161300043ea5430237ee244f6041432a846c5629f578d197d2c103f151f","inquiry.js":"f47ad518a977978d22d53aef2f6c71d190d465ff58acf5f203ddac83fdbfbe62","logos/acc.svg":"e3f790460ba2539f0927c51b50b2970e0986d30d8b48df3cf21b25452b759e2c","logos/ambuja.png":"7d45bae5320aa62bdf459f59d4c2d3ca02c773483bbbad65ccf6f551d637849b","logos/anchor-by-panasonic.png":"69c8d2a89975012a9043ec628c19dd7214e77a36776476c912912e65448a0331","logos/ashirvad.webp":"b6bb91ff590598bbacab77c5c5a34a6cf2850d679660172b1d892779e316390e","logos/asian-paints.avif":"e290f155cd115b9729af02abd40680f2270352bb5a3cefac74f25a6028b252eb","logos/astral-full.png":"6d19cd9c51d0f3e6af33d74f2728513aecbdada12c7743d28163dc037d179ff2","logos/astral.png":"24615269a5dbeb976ea5f0f5d262184b5f50fc2d06c3b249357754a0a264eda5","logos/berger.webp":"d8e7f2e44144acf84770d78a974966a9cde623e8d269a9bb346f2cb2ed0bd630","logos/cera.svg":"1688c84cee1bca1b815a4b514056244f3fc3f10ed63636f95db19c4e1e50ae04","logos/crompton.webp":"98747ca52e6a7a1ff3a17a936d8b1a88351e1fbe4ccf31437c4faae314b50cfa","logos/durian.svg":"1c6c5b1dad4b63b513c68fba3a81e9eb0af9bd3a2f186014129eb6b25f0cd45b","logos/finolex.svg":"89f15be39235d47405cc888b8b4897a57ba5a306d5a9767e95166c1019b51ac0","logos/gm-modular.svg":"aeb2ea3e0e3c5b0612933272e4a3031a01286c81162c05b5f62844b899be0111","logos/godrej-interio.png":"d8801e16aefc71612b0948e3b0cf21cd86a510f4eec4fd26e88dbc124613c603","logos/h-r-johnson.png":"96ca9d30c28076e47b3596ca57a7d2ba343710943cc81efa66b0d014acca2a92","logos/havells.svg":"ac2027e1ca00ab5c3bfb49849810b56fe266eeda85405f801a03c87a9ecc1273","logos/jaquar.svg":"e5e201b0b8dd01a874b2931d1b995192488561a3d92164ae649306f90fa9bc0c","logos/jindal-panther.png":"72f5cad6dcca77fb0f7e1c555ea22e756ee529f778da0090589b3f77890c15c2","logos/jsw-neosteel.svg":"dae1bde9dcd77628e57d460695a812ced191632011166b7b28ef2e401cfe7611","logos/kajaria.svg":"d0a0bd2e03ea3b1be3f62c241b5eb38fbb0093d307a8402cfa86d52678347723","logos/kohler.svg":"79dd9cfc1d3bc77d213335900ed03a84e2c3e53bac38c05a7bbb353947dd6689","logos/legrand.png":"d561b96521ee15814899fc0ea8c593ed2c5e1f2ad9c0e984506d35811f15cea0","logos/lep.png":"08f010d36dd0e11d3ba28dafb6021cf705afd208e385ef4bc05b91c6b8589418","logos/nerolac.webp":"2a450a76c0b74215913b1d7802282d823512337498280fafcfdb360080cf123a","logos/nilkamal.png":"129b6efb0794147566608bf8d464911c4813aea24f1514ebfdd51732dc1ec887","logos/polycab.png":"0e2798e2215dd16385e7fba04c3cb2d09a6d529f89a5f9ac16a1b5e1d6ee8298","logos/sail.svg":"d534764f389a21b9055887523a6d635c8776abcf15f4ba2373738555d40d439d","logos/shree-cement.jpg":"008827dcae80f369ee5eafd2d91ad3c9dc9305c15c6bc352f1cecff18da2862a","logos/somany.svg":"c3381c2ef3c39506685300440dec9762f5f0f16c8cef6177f34f2fec5ea776df","logos/supreme.png":"37da8a2b1a2e6bf39d946fd49c8ee69d9a5e3d25f04c9061301220f2e737d291","logos/tata-tiscon.webp":"76636963e8f2653b3f6cdcf9ffe14d8e9864bc5bb1a4b9f30b0d33b441e7ed26","logos/ultratech.png":"34b13fb493cef66aab06c9a4bc6096cb324f2a6b20d2be1b1784255849128358","robots.txt":"94915639f5145f72894f3233029d4927b249bce90281a8d55f66ed68c35bcf87","sitemap.xml":"f94cc184822bfcc9a9cdca515aa8859cfe834dccae2dba81fa8f02b0b8b83601","style.css":"7a1ce47579fcc2f1f6f8a64a83104e23c5a8dd65b841cea9e9836593fa510064"}''')

def download(item):
    name, expected = item
    for attempt in range(3):
        try:
            request = Request(BASE + quote(name) + "?github-import=" + expected[:12], headers={"User-Agent": "CM-Trading-GitHub-Import"})
            with urlopen(request, timeout=120) as response:
                data = response.read()
            if hashlib.sha256(data).hexdigest() != expected:
                raise ValueError("Content checksum mismatch: " + name)
            path = DEST / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
            print("Verified " + name, flush=True)
            return
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2)

if __name__ == "__main__":
    if (DEST / "index.html").exists():
        print("Website source is already present; import skipped.")
    else:
        with ThreadPoolExecutor(max_workers=4) as pool:
            list(pool.map(download, MANIFEST.items()))
        index = DEST / "index.html"
        text = index.read_text(encoding="utf-8-sig")
        text = text.replace('<link rel="canonical" href="' + BASE + '">', '')
        index.write_text(text, encoding="utf-8")
        (DEST / "robots.txt").write_text("User-agent: *\nAllow: /\n", encoding="utf-8")
        (DEST / "sitemap.xml").unlink()
        (DEST / ".nojekyll").touch()
        print("All 50 website assets verified and imported.")
