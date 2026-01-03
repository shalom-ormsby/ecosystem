import type { ComponentConfig } from '../components/lib/component-registry';

/**
 * Generates JSON-LD structured data for a component
 * This helps LLMs and search engines understand component APIs better
 */
export function generateComponentMetadata(config: ComponentConfig, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": name,
    "description": config.description,
    "programmingLanguage": "TypeScript",
    "codeRepository": config.sourceUrl,
    "runtimePlatform": "React",
    "keywords": ["component", "react", "design-system", "ui", name.toLowerCase()],

    // Component properties (props)
    "properties": Object.entries(config.props).map(([key, prop]) => ({
      "@type": "PropertyValueSpecification",
      "name": key,
      "description": prop.description || `${key} prop`,
      "valueRequired": prop.required || false,
      "defaultValue": typeof prop.default === 'string' ? prop.default : JSON.stringify(prop.default),
      "valueType": prop.typeDefinition || prop.type,
    })),

    // Code examples
    "codeExample": config.codeExamples?.map(example => ({
      "@type": "SoftwareSourceCode",
      "name": example.title,
      "description": example.description,
      "programmingLanguage": "TypeScript",
      "text": example.code,
    })),

    // Usage examples from playground
    "usageExample": config.examples?.map(example => ({
      "@type": "HowTo",
      "name": example.label,
      "description": `${name} with props: ${JSON.stringify(example.props)}`,
    })),

    // Accessibility considerations
    "accessibilityNotes": config.accessibilityNotes,
  };
}

/**
 * Generates a complete API documentation object for all components
 */
export function generateFullDocumentation(
  atoms: Record<string, ComponentConfig>,
  molecules: Record<string, ComponentConfig>,
  organisms?: Array<{ name: string; description: string; sourceUrl?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sage Design System",
    "applicationCategory": "DeveloperApplication",
    "description": "A comprehensive design system built with React and TypeScript, following atomic design principles.",
    "url": "https://studio.shalomormsby.com",
    "version": "1.0.0",
    "programmingLanguage": "TypeScript",
    "runtimePlatform": "React",
    "operatingSystem": "Any",
    "license": "MIT",

    // Atoms (smallest components)
    "hasPart": [
      {
        "@type": "SoftwareSourceCode",
        "name": "Atoms",
        "description": "Elemental components that cannot be broken down further without losing their core identity or function.",
        "hasPart": Object.entries(atoms).map(([name, config]) =>
          generateComponentMetadata(config, name)
        ),
      },
      {
        "@type": "SoftwareSourceCode",
        "name": "Molecules",
        "description": "Component compositions of atoms that form cohesive, functional units.",
        "hasPart": Object.entries(molecules).map(([name, config]) =>
          generateComponentMetadata(config, name)
        ),
      },
      ...(organisms ? [{
        "@type": "SoftwareSourceCode",
        "name": "Organisms",
        "description": "Complex compositions of molecules and/or atoms that form discrete, functional sections of an interface.",
        "hasPart": organisms.map(organism => ({
          "@type": "SoftwareSourceCode",
          "name": organism.name,
          "description": organism.description,
          "codeRepository": organism.sourceUrl,
          "programmingLanguage": "TypeScript",
        })),
      }] : []),
    ],
  };
}
