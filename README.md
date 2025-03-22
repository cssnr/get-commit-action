[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/get-commit-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/get-commit-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/get-commit-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/get-commit-action/tags)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/get-commit-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/get-commit-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/get-commit-action/dist%2Findex.js?label=dist%20size)](https://github.com/cssnr/get-commit-action/blob/master/src/index.js)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/get-commit-action/release.yaml?logo=github&label=release)](https://github.com/cssnr/get-commit-action/actions/workflows/release.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/cssnr/get-commit-action/test.yaml?logo=github&label=test)](https://github.com/cssnr/get-commit-action/actions/workflows/test.yaml)
[![Workflow lint](https://img.shields.io/github/actions/workflow/status/cssnr/get-commit-action/lint.yaml?logo=github&label=lint)](https://github.com/cssnr/get-commit-action/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=smashedr_get-commit-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=smashedr_get-commit-action)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/get-commit-action?logo=github&label=updated)](https://github.com/cssnr/get-commit-action/graphs/commit-activity)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/shaner/get-commit-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/shaner/get-commit-action)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/get-commit-action?logo=htmx)](https://github.com/cssnr/get-commit-action)
[![GitHub repo size](https://img.shields.io/github/repo-size/cssnr/get-commit-action?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/get-commit-action)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/get-commit-action)](https://github.com/cssnr/get-commit-action/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/get-commit-action?style=flat&logo=github)](https://github.com/cssnr/get-commit-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/get-commit-action?style=flat&logo=github)](https://github.com/cssnr/get-commit-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# Get Commit Action

- [Inputs](#Inputs)
  - [Permissions](#Permissions)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Tags](#Tags)
- [Support](#Support)
- [Contributing](#Contributing)

Get Commit and Parse Details such as the head Commit Message for a Pull Request event and more...

## Inputs

| Input    | Req. | Default&nbsp;Value | Input&nbsp;Description |
| :------- | :--: | :----------------- | :--------------------- |
| sha      |  -   | `GITHUB_SHA`       | SHA of Commit          |
| selector |  -   | -                  | Object Selector        |
| summary  |  -   | `true`             | Add Summary to Job     |
| token    |  -   | `github.token`     | Only for PAT [^1]      |

<details><summary>👀 View Example Job Summary</summary>

---

sha: [3b1a2525425924fc6a8aec772e7290770b1d9d79](https://github.com/cssnr/get-commit-action/commit/3b1a2525425924fc6a8aec772e7290770b1d9d79)

<details open><summary>Result</summary><pre lang="text"><code>Example commit message</code></pre>
</details>
<details><summary>Commit</summary><pre lang="json"><code>{
  "sha": "3b1a2525425924fc6a8aec772e7290770b1d9d79",
  "node_id": "C_kwDOONDk4toAKDNiMWEyNTI1NDI1OTI0ZmM2YThhZWM3NzJlNzI5MDc3MGIxZDlkNzk",
  "url": "https://api.github.com/repos/cssnr/get-commit-action/git/commits/3b1a2525425924fc6a8aec772e7290770b1d9d79",
  "html_url": "https://github.com/cssnr/get-commit-action/commit/3b1a2525425924fc6a8aec772e7290770b1d9d79",
  "author": {
    "name": "Shane",
    "email": "6071159+smashedr@users.noreply.github.com",
    "date": "2025-03-22T21:15:04Z"
  },
  "committer": {
    "name": "Shane",
    "email": "6071159+smashedr@users.noreply.github.com",
    "date": "2025-03-22T21:15:04Z"
  },
  "tree": {
    "sha": "233fa1ab1901899a12d8bec605dae67c7970f807",
    "url": "https://api.github.com/repos/cssnr/get-commit-action/git/trees/233fa1ab1901899a12d8bec605dae67c7970f807"
  },
  "message": "Example commit message",
  "parents": [
    {
      "sha": "51cdac1118622fd9826cdfda0955aaa569524f8a",
      "url": "https://api.github.com/repos/cssnr/get-commit-action/git/commits/51cdac1118622fd9826cdfda0955aaa569524f8a",
      "html_url": "https://github.com/cssnr/get-commit-action/commit/51cdac1118622fd9826cdfda0955aaa569524f8a"
    }
  ],
  "verification": {
    "verified": true,
    "reason": "valid",
    "signature": "-----BEGIN PGP SIGNATURE-----\n\niHUEABYKAB0WIQRXgKNZZbHv52xw4573HsvCBq6NtQUCZ98oWAAKCRD3HsvCBq6N\ntcYCAP9oCe3uBkaz33L8wZhUDW7iF9sXIibxfCeXs4LUxpIO3AD/dB2vQIuQMHbr\nZ45xy85OM87OLRM6B21OT2Cl9UhJvg8=\n=uM4E\n-----END PGP SIGNATURE-----",
    "payload": "tree 233fa1ab1901899a12d8bec605dae67c7970f807\nparent 51cdac1118622fd9826cdfda0955aaa569524f8a\nauthor Shane <6071159+smashedr@users.noreply.github.com> 1742678104 -0700\ncommitter Shane <6071159+smashedr@users.noreply.github.com> 1742678104 -0700\n\nUupdate result\n",
    "verified_at": "2025-03-22T21:14:42Z"
  }
}</code></pre>
</details>
<details><summary>Config</summary><pre lang="yaml"><code>sha: ""
selector: "message"
summary: true</code></pre>
</details>

---

</details>

Get the commit for the SHA that triggered the workflow.

```yaml
- name: 'Get Commit Action'
  id: commit
  uses: cssnr/get-commit-action@master
```

Get the head commit for a pull_request event.

```yaml
- name: 'Get Commit Action'
  id: commit
  if: ${{ github.event_name == 'pull_request' }}
  uses: cssnr/get-commit-action@master
  with:
    sha: ${{ github.event.pull_request.head.sha }}
```

### Permissions

This action requires the following permissions:

```yaml
permissions:
  contents: write
```

Permissions documentation for [Workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token) and [Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication).

## Outputs

| Output | Description     |
| :----- | :-------------- |
| sha    | Commit SHA      |
| commit | The full Commit |
| result | Parsed Results  |

```yaml
- name: 'Get Commit Action'
  id: commit
  uses: cssnr/get-commit-action@master

- name: 'Echo Output'
  env:
    COMMIT: ${{ steps.commit.outputs.commit }}
    RESULT: ${{ steps.commit.outputs.result }}
  run: |
    echo "sha: ${{ steps.commit.outputs.sha }}"
    echo "commit: ${COMMIT}"
    echo "result: ${RESULT}"
```

## Examples

💡 _Click on an example heading to expand or collapse the example._

<details open><summary>Get The head Commit Message for a PR</summary>

```yaml
- name: 'Get Commit Action'
  if: ${{ github.event_name == 'pull_request' }}
  id: commit
  uses: cssnr/get-commit-action@master
  with:
    sha: ${{ github.event.pull_request.head.sha }}
    selector: 'message'

- name: 'Echo Output'
  env:
    RESULT: ${{ steps.commit.outputs.result }}
  run: |
    echo "message: ${RESULT}"
```

</details>
<details><summary>Additional Example</summary>

Coming Soon...

</details>

> More Examples Coming Soon...

For more examples, you can check out other projects using this action:  
https://github.com/cssnr/get-commit-action/network/dependents

## Tags

The following rolling [tags](https://github.com/cssnr/get-commit-action/tags) are maintained.

| Version&nbsp;Tag                                                                                                                                                                                                   | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/get-commit-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/get-commit-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/get-commit-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/get-commit-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/get-commit-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/get-commit-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/get-commit-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.

# Support

For general help or to request a feature, see:

- Q&A Discussion: https://github.com/cssnr/get-commit-action/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/get-commit-action/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, you can:

- Report an Issue: https://github.com/cssnr/get-commit-action/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General Feedback: [https://cssnr.github.io/feedback/](https://cssnr.github.io/feedback/?app=Update%20Release%20Notes)

For more information, see the CSSNR [SUPPORT.md](https://github.com/cssnr/.github/blob/master/.github/SUPPORT.md#support).

# Contributing

Currently, the best way to contribute to this project is to star this project on GitHub.

For more information, see the CSSNR [CONTRIBUTING.md](https://github.com/cssnr/.github/blob/master/.github/CONTRIBUTING.md#contributing).

Additionally, you can support other GitHub Actions I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)
- [Package Changelog Action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)
- [NPM Outdated Check Action](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)

For a full list of current projects to support visit: [https://cssnr.github.io/](https://cssnr.github.io/)
