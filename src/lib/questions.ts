export type QuestionType = "text" | "date" | "choice";

export interface Option {
  id: string;
  title: string;
  desc?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: string;
  title: string;
  subtitle?: string;
  options?: Option[];
}

export const questions: Question[] = [
  {
    id: "q1",
    type: "text",
    category: "Identity",
    title: "What is your full name?",
    subtitle: "Your name carries specific numerological and linguistic resonance.",
  },
  {
    id: "q2",
    type: "date",
    category: "Astrology",
    title: "When were you born?",
    subtitle: "Used to cross-reference core planetary alignments and astrological archetypes.",
  },
  {
    id: "q3",
    type: "choice",
    category: "Conflict Response",
    title: "When a high-stakes disagreement occurs, what is your immediate instinct?",
    subtitle: "Select the option that reflects your natural reflex, not what you think is 'correct'.",
    options: [
      { id: "A", title: "Dominate", desc: "Push back immediately with logic and force to establish control." },
      { id: "B", title: "Analyze", desc: "Step back, detach emotionally, and calculate the variables." },
      { id: "C", title: "Mediate", desc: "Find the emotional middle ground and de-escalate tension." },
      { id: "D", title: "Withdraw", desc: "Avoid the confrontation entirely to preserve inner peace." }
    ]
  },
  {
    id: "q4",
    type: "choice",
    category: "Social Energy",
    title: "You have a completely free afternoon. What sounds most appealing?",
    subtitle: "This determines your cognitive recharge vector.",
    options: [
      { id: "A", title: "Exploring something new", desc: "Venturing into an unfamiliar domain, conceptual rabbit-holes." },
      { id: "B", title: "Socializing", desc: "Hosting an unhurried conversation with close connections." },
      { id: "C", title: "Building", desc: "Focused hours on personal craftsmanship or side endeavors." },
      { id: "D", title: "Resting", desc: "Unstructured quietude, meditation, or resting without expectations." }
    ]
  },
  {
    id: "q5",
    type: "choice",
    category: "Ambiguity",
    title: "How do you navigate extreme uncertainty or lack of direction?",
    options: [
      { id: "A", title: "Create Structure", desc: "I immediately build frameworks and rules to organize the chaos." },
      { id: "B", title: "Experiment", desc: "I test small actions to see what works and adapt dynamically." },
      { id: "C", title: "Seek Counsel", desc: "I look for trusted advisors or historical precedents." },
      { id: "D", title: "Wait it out", desc: "I observe the situation until a clear path naturally emerges." }
    ]
  },
  {
    id: "q6",
    type: "choice",
    category: "Core Motivation",
    title: "What is your primary driver in your career or life's work?",
    options: [
      { id: "A", title: "Autonomy", desc: "The absolute freedom to direct my own time and decisions." },
      { id: "B", title: "Mastery", desc: "Becoming exceptionally skilled and competent at my craft." },
      { id: "C", title: "Impact", desc: "Leaving a lasting, positive mark on people or society." },
      { id: "D", title: "Security", desc: "Building a highly stable, predictable, and safe foundation." }
    ]
  },
  {
    id: "q7",
    type: "choice",
    category: "Risk Appetite",
    title: "When faced with an opportunity that has high upside but high risk of failure:",
    options: [
      { id: "A", title: "Leap immediately", desc: "I trust my ability to figure it out on the way down." },
      { id: "B", title: "Calculate the odds", desc: "I analyze the exact probability of ruin before acting." },
      { id: "C", title: "Hedge my bets", desc: "I take the risk, but keep a very safe backup plan." },
      { id: "D", title: "Pass", desc: "I prefer compounding safe, guaranteed returns." }
    ]
  },
  {
    id: "q8",
    type: "choice",
    category: "Failure Processing",
    title: "When you experience a significant setback or failure, you usually:",
    options: [
      { id: "A", title: "Get angry", desc: "I use the frustration as fuel to try harder immediately." },
      { id: "B", title: "Deconstruct it", desc: "I coldly analyze what broke and update my models." },
      { id: "C", title: "Feel it deeply", desc: "I need time to emotionally process and grieve the loss." },
      { id: "D", title: "Reframe it", desc: "I instantly look for the silver lining or the 'lesson'." }
    ]
  },
  {
    id: "q9",
    type: "choice",
    category: "Decision Making",
    title: "When making a life-altering choice, what holds the most weight?",
    options: [
      { id: "A", title: "Data & Logic", desc: "What the spreadsheet and historical data says is optimal." },
      { id: "B", title: "Gut Feeling", desc: "My visceral, intuitive sense of what is right." },
      { id: "C", title: "Future Vision", desc: "How it aligns with my 10-year master plan." },
      { id: "D", title: "People Impact", desc: "How it will affect my family and close relationships." }
    ]
  },
  {
    id: "q10",
    type: "choice",
    category: "Structure Preference",
    title: "How do you prefer your daily environment?",
    options: [
      { id: "A", title: "Rigid & Ordered", desc: "Everything has a place, schedules are strictly followed." },
      { id: "B", title: "Flexible Frameworks", desc: "Loose goals with the freedom to pivot daily." },
      { id: "C", title: "Total Chaos", desc: "I thrive in rapidly shifting, unpredictable environments." },
      { id: "D", title: "Harmonious", desc: "I care less about the schedule and more about the 'vibe'." }
    ]
  },
  {
    id: "q11",
    type: "choice",
    category: "Relationship Dynamics",
    title: "In a close partnership (business or romantic), what is non-negotiable?",
    options: [
      { id: "A", title: "Intellectual Sparring", desc: "We must be able to debate and challenge each other." },
      { id: "B", title: "Absolute Loyalty", desc: "A deep, unwavering commitment to the team." },
      { id: "C", title: "Emotional Depth", desc: "The ability to be completely vulnerable and understood." },
      { id: "D", title: "Shared Ambition", desc: "We must be building an empire together." }
    ]
  },
  {
    id: "q12",
    type: "choice",
    category: "The End Goal",
    title: "If you achieved everything you wanted, what would you do next?",
    options: [
      { id: "A", title: "Teach", desc: "Pass down the knowledge and frameworks to the next generation." },
      { id: "B", title: "Build again", desc: "Start a completely new game from scratch." },
      { id: "C", title: "Disappear", desc: "Live quietly, far away from the noise of the world." },
      { id: "D", title: "Enjoy", desc: "Finally relax and indulge in the fruits of my labor." }
    ]
  }
];
