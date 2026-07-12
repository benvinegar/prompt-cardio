/**
 * Shame verdicts for runs flagged by the anti-cheat detector (`GameStats.botVerdict`). Shown on
 * the results card INSTEAD of the normal WPM rank when a run is disqualified -- same smug
 * hiring-committee voice as `titles.ts`, now addressed directly to whatever dispatched the
 * keystrokes.
 */
import type { RankTitle } from '@/game/types';

/**
 * Keyed by `GameStats.botVerdict`. Reuses the `RankTitle` shape so the results card can render
 * either kind of verdict with the same JSX; `minWpm` has no meaning here and is always 0.
 */
export const SHAME_VERDICTS: Record<'synthetic' | 'robotic', RankTitle> = {
    synthetic: {
        minWpm: 0,
        title: 'Detected: Selenium Engineer',
        blurb: 'You dispatched synthetic keystrokes at a typing test. The subagents respect the hustle. HR does not.',
        emoji: '🤖',
    },
    robotic: {
        minWpm: 0,
        title: 'Suspiciously Consistent',
        blurb: 'No human types this fast with this little jitter. The offer is rescinded; the Roomba got the job.',
        emoji: '🦾',
    },
};
