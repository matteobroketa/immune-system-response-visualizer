# Validation and release checklist

## Automated checks

Run:

```bash
node scripts/validate.mjs
```

GitHub Actions runs the same check on pushes and pull requests.

## Functional checks

- [ ] Every scenario loads without console errors.
- [ ] Changing response duration clamps the current day immediately.
- [ ] Scenario presets reset all coupled sliders consistently.
- [ ] Timeline scrubbing remains deterministic for a fixed seed.
- [ ] Share URLs restore all controls, day, focus, tab and compartment.
- [ ] CSV export contains 151 rows plus one header row.
- [ ] Snapshot export produces a valid PNG.
- [ ] Reducing visual density does not change ledger values.
- [ ] Chronic scenarios can develop exhaustion and conditional TLS activity.
- [ ] Acute scenarios do not routinely create mature TLS structures.

## Accessibility checks

- [ ] Every input and select has an accessible name.
- [ ] Focus is visible on buttons, sliders and selects.
- [ ] Charts expose current text summaries.
- [ ] Reduced-motion mode lowers pulse, trail and motion intensity.
- [ ] Cell inspection works with mouse, tap and long press.
- [ ] Data-bearing text remains readable at 320 CSS pixels.
- [ ] Canvas meaning is also available through DOM text in the Observatory.

Recommended manual tools:

- Chrome or Edge Accessibility tree.
- NVDA on Windows.
- VoiceOver on macOS/iOS.
- Browser emulation for common color-vision deficiencies.
- Lighthouse accessibility audit.

## Scientific checks

- [ ] Soluble antigen precedes most migratory DC arrival.
- [ ] Naive T-cell movement remains faster than follicular B-cell movement.
- [ ] Productive cognate interactions remain rare relative to surveillance.
- [ ] Priming precedes expansion and effector return.
- [ ] Extrafollicular antibody output precedes mature GC-derived output.
- [ ] GC onset is delayed relative to initial exposure.
- [ ] Persistent antigen can extend GC activity.
- [ ] Chronic exhaustion reduces function more strongly than population size.
- [ ] Prior immunity accelerates early control and creates a non-zero antibody baseline.
- [ ] Age affects multiple response components rather than sprite speed alone.

## Performance checks

Measure for at least five minutes:

- median frame time;
- 95th percentile frame time;
- long tasks;
- memory growth;
- agent count;
- backing-canvas pixel count.

Target: smooth 60 FPS at the default 1,440 × 900 workload on a contemporary desktop browser. This is a target, not a universal hardware guarantee.
