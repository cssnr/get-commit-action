const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        core.info(`🏳️ Starting Get Commit Action`)

        // Debug
        core.startGroup('Debug')
        console.log('github.context.repo:', github.context.repo)
        core.endGroup() // Debug

        core.startGroup('Debug: github.context')
        console.log(github.context)
        core.endGroup() // Debug github.context
        core.startGroup('Debug: process.env')
        console.log(process.env)
        core.endGroup() // Debug process.env

        // Config
        const config = getConfig()
        core.startGroup('Config')
        console.log(config)
        core.endGroup() // Config

        // Processing
        const octokit = github.getOctokit(config.token)
        const sha = config.sha || github.context.sha
        core.info(`sha: \u001b[32;1m${sha}`)

        // const response = await octokit.rest.git.getCommit({
        //     ...github.context.repo,
        //     commit_sha: sha,
        // })

        const url = `/repos/${github.context.repo.owner}/${github.context.repo.repo}/commits/${sha}`
        core.debug(`url: ${url}`)
        const options = {
            ...github.context.repo,
            ref: sha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }
        const response = await octokit.request(`GET ${url}`, options)

        core.startGroup('Commit')
        console.log(response.data)
        core.endGroup() // Commit

        // Results
        const results = config.selector
            .split('.')
            .reduce((acc, key) => acc?.[key], response.data)

        const result =
            typeof results === 'object'
                ? JSON.stringify(results)
                : results.toString()

        if (config.selector) {
            core.startGroup('Results')
            console.log('raw results:\n', results)
            console.log('string result:\n', result)
            core.endGroup() // Commit Data
            if (!result) {
                core.warning(`No result for selector: ${config.selector}`)
            }
        }

        // Outputs
        core.info('📩 Setting Outputs')
        core.setOutput('sha', sha)
        core.setOutput('commit', JSON.stringify(response.data))
        core.setOutput('result', result)

        // Summary
        if (config.summary) {
            core.info('📝 Writing Job Summary')
            try {
                await addSummary(config, sha, response.data, result)
            } catch (e) {
                console.log(e)
                core.error(`Error writing Job Summary ${e.message}`)
            }
        }

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * Add Summary
 * @param {Config} config
 * @param {String} sha
 * @param {Object} commit
 * @param {String} result
 * @return {Promise<void>}
 */
async function addSummary(config, sha, commit, result) {
    core.summary.addRaw('## Get Commit Action\n')

    const url = `https://github.com/${github.context.payload.repository.full_name}/commit/${sha}`
    core.summary.addRaw(`sha: [${sha}](${url})\n\n`)

    if (config.selector) {
        core.summary.addRaw(
            `<details open><summary>Result: ${config.selector}</summary>`
        )
        core.summary.addCodeBlock(result, 'text')
        core.summary.addRaw('</details>\n')
    }

    delete commit.files
    // core.startGroup('Debug: commit')
    // console.log(commit)
    // core.endGroup() // Debug: commit
    core.summary.addRaw('<details><summary>Commit</summary>')
    core.summary.addRaw(
        '\n\nNote: `files` key removed to improve rendering. Full output is available in the job logs.\n\n'
    )
    core.summary.addCodeBlock(JSON.stringify(commit, null, 2), 'json')
    core.summary.addRaw('</details>\n')

    delete config.token
    const yaml = Object.entries(config)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n')
    core.summary.addRaw('<details><summary>Config</summary>')
    core.summary.addCodeBlock(yaml, 'yaml')
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/cssnr/get-commit-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

/**
 * Get Config
 * @typedef {Object} Config
 * @property {String} sha
 * @property {String} selector
 * @property {Boolean} summary
 * @property {String} token
 * @return {Config}
 */
function getConfig() {
    return {
        sha: core.getInput('sha'),
        selector: core.getInput('selector'),
        summary: core.getBooleanInput('summary'),
        token: core.getInput('token', { required: true }),
    }
}
