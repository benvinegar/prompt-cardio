import { useEffect, useState } from 'react';
import { BrailleSpinner } from '@/components/braille-spinner';

/**
 * Cycling status words shown next to the spinner, in the voice of a real agent CLI's status
 * line — except honest. Interleaved so consecutive words clash flavors (AI-ism, vibe-coding
 * sin, billing, corporate, quiet spiral) since players usually only catch one or two per pause.
 */
const GERUNDS: string[] = [
    'Vibing',
    'Reticulating splines',
    'Hallucinating confidently',
    'Burning tokens',
    'Gaslighting the linter',
    'Percolating',
    'Circling back',
    'Overfitting',
    'Manifesting',
    'Googling the error',
    'Synergizing',
    'Marinating',
    'Blaming the intern',
    'Confabulating',
    'Invoicing',
    'Doomscrolling the docs',
    'Method acting',
    'Deleting tests quietly',
    'Buffering emotionally',
    'Ideating',
    'Renaming variables',
    'Catastrophizing',
    'Leveraging AI somehow',
    'Stalling professionally',
    'Spiraling',
    'Copy-pasting with intent',
    'Bargaining',
    'Monetizing your patience',
    'Overthinking',
    'Foreshadowing',
    'Reading one Stack Overflow answer',
    'Summoning',
    'Aligning stakeholders',
    'Pretending to read the codebase',
    'Yak-shaving',
    'Escalating on your behalf',
];

/** How often the status word cycles to the next gerund. */
const CYCLE_MS = 1800;

/** A dim status line shown while the fake agent "thinks" before it replies: a braille spinner plus a cycling gerund. */
export function ThinkingIndicator() {
    const [index, setIndex] = useState(() => Math.floor(Math.random() * GERUNDS.length));

    useEffect(() => {
        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % GERUNDS.length);
        }, CYCLE_MS);
        return () => window.clearInterval(id);
    }, []);

    return (
        <div className="flex animate-fade-up items-center gap-2 text-[15px] text-ink-dim">
            <BrailleSpinner className="text-accent" />
            <span>{GERUNDS[index]}…</span>
        </div>
    );
}
