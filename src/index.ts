import * as core from '@actions/core'
import * as github from '@actions/github'
import { components } from '@octokit/openapi-types'
import { JSONPath } from 'jsonpath-plus'

type RepoCommit = components['schemas']['commit']
type Inputs = typeof inputs

const inputs = {
    sha:
        core.getInput('sha') ||
        github.context.payload.pull_request?.head?.sha ||
        github.context.sha,
    selector: core.getInput('selector') || core.getInput('path'),
    summary: core.getBooleanInput('summary'),
    token: core.getInput('token', { required: true }),
}

async function main() {
    const version: string = process.env.GITHUB_ACTION_REF
        ? `\u001b[35;1m${process.env.GITHUB_ACTION_REF}`
        : '\u001b[33;1mSource'
    core.info(`🏳️ Starting Get Commit Action - ${version}`)

    // Debug
    core.startGroup('Debug')
    console.log('context.repo:', github.context.repo)
    console.log('context.payload.pull_request:', github.context.payload.pull_request)
    core.endGroup() // Debug

    // Inputs
    core.startGroup('Inputs')
    console.log(inputs)
    core.endGroup() // Inputs

    // Get Commit
    const octokit = github.getOctokit(inputs.token)
    core.info(`⌛ Processing SHA: \u001b[32;1m${inputs.sha}`)

    // https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
    const url = `/repos/${github.context.repo.owner}/${github.context.repo.repo}/commits/${inputs.sha}`
    core.debug(`url: ${url}`)
    const options = {
        ...github.context.repo,
        ref: inputs.sha,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
    }

    const response = await octokit.request(`GET ${url}`, options)
    core.debug(`response.status: ${response.status}`)

    const commit = response.data as RepoCommit
    delete commit.files
    core.startGroup('Commit')
    console.log(commit)
    core.endGroup() // Commit
    // const { files, ...commitOnly } = commit
    // console.log(commitOnly)

    // Path
    const result = inputs.selector ? parseJSONPath(inputs.selector, commit) : ''
    core.info(`➡️ Parsed result: \u001b[36;1m${result}`)
    core.info(`    type: \u001b[33;1m${typeof result}`)

    // Outputs
    core.info('📩 Setting Outputs')
    core.setOutput('sha', commit.sha)
    core.setOutput('commit', commit)
    core.setOutput('result', result)
    core.setOutput('message', commit.commit.message)
    core.setOutput('html_url', commit.html_url)
    core.setOutput('comment_count', commit.commit.comment_count)
    core.setOutput('author', commit.author?.login ?? commit.commit.author?.name ?? '')

    // Summary
    if (inputs.summary) {
        core.info('📝 Writing Job Summary')
        try {
            await addSummary(inputs, inputs.sha, commit, result)
        } catch (e) {
            console.log(e)
            if (e instanceof Error) core.error(`Error writing Job Summary ${e.message}`)
        }
    }

    core.info(`✅ \u001b[32;1mFinished Success`)
}

function parseJSONPath(value: string, data: object) {
    if (!value) return ''
    const values = JSONPath({ path: value, json: data })
    console.log('parsed values:', values)
    if (!values.length) {
        throw new Error(`No Values for Path: ${value}`)
    }
    return values[0]
}

async function addSummary(
    inputs: Inputs,
    sha: string,
    commit: RepoCommit,
    result: string
) {
    core.summary.addRaw('## Get Commit Action\n')

    const repo = `${github.context.repo.owner}/${github.context.repo.repo}`
    const url = `https://github.com/${repo}/commit/${sha}`
    core.summary.addRaw(`sha: [${sha}](${url})\n\n`)

    if (inputs.selector) {
        core.summary.addRaw(`<details open><summary>Result: ${inputs.selector}</summary>`)
        core.summary.addCodeBlock(result, 'text')
        core.summary.addRaw('</details>\n')
    }

    // delete commit.files
    // core.startGroup('Debug: commit')
    // console.log(commit)
    // core.endGroup() // Debug: commit
    core.summary.addRaw('<details><summary>Commit</summary>')
    core.summary.addRaw(
        '\n\nNote: `files` key removed to improve rendering. Full output is available in the job logs.\n\n'
    )
    core.summary.addCodeBlock(JSON.stringify(commit, null, 2), 'json')
    core.summary.addRaw('</details>\n')

    // delete inputs.token
    // const { token, ...cleanInputs } = inputs
    const cleanInputs = Object.fromEntries(
        Object.entries(inputs).filter(([key]) => key !== 'token')
    )

    const yaml = Object.entries(cleanInputs)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n')
    core.summary.addRaw('<details><summary>Inputs</summary>')
    core.summary.addCodeBlock(yaml, 'yaml')
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/cssnr/get-commit-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

try {
    await main()
} catch (e) {
    console.log(e)
    if (e instanceof Error) core.setFailed(e.message)
}
