/**
 * Renderuje dane strukturalne schema.org jako <script type="application/ld+json">.
 * Server component — bezpieczne dla SEO (obecne w HTML przy pierwszym renderze).
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
