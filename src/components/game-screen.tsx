import { useEffect, useRef } from 'react';
import { useGame } from '@/game/use-game';
import { playError, playFinish, playKeyClick, playSubmit, playTimeLow, playToolPing } from '@/lib/audio';
import { StartScreen } from '@/components/start-screen';
import { Hud } from '@/components/hud';
import { MessageBubble } from '@/components/message-bubble';
import { ThinkingIndicator } from '@/components/thinking-indicator';
import { TypingComposer } from '@/components/typing-composer';
import { ResultsModal } from '@/components/results-modal';

/** Keys that would scroll the page or otherwise navigate away if left unhandled. */
const NAVIGATION_KEYS = new Set(['Enter', ' ', 'Spacebar', "'", '"', '/', 'Tab', 'Backspace']);

/** Mirrors the HUD's low-time threshold; below this, a soft clock tick plays once per second. */
const TIME_LOW_THRESHOLD_MS = 10_000;

/**
 * The single route component. Composes the start screen, chat transcript, HUD, typing
 * composer, and results modal around the `useGame` engine hook, and wires the window-level
 * keydown listener that drives typing during the `typing` phase.
 */
export function GameScreen() {
    const { snapshot, start, reset, handleKey, onAgentStreamDone } = useGame();
    const { phase, messages, currentPrompt, typedCount, lastKeyWasError, remainingMs, stats } = snapshot;

    const transcriptRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (phase !== 'typing') {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }
            if (NAVIGATION_KEYS.has(event.key)) {
                event.preventDefault();
            }
            handleKey(event.key);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [phase, handleKey]);

    useEffect(() => {
        const el = transcriptRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages, phase]);

    // While an agent message is revealing char-by-char (UI-side animation, invisible to the
    // snapshot), keep the transcript pinned to the bottom.
    const isStreaming = messages.some((message) => message.streaming);
    useEffect(() => {
        if (!isStreaming) {
            return;
        }
        const id = setInterval(() => {
            const el = transcriptRef.current;
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
        }, 100);
        return () => clearInterval(id);
    }, [isStreaming]);

    // Key click / error thunk: driven off snapshot deltas rather than the raw keydown handler,
    // since correctness (advance vs error) is decided inside the engine and this stays in sync
    // with it for free, including resets when a fresh run starts.
    const lastKeystrokeStatsRef = useRef({ totalKeystrokes: stats.totalKeystrokes, errors: stats.errors });
    useEffect(() => {
        const prev = lastKeystrokeStatsRef.current;
        if (stats.totalKeystrokes > prev.totalKeystrokes) {
            if (stats.errors > prev.errors) {
                playError();
            } else {
                playKeyClick();
            }
        }
        lastKeystrokeStatsRef.current = { totalKeystrokes: stats.totalKeystrokes, errors: stats.errors };
    }, [stats.totalKeystrokes, stats.errors]);

    // Submit whoosh on typing -> thinking, and the finish sting whenever the run ends.
    const prevPhaseRef = useRef(phase);
    useEffect(() => {
        const prevPhase = prevPhaseRef.current;
        if (prevPhase === 'typing' && phase === 'thinking') {
            playSubmit();
        }
        if (phase === 'finished' && prevPhase !== 'finished') {
            playFinish();
        }
        prevPhaseRef.current = phase;
    }, [phase]);

    // A subtle tick once when a new beats-driven agent message (response/report) starts
    // streaming in. Pinging per-completed-tool-beat would be far too chatty across a transcript.
    const pingedMessageIdRef = useRef<string | null>(null);
    useEffect(() => {
        const last = messages[messages.length - 1];
        if (last && last.role === 'agent' && last.streaming && last.beats && pingedMessageIdRef.current !== last.id) {
            pingedMessageIdRef.current = last.id;
            playToolPing();
        }
    }, [messages]);

    // Soft clock tick, once per second, while under 10s remain during active typing.
    const lastLowSecondRef = useRef<number | null>(null);
    useEffect(() => {
        if (phase !== 'typing' || remainingMs >= TIME_LOW_THRESHOLD_MS || remainingMs <= 0) {
            lastLowSecondRef.current = null;
            return;
        }
        const bucket = Math.floor(remainingMs / 1000);
        if (lastLowSecondRef.current !== bucket) {
            lastLowSecondRef.current = bucket;
            playTimeLow();
        }
    }, [phase, remainingMs]);

    if (phase === 'idle') {
        return <StartScreen onStart={start} />;
    }

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-bg">
            <Hud
                remainingMs={remainingMs}
                wpm={stats.wpm}
                accuracy={stats.accuracy}
                tokensBurned={stats.tokensBurned}
                subagentCount={snapshot.subagentCount}
                streak={snapshot.streak}
                phase={phase}
            />

            <div ref={transcriptRef} className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            onStreamDone={message.streaming ? onAgentStreamDone : undefined}
                        />
                    ))}
                    {phase === 'thinking' && <ThinkingIndicator />}
                </div>
            </div>

            <div className="border-t border-border bg-bg-elevated/80 px-4 py-4 backdrop-blur-sm sm:px-6">
                <div className="mx-auto w-full max-w-2xl">
                    <TypingComposer
                        prompt={phase === 'typing' ? currentPrompt : null}
                        typedCount={typedCount}
                        lastKeyWasError={lastKeyWasError}
                    />
                </div>
            </div>

            {phase === 'finished' && <ResultsModal stats={stats} onPlayAgain={start} onClose={reset} />}
        </div>
    );
}
