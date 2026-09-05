export interface DimensionScore {
  name: string;
  score: number;
  label: string; // e.g., "(High)", "(Balanced)"
  leftLabel: string;
  rightLabel: string;
  colorClass: string; // Tailwind class like "bg-primary" or "bg-secondary"
}

export interface PersonalityProfile {
  id: string;
  archetypeId: string;
  primaryArchetype: string;
  subtitle: string;
  description: string;
  traits: string[];
  dimensions: DimensionScore[];
}

export function calculatePersonality(answers: Record<string, string>): PersonalityProfile {
  // In a real application, this would use a deterministic scoring algorithm
  // mapping the 12 answers across 5 vectors.
  // For the MVP prototype, we return a hardcoded high-quality response: The Strategic Explorer.

  return {
    id: "SE-4902",
    archetypeId: "Type 04",
    primaryArchetype: "THE STRATEGIC EXPLORER",
    subtitle: "Curious, analytical, and driven by the instinct to understand underlying mechanisms — while intentionally preserving flexibility for experimentation and novel breakthroughs.",
    description: "You approach situations through systematic evaluation rather than hasty emotional impulse. You possess an organic hunger to master complex systems, yet resist rigid bureaucracy that limits autonomy. When confronted with ambiguous choices, you tend to build mental scenarios before committing, making your moves calculated and resilient.",
    traits: [
      "Analytical Mindset",
      "High Latent Curiosity",
      "Independent Agency",
      "Calculated Adaptability"
    ],
    dimensions: [
      {
        name: "Curiosity & Inquisitiveness",
        score: 88,
        label: "(High)",
        leftLabel: "Pragmatic Focus",
        rightLabel: "Explorative Synthesis",
        colorClass: "bg-primary"
      },
      {
        name: "Sociability Battery",
        score: 62,
        label: "(Balanced)",
        leftLabel: "Internal Processing",
        rightLabel: "External Dialogue",
        colorClass: "bg-[#1A1918]" // on-surface
      },
      {
        name: "Situational Adaptability",
        score: 84,
        label: "(High)",
        leftLabel: "Static Routine",
        rightLabel: "Dynamic Agility",
        colorClass: "bg-primary"
      },
      {
        name: "Operational Structure",
        score: 71,
        label: "(Moderate-High)",
        leftLabel: "Freeform Emergence",
        rightLabel: "Methodical Rigor",
        colorClass: "bg-[#D9D1C7]" // secondary/surface-variant mapping
      },
      {
        name: "Risk Appetite",
        score: 58,
        label: "(Measured)",
        leftLabel: "Conservative Hedging",
        rightLabel: "Calculated Boldness",
        colorClass: "bg-[#D9D1C7]"
      }
    ]
  };
}
