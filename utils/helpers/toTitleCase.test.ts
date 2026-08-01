/**
 * Unit test — exercises one pure function in isolation (no DB, no HTTP, no React).
 * Prefer these for fast feedback while learning; escalate to integration/e2e when
 * behavior depends on framework wiring or the real browser.
 */
import toTitleCase from './toTitleCase';

describe('toTitleCase', () => {
  it('capitalizes each word', () => {
    expect(toTitleCase('fresh bananas')).toBe('Fresh Bananas');
  });

  it('lowercases the rest of each word', () => {
    expect(toTitleCase('FRESH BANANAS')).toBe('Fresh Bananas');
  });

  it('handles a single word', () => {
    expect(toTitleCase('lettuce')).toBe('Lettuce');
  });
});
