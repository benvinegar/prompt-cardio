import { formatTokensCompact } from '@/lib/format';
import { loadPersonalBest } from '@/lib/personal-best';
import { TitleBorderPanel } from '@/components/title-border-panel';

export interface StartScreenProps {
    onStart: () => void;
}

/** Rules shown as dim bulleted lines above the START control. */
const RULES: string[] = [
    'Your mission: make the AI burn as many tokens as possible. Speed feeds the fire.',
    'Prompt your AI copilot through the tasks by typing the ghost text.',
    "2 minutes on the wall clock. It starts on your first keystroke — and the AI's theatrics run YOUR clock.",
    "Wrong keys don't advance. The last key sends it — no Enter needed.",
];

/** Centered hero shown at phase 'idle': a title-in-border banner, pitch, rules, and the START control. */
export function StartScreen({ onStart }: StartScreenProps) {
    const pb = loadPersonalBest();

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-16 font-mono">
            <TitleBorderPanel title="prompt-faster — the vibe coding screen" className="w-full max-w-lg text-center">
                <p className="text-sm text-ink-dim">
                    candidate connected · evaluation in progress · this session is billed to you
                </p>

                <h1 className="mt-5 text-2xl font-bold text-ink-bright sm:text-3xl">prompt-faster</h1>
                <p className="mt-2 text-sm text-ink-dim">the vibe coding interview. you are the candidate.</p>

                <ul className="mt-6 flex flex-col gap-2 text-left text-sm text-ink-dim">
                    {RULES.map((rule) => (
                        <li key={rule} className="flex items-start gap-2.5">
                            <span className="mt-0.5 shrink-0 text-accent">·</span>
                            <span>{rule}</span>
                        </li>
                    ))}
                </ul>

                {pb && (
                    <p className="mt-6 text-xs text-ink-faint">
                        record burn:{' '}
                        <span className="font-bold text-accent">{formatTokensCompact(pb.tokensBurned)} tokens</span>
                        {' ('}
                        {pb.wpm} wpm{')'}
                    </p>
                )}

                <button
                    type="button"
                    onClick={onStart}
                    className="mt-8 border border-accent px-8 py-2.5 text-base font-bold tracking-wide text-accent transition-colors hover:bg-accent hover:text-bg"
                >
                    [ start ]
                </button>
            </TitleBorderPanel>
        </div>
    );
}
