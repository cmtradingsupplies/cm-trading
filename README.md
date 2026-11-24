# CM Trading website

Ready for GitHub Pages. This package contains the latest CM Trading website, all brand logos, seven downloadable catalog PDFs, and the GitHub publishing workflow.

## Publish using GitHub Desktop

1. Extract the ZIP into a folder. Keep the `.github`, `public`, and `scripts` folders together with this README. Do not upload the ZIP itself as the website.
2. Install GitHub Desktop from https://desktop.github.com/ and sign in to your GitHub account.
3. Choose **File â†’ Add local repository** and select this folder. If it is not yet a repository, follow **create a repository here**. Keep the folder contents and use `main` as the default branch. Do not select a license unless you intend to license your business materials and have the rights to do so.
4. Make the first commit if requested. Choose **Publish repository**, use a name such as `cm-trading`, and select the visibility you want. For GitHub Free, use a public repository for Pages hosting; public means everyone can view the uploaded source, logos and catalogs.
5. Open the repository on GitHub. Go to **Settings â†’ Pages â†’ Build and deployment â†’ Source**, then select **GitHub Actions**.
6. Go to **Actions â†’ Publish CM Trading website â†’ Run workflow**, select `main`, and run it. This starts publishing if the first push happened before Pages was enabled.
7. After the workflow succeeds, find the live address under **Settings â†’ Pages** or the workflow's **github-pages** deployment. It will usually look like `https://YOUR-USERNAME.github.io/cm-trading/`.

Future commits pushed to `main` publish automatically. No access token needs to be pasted into the website or repository. The workflow uses GitHub's built-in deployment permissions.

Official Pages setup: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Website contents

- `public/index.html`: page content, navigation, About section and inquiry form.
- `public/style.css`: mobile and desktop styling.
- `public/catalog.js`, `brands.js`, `brand-logos.js`, `brand-strip.js`: materials, brands and logo displays.
- `public/catalog-downloads.js`, `public/catalogs/`: links and locally hosted PDF catalogs.
- `public/inquiry.js`: validates inquiries and prepares WhatsApp or email messages.
- `.github/workflows/pages.yml`: GitHub Pages publishing.
- `scripts/build_pages.py`: copies the website into `_site` and generates the canonical address, sitemap and robots file for your actual GitHub Pages address, including a repository subfolder or configured custom domain.

Edit files inside `public/`; `_site/` is generated automatically. No Node.js dependencies or package installation are needed for publishing. GitHub runs the small Python preparation step.

## Preview on your computer

With Python installed, open a terminal in this folder and run:

```sh
python -m http.server 8000 --directory public
```

Open http://localhost:8000/ and press Ctrl+C in the terminal when finished. Local preview does not publish anything.

## Contact and features

- Phone: +91 6361 55 1956
- WhatsApp: +91 6361 55 1956
- Email: cmtradingsupplies@gmail.com
- Inquiry name, location, phone, build stage and material are required.
- WhatsApp and email buttons open the visitor's app with a prepared inquiry. The visitor must review and send it; there is no server-side inbox or automatic sending service.
- Quotes stay in the visitor's browser. Catalogs download from this website. Brand links lead to the inquiry form.
- Brand displays change every three seconds, respecting reduced-motion preferences.

All seven catalog PDFs are included. The largest is about 21.5 MB. Use GitHub Desktop to upload the complete folder reliably. Keep the filenames and folder structure intact; GitHub paths are case sensitive.

The Google fonts and hero photo load from external services. The logo, brand logos and catalog PDFs are included locally.

## Optional custom domain

After the first successful publish, configure your domain in **Settings â†’ Pages â†’ Custom domain** and follow GitHub's DNS instructions. Then run the workflow again so the canonical address and sitemap use that domain. No custom domain is required to use the GitHub Pages address.

This is a standalone export. Your existing ChatGPT-hosted website is unaffected. Later edits there do not automatically copy into this GitHub repository.
