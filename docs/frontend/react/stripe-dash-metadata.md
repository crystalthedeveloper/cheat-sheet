# Dash-Delimited Metadata Formatting for Stripe

Stripe metadata accepts only single-line string values. Use a space–dash–space (` - `) delimiter to keep multi-section information readable and easy to parse in your frontend.

## Why It Works

- Metadata entries remain JSON-safe and editable because there are no hard line breaks.
- The frontend can split the string with `.split(' - ')` to render each section separately.
- Stripe metadata fields allow up to 500 characters each, so short descriptors separated by `" - "` fit comfortably.

## Example Metadata String

```
Images (Unsplash) - All imagery in this template is sourced from Unsplash. For licensing details, visit Unsplash License Terms. - Animations - Built using free Lottie files with custom motion effects added to H1, H2, and H3 headers for a dynamic user experience. For usage rights, see the LottieFiles License page. - Webflow System Fonts - Uses Webflow’s native system fonts for consistent performance and clean rendering across all devices.
```

## React Rendering

```jsx
{product.metadata.license
  ?.split(" - ")
  .filter(Boolean)
  .map((line, i) => (
    <p key={i} className="mb-2">
      {line.trim()}
    </p>
  ))}
```

### Helper to Generate the String

Keep the input as an array to make content editing easier, then join on the delimiter in your backend or admin script:

```ts
const sections = [
  "Images (Unsplash)",
  "All imagery in this template is sourced from Unsplash. For licensing details, visit Unsplash License Terms.",
  "Animations",
  "Built using free Lottie files with custom motion effects...",
];

const metadataPayload = {
  license: sections.map((item) => item.trim()).join(" - "),
};
```

## Display Result

Images (Unsplash)  
All imagery in this template is sourced from Unsplash. For licensing details, visit Unsplash License Terms.

Animations  
Built using free Lottie files with custom motion effects added to H1, H2, and H3 headers. For usage rights, see the LottieFiles License page.

Webflow System Fonts  
Uses Webflow’s native system fonts for consistent performance and rendering across devices.

## Tips

- Keep the delimiter consistent (` <space>-<space> `). Avoid double spaces, otherwise `split` can misalign sections.
- Use uppercase section titles to make each heading obvious once rendered.
- Sanity-check metadata values in the Stripe dashboard before deploying—incorrect formatting requires refund/clone to fix.
