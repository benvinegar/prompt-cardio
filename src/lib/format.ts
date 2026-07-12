/**
 * Shared number formatting for the comedic token-burn score. Tokens burned is now the
 * player's headline stat, so it needs both a compact form (HUD, chips — space is tight and
 * the number keeps climbing) and a full form (results card — the absurd magnitude IS the
 * punchline, so spell it out).
 */

/** Suffix tiers for {@link formatTokensCompact}, checked largest-first. */
const COMPACT_TIERS: ReadonlyArray<{ threshold: number; divisor: number; suffix: string }> = [
    { threshold: 1_000_000_000, divisor: 1_000_000_000, suffix: 'B' },
    { threshold: 1_000_000, divisor: 1_000_000, suffix: 'M' },
    { threshold: 100_000, divisor: 1_000, suffix: 'k' },
];

/**
 * Formats a token count compactly for space-constrained UI (the HUD meter). Below 100,000 it
 * renders the full integer with en-US comma grouping (e.g. '412', '8,214'); at 100,000 and
 * above it switches to a k/M/B suffix, with one decimal place while the value is under 10 of
 * that unit (e.g. '3.2M', '1.4B') and none once it reaches 10+ (e.g. '412k', '128B').
 * Negative/non-finite input is clamped to 0.
 */
export function formatTokensCompact(n: number): string {
    const value = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;

    for (const tier of COMPACT_TIERS) {
        if (value >= tier.threshold) {
            const unitValue = value / tier.divisor;
            const decimals = unitValue < 10 ? 1 : 0;
            return `${unitValue.toFixed(decimals)}${tier.suffix}`;
        }
    }

    return value.toLocaleString('en-US');
}

/**
 * Formats a token count as a full integer with en-US comma grouping (e.g. '1,204,833,017').
 * Used on the results card, where spelling out the absurd total is the joke. Negative/non-finite
 * input is clamped to 0.
 */
export function formatTokensFull(n: number): string {
    const value = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
    return value.toLocaleString('en-US');
}
