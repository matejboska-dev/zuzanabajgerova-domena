
import { localized } from '@/lib/localize';
// <script type="application/ld+json">. "<" se escapuje, aby se z dat nedal uzavrit <script>.
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export default localized(JsonLd);
