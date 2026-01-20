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
 * Components organized by functional categories (actions, forms, navigation, etc.)
 */
export function generateFullDocumentation(
  categories: Record<string, { description: string; components: Record<string, ComponentConfig> }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sage UI",
    "applicationCategory": "DeveloperApplication",
    "description": "A comprehensive design system built with React and TypeScript, organized by functional purpose for optimal developer experience.",
    "url": "https://studio.shalomormsby.com",
    "version": "1.0.0",
    "programmingLanguage": "TypeScript",
    "runtimePlatform": "React",
    "operatingSystem": "Any",
    "license": "MIT",

    // Functionally organized components
    "hasPart": Object.entries(categories).map(([categoryName, category]) => ({
      "@type": "SoftwareSourceCode",
      "name": categoryName,
      "description": category.description,
      "hasPart": Object.entries(category.components).map(([name, config]) =>
        generateComponentMetadata(config, name)
      ),
    })),
  };
}
