import type { ResponseBeat } from '@/game/types';

/**
 * Fake "thinking" lines streamed just before the transcript collapses, in the same deadpan
 * smug-interviewer voice as the rest of the game. Plain ASCII, one is chosen per compaction.
 */
export const COMPACTION_THINKING_LINES: string[] = [
    'Compacting context... window at 97%. Optimizing away everything you are proud of.',
    'Context window critical. Summarizing the last several minutes of your life into one sentence.',
    'Running context compaction. Discarding nuance, keeping vibes.',
    'Memory pressure high. Compressing the transcript down to whatever we can still bill for.',
];

/**
 * Builds the single-beat sequence for the compaction interstitial: a random thinking line from
 * {@link COMPACTION_THINKING_LINES}, with no trailing text beat -- the "reply" is the collapse
 * itself.
 */
export function buildCompactionThinkingBeats(): ResponseBeat[] {
    const text =
        COMPACTION_THINKING_LINES[Math.floor(Math.random() * COMPACTION_THINKING_LINES.length)] ??
        COMPACTION_THINKING_LINES[0]!;
    return [{ kind: 'thinking', text }];
}

/** Live run counters interpolated into the post-compaction summary line. */
export interface CompactionSummaryInput {
    promptsCompleted: number;
    tokensBurned: number;
    subagentCount: number;
}

/**
 * Deadpan, deliberately useless one-line "summaries" the transcript collapses to. Each
 * interpolates the run's real numbers to sell the bit -- the joke is that compaction destroys
 * all the interesting detail while keeping the token count, which (per the last variant) it is
 * also actively adding to.
 */
const SUMMARY_BUILDERS: Array<(input: CompactionSummaryInput) => string> = [
    ({ promptsCompleted, tokensBurned }) =>
        `[context compacted: the candidate typed things. ${promptsCompleted} prompts were vibed. ${formatTokens(tokensBurned)} tokens are unaccounted for. a button popped. nothing was learned.]`,
    ({ subagentCount, tokensBurned }) =>
        `[context compacted: ${subagentCount} subagents still unaccounted for. ${formatTokens(tokensBurned)} tokens spent confirming they exist. the interview continues, degraded.]`,
    ({ tokensBurned }) =>
        `[compaction complete. this compaction alone burned several thousand tokens, bringing the total to ${formatTokens(tokensBurned)}. irony noted. proceeding.]`,
    ({ promptsCompleted, tokensBurned }) =>
        `[summary: ${promptsCompleted} prompts happened, ${formatTokens(tokensBurned)} tokens were spent, and none of the details survived. this is considered efficient.]`,
    ({ subagentCount, promptsCompleted, tokensBurned }) =>
        `[context compacted: ${subagentCount} subagents, ${promptsCompleted} prompts, ${formatTokens(tokensBurned)} tokens, one candidate. all reduced to this sentence. moving on.]`,
];

/** Formats a token count with thousands separators, e.g. 31204881 -> "31,204,881". */
function formatTokens(tokensBurned: number): string {
    return Math.floor(tokensBurned).toLocaleString('en-US');
}

/**
 * Picks a random deadpan summary line for the post-compaction archival message, interpolating
 * the run's real prompt/token/subagent counts so the nonsense stays numerically accurate.
 */
export function buildCompactionSummary(input: CompactionSummaryInput): string {
    const builder = SUMMARY_BUILDERS[Math.floor(Math.random() * SUMMARY_BUILDERS.length)] ?? SUMMARY_BUILDERS[0]!;
    return builder(input);
}
