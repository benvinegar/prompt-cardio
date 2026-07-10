import { useEffect, useRef } from 'react';
import { useGame } from '@/game/use-game';
import { StartScreen } from '@/components/start-screen';
import { Hud } from '@/components/hud';
import { MessageBubble } from '@/components/message-bubble';
import { ThinkingIndicator } from '@/components/thinking-indicator';
import { TypingComposer } from '@/components/typing-composer';
import { ResultsModal } from '@/components/results-modal';

/** Keys that would scroll the page or otherwise navigate away if left unhandled. */
const NAVIGATION_KEYS = new Set(['Enter', ' ', 'Spacebar', "'", '"', '/', 'Tab', 'Backspace']);

/**
 * The single route component. Composes the start screen, chat transcript, HUD, typing
 * composer, and results modal around the `useGame` engine hook, and wires the window-level
 * keydown listener that drives typing during the `typing` phase.
 */
export function GameScreen() {
    const { snapshot, start, reset, handleKey, onAgentStreamDone } = useGame();
    const { phase, messages, currentPrompt, typedCount, lastKeyWasError, readyToSubmit, remainingMs, stats } =
        snapshot;

    const transcriptEndRef = useRef<HTMLDivElement>(null);

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
        transcriptEndRef.current?.scrollIntoView({ block: 'end' });
    }, [messages, phase]);

    if (phase === 'idle') {
        return <StartScreen onStart={start} />;
    }

    return (
        <div className="flex min-h-dvh flex-col bg-bg">
            <Hud remainingMs={remainingMs} wpm={stats.wpm} accuracy={stats.accuracy} phase={phase} />

            <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            onStreamDone={message.streaming ? onAgentStreamDone : undefined}
                        />
                    ))}
                    {phase === 'thinking' && <ThinkingIndicator />}
                    <div ref={transcriptEndRef} />
                </div>
            </div>

            <div className="border-t border-border bg-bg-elevated/80 px-4 py-4 backdrop-blur-sm sm:px-6">
                <div className="mx-auto w-full max-w-2xl">
                    <TypingComposer
                        prompt={phase === 'typing' || phase === 'thinking' ? currentPrompt : null}
                        typedCount={typedCount}
                        lastKeyWasError={lastKeyWasError}
                        readyToSubmit={readyToSubmit}
                    />
                </div>
            </div>

            {phase === 'finished' && <ResultsModal stats={stats} onPlayAgain={start} onClose={reset} />}
        </div>
    );
}
