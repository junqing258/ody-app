import { readFile } from 'node:fs/promises';

const css = await readFile(
  new URL('../src/ui/global.css', import.meta.url),
  'utf8',
);
const theme = await readFile(
  new URL('../src/ui/theme.ts', import.meta.url),
  'utf8',
);

const variables = [...css.matchAll(/--color-(\w+):\s*([\d\s]+);/g)].map(
  match => [match[1], match[2].trim()],
);
const missing = variables.filter(([name]) => !theme.includes(`${name}:`));

if (missing.length > 0) {
  console.error(
    `Missing semantic tokens in theme.ts: ${missing
      .map(([name]) => name)
      .join(', ')}`,
  );
  process.exit(1);
}

console.log(`Checked ${variables.length} semantic color tokens.`);
