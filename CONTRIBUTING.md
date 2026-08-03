# Contributing

Contributions are welcome, especially scientific review, accessibility improvements, performance work and carefully scoped visual additions.

## Before opening a pull request

- Read [Development guide](docs/DEVELOPMENT.md).
- Run `node scripts/validate.mjs`.
- Preserve the local-first, dependency-free deployment model unless the change has a compelling reason.
- Update the model and source documentation when changing scientific behavior.
- Do not present relative outputs as clinical quantities.

## Scientific changes

A scientific pull request should state:

1. which behavior changes;
2. whether the change is qualitative, parameter-based or fitted;
3. species, tissue, exposure and assay context;
4. primary literature or dataset supporting it;
5. uncertainty and known exceptions;
6. expected visual and CSV-output changes.

Use the **Scientific model review** issue template for substantial proposals.

## Interface changes

Check keyboard, touch, reduced-motion and narrow-screen behavior. New charts require a text alternative. New colors require direct labels or shape differences.

## Commit scope

Keep commits focused. Avoid mixing scientific-model changes, visual redesign and refactoring unless they are inseparable.
