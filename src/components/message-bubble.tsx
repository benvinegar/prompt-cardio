import type { ChatMessage } from '@/game/types';
import { AgentResponseBeats } from '@/components/agent-response-beats';
import { StreamingText } from '@/components/streaming-text';
import { AgentBulletLine } from '@/components/terminal-line';

export interface MessageBubbleProps {
    message: ChatMessage;
    onStreamDone?: () => void;
}

/**
 * Renders one transcript entry as a flat terminal line: plain agent text gets a `⏺` bullet,
 * agent responses with structured beats delegate to `AgentResponseBeats` (each beat renders its
 * own bullet), and user submissions get a `>` caret prompt in bright bold text.
 */
export function MessageBubble({ message, onStreamDone }: MessageBubbleProps) {
    if (message.role === 'user') {
        return (
            <div className="flex animate-fade-up gap-2 text-[15px] leading-relaxed break-words">
                <span className="shrink-0 font-bold text-accent">&gt;</span>
                <span className="min-w-0 break-words font-bold text-ink-bright">{message.text}</span>
            </div>
        );
    }

    if (message.beats) {
        return (
            <AgentResponseBeats beats={message.beats} streaming={message.streaming ?? false} onDone={onStreamDone} />
        );
    }

    return (
        <AgentBulletLine>
            <StreamingText text={message.text} streaming={message.streaming ?? false} onDone={onStreamDone} />
        </AgentBulletLine>
    );
}
