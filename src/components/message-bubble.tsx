import type { ChatMessage } from '@/game/types';
import { AgentResponseBeats } from '@/components/agent-response-beats';
import { StreamingText } from '@/components/streaming-text';

function SparkIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-accent-bright" aria-hidden="true">
            <path
                d="M12 2.5 14 9.5 21 12 14 14.5 12 21.5 10 14.5 3 12 10 9.5 12 2.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

export interface MessageBubbleProps {
    message: ChatMessage;
    onStreamDone?: () => void;
}

/** Renders a single transcript entry: agent bubbles on the left, user bubbles on the right. */
export function MessageBubble({ message, onStreamDone }: MessageBubbleProps) {
    const isAgent = message.role === 'agent';

    return (
        <div
            className={`flex w-full animate-fade-up items-start gap-2.5 ${
                isAgent ? 'justify-start' : 'justify-end'
            }`}
        >
            {isAgent && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-bg-elevated">
                    <SparkIcon />
                </div>
            )}
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed break-words sm:max-w-[70%] ${
                    isAgent
                        ? 'rounded-tl-sm border border-border bg-bg-panel text-ink'
                        : 'rounded-tr-sm bg-accent text-white'
                }`}
            >
                {isAgent ? (
                    message.beats ? (
                        <AgentResponseBeats
                            beats={message.beats}
                            streaming={message.streaming ?? false}
                            onDone={onStreamDone}
                        />
                    ) : (
                        <StreamingText
                            text={message.text}
                            streaming={message.streaming ?? false}
                            onDone={onStreamDone}
                        />
                    )
                ) : (
                    <span className="font-mono">{message.text}</span>
                )}
            </div>
        </div>
    );
}
