import { readdir } from 'node:fs/promises';

const entries = await readdir(new URL('..', import.meta.url));
if (entries.includes('android')) {
  console.error(
    'The iOS-first repository must not contain an android/ project.',
  );
  process.exit(1);
}

console.log('No Android project found (intentional for Phase 1).');
