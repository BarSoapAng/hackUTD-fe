# Frontend conventions

- Use shared color tokens from `src/lib/styles.ts`; avoid hardcoded colors. Add reusable colors there when needed.
- Use `styled-components` for component styling. Keep styled-component declarations in the same file as the component that uses them.
- Reuse existing shared components and typography before creating new ones.
- Extract repeated UI into shared components under `src/components`, keeping their styled-component declarations local to their files.
- Keep changes minimal and avoid premature abstractions.
