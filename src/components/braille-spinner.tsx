import { useEffect, useState } from 'react';

/** Braille dot-pattern frames, cycled in order to fake a spinning terminal cursor. */
const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/** Milliseconds between frames. */
const FRAME_MS = 80;

export interface BrailleSpinnerProps {
    className?: string;
}

/**
 * An animated braille spinner character, the ⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏ cycle real agent CLIs use for
 * in-progress work. Driven by a `setInterval` rather than a CSS `content` animation, since
 * animating discrete `content` values isn't reliably supported. Never stops on its own — callers
 * decide when to stop rendering it (e.g. swapping it for a checkmark once a tool beat finishes).
 */
export function BrailleSpinner({ className }: BrailleSpinnerProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            setFrame((current) => (current + 1) % FRAMES.length);
        }, FRAME_MS);
        return () => window.clearInterval(id);
    }, []);

    return (
        <span aria-hidden="true" className={className}>
            {FRAMES[frame]}
        </span>
    );
}
