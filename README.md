[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/get-commit-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/get-commit-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/get-commit-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/get-commit-action/releases)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/get-commit-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/get-commit-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/get-commit-action/dist%2Findex.js?logo=bookstack&logoColor=white&label=dist%20size)](https://github.com/cssnr/get-commit-action/blob/master/src/index.js)
[![Action Run Using](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fcssnr%2Fget-commit-action%2Frefs%2Fheads%2Fmaster%2Faction.yml&query=%24.runs.using&logo=githubactions&logoColor=white&label=runs)](https://github.com/cssnr/get-commit-action/blob/master/action.yml)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/get-commit-action/release.yaml?logo=cachet&label=release)](https://github.com/cssnr/get-commit-action/actions/workflows/release.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/cssnr/get-commit-action/test.yaml?logo=cachet&label=test)](https://github.com/cssnr/get-commit-action/actions/workflows/test.yaml)
[![Workflow lint](https://img.shields.io/github/actions/workflow/status/cssnr/get-commit-action/lint.yaml?logo=cachet&label=lint)](https://github.com/cssnr/get-commit-action/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_get-commit-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cssnr_get-commit-action)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/get-commit-action?logo=github&label=updated)](https://github.com/cssnr/get-commit-action/pulse)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/get-commit-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/get-commit-action)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/get-commit-action?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/get-commit-action?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/get-commit-action?logo=htmx)](https://github.com/cssnr/get-commit-action)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/get-commit-action?logo=github)](https://github.com/cssnr/get-commit-action/graphs/contributors)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/get-commit-action?logo=github)](https://github.com/cssnr/get-commit-action/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/get-commit-action?style=flat&logo=github)](https://github.com/cssnr/get-commit-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/get-commit-action?style=flat&logo=github)](https://github.com/cssnr/get-commit-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Get Commit Action

<a title="Get Commit Action" href="https://actions.cssnr.com/" target="_blank">
<img alt="Get Commit Action" align="right" width="128" height="auto" src="https://raw.githubusercontent.com/smashedr/repo-images/refs/heads/master/get-commit-action/logo.png"></a>

- [Inputs](#Inputs)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Tags](#Tags)
- [Support](#Support)
- [Contributing](#Contributing)

Get Commit and Parse Details such as the head Commit Message for a Pull Request event and more...

This can be done with a simple `run:` step; however, this action simplifies making the request, parsing the response, and setting the output.

```yaml
- name: 'Get Commit Action'
  id: commit
  uses: cssnr/get-commit-action@master
```

<details><summary>View Native Alternative</summary>

```yaml
- name: 'Get Commit Message'
  id: commit
  env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    REF: ${{ github.event.pull_request.head.sha }}
  run: |
    echo message=$(gh api "/repos/${GITHUB_REPOSITORY}/commits/${REF}" \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      --jq '.commit.message') >> "${GITHUB_OUTPUT}"
```

Note: This uses the `--jq` option of the `gh` cli as a selector for the desired data.

</details>

See some [Examples](#Examples) of this action below...

## Inputs

| Input               | Default&nbsp;Value  | Description&nbsp;of&nbsp;Input |
| :------------------ | :------------------ | :----------------------------- |
| [sha](#sha)         | _[see below](#sha)_ | SHA of Commit                  |
| [path](#path)       | -                   | Object Selector \*             |
| [summary](#summary) | `true`              | Add Summary to Job \*          |
| token               | `github.token`      | GitHub Access Token PAT [^1]   |

#### sha

1. User Provided `sha`
2. Pull Request Head `sha`
3. Commit `sha`

#### path

A [JSONPath](https://jsonpath.com/) of a value to set as the [result](#result) output.

This is a [jsonpath-plus](https://github.com/JSONPath-Plus/JSONPath) path and supports bare selectors `project.version`.

Previously Deprecated Input: `selector` (backwards compatible)

#### summary

Write the results to the Job Summary. To disable set to: `false`

<details><summary>👀 View Example Job Summary</summary>

---

sha: [d6b030c28fb4e55c233b83323ffd1b41cf47241a](https://github.com/cssnr/get-commit-action/commit/d6b030c28fb4e55c233b83323ffd1b41cf47241a)

<details open><summary>Result</summary><pre lang="text"><code>Updates</code></pre>
</details>
<details><summary>Commit</summary><pre lang="json"><code>{
  "sha": "d6b030c28fb4e55c233b83323ffd1b41cf47241a",
  "node_id": "C_kwDOONDk4toAKGQ2YjAzMGMyOGZiNGU1NWMyMzNiODMzMjNmZmQxYjQxY2Y0NzI0MWE",
  "commit": {
    "author": {
      "name": "Shane",
      "email": "6071159+smashedr@users.noreply.github.com",
      "date": "2025-03-22T22:45:32Z"
    },
    "committer": {
      "name": "Shane",
      "email": "6071159+smashedr@users.noreply.github.com",
      "date": "2025-03-22T22:45:32Z"
    },
    "message": "Updates",
    "tree": {
      "sha": "533436a6c0359dd3743da72acc30366d5d50fbc2",
      "url": "https://api.github.com/repos/cssnr/get-commit-action/git/trees/533436a6c0359dd3743da72acc30366d5d50fbc2"
    },
    "url": "https://api.github.com/repos/cssnr/get-commit-action/git/commits/d6b030c28fb4e55c233b83323ffd1b41cf47241a",
    "comment_count": 0,
    "verification": {
      "verified": true,
      "reason": "valid",
      "signature": "-----BEGIN PGP SIGNATURE-----\n\niHUEABYKAB0WIQRXgKNZZbHv52xw4573HsvCBq6NtQUCZ989jAAKCRD3HsvCBq6N\ntc2QAP4xDEyh1mPoDbry+AagGQgYQzQU9pN+Q9A1nLNptiLR8gD/c5fEHeDBOIJo\nNqZCh4BACo3KFF3sXysTdqr3zWIOqwI=\n=0MJn\n-----END PGP SIGNATURE-----",
      "payload": "tree 533436a6c0359dd3743da72acc30366d5d50fbc2\nparent 49ed46652824d2fa19f75ae0cb9b56b8a6563a40\nauthor Shane <6071159+smashedr@users.noreply.github.com> 1742683532 -0700\ncommitter Shane <6071159+smashedr@users.noreply.github.com> 1742683532 -0700\n\nUpdates\n",
      "verified_at": "2025-03-22T22:45:07Z"
    }
  },
  "url": "https://api.github.com/repos/cssnr/get-commit-action/commits/d6b030c28fb4e55c233b83323ffd1b41cf47241a",
  "html_url": "https://github.com/cssnr/get-commit-action/commit/d6b030c28fb4e55c233b83323ffd1b41cf47241a",
  "comments_url": "https://api.github.com/repos/cssnr/get-commit-action/commits/d6b030c28fb4e55c233b83323ffd1b41cf47241a/comments",
  "author": {
    "login": "smashedr",
    "id": 6071159,
    "node_id": "MDQ6VXNlcjYwNzExNTk=",
    "avatar_url": "https://avatars.githubusercontent.com/u/6071159?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/smashedr",
    "html_url": "https://github.com/smashedr",
    "followers_url": "https://api.github.com/users/smashedr/followers",
    "following_url": "https://api.github.com/users/smashedr/following{/other_user}",
    "gists_url": "https://api.github.com/users/smashedr/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/smashedr/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/smashedr/subscriptions",
    "organizations_url": "https://api.github.com/users/smashedr/orgs",
    "repos_url": "https://api.github.com/users/smashedr/repos",
    "events_url": "https://api.github.com/users/smashedr/events{/privacy}",
    "received_events_url": "https://api.github.com/users/smashedr/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false
  },
  "committer": {
    "login": "smashedr",
    "id": 6071159,
    "node_id": "MDQ6VXNlcjYwNzExNTk=",
    "avatar_url": "https://avatars.githubusercontent.com/u/6071159?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/smashedr",
    "html_url": "https://github.com/smashedr",
    "followers_url": "https://api.github.com/users/smashedr/followers",
    "following_url": "https://api.github.com/users/smashedr/following{/other_user}",
    "gists_url": "https://api.github.com/users/smashedr/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/smashedr/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/smashedr/subscriptions",
    "organizations_url": "https://api.github.com/users/smashedr/orgs",
    "repos_url": "https://api.github.com/users/smashedr/repos",
    "events_url": "https://api.github.com/users/smashedr/events{/privacy}",
    "received_events_url": "https://api.github.com/users/smashedr/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false
  },
  "parents": [
    {
      "sha": "49ed46652824d2fa19f75ae0cb9b56b8a6563a40",
      "url": "https://api.github.com/repos/cssnr/get-commit-action/commits/49ed46652824d2fa19f75ae0cb9b56b8a6563a40",
      "html_url": "https://github.com/cssnr/get-commit-action/commit/49ed46652824d2fa19f75ae0cb9b56b8a6563a40"
    }
  ],
  "stats": {
    "total": 2,
    "additions": 1,
    "deletions": 1
  },
  "files": [
    {
      "sha": "b095106eaeb1d8cd5cf78be67576080783600386",
      "filename": ".github/workflows/test.yaml",
      "status": "modified",
      "additions": 1,
      "deletions": 1,
      "changes": 2,
      "blob_url": "https://github.com/cssnr/get-commit-action/blob/d6b030c28fb4e55c233b83323ffd1b41cf47241a/.github%2Fworkflows%2Ftest.yaml",
      "raw_url": "https://github.com/cssnr/get-commit-action/raw/d6b030c28fb4e55c233b83323ffd1b41cf47241a/.github%2Fworkflows%2Ftest.yaml",
      "contents_url": "https://api.github.com/repos/cssnr/get-commit-action/contents/.github%2Fworkflows%2Ftest.yaml?ref=d6b030c28fb4e55c233b83323ffd1b41cf47241a",
      "patch": "@@ -39,7 +39,7 @@ jobs:\n           #sha: dd49c0cc254760111a78f2c739efcedd567e2bf2\n \n       - name: \"1: Verify Non-Pull\"\n-        if: ${{ !github.event.act }}\n+        if: ${{ github.event_name != 'pull_request' }}\n         env:\n           COMMIT: ${{ steps.test.outputs.commit }}\n           RESULT: ${{ steps.test.outputs.result }}"
    }
  ]
}</code></pre>
</details>
<details><summary>Config</summary><pre lang="yaml"><code>sha: "d6b030c28fb4e55c233b83323ffd1b41cf47241a"
selector: "commit.message"
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
  uses: cssnr/get-commit-action@master
  with:
    sha: ${{ github.event.pull_request.head.sha }}
```

See the [Examples](#Examples) for more.

## Outputs

| Output            | Description&nbsp;of&nbsp;Output |
| :---------------- | :------------------------------ |
| sha               | Commit SHA                      |
| commit            | Commit JSON                     |
| [result](#result) | Results from [path](#path)      |
| message           | Commit Message                  |
| html_url          | HTML URL                        |
| comment_count     | Comment Count                   |
| author            | Commit Author (Parsed)          |

#### result

<details><summary>View Example Commit JSON</summary>

```json
{
  "sha": "d6b030c28fb4e55c233b83323ffd1b41cf47241a",
  "node_id": "C_kwDOONDk4toAKGQ2YjAzMGMyOGZiNGU1NWMyMzNiODMzMjNmZmQxYjQxY2Y0NzI0MWE",
  "commit": {
    "author": {
      "name": "Shane",
      "email": "6071159+smashedr@users.noreply.github.com",
      "date": "2025-03-22T22:45:32Z"
    },
    "committer": {
      "name": "Shane",
      "email": "6071159+smashedr@users.noreply.github.com",
      "date": "2025-03-22T22:45:32Z"
    },
    "message": "Updates",
    "tree": {
      "sha": "533436a6c0359dd3743da72acc30366d5d50fbc2",
      "url": "https://api.github.com/repos/cssnr/get-commit-action/git/trees/533436a6c0359dd3743da72acc30366d5d50fbc2"
    },
    "url": "https://api.github.com/repos/cssnr/get-commit-action/git/commits/d6b030c28fb4e55c233b83323ffd1b41cf47241a",
    "comment_count": 0,
    "verification": {
      "verified": true,
      "reason": "valid",
      "signature": "-----BEGIN PGP SIGNATURE-----\n\niHUEABYKAB0WIQRXgKNZZbHv52xw4573HsvCBq6NtQUCZ989jAAKCRD3HsvCBq6N\ntc2QAP4xDEyh1mPoDbry+AagGQgYQzQU9pN+Q9A1nLNptiLR8gD/c5fEHeDBOIJo\nNqZCh4BACo3KFF3sXysTdqr3zWIOqwI=\n=0MJn\n-----END PGP SIGNATURE-----",
      "payload": "tree 533436a6c0359dd3743da72acc30366d5d50fbc2\nparent 49ed46652824d2fa19f75ae0cb9b56b8a6563a40\nauthor Shane <6071159+smashedr@users.noreply.github.com> 1742683532 -0700\ncommitter Shane <6071159+smashedr@users.noreply.github.com> 1742683532 -0700\n\nUpdates\n",
      "verified_at": "2025-03-22T22:45:07Z"
    }
  },
  "url": "https://api.github.com/repos/cssnr/get-commit-action/commits/d6b030c28fb4e55c233b83323ffd1b41cf47241a",
  "html_url": "https://github.com/cssnr/get-commit-action/commit/d6b030c28fb4e55c233b83323ffd1b41cf47241a",
  "comments_url": "https://api.github.com/repos/cssnr/get-commit-action/commits/d6b030c28fb4e55c233b83323ffd1b41cf47241a/comments",
  "author": {
    "login": "smashedr",
    "id": 6071159,
    "node_id": "MDQ6VXNlcjYwNzExNTk=",
    "avatar_url": "https://avatars.githubusercontent.com/u/6071159?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/smashedr",
    "html_url": "https://github.com/smashedr",
    "followers_url": "https://api.github.com/users/smashedr/followers",
    "following_url": "https://api.github.com/users/smashedr/following{/other_user}",
    "gists_url": "https://api.github.com/users/smashedr/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/smashedr/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/smashedr/subscriptions",
    "organizations_url": "https://api.github.com/users/smashedr/orgs",
    "repos_url": "https://api.github.com/users/smashedr/repos",
    "events_url": "https://api.github.com/users/smashedr/events{/privacy}",
    "received_events_url": "https://api.github.com/users/smashedr/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false
  },
  "committer": {
    "login": "smashedr",
    "id": 6071159,
    "node_id": "MDQ6VXNlcjYwNzExNTk=",
    "avatar_url": "https://avatars.githubusercontent.com/u/6071159?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/smashedr",
    "html_url": "https://github.com/smashedr",
    "followers_url": "https://api.github.com/users/smashedr/followers",
    "following_url": "https://api.github.com/users/smashedr/following{/other_user}",
    "gists_url": "https://api.github.com/users/smashedr/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/smashedr/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/smashedr/subscriptions",
    "organizations_url": "https://api.github.com/users/smashedr/orgs",
    "repos_url": "https://api.github.com/users/smashedr/repos",
    "events_url": "https://api.github.com/users/smashedr/events{/privacy}",
    "received_events_url": "https://api.github.com/users/smashedr/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false
  },
  "parents": [
    {
      "sha": "49ed46652824d2fa19f75ae0cb9b56b8a6563a40",
      "url": "https://api.github.com/repos/cssnr/get-commit-action/commits/49ed46652824d2fa19f75ae0cb9b56b8a6563a40",
      "html_url": "https://github.com/cssnr/get-commit-action/commit/49ed46652824d2fa19f75ae0cb9b56b8a6563a40"
    }
  ],
  "stats": {
    "total": 2,
    "additions": 1,
    "deletions": 1
  },
  "files": [
    {
      "sha": "b095106eaeb1d8cd5cf78be67576080783600386",
      "filename": ".github/workflows/test.yaml",
      "status": "modified",
      "additions": 1,
      "deletions": 1,
      "changes": 2,
      "blob_url": "https://github.com/cssnr/get-commit-action/blob/d6b030c28fb4e55c233b83323ffd1b41cf47241a/.github%2Fworkflows%2Ftest.yaml",
      "raw_url": "https://github.com/cssnr/get-commit-action/raw/d6b030c28fb4e55c233b83323ffd1b41cf47241a/.github%2Fworkflows%2Ftest.yaml",
      "contents_url": "https://api.github.com/repos/cssnr/get-commit-action/contents/.github%2Fworkflows%2Ftest.yaml?ref=d6b030c28fb4e55c233b83323ffd1b41cf47241a",
      "patch": "@@ -39,7 +39,7 @@ jobs:\n           #sha: dd49c0cc254760111a78f2c739efcedd567e2bf2\n \n       - name: \"1: Verify Non-Pull\"\n-        if: ${{ !github.event.act }}\n+        if: ${{ github.event_name != 'pull_request' }}\n         env:\n           COMMIT: ${{ steps.test.outputs.commit }}\n           RESULT: ${{ steps.test.outputs.result }}"
    }
  ]
}
```

</details>

```yaml
- name: 'Get Commit Action'
  id: commit
  uses: cssnr/get-commit-action@master

- name: 'Echo Output'
  env:
    result: ${{ steps.commit.outputs.result }}
  run: |
    echo "sha: ${{ steps.commit.outputs.sha }}"
    echo "commit: ${{ steps.commit.outputs.commit }}"
    echo "result: ${result}"
    echo "message: ${{ steps.commit.outputs.message }}"
    echo "comment_count: ${{ steps.commit.outputs.comment_count }}"
    echo "author: ${{ steps.commit.outputs.author }}"
```

Note: multi-line outputs in a run block using `${{}}` are evaluated; therefore, is set as an env.

## Examples

💡 _Click on an example heading to expand or collapse the example._

<details open><summary>Get The Commit Message</summary>

```yaml
- name: 'Get Commit Action'
  id: commit
  uses: cssnr/get-commit-action@master
  with:
    selector: 'commit.message'

- name: 'Echo Output'
  env:
    RESULT: ${{ steps.commit.outputs.result }}
  run: |
    echo "commit.message: ${RESULT}"
```

</details>
<details open><summary>Get The head Commit Message for a PR</summary>

```yaml
- name: 'Get Commit Action'
  if: ${{ github.event_name == 'pull_request' }}
  id: commit
  uses: cssnr/get-commit-action@master
  with:
    sha: ${{ github.event.pull_request.head.sha }}
    selector: 'commit.message'

- name: 'Echo Output'
  env:
    RESULT: ${{ steps.commit.outputs.result }}
  run: |
    echo "commit.message: ${RESULT}"
```

</details>
<details><summary>Get The Author's Login</summary>

```yaml
- name: 'Get Commit Action'
  if: ${{ github.event_name == 'pull_request' }}
  id: commit
  uses: cssnr/get-commit-action@master
  with:
    sha: ${{ github.event.pull_request.head.sha }}
    selector: 'author.login'

- name: 'Echo Output'
  run: |
    echo "author.login: ${{ steps.commit.outputs.result }}"
```

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

If you would like to submit a PR, please review the [CONTRIBUTING.md](#contributing-ov-file).

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

Additionally, you can support other GitHub Actions I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy Action](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [Docker Context Action](https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme)
- [Actions Up Action](https://github.com/cssnr/actions-up-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [JSON Key Value Check Action](https://github.com/cssnr/json-key-value-check-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Package Changelog Action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)
- [NPM Outdated Check Action](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)
- [Label Creator Action](https://github.com/cssnr/label-creator-action?tab=readme-ov-file#readme)
- [Algolia Crawler Action](https://github.com/cssnr/algolia-crawler-action?tab=readme-ov-file#readme)
- [Upload Release Action](https://github.com/cssnr/upload-release-action?tab=readme-ov-file#readme)
- [Check Build Action](https://github.com/cssnr/check-build-action?tab=readme-ov-file#readme)
- [Web Request Action](https://github.com/cssnr/web-request-action?tab=readme-ov-file#readme)
- [Get Commit Action](https://github.com/cssnr/get-commit-action?tab=readme-ov-file#readme)

<details><summary>❔ Unpublished Actions</summary>

These actions are not published on the Marketplace, but may be useful.

- [cssnr/create-files-action](https://github.com/cssnr/create-files-action?tab=readme-ov-file#readme) - Create various files from templates.
- [cssnr/draft-release-action](https://github.com/cssnr/draft-release-action?tab=readme-ov-file#readme) - Keep a draft release ready to publish.
- [cssnr/env-json-action](https://github.com/cssnr/env-json-action?tab=readme-ov-file#readme) - Convert env file to json or vice versa.
- [cssnr/push-artifacts-action](https://github.com/cssnr/push-artifacts-action?tab=readme-ov-file#readme) - Sync files to a remote host with rsync.
- [smashedr/update-release-notes-action](https://github.com/smashedr/update-release-notes-action?tab=readme-ov-file#readme) - Update release notes.
- [smashedr/combine-release-notes-action](https://github.com/smashedr/combine-release-notes-action?tab=readme-ov-file#readme) - Combine release notes.

---

</details>

<details><summary>📝 Template Actions</summary>

These are basic action templates that I use for creating new actions.

- [js-test-action](https://github.com/smashedr/js-test-action?tab=readme-ov-file#readme) - JavaScript
- [ts-test-action](https://github.com/smashedr/ts-test-action?tab=readme-ov-file#readme) - TypeScript
- [py-test-action](https://github.com/smashedr/py-test-action?tab=readme-ov-file#readme) - Python (Dockerfile)
- [docker-test-action](https://github.com/smashedr/docker-test-action?tab=readme-ov-file#readme) - Docker (Image)

Note: The `docker-test-action` builds, runs and pushes images to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

---

</details>

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)

[^1]:
    The `${{ github.token }}` / `{{ secrets.GITHUB_TOKEN }}` is automatically passed, there is no need to manually pass these!
    This is only available to allow users to pass a different token they have created and defined in their `secrets`.
