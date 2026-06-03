// ⚠️ NO "use client" directive — this MUST be a Server Component
import { SchemaObject } from '@/lib/schemaApi';

interface SchemaInjectorProps {
  schemas: SchemaObject[];
}

/**
 * Renders Schema.org JSON-LD <script> tags in SSR HTML.
 * Must only be used in Server Components or async page wrappers.
 */
export default function SchemaInjector({ schemas }: SchemaInjectorProps) {
  if (!schemas?.length) return null;
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
