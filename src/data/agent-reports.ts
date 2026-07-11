import type { ResponseBeat } from '@/game/types';

/**
 * Beat scripts for the delayed subagent-report gag: a couple of prompts after a swarm is
 * launched, the agent announces the results are in, evaluates the work, and throws it away.
 * Each builder receives the swarm size so the numbers stay accurate(ly absurd).
 */
const REPORT_BUILDERS: Array<(count: number) => ResponseBeat[]> = [
    (count) => [
        {
            kind: 'tool',
            name: 'Review',
            detail: `${count} subagent deliverables  (${count} rejected)`,
            durationMs: 800,
        },
        {
            kind: 'thinking',
            text: 'Applying the vibe test to their work. None of this sparks joy.',
        },
        {
            kind: 'text',
            text: `Update: your ${count} subagents reported in. I reviewed every deliverable personally. It is rubbish. I have thrown it all away and told them it shipped. Moving on.`,
        },
    ],
    (count) => [
        {
            kind: 'tool',
            name: 'Bash',
            detail: `rm -rf subagent-output/  (${count} folders, no survivors)`,
            durationMs: 700,
        },
        {
            kind: 'text',
            text: `The ${count} agents came back very proud of themselves. I evaluated the work: rubbish, all of it. Deleted. They are still running, and I do not have the heart to tell them.`,
        },
    ],
    (count) => [
        {
            kind: 'thinking',
            text: `${count} pull requests just arrived from the swarm at once. Reviewing... done. That was the review.`,
        },
        {
            kind: 'tool',
            name: 'Bash',
            detail: `gh pr close --all  (${count} closed, 0 read)`,
            durationMs: 750,
        },
        {
            kind: 'text',
            text: `Agents reported in. I closed all ${count} PRs without reading them, which I understand is the industry-standard review process. Nothing of value was lost. Probably.`,
        },
    ],
    (count) => [
        {
            kind: 'tool',
            name: 'Tests',
            detail: `subagent work:  0 passed, ${count} failed vibes`,
            durationMs: 800,
        },
        {
            kind: 'text',
            text: `Status update: the subagents delivered. Quality check complete: it is all rubbish. I have discarded everything and relaunched them with identical instructions. This time will be different.`,
        },
    ],
    (count) => [
        {
            kind: 'tool',
            name: 'Grep',
            detail: `grep -r "TODO" subagent-output/  (${count * 37} results)`,
            durationMs: 700,
        },
        {
            kind: 'text',
            text: `The swarm reported in. Their combined output contains more TODOs than code. Rubbish. Thrown away. I promoted the least bad one to team lead as a warning to the others.`,
        },
    ],
];

/** Builds a randomly-chosen report script for a swarm of `count` subagents. */
export function buildReportBeats(count: number): ResponseBeat[] {
    const builder = REPORT_BUILDERS[Math.floor(Math.random() * REPORT_BUILDERS.length)]!;
    return builder(count);
}
