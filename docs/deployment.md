# GitHub Pages deployment

The Vite base path is `/Portfolio-Det-Board/`. `.github/workflows/deploy.yml` tests and builds on each push to `main`, then deploys `dist` with the official Pages artifact actions.

One-time repository setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow requires the included `pages: write` and `id-token: write` permissions.

Expected URL: <https://sparshsunilnaik.github.io/Portfolio-Det-Board/>. A successful local build does not prove the public deployment; verify the Actions run and fetch the live URL after pushing.
