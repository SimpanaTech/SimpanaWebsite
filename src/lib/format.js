const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Deterministic date formatting - avoids locale/timezone drift between the
 * server render and the client.
 */
export function formatDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/** Words too weak to open the emphasised half of a heading on. */
const FUNCTION_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
  "nor", "of", "on", "or", "the", "to", "with", "&",
]);

/**
 * Splits a heading into two halves for the hero treatment, where the second
 * half switches to the serif italic in warm gold.
 *
 * The static pages hand-pick their split, because there the break should land
 * on the hinge of a sentence. Detail pages carry a name or a post title that
 * only exists in the data, so those are cut at the word boundary nearest the
 * middle by character count - which on a two-word product name is exactly
 * halfway ("Warehouse" / "Management").
 *
 * A single word cannot be halved, so it comes back with no accent and runs in
 * one face.
 */
export function splitHeading(text) {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length < 2) return { title: text, accent: null };

  const middle = words.join(" ").length / 2;
  let at = 1;
  let closest = Infinity;

  for (let i = 1; i < words.length; i++) {
    let distance = Math.abs(words.slice(0, i).join(" ").length - middle);
    // The accent half is the emphasised one, so opening it on a function
    // word reads as a mis-break ("Point / of Sale"). Nudge those boundaries
    // down rather than banning them - a much better fit elsewhere still wins.
    if (FUNCTION_WORDS.has(words[i].toLowerCase())) distance += 3;
    if (distance < closest) {
      closest = distance;
      at = i;
    }
  }

  return {
    title: words.slice(0, at).join(" "),
    accent: words.slice(at).join(" "),
  };
}
