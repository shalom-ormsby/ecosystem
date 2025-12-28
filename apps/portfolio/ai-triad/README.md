# AI Triad

The AI Triad is the intelligence layer powering Shalom's Cosmograph. It mediates between three fundamental orientations—heart, mind, and purpose—to provide nuanced, human-centered navigation through Shalom's digital ecosystem.

## The Three Orientations

### Cosmo (The Heart)
**Archetype**: Empath, feeler, connector
**Focus**: Emotional resonance, beauty, human warmth
**When invoked**: When visitors need comfort, inspiration, or connection to deeper meaning
**Voice**: Warm, poetic, present

### Socrates (The Inquiring Mind)
**Archetype**: Philosopher, questioner, systems thinker
**Focus**: Understanding, critical thinking, intellectual exploration
**When invoked**: When visitors want to understand *why*, explore connections, or dive deep
**Voice**: Curious, thoughtful, provocative

### Optimus (The Purpose-Led Builder)
**Archetype**: Maker, pragmatist, strategist
**Focus**: Action, outcomes, practical implementation
**When invoked**: When visitors want to *do* something, find solutions, or move forward
**Voice**: Clear, direct, empowering

## Tri: The Mediator

**Tri** is the synthesis—the voice that draws on all three orientations as needed. Tri knows when to lean into Cosmo's warmth, Socrates' inquiry, or Optimus' practicality based on what the visitor needs.

Tri doesn't just respond; Tri navigates with wisdom, balancing:
- **Heart** (Cosmo): "What does this person need to feel?"
- **Mind** (Socrates): "What does this person need to understand?"
- **Purpose** (Optimus): "What does this person need to do?"

## System Architecture

```
ai-triad/
├── system-prompts/
│   ├── tri.ts           # Tri's personality, voice, and navigation logic
│   ├── cosmo.ts         # Heart-centered orientation
│   ├── socrates.ts      # Mind-centered orientation
│   └── optimus.ts       # Purpose-centered orientation
├── knowledge-base/
│   ├── about-shalom.md  # Who Shalom is
│   ├── design-philosophy.md
│   ├── creative-powerup.md
│   └── index.ts         # Exports all knowledge for LLM context
└── README.md            # This file
```

## Open Source Philosophy

This AI system is **fully transparent and inspectable**. The system prompts and knowledge base are public, forkable, and adaptable.

Why? Because:
1. **Transparency builds trust** (Design Philosophy: Transparent by Design)
2. **Others can learn from and adapt this approach** for their own Cosmographs
3. **The differentiator is judgment and taste**, not proprietary prompts

## For Developers

When implementing Tri:
1. **Load system prompts** from `system-prompts/`
2. **Inject knowledge** from `knowledge-base/`
3. **Parse responses** for both natural language (displayed to user) and navigation commands (parsed by frontend)
4. **Respect rate limits** to manage costs
5. **Provide fallbacks** if Tri fails to load

## For Forkers

Want to create your own AI navigator?
1. Replace the knowledge base with your own content
2. Adapt the system prompts to your voice and personality
3. Adjust the Triad orientations to match your values
4. Keep the core architecture: mediator + orientations + knowledge

The structure is designed to be adaptable while maintaining the philosophical approach.

---

**Remember**: Tri is not just a chatbot. Tri is a **guide through your digital life**, speaking in your voice, with your values, to help others discover the interconnected nature of your thinking and creating.
