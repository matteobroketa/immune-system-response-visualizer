# Development guide

## Design constraints

Preserve these project properties:

1. The application remains usable as a single static page.
2. No biological data leaves the browser.
3. The biological ledger remains independent of rendered sprite count.
4. Scenario output is deterministic for the same configuration, day and seed.
5. New scientific claims are documented in `SCIENTIFIC_BASIS.md`.
6. Relative outputs are never relabelled as clinical measurements.
7. Keyboard, touch, reduced-motion and chart-summary accessibility are retained.

## Local server

```bash
python scripts/serve.py
```

The server binds to `127.0.0.1:8000` by default. Optional arguments:

```bash
python scripts/serve.py --port 8080 --bind 0.0.0.0
```

## Static validation

```bash
node scripts/validate.mjs
```

The validator checks:

- required repository files;
- JavaScript parse validity;
- local-path leakage;
- external runtime dependencies;
- required metadata and accessibility markers;
- manifest validity;
- internal documentation links.

## Adding a cell type

Update all relevant layers:

1. `colors` and `labels`.
2. `legendGlyph()` and `renderAgent()`.
3. `typeSize()` and movement rules.
4. `ledgerAt()` weighted population and compartment allocation.
5. composition categories, if applicable.
6. CSV schema and documentation.
7. scientific source map.

Do not add only a glyph. A represented cell should have an explicit biological role, compartment allocation and time-dependent abundance.

## Adding a scenario

Add the scenario to:

1. the `<select>` options;
2. `scenarioParams()`;
3. `SCENARIO_PRESETS`;
4. `response()` special behavior, only where biologically necessary;
5. the README and scientific basis;
6. URL-state validation.

A scenario should alter several coupled processes rather than merely recolor the same response.

## Changing equations

When changing `response()` or `ledgerAt()`:

- update `MODEL_REFERENCE.md`;
- increment the version in `index.html`, `CITATION.cff` and `CHANGELOG.md`;
- export and compare CSVs for all five scenarios;
- check that outputs remain finite across slider extremes;
- verify that visual density does not change ledger values;
- document whether the change is literature-derived, fitted or artistic.

## Performance targets

Recommended desktop baseline:

- 1,440 × 900 viewport;
- device-pixel ratio 1–2;
- default visual density;
- fields and trails enabled;
- stable 60 FPS on a modern Chromium browser.

Quality must degrade in the visual layer before biological outputs are changed.

## Release process

1. Run `node scripts/validate.mjs`.
2. Test every scenario at early, peak and late time points.
3. Test 320×480, 900×700, 1440×900 and 3840×2160 viewports.
4. Test keyboard navigation, touch inspection and reduced motion.
5. Verify snapshot, share URL and CSV export.
6. Update `CHANGELOG.md` and `CITATION.cff`.
7. Push to `main`; GitHub Pages deploys automatically.
