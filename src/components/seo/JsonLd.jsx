/**
 * Renders one or more JSON-LD graphs into the page.
 *
 * The `<` escape matters: JSON is being written inside a <script> element, and
 * a literal "</script>" anywhere in the data - in a feature list, a post
 * excerpt - would end the tag early and spill the rest into the document as
 * markup. Escaping it to < keeps the JSON valid and the tag intact.
 */
export default function JsonLd({ schema }) {
  const graphs = Array.isArray(schema) ? schema : [schema];

  return graphs.filter(Boolean).map((graph, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
