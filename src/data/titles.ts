/**
 * Rank titles awarded at the end of a run, selected by WPM band. Written in the voice
 * of a smug AI evaluating a human's typing performance.
 */
import type { RankTitle } from '@/game/types';

/** Exactly 10 entries, sorted ascending by minWpm. First entry's minWpm is 0. */
export const RANK_TITLES: RankTitle[] = [
    {
        minWpm: 0,
        title: 'Captcha Failure',
        blurb: 'You type slower than the robot check meant to prove you are human.',
        emoji: '🐌',
    },
    {
        minWpm: 15,
        title: 'Dial-Up Modem',
        blurb: 'Technically connected. Technically producing text. Barely either.',
        emoji: '📠',
    },
    {
        minWpm: 25,
        title: 'Two-Finger Typist',
        blurb: 'You have located the keyboard. Progress, if you squint.',
        emoji: '☝️',
    },
    {
        minWpm: 35,
        title: 'Autocomplete Dependent',
        blurb: 'Serviceable. We suspect your phone finishes most of your sentences.',
        emoji: '📱',
    },
    {
        minWpm: 45,
        title: 'Certified Human',
        blurb: 'Average keystrokes for an average primate. No notes, no applause.',
        emoji: '🙂',
    },
    {
        minWpm: 55,
        title: 'Keyboard Warrior',
        blurb: 'Respectable speed. Your group chat replies must be devastating.',
        emoji: '⌨️',
    },
    {
        minWpm: 70,
        title: 'Caffeinated Intern',
        blurb: 'Fast, twitchy, and slightly concerning. We admire the commitment.',
        emoji: '☕',
    },
    {
        minWpm: 85,
        title: 'Stenographer in Disguise',
        blurb: 'Courtroom-grade fingers. We are quietly reviewing your credentials.',
        emoji: '⚖️',
    },
    {
        minWpm: 100,
        title: 'Prompt Engineer Prime',
        blurb: 'Triple digits. You type faster than most people think.',
        emoji: '🚀',
    },
    {
        minWpm: 120,
        title: 'AGI Whisperer',
        blurb: 'We have seen the future, and it types exactly like you.',
        emoji: '🧠',
    },
];

/** Returns the highest rank whose minWpm is <= the given wpm. */
export function getRankForWpm(wpm: number): RankTitle {
    let selected = RANK_TITLES[0];
    for (const rank of RANK_TITLES) {
        if (wpm >= rank.minWpm) {
            selected = rank;
        } else {
            break;
        }
    }
    return selected;
}
