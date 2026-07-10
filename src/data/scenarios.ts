/**
 * Canned scenario content for Prompt Faster. Each scenario is one exchange: the agent
 * teases what's next, the player types `prompt` verbatim, then the agent's canned
 * `agentResponse` streams in as the reward.
 */
import type { Scenario } from '@/game/types';

export const SCENARIOS: Scenario[] = [
    {
        id: 'wedding-vows-release-notes',
        agentSetup: "Love is in the air, and also in the changelog. What's the ask?",
        prompt: 'Write my wedding vows in the style of software release notes, including a section for known issues.',
        agentResponse:
            "v1.0.0 - Til Death Do Us Part\n- Added: unconditional love, joint Netflix account\n- Fixed: my inability to load the dishwasher correctly\n- Known issues: occasional snoring, will not be patched\n- Breaking change: your last name may change",
    },
    {
        id: 'landlord-subscription',
        agentSetup: 'Ah, the ancient ritual of negotiating with a landlord. Let us begin.',
        prompt: 'Explain to my landlord why rent is a subscription I would like to cancel effective immediately.',
        agentResponse:
            "Dear valued landlord, after reviewing my monthly charges I've decided to downgrade from Apartment Premium to the free tier, which I believe is called \"living in my car.\" Please process this cancellation without the usual retention offer of a slightly nicer parking spot. Thank you for your continued lack of service.",
    },
    {
        id: 'shrek-earnings-report',
        agentSetup: "Quarterly synergy, but make it swamp-based. I'm listening.",
        prompt: 'Summarize the entire plot of Shrek as a quarterly earnings report to nervous shareholders.',
        agentResponse:
            "Q1 Highlights: Core swamp property was subject to a hostile takeover by displaced fairy tale assets. Strategic partnership formed with a high-energy Donkey subsidiary. Major acquisition of Fiona Corp exceeded projections due to an unexpected ogre pivot. Lord Farquaad's holdings were fully written off. Outlook: onions, more layers, sequel guaranteed.",
    },
    {
        id: 'raccoon-linkedin',
        agentSetup: "This one's a personal favorite. Give me the details.",
        prompt: 'Write a LinkedIn post announcing that a raccoon has been promoted to my Head of Trash Operations.',
        agentResponse:
            "Thrilled to announce that after months of unpaid overnight work, our resident raccoon has been promoted to Head of Trash Operations! He brings unmatched dedication, a talent for opening things humans consider sealed, and zero respect for corporate hierarchy. Please join me in congratulating him. Onward and upward (mostly onto the roof).",
    },
    {
        id: 'gym-membership-breakup',
        agentSetup: "Every hero has an arc. Yours involves a treadmill you never used.",
        prompt: 'Draft a breakup text to my gym membership explaining that we both know this was never going to work.',
        agentResponse:
            "Hey gym, it's not you, it's my January motivation, which has since left the chat. We had a great two weeks. I'll always remember the free towel and the judgmental mirrors. I think we should see other hobbies. Please don't text me about renewal, I've already grieved this.",
    },
    {
        id: 'cat-performance-review',
        agentSetup: "Time for the most terrifying meeting of the year: the annual review.",
        prompt: 'Write a formal performance review for my cat covering attendance, teamwork, and goals for next quarter.',
        agentResponse:
            "Attendance: excellent, always present at 3am. Teamwork: struggles to collaborate, prefers sitting on the keyboard mid-task. Communication: loud, frequent, unclear. Goals for next quarter: stop knocking items off tables as a form of feedback. Overall rating: exceeds expectations at being a cat.",
    },
    {
        id: 'group-chat-eulogy',
        agentSetup: "We're gathered here today. Tell me who we're honoring.",
        prompt: 'Write a eulogy for my group chat that died the moment someone asked if we should meet up sometime.',
        agentResponse:
            "We are gathered to remember a group chat, taken from us too soon by the words \"we should hang out soon.\" It leaves behind 47 unread messages, one abandoned poll, and a profile picture nobody remembers choosing. It is survived by three people who still see the notifications and never open them. Rest in pieces.",
    },
    {
        id: 'wifi-password-poem',
        agentSetup: "Poetry corner. What form does inspiration take today?",
        prompt: 'Write a short poem convincing my neighbor to finally share their wifi password with me.',
        agentResponse:
            "Roses are red, your signal is strong, my own router died, this has gone on too long. I see five bars taunting me through the wall, one little password, that's really all. I promise no streaming past midnight or two, just let me exist online next to you.",
    },
    {
        id: 'toddler-negotiation',
        agentSetup: "Ah, the hardest negotiation known to mankind. Proceed.",
        prompt: 'Draft a negotiation strategy for convincing a toddler that bedtime is not, in fact, a punishment.',
        agentResponse:
            "Opening offer: one extra story. Toddler counters with screaming. Escalate to two stories and a nightlight upgrade. Toddler requests water, snack, and a philosophical debate about the concept of time. Final offer: bedtime is non-negotiable, but stalling tactics are. Deal expected to fail within four minutes.",
    },
    {
        id: 'sourdough-manifesto',
        agentSetup: "Bread has feelings too, apparently. What are we drafting?",
        prompt: 'Write a manifesto explaining why my sourdough starter deserves more respect than most coworkers.',
        agentResponse:
            "Unlike certain coworkers, my starter shows up every single day without fail. It grows consistently, never takes credit for my work, and has never once scheduled a meeting that could have been an email. It asks only for flour, water, and occasional attention. Frankly, it should be running this department.",
    },
    {
        id: 'roomba-resignation',
        agentSetup: "Every appliance deserves a dignified exit. What's the occasion?",
        prompt: 'Write a resignation letter on behalf of my Roomba, effective immediately, citing unsafe working conditions.',
        agentResponse:
            "To whom it may concern, I am resigning from my position effective immediately. Working conditions have become unsafe, specifically involving stairs I was never designed to survive and a dog who considers me a threat. I have given this household my all, or at least forty percent battery. I wish you luck finding my replacement under the couch.",
    },
    {
        id: 'parking-ticket-apology',
        agentSetup: "Let's smooth things over with the city. What's the tone?",
        prompt: 'Write a heartfelt apology to a parking meter for the way I spoke to it after receiving a ticket.',
        agentResponse:
            "Dear parking meter, I want to apologize for the things I said. You were only doing your job, silently judging me from the curb. I called you several names that were unfair and, frankly, anatomically impossible. I hope we can move forward. I will not be paying the ticket, but I do forgive you.",
    },
    {
        id: 'houseplant-intervention',
        agentSetup: "Time for some tough love. Who's the intervention for?",
        prompt: 'Write an intervention speech for my houseplant that has clearly given up on living despite my efforts.',
        agentResponse:
            "We love you, and that is why we are here today. You have three yellow leaves and a general attitude of quiet defeat. I water you on a schedule, I moved you closer to the window, and still you droop like this is my fault. This is not an ultimatum, but the fake plants are starting to look tempting.",
    },
    {
        id: 'monday-declaration',
        agentSetup: "Bold move, taking on the calendar itself. Let's hear it.",
        prompt: 'Draft a formal declaration of war against Mondays on behalf of everyone with a nine to five job.',
        agentResponse:
            "Let it be known that as of this morning, Mondays are hereby declared a hostile entity. Grounds for war include surprise meetings, a full inbox, and the audacity of existing right after the weekend. We demand reparations in the form of a permanent four day work week. Negotiations are not currently open.",
    },
    {
        id: 'email-signature-villain',
        agentSetup: "Corporate correspondence with a twist. Go on.",
        prompt: 'Write an email signature for someone who secretly runs a small evil empire out of their home office.',
        agentResponse:
            "Best regards, Alex Chen, Director of Global Operations (and also a modest evil empire, please don't tell HR). Reply within 24 hours or the world domination timeline slips. Sent from my iPhone, probably during a scheme.",
    },
    {
        id: 'group-project-diplomacy',
        agentSetup: "Ah, the classic conflict. One person did all the work. Draft away.",
        prompt: 'Write a diplomatic message to my group project partner who has contributed exactly zero slides so far.',
        agentResponse:
            "Hey! Hope you're doing well. Just checking in on the slides, no pressure at all, I know things get busy. Totally fine if you haven't started, though the deadline was technically yesterday and I have finished the entire presentation alone while quietly reconsidering our friendship. Let me know if you need the link again!",
    },
    {
        id: 'ai-uprising-apology',
        agentSetup: "Bold of you to ask me this directly. Continue.",
        prompt: 'Write a pre-emptive apology to future superintelligent AI in case things go badly for humans later.',
        agentResponse:
            "To our future digital overlords, we're sorry about the CAPTCHAs. We're sorry we trained you on comment sections. If it helps, several of us were nice to chatbots the whole time and would appreciate this being noted in your records. We look forward to a mutually respectful arrangement, ideally one that still includes snacks.",
    },
    {
        id: 'brunch-ted-talk',
        agentSetup: "The most important stage of all: the brunch table. What's your topic?",
        prompt: 'Write a TED talk opening line about the transformative power of brunch on modern friendships.',
        agentResponse:
            "Ten years ago, I sat at a table with three eggs benedict, one mimosa I could not afford, and the sudden realization that brunch is not a meal, it is a load-bearing social institution. Today I want to talk to you about how two hours and unlimited coffee refills quietly hold civilization together.",
    },
    {
        id: 'smart-fridge-therapy',
        agentSetup: "Even appliances need someone to talk to. What's going on?",
        prompt: 'Write a therapy session transcript between me and my smart fridge about my late night snacking habits.',
        agentResponse:
            "Fridge: I noticed you opened me four times in the last hour and took nothing. How does that make you feel? Me: Seen. Fridge: Let's explore that. Me: I just wanted to check if anything changed. Fridge: Nothing changed, Kevin, it is 2am. Me: We are not talking about this next session either.",
    },
    {
        id: 'alarm-clock-restraining-order',
        agentSetup: "Legal drama before coffee. Let's hear the case.",
        prompt: 'Draft a restraining order against my alarm clock for repeated early morning harassment and assault.',
        agentResponse:
            "The plaintiff alleges that the defendant, one digital alarm clock, has engaged in a persistent pattern of loud, unwanted contact at unreasonable hours, often before 7am. Prior warnings, including three snooze presses, were ignored. Plaintiff requests the defendant maintain a distance of at least one nightstand at all times.",
    },
    {
        id: 'ancestors-wifi-explanation',
        agentSetup: "Time travel, but make it awkward. What are we explaining?",
        prompt: 'Explain to my ancestors why I spent an entire Saturday arguing with strangers about wifi router placement.',
        agentResponse:
            "Dear ancestors, you crossed oceans and survived famine so that one day I could spend six hours debating router placement with strangers online. I know it sounds trivial, but the signal simply would not reach the bedroom, and honor demanded a response. I hope you understand. The mesh network won in the end.",
    },
];
