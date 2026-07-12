/**
 * Synthesized sound effects for Prompt Cardio, built entirely on the Web Audio API — no asset
 * files, no dependencies. A single lazily-created `AudioContext` feeds a quiet master gain node;
 * every effect is a short (<150ms) oscillator envelope scheduled against it. Everything here is
 * best-effort: on unsupported/unavailable environments (SSR, locked-down browsers, exhausted
 * autoplay policies) every function silently no-ops instead of throwing.
 */

/** Overall output level. Kept low on purpose — tasteful UI feedback, not an arcade cabinet. */
const MASTER_GAIN = 0.15;

/** localStorage key used to persist the user's mute preference across sessions. */
const MUTE_STORAGE_KEY = 'prompt-cardio:muted';

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
/** Set once if AudioContext construction fails, so we stop retrying for the rest of the session. */
let contextUnavailable = false;

let muted = readMutedFromStorage();

function readMutedFromStorage(): boolean {
    try {
        return window.localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

/** Mutes/unmutes all sound effects and persists the choice to localStorage. */
export function setMuted(next: boolean): void {
    muted = next;
    try {
        window.localStorage.setItem(MUTE_STORAGE_KEY, next ? 'true' : 'false');
    } catch {
        // Best-effort persistence only; muting still works for the rest of this session.
    }
}

/** Whether sound effects are currently muted. Defaults to false (unmuted). */
export function isMuted(): boolean {
    return muted;
}

/**
 * Lazily creates (and resumes) the shared AudioContext. Browsers require a user gesture before
 * audio can play, so every play* call re-attempts `resume()`; the gesture requirement is
 * satisfied naturally since all playback is triggered from keydown/click handlers.
 */
function getContext(): AudioContext | null {
    if (contextUnavailable) {
        return null;
    }
    if (audioContext === null) {
        const AudioContextCtor =
            window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextCtor) {
            contextUnavailable = true;
            return null;
        }
        try {
            audioContext = new AudioContextCtor();
            masterGain = audioContext.createGain();
            masterGain.gain.value = MASTER_GAIN;
            masterGain.connect(audioContext.destination);
        } catch {
            contextUnavailable = true;
            return null;
        }
    }
    if (audioContext.state === 'suspended') {
        void audioContext.resume().catch(() => {
            // Autoplay policy still blocking; the next user gesture will retry.
        });
    }
    return audioContext;
}

interface ToneOptions {
    /** Starting oscillator frequency, in Hz. */
    startFrequency: number;
    /** When set, the oscillator glides (exponentially) from `startFrequency` to this by the end. */
    endFrequency?: number;
    type?: OscillatorType;
    /** Time to reach peak gain, in seconds. */
    attackSec?: number;
    /** Time to decay from peak back to silence, in seconds. */
    decaySec?: number;
    /** Peak envelope gain (0-1), relative to the already-quiet master gain. */
    peakGain?: number;
    /** Optional lowpass filter cutoff, in Hz, to soften harsh harmonics. */
    lowpassHz?: number;
    /** Delay before this tone starts, in seconds. Used to sequence multi-note stings. */
    delaySec?: number;
}

/** Schedules one short enveloped oscillator tone against the shared master gain. Never throws. */
function playTone(options: ToneOptions): void {
    if (muted) {
        return;
    }
    const ctx = getContext();
    if (!ctx || !masterGain) {
        return;
    }
    try {
        const {
            startFrequency,
            endFrequency,
            type = 'sine',
            attackSec = 0.004,
            decaySec = 0.08,
            peakGain = 1,
            lowpassHz,
            delaySec = 0,
        } = options;

        const startAt = ctx.currentTime + delaySec;
        const stopAt = startAt + attackSec + decaySec + 0.02;

        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(startFrequency, startAt);
        if (endFrequency !== undefined) {
            osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), startAt + attackSec + decaySec);
        }

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0.0001, startAt);
        envelope.gain.exponentialRampToValueAtTime(Math.max(0.0001, peakGain), startAt + attackSec);
        envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + attackSec + decaySec);

        let source: AudioNode = osc;
        if (lowpassHz !== undefined) {
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = lowpassHz;
            osc.connect(filter);
            source = filter;
        }
        source.connect(envelope);
        envelope.connect(masterGain);

        osc.start(startAt);
        osc.stop(stopAt);
    } catch {
        // Sound effects must never throw or interrupt gameplay.
    }
}

/** Short soft click for a correct keystroke. Pitch is randomized so key streams don't sound robotic. */
export function playKeyClick(): void {
    playTone({
        startFrequency: 650 + Math.random() * 450,
        type: 'square',
        attackSec: 0.002,
        decaySec: 0.03,
        peakGain: 0.5,
        lowpassHz: 4000,
    });
}

/** Low dull thunk for a wrong keystroke. */
export function playError(): void {
    playTone({
        startFrequency: 150,
        endFrequency: 85,
        type: 'triangle',
        attackSec: 0.004,
        decaySec: 0.13,
        peakGain: 0.8,
        lowpassHz: 700,
    });
}

/** Quick upward whoosh/blip on prompt auto-submit. */
export function playSubmit(): void {
    playTone({
        startFrequency: 420,
        endFrequency: 920,
        type: 'sine',
        attackSec: 0.005,
        decaySec: 0.09,
        peakGain: 0.55,
    });
}

/** Subtle high tick, played once when a new agent response starts streaming in. */
export function playToolPing(): void {
    playTone({
        startFrequency: 1800,
        endFrequency: 2200,
        type: 'sine',
        attackSec: 0.002,
        decaySec: 0.05,
        peakGain: 0.35,
    });
}

/** Soft clock tick, played once per second while time is running low. */
export function playTimeLow(): void {
    playTone({
        startFrequency: 950,
        type: 'sine',
        attackSec: 0.002,
        decaySec: 0.045,
        peakGain: 0.3,
        lowpassHz: 3200,
    });
}

/** Short two-note sting played once when the run finishes. */
export function playFinish(): void {
    playTone({
        startFrequency: 523.25, // C5
        type: 'sine',
        attackSec: 0.006,
        decaySec: 0.12,
        peakGain: 0.5,
    });
    playTone({
        startFrequency: 783.99, // G5
        type: 'sine',
        attackSec: 0.006,
        decaySec: 0.18,
        peakGain: 0.55,
        delaySec: 0.11,
    });
}
