var sass = require('sass');

function render(data) {
  return new Promise(function(resolve, reject) {
    sass.render({ data, includePaths: ['./'] }, function(err, data) {
      if (err !== null) reject(err);
      else resolve(data.css.toString());
    });
  });
}

async function run(input, output, config = `@use "." as rem;`) {
  const a = await render(config.concat(input));
  const b = await render(output);
  expect(a).toEqual(b);
};

it('Unitless', () => run(
  '.simple { font-size: rem.convert(24); }',
  '.simple { font-size: 1.5rem; }'
));

it('Simple', () => run(
  '.simple { font-size: rem.convert(24px); }',
  '.simple { font-size: 1.5rem; }'
));

it('Multiple values', () => run(
  '.multiple { padding: rem.convert(5px 10px 0 24); }',
  '.multiple { padding: 0.3125rem 0.625rem 0 1.5rem; }'
));

it('Multiple mixed values', () => run(
  '.mixed { border-bottom: rem.convert(1px solid black); }',
  '.mixed { border-bottom: 0.0625rem solid black; }'
));

it('Comma-separated values', () => run(
  '.comma { box-shadow: rem.convert(0 0 2px #ccc, inset 0 0 5px #eee); }',
  '.comma { box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee; }'
));

it('Alternate use', () => run(
  '.alternate { text-shadow: rem.convert(1px 1px) #eee, rem.convert(-1px) 0 #eee; }',
  '.alternate { text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem 0 #eee; }',
));

it('Multiple properties', () => run(
  '.multiple-properties { @include rem.convert((font-size: 24px, margin: 10px 1.5rem)); }',
  '.multiple-properties { font-size: 1.5rem; margin: 0.625rem 1.5rem; }',
));

it('Pixel fallback', () => run(
  '.fallback { @include rem.convert(font-size, 24px); @include rem.convert(margin, 10px 1.5rem); }',
  '.fallback { font-size: 24px; font-size: 1.5rem; margin: 10px 24px; margin: 0.625rem 1.5rem; }',
  '@use "." as rem with ($fallback: true);',
));

it('Pixel only', () => run(
  '.px-only { @include rem.convert(font-size, 24px); @include rem.convert(margin, 10px 1.5rem); }',
  '.px-only { font-size: 24px; margin: 10px 24px; }',
  '@use "." as rem with ($px-only: true);',
));

it('Changing baseline', () => run(
  'html { @include rem.baseline; } .baseline { font-size: rem.convert(24px); }',
  'html { font-size: 62.5%; } .baseline { font-size: 2.4rem; }',
  '@use "." as rem with ($baseline: 10px);',
));

it('Changing baseline + pixel fallback', () => run(
  'html { @include rem.baseline; } .baseline-fallback { @include rem.convert(font-size, 24px); }',
  'html { font-size: 62.5%; } .baseline-fallback { font-size: 24px; font-size: 2.4rem; }',
  '@use "." as rem with ($baseline: 10px, $fallback: true);',
));

it('Changing namespace', () => run(
  '.changing-namespace { font-size: to.rem(24px); }',
  '.changing-namespace { font-size: 1.5rem; }',
  '@use "." as to;',
));

it('Global namespace', () => run(
  '.global-namespace { font-size: rem(24px); }',
  '.global-namespace { font-size: 1.5rem; }',
  '@use "." as *;',
));

it('Legacy import', () => run(
  'html { @include rem-baseline; } .legacy-import { @include rem(font-size, 24px); margin: rem(10px 1.5rem); }',
  'html { font-size: 62.5%; } .legacy-import { font-size: 24px; font-size: 2.4rem; margin: 1rem 1.5rem; }',
  '@import "."; $rem-baseline: 10px; $rem-fallback: true;',
));
