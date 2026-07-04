// BookQuest content library.
// Each insight powers all four game modes:
//   - quiz: multiple choice (answer = index into options)
//   - tf: true/false statement
//   - title/def pairs drive the matching game
//   - title/summary drive flashcards
const BOOKS = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    emoji: "⚛️",
    color: "#e8590c",
    tagline: "Tiny changes, remarkable results",
    insights: [
      {
        id: "ah-1",
        title: "1% Better Every Day",
        def: "Small improvements compound into remarkable results over time",
        summary: "Habits are the compound interest of self-improvement. Getting 1% better every day makes you 37x better after a year — the effects of small habits multiply as you repeat them.",
        quiz: {
          q: "According to Atomic Habits, improving 1% every day for a year makes you roughly how much better?",
          options: ["3.65x better", "10x better", "37x better", "100x better"],
          answer: 2,
        },
        tf: {
          statement: "James Clear argues that massive success requires massive, dramatic action rather than small daily improvements.",
          answer: false,
        },
      },
      {
        id: "ah-2",
        title: "Identity-Based Habits",
        def: "Focus on who you want to become, not what you want to achieve",
        summary: "The most effective way to change habits is to focus on identity, not outcomes. Don't aim to 'run a marathon' — aim to 'become a runner'. Every action is a vote for the type of person you want to be.",
        quiz: {
          q: "What does James Clear say every action you take represents?",
          options: [
            "A step toward your goal",
            "A vote for the type of person you wish to become",
            "A test of your willpower",
            "A chance to earn a reward",
          ],
          answer: 1,
        },
        tf: {
          statement: "In Atomic Habits, lasting change starts with deciding the type of person you want to be, then proving it with small wins.",
          answer: true,
        },
      },
      {
        id: "ah-3",
        title: "The Four Laws",
        def: "Make it obvious, attractive, easy, and satisfying",
        summary: "To build a good habit: make it obvious (cue), attractive (craving), easy (response), and satisfying (reward). To break a bad habit, invert each law — make it invisible, unattractive, hard, and unsatisfying.",
        quiz: {
          q: "Which of these is NOT one of the Four Laws of Behavior Change?",
          options: ["Make it obvious", "Make it attractive", "Make it competitive", "Make it satisfying"],
          answer: 2,
        },
        tf: {
          statement: "To break a bad habit, Atomic Habits recommends inverting the Four Laws — for example, making the habit invisible and difficult.",
          answer: true,
        },
      },
      {
        id: "ah-4",
        title: "Environment Design",
        def: "Shape your surroundings so good habits are the path of least resistance",
        summary: "Motivation is overrated; environment often matters more. Make cues of good habits visible (fruit on the counter) and cues of bad habits invisible (phone in another room). You don't rise to your goals — you fall to your systems.",
        quiz: {
          q: "What does Clear say is often more important than motivation for changing behavior?",
          options: ["Your environment", "Your genetics", "Your income", "Your friends' approval"],
          answer: 0,
        },
        tf: {
          statement: "Atomic Habits claims willpower alone is the most reliable long-term strategy for behavior change.",
          answer: false,
        },
      },
      {
        id: "ah-5",
        title: "The Two-Minute Rule",
        def: "Scale any new habit down to a version that takes two minutes",
        summary: "When you start a new habit, it should take less than two minutes. 'Read before bed' becomes 'read one page'. A habit must be established before it can be improved — master the art of showing up first.",
        quiz: {
          q: "What is the point of the Two-Minute Rule?",
          options: [
            "To limit how long you work on any task",
            "To make starting a habit so easy you can't say no",
            "To take a two-minute break every hour",
            "To finish tasks in under two minutes",
          ],
          answer: 1,
        },
        tf: {
          statement: "The Two-Minute Rule says you should scale a new habit down until it takes two minutes or less to start.",
          answer: true,
        },
      },
      {
        id: "ah-6",
        title: "Habit Stacking",
        def: "Anchor a new habit to an existing one: 'After X, I will Y'",
        summary: "Pair a new habit with a current one using the formula: 'After [current habit], I will [new habit].' Existing routines become built-in cues, so the new behavior rides on momentum you already have.",
        quiz: {
          q: "Which sentence correctly uses the habit stacking formula?",
          options: [
            "\"I will meditate when I feel like it.\"",
            "\"After I pour my morning coffee, I will meditate for one minute.\"",
            "\"I will meditate for an hour every day starting Monday.\"",
            "\"If I skip meditation, I will punish myself.\"",
          ],
          answer: 1,
        },
        tf: {
          statement: "Habit stacking works by attaching a new habit to a random time of day rather than to an existing routine.",
          answer: false,
        },
      },
    ],
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    emoji: "🧠",
    color: "#1971c2",
    tagline: "Focused success in a distracted world",
    insights: [
      {
        id: "dw-1",
        title: "Deep Work Is Rare & Valuable",
        def: "Distraction-free concentration is the superpower of the knowledge economy",
        summary: "Deep work — professional activity performed in a state of distraction-free concentration — is becoming increasingly rare exactly as it becomes increasingly valuable. Those who cultivate it will thrive.",
        quiz: {
          q: "Why does Cal Newport say deep work is like a superpower in the modern economy?",
          options: [
            "Because it is becoming both increasingly rare and increasingly valuable",
            "Because employers require it in job descriptions",
            "Because it eliminates the need for collaboration",
            "Because it guarantees promotion",
          ],
          answer: 0,
        },
        tf: {
          statement: "Newport defines deep work as professional activity performed in a state of distraction-free concentration that pushes your abilities to their limit.",
          answer: true,
        },
      },
      {
        id: "dw-2",
        title: "Attention Residue",
        def: "Switching tasks leaves mental residue that degrades performance",
        summary: "When you switch from Task A to Task B, part of your attention stays stuck on A. This 'attention residue' means constant task-switching and quick email checks keep you performing below your actual ability.",
        quiz: {
          q: "What is 'attention residue'?",
          options: [
            "Mental fatigue after eight hours of work",
            "Leftover focus stuck on a previous task after switching to a new one",
            "The memory of unfinished to-do items",
            "Distraction caused by background noise",
          ],
          answer: 1,
        },
        tf: {
          statement: "According to Deep Work, quickly checking email mid-task is harmless because it only takes a few seconds.",
          answer: false,
        },
      },
      {
        id: "dw-3",
        title: "Rituals & Routines",
        def: "Schedule deep work — don't wait for inspiration",
        summary: "Great minds work like artists but organize like accountants. Build rituals: a set time, a set place, clear rules (no internet, a metric like words written). Willpower is finite; routines conserve it.",
        quiz: {
          q: "What does Newport recommend instead of waiting for inspiration to do deep work?",
          options: [
            "Working only when deadlines force you",
            "Building strict rituals and scheduled deep work blocks",
            "Drinking more coffee",
            "Working longer total hours",
          ],
          answer: 1,
        },
        tf: {
          statement: "Deep Work argues that because willpower is limited, rituals and routines help conserve it for actual focus.",
          answer: true,
        },
      },
      {
        id: "dw-4",
        title: "Embrace Boredom",
        def: "Train your focus by resisting the urge for constant stimulation",
        summary: "If you reach for your phone at every idle moment, you teach your brain to never tolerate boredom — and it won't tolerate focus either. Schedule internet use, and let yourself be bored in between.",
        quiz: {
          q: "Why does Newport say you should 'embrace boredom'?",
          options: [
            "Boring work builds character",
            "A brain trained to demand constant stimulation cannot sustain deep focus",
            "Boredom increases creativity hormones",
            "It saves phone battery",
          ],
          answer: 1,
        },
        tf: {
          statement: "Newport suggests taking breaks from focus by using your phone, rather than taking breaks from distraction by scheduling focus.",
          answer: false,
        },
      },
      {
        id: "dw-5",
        title: "The Craftsman Approach to Tools",
        def: "Adopt a tool only if its benefits substantially outweigh its costs",
        summary: "Don't use a network tool just because it offers some benefit. Identify the core factors that determine success in your life, and adopt a tool only if its positive impact on those factors substantially outweighs its negatives.",
        quiz: {
          q: "Under the craftsman approach, when should you adopt a tool like social media?",
          options: [
            "Whenever it offers any possible benefit",
            "When everyone in your industry uses it",
            "When its benefits substantially outweigh its costs for your core goals",
            "Never — all social media must be quit",
          ],
          answer: 2,
        },
        tf: {
          statement: "The 'any-benefit' mindset — using a tool because it might offer some benefit — is exactly what Newport warns against.",
          answer: true,
        },
      },
      {
        id: "dw-6",
        title: "Drain the Shallows",
        def: "Cap shallow work so it can't crowd out what matters",
        summary: "Shallow work — logistical, low-value tasks — expands to fill your day if you let it. Schedule every minute, quantify the depth of each activity, and finish by a fixed time (fixed-schedule productivity).",
        quiz: {
          q: "What is 'fixed-schedule productivity'?",
          options: [
            "Working the same hours as your boss",
            "Choosing a firm quitting time and working backward to make it possible",
            "Scheduling all meetings in the morning",
            "Fixing your calendar app when it breaks",
          ],
          answer: 1,
        },
        tf: {
          statement: "Deep Work defines shallow work as noncognitively demanding, logistical-style tasks that are easy to replicate.",
          answer: true,
        },
      },
    ],
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    emoji: "💰",
    color: "#2f9e44",
    tagline: "Timeless lessons on wealth, greed, and happiness",
    insights: [
      {
        id: "pm-1",
        title: "The Power of Compounding",
        def: "Time, not returns, is the strongest force in investing",
        summary: "Warren Buffett's secret isn't just good returns — it's that he's been investing since age 10. $81.5 billion of his $84.5 billion came after his 65th birthday. Good investing isn't about the highest returns; it's about pretty good returns sustained for the longest time.",
        quiz: {
          q: "What does Housel identify as the real key to Warren Buffett's fortune?",
          options: [
            "Picking the best stocks of all time",
            "Insider knowledge",
            "Investing continuously for an extraordinarily long time",
            "Taking enormous risks early",
          ],
          answer: 2,
        },
        tf: {
          statement: "The Psychology of Money argues that earning the highest possible annual returns matters more than how long you stay invested.",
          answer: false,
        },
      },
      {
        id: "pm-2",
        title: "Wealth Is What You Don't See",
        def: "Wealth is the money you don't spend — assets, not appearances",
        summary: "Someone driving a $100k car might have $100k less wealth than before they bought it. Wealth is financial assets not yet converted into visible stuff. Spending to show people you have money is the fastest way to have less of it.",
        quiz: {
          q: "In Housel's terms, what is 'wealth'?",
          options: [
            "A high salary",
            "Expensive possessions that display success",
            "Income minus taxes",
            "Assets you haven't spent — the money you don't see",
          ],
          answer: 3,
        },
        tf: {
          statement: "Housel writes that spending money to show people how much money you have is the fastest way to have less money.",
          answer: true,
        },
      },
      {
        id: "pm-3",
        title: "Room for Error",
        def: "Plan on your plan not going according to plan",
        summary: "The most important part of every plan is planning on the plan not going according to plan. Margin of safety — saving without a specific reason, avoiding leverage, assuming lower returns — lets you endure surprises and stay in the game.",
        quiz: {
          q: "Why does Housel recommend building 'room for error' into financial plans?",
          options: [
            "Because pessimism attracts good luck",
            "Because surviving surprises is what lets compounding continue",
            "Because banks require it",
            "Because it maximizes short-term returns",
          ],
          answer: 1,
        },
        tf: {
          statement: "According to the book, saving money without any specific goal in mind is pointless.",
          answer: false,
        },
      },
      {
        id: "pm-4",
        title: "Reasonable Beats Rational",
        def: "A plan you can stick with beats a mathematically optimal one",
        summary: "The 'optimal' strategy on a spreadsheet fails if you abandon it during a crash. Aim to be reasonable, not coldly rational — a slightly suboptimal plan you can hold through fear and doubt outperforms a perfect plan you quit.",
        quiz: {
          q: "Why does Housel prefer 'reasonable' over 'rational' financial decisions?",
          options: [
            "Reasonable plans are easier to stick with, and endurance is what compounds",
            "Rational math is usually wrong",
            "Reasonable plans earn higher returns every year",
            "Advisors charge less for them",
          ],
          answer: 0,
        },
        tf: {
          statement: "Housel argues the mathematically optimal strategy is always the one you should follow, regardless of how it feels.",
          answer: false,
        },
      },
      {
        id: "pm-5",
        title: "Knowing When Enough Is Enough",
        def: "The hardest financial skill is getting the goalpost to stop moving",
        summary: "Modern capitalism generates envy as reliably as wealth. If expectations rise with results, you're never satisfied. Rajat Gupta and Bernie Madoff had everything and risked it for more. 'Enough' isn't too little — it's realizing the opposite, an insatiable appetite, will push you to regret.",
        quiz: {
          q: "What does Housel call 'the hardest financial skill'?",
          options: [
            "Calculating compound interest",
            "Getting the goalpost to stop moving",
            "Timing the market",
            "Negotiating a raise",
          ],
          answer: 1,
        },
        tf: {
          statement: "The Psychology of Money warns that risking what you have and need for what you don't have and don't need makes no sense.",
          answer: true,
        },
      },
      {
        id: "pm-6",
        title: "Luck & Risk",
        def: "Outcomes are guided by forces beyond individual effort",
        summary: "Bill Gates was brilliant — and attended one of the only high schools on earth with a computer. His equally talented friend Kent Evans died before graduating. Luck and risk are siblings: judge less from outcomes, and focus on broad patterns instead of extreme examples.",
        quiz: {
          q: "What lesson does Housel draw from the story of Bill Gates and Kent Evans?",
          options: [
            "Hard work always determines outcomes",
            "Luck and risk both play enormous roles, so judge outcomes with humility",
            "Only attend schools with computers",
            "Success is entirely random",
          ],
          answer: 1,
        },
        tf: {
          statement: "Housel advises studying extreme outliers like billionaires closely, because their specific paths are the most repeatable.",
          answer: false,
        },
      },
    ],
  },
  {
    id: "thinking-fast-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    emoji: "🐢",
    color: "#9c36b5",
    tagline: "The two systems that drive the way you think",
    insights: [
      {
        id: "tfs-1",
        title: "System 1 & System 2",
        def: "Fast automatic intuition vs. slow deliberate reasoning",
        summary: "System 1 is fast, automatic, and effortless — it reads emotions and drives intuition. System 2 is slow, deliberate, and lazy — it handles logic and math but tires easily. Most errors come from System 1 answering questions meant for System 2.",
        quiz: {
          q: "Which task would primarily require System 2 thinking?",
          options: [
            "Detecting anger in someone's voice",
            "Reading a word on a billboard",
            "Computing 17 × 24 in your head",
            "Driving on an empty familiar road",
          ],
          answer: 2,
        },
        tf: {
          statement: "In Kahneman's model, System 1 is slow and effortful while System 2 is fast and automatic.",
          answer: false,
        },
      },
      {
        id: "tfs-2",
        title: "Anchoring",
        def: "The first number you see biases your estimate, even if it's irrelevant",
        summary: "Exposure to a number — any number — pulls your subsequent estimates toward it. Even a spin of a rigged roulette wheel shifted people's guesses about African nations in the UN. Anchors work in negotiations, pricing, and everyday judgment.",
        quiz: {
          q: "What is the anchoring effect?",
          options: [
            "Sticking to your first belief despite new evidence",
            "Estimates being pulled toward an initial number, even an irrelevant one",
            "Preferring familiar brands",
            "Remembering the first item in a list best",
          ],
          answer: 1,
        },
        tf: {
          statement: "Anchoring only works when the initial number is relevant to the question being asked.",
          answer: false,
        },
      },
      {
        id: "tfs-3",
        title: "The Availability Heuristic",
        def: "We judge likelihood by how easily examples come to mind",
        summary: "Dramatic, recent, or vivid events feel more common than they are — plane crashes, shark attacks, lottery wins. If examples come to mind easily, System 1 concludes the event is frequent. Media coverage warps our sense of risk.",
        quiz: {
          q: "The availability heuristic explains why people often...",
          options: [
            "Overestimate dramatic risks like plane crashes and underestimate mundane ones",
            "Prefer available products over sold-out ones",
            "Choose the first option on a menu",
            "Trust experts over strangers",
          ],
          answer: 0,
        },
        tf: {
          statement: "According to the availability heuristic, the easier it is to recall examples of an event, the more probable we judge it to be.",
          answer: true,
        },
      },
      {
        id: "tfs-4",
        title: "Loss Aversion",
        def: "Losses hurt roughly twice as much as equivalent gains feel good",
        summary: "Losing $100 feels about twice as bad as winning $100 feels good. This asymmetry — loss aversion — explains why we hold losing stocks, fear change, and reject fair gambles. 'Losses loom larger than gains.'",
        quiz: {
          q: "Roughly how much stronger is the pain of a loss compared to the pleasure of an equal gain?",
          options: ["About equal", "About 1.5x", "About 2x", "About 10x"],
          answer: 2,
        },
        tf: {
          statement: "Kahneman's research shows people feel gains and losses of equal size with equal intensity.",
          answer: false,
        },
      },
      {
        id: "tfs-5",
        title: "WYSIATI",
        def: "What You See Is All There Is — we build stories from limited evidence",
        summary: "System 1 constructs the most coherent story possible from available information and ignores what it doesn't know. This breeds overconfidence: we judge by the story's coherence, not the quality or completeness of the evidence.",
        quiz: {
          q: "What does WYSIATI stand for?",
          options: [
            "Why You Should Invest All The Income",
            "What You See Is All There Is",
            "When You Sleep, Ideas Arrive Through Intuition",
            "What You Say Is All That Matters",
          ],
          answer: 1,
        },
        tf: {
          statement: "WYSIATI means System 1 carefully weighs missing evidence before forming conclusions.",
          answer: false,
        },
      },
      {
        id: "tfs-6",
        title: "The Peak-End Rule",
        def: "We remember experiences by their most intense moment and their ending",
        summary: "Memory of an experience is dominated by its peak (best or worst moment) and its end — not its duration. Patients rated a longer procedure as less painful when it ended gently. The 'remembering self' overrules the 'experiencing self'.",
        quiz: {
          q: "According to the peak-end rule, how do we evaluate past experiences?",
          options: [
            "By their total duration",
            "By the average of every moment",
            "By the most intense moment and the final moment",
            "By how they began",
          ],
          answer: 2,
        },
        tf: {
          statement: "The peak-end rule implies that lengthening an experience with a gentler ending can make it remembered as less unpleasant.",
          answer: true,
        },
      },
    ],
  },
  {
    id: "win-friends",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    emoji: "🤝",
    color: "#e03131",
    tagline: "The classic guide to human relations",
    insights: [
      {
        id: "wf-1",
        title: "Don't Criticize or Condemn",
        def: "Criticism breeds defensiveness and resentment, not change",
        summary: "Criticism puts people on the defensive, wounds their pride, and arouses resentment — it rarely changes behavior. Even notorious criminals justified themselves. 'Any fool can criticize; it takes character to understand and forgive.'",
        quiz: {
          q: "Why does Carnegie advise against criticism?",
          options: [
            "It's rude in most cultures",
            "It makes people defensive and resentful instead of changing them",
            "It takes too much time",
            "It only works on children",
          ],
          answer: 1,
        },
        tf: {
          statement: "Carnegie observed that even notorious criminals tended to blame others rather than condemn themselves.",
          answer: true,
        },
      },
      {
        id: "wf-2",
        title: "Become Genuinely Interested",
        def: "You win friends by being interested, not interesting",
        summary: "You can make more friends in two months by becoming interested in other people than in two years trying to get people interested in you. A dog is loved because it loves first. Genuine interest — not flattery — opens doors.",
        quiz: {
          q: "Carnegie says you can make more friends in two months by...",
          options: [
            "Perfecting your elevator pitch",
            "Becoming genuinely interested in other people",
            "Hosting impressive parties",
            "Complimenting everyone constantly",
          ],
          answer: 1,
        },
        tf: {
          statement: "Carnegie teaches that the fastest way to win friends is to make yourself as interesting as possible to others.",
          answer: false,
        },
      },
      {
        id: "wf-3",
        title: "Remember Names",
        def: "A person's name is the sweetest sound in any language",
        summary: "A person's name is, to that person, the sweetest and most important sound in any language. Remembering and using names makes people feel valued; forgetting them signals they don't matter to you.",
        quiz: {
          q: "According to Carnegie, what is 'the sweetest and most important sound' to any person?",
          options: ["A compliment", "Laughter", "Their own name", "The word 'yes'"],
          answer: 2,
        },
        tf: {
          statement: "Carnegie considered remembering names a trivial social nicety with little real influence.",
          answer: false,
        },
      },
      {
        id: "wf-4",
        title: "Be a Good Listener",
        def: "Encourage others to talk about themselves",
        summary: "To be interesting, be interested. Ask questions people enjoy answering and encourage them to talk about themselves and their accomplishments. People rate great listeners as great conversationalists — even when they barely spoke.",
        quiz: {
          q: "What does Carnegie say makes someone seen as a brilliant conversationalist?",
          options: [
            "Telling captivating stories",
            "Knowing facts about many topics",
            "Listening intently and encouraging others to talk about themselves",
            "Speaking with confidence and volume",
          ],
          answer: 2,
        },
        tf: {
          statement: "Carnegie recounts that people who mostly listened were often described afterward as excellent conversationalists.",
          answer: true,
        },
      },
      {
        id: "wf-5",
        title: "Admit Mistakes Quickly",
        def: "If you're wrong, admit it quickly and emphatically",
        summary: "When you're wrong, admit it quickly and with enthusiasm. Self-criticism disarms others — they often end up defending you. Fighting never gets enough; yielding gets more than you expected.",
        quiz: {
          q: "What happens when you criticize yourself before others can, according to Carnegie?",
          options: [
            "People lose respect for you",
            "People often soften and even defend you",
            "People pile on more criticism",
            "People ignore the mistake entirely",
          ],
          answer: 1,
        },
        tf: {
          statement: "Carnegie advises defending your mistakes firmly so others don't see weakness.",
          answer: false,
        },
      },
      {
        id: "wf-6",
        title: "Let Them Save Face",
        def: "Never make someone feel small, especially in front of others",
        summary: "Even when you're right, humiliating someone destroys their dignity and your influence. Letting a person save face — correcting privately, acknowledging effort — preserves the relationship and their motivation.",
        quiz: {
          q: "What does 'letting a person save face' mean in practice?",
          options: [
            "Avoiding all corrections forever",
            "Correcting privately and preserving the person's dignity",
            "Pretending mistakes never happened",
            "Letting people win arguments they lost",
          ],
          answer: 1,
        },
        tf: {
          statement: "Carnegie argues that public criticism is effective because embarrassment motivates people to improve.",
          answer: false,
        },
      },
    ],
  },
];
