import { useEffect, useState } from 'react';
import { BrailleSpinner } from '@/components/braille-spinner';

/** Cycling status words shown next to the spinner, in the voice of a real agent CLI's status line. */
const GERUNDS: string[] = [
    'Vibing',
    'Pondering',
    'Percolating',
    'Manifesting',
    'Yak-shaving',
    'Overthinking',
    'Summoning',
    'Rationalizing',
    'Improvising',
    'Freestyling',
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
