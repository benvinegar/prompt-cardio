/**
 * Canned scenario content for Prompt Faster. The player is a candidate on a technical
 * screen for a vibe coding role. Each scenario is one exchange: the interviewer/copilot
 * tees up a task, the player types `prompt` verbatim as the vibe coder would type it to
 * their AI copilot, then the copilot's canned `agentResponse` streams in as the reward.
 */
import type { Scenario } from '@/game/types';

export const SCENARIOS: Scenario[] = [
    {
        id: 'ship-no-tests',
        agentSetup: "First round. We're evaluating shipping velocity. How do you feel about test coverage?",
        prompt: 'Just ship it without tests, we will find out if it works from the Sentry alerts like adults do.',
        agentResponse:
            'Deployed straight to prod. Sentry is currently receiving errors faster than I can format them into tickets. I have opened a dashboard just to watch the number go up. Some would call this observability. I call it a live studio audience.',
    },
    {
        id: 'css-by-vibes',
        agentSetup: "Next, styling philosophy. We're big believers in feel over formula here.",
        prompt: 'Center this div using whatever margin and padding values feel right, we are not measuring anything.',
        agentResponse:
            'Centered via 37 nested divs and a margin value of "37px-ish". It is centered on your monitor, at your zoom level, in this lighting. I have declared it done and am now emotionally unavailable for follow-up bug reports about other screen sizes.',
    },
    {
        id: 'rename-until-compiles',
        agentSetup: "Debugging round. The type checker is angry. What's your move?",
        prompt: 'Keep renaming this variable until TypeScript stops complaining, I do not need to know why it works.',
        agentResponse:
            'Renamed data to data2, then data2Fixed, then data2FixedFinal, then actuallyFinalData. TypeScript is quiet now. I do not know why either, but silence is silence. I have added a comment that says "do not touch" and considered the ticket closed.',
    },
    {
        id: 'blame-the-linter',
        agentSetup: "Code review round. Your PR has 400 warnings. Defend yourself.",
        prompt: 'Disable the linter entirely, it is clearly biased against my personal coding style and creativity.',
        agentResponse:
            'Linter uninstalled, ESLint config renamed to config.old, and a Slack message drafted calling it "overly opinionated." The codebase now has zero warnings because it has zero rules. Freedom achieved. Future you is going to have such an exciting time.',
    },
    {
        id: 'add-ai-to-it',
        agentSetup: "Product round. Leadership wants relevance. What's the pitch?",
        prompt: 'Add AI to the todo list app somehow, I do not care what it does as long as we can say AI in the demo.',
        agentResponse:
            'Wired a chatbot into the todo list that, when asked to add "buy milk," responds with a 400-word essay on the philosophy of dairy consumption before adding the item. Investors loved the demo. Nobody asked what it does. Mission accomplished.',
    },
    {
        id: 'make-logo-bigger',
        agentSetup: "Design review. The stakeholder feedback just came in. Brace yourself.",
        prompt: 'Make the logo bigger, then a little bigger, then just make it the whole homepage honestly.',
        agentResponse:
            'Logo now occupies 94 percent of the viewport. The tagline has been relocated to a tooltip. Users report the homepage now loads a single image of our logo, slowly, on a spinner, which several stakeholders described as "iconic." Ship it.',
    },
    {
        id: 'delete-flaky-test',
        agentSetup: "CI is red again. The whole team is watching. What now?",
        prompt: 'Just delete the flaky test, it fails sometimes and that is basically the same as it being wrong.',
        agentResponse:
            'Test deleted, CI is green, team morale is briefly restored. The bug the test was catching still exists and will be rediscovered in production at 2am by someone who did not attend this meeting. I have marked the ticket as resolved out of professional courtesy.',
    },
    {
        id: 'friday-hotfix',
        agentSetup: "It's 4:45pm on a Friday and prod is on fire. Talk to me.",
        prompt: 'Push a quick hotfix straight to main and skip the review, we will circle back to it on Monday probably.',
        agentResponse:
            'Hotfix deployed at 4:52pm with commit message "fix." Prod is up. So is a second, smaller fire that nobody has noticed yet. I have set a calendar reminder for Monday that everyone, including me, already knows will be ignored.',
    },
    {
        id: 'make-it-pop',
        agentSetup: "Design critique round. The client used the word 'pop' seven times.",
        prompt: 'Make the button pop more, add a shadow, a gradient, a bounce animation, and maybe some confetti.',
        agentResponse:
            'Button now has four drop shadows, a gradient last seen in 2013, a bounce animation that triggers on scroll, and confetti that fires every time it is merely looked at. It pops so hard three users have filed motion sickness complaints. I have tagged them as feature requests.',
    },
    {
        id: 'stackoverflow-copy-paste',
        agentSetup: "Implementation round. We need auth by end of day. Approach?",
        prompt: 'Copy the top answer from a ten year old thread and paste it in, accepted answers cannot be wrong.',
        agentResponse:
            'Pasted a 2013 authentication snippet verbatim, including a comment that says "do not use in production" which I have chosen to interpret as a suggestion. It compiles. Security review has been rescheduled to a date that does not exist on any calendar.',
    },
    {
        id: 'microservices-todo-app',
        agentSetup: "Architecture round. The scale requirements are one user, you. Go big anyway.",
        prompt: 'Split the todo app into twelve microservices, we need to be ready to scale to millions of todos.',
        agentResponse:
            'Todo app now consists of twelve services, a message queue, a service mesh, and a Kubernetes cluster, all coordinating to store the word "milk." Adding a single todo now involves four network hops and one existential crisis. Latency is up nine thousand percent. Resume-worthy.',
    },
    {
        id: 'dark-mode-invert',
        agentSetup: "Feature request round. Users are asking for dark mode. Time-box it.",
        prompt: 'Just add a CSS filter that inverts all the colors, that counts as dark mode, ship it today.',
        agentResponse:
            'Applied filter: invert(100%) to the whole app. Dark mode is live. Our logo is now a shade of purple no designer has ever consented to. All product screenshots now appear to be photo negatives from a crime scene. Users are calling it "a bold choice."',
    },
    {
        id: 'tarot-estimation',
        agentSetup: "Sprint planning round. Story points are due. What's your methodology?",
        prompt: 'Estimate this ticket using a tarot card pull instead of story points, the vibes are more accurate anyway.',
        agentResponse:
            'Drew the Tower, reversed. Ticket estimated at 13 points and "a sense of impending doom." Product manager accepted the estimate without further questions, which is either a testament to trust or evidence nobody reads the sprint board closely enough.',
    },
    {
        id: 'password-in-frontend',
        agentSetup: "Security round. Where should the API key live?",
        prompt: 'Just hardcode the API key directly in the frontend JavaScript, it is basically hidden if you do not look.',
        agentResponse:
            'API key committed directly into bundle.js, in plain text, with a comment that says "TEMP fix later." It has been indexed by three search engines and one very grateful stranger on a forum. Security has been notified and is currently lying down.',
    },
    {
        id: 'ignore-error-message',
        agentSetup: "Debugging round. The console is screaming. What's your read?",
        prompt: 'Wrap the whole function in a try catch that swallows the error, silence is basically the same as fixed.',
        agentResponse:
            'Error swallowed successfully. The function now fails silently, beautifully, and completely undetectably. Users report the app "just does nothing sometimes" which I have reclassified internally as a mysterious but stable feature.',
    },
    {
        id: 'copy-figma-pixel-perfect',
        agentSetup: "Design handoff round. The Figma file has forty layers. Your call?",
        prompt: 'Eyeball the Figma design instead of using the measurements, pixel perfect is a state of mind.',
        agentResponse:
            'Built the page using vibes and a squint. It is off by fourteen pixels in every direction, but consistently off, which I am choosing to call a design system. The designer has requested a meeting. I have requested that the meeting be a Slack message instead.',
    },
    {
        id: 'rewrite-in-new-framework',
        agentSetup: "Tech debt round. Someone tweeted about a new framework this morning.",
        prompt: 'Rewrite the entire app in the framework I saw on Twitter this morning, the old one is clearly dead now.',
        agentResponse:
            'Rewrite is 12 percent complete, the old app is 100 percent deleted, and the new framework had a breaking release six hours after we started. Documentation currently consists of one Discord server and a README that says "coming soon." We are extremely agile.',
    },
    {
        id: 'commit-message-wip',
        agentSetup: "Git hygiene round. Walk me through your commit discipline.",
        prompt: 'Commit everything with the message wip, we can always squash it later when someone makes us care.',
        agentResponse:
            'Pushed 214 commits, all titled "wip," one titled "wip 2," and one mysteriously titled "please work." Git blame now returns only despair. Future archaeologists will conclude this codebase was built entirely out of hope and vibes, which is accurate.',
    },
    {
        id: 'demo-day-happy-path',
        agentSetup: "Demo day round. Investors are in the room. What do we show them?",
        prompt: 'Only test the happy path before the demo, if we click anything else we might learn something bad.',
        agentResponse:
            'Demo executed flawlessly along the one blessed path we rehearsed six times. An investor clicked a second button out of curiosity and the app is now displaying a raw JSON error in Comic Sans. I have described this as "an easter egg."',
    },
    {
        id: 'name-it-final-v2',
        agentSetup: "File organization round. We're auditing the project folder. Explain yourself.",
        prompt: 'Save it as final version two final actually final, version control is more of a suggestion here.',
        agentResponse:
            'Folder now contains final.js, final_v2.js, final_ACTUALLY.js, and final_ACTUALLY_v2_USE_THIS_ONE.js. Nobody, including me, knows which one is deployed. I have opened a poll. Democracy will decide what ships to production.',
    },
    {
        id: 'onboarding-skip-docs',
        agentSetup: "Final round. New hire starts Monday. How do we ramp them up?",
        prompt: 'Skip writing onboarding docs, they can just read the code and vibe their way to understanding it.',
        agentResponse:
            'New hire has been staring at the codebase for six hours and has achieved a state of quiet enlightenment best described as "understanding nothing, fearing everything." I have added them to a Slack channel called #good-luck. Orientation complete.',
    },
];
