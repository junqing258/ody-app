import { parseAppRoute } from '../../src/navigation/types';

describe('AppRoute contract', () => {
  it('accepts allow-listed native routes', () => {
    expect(parseAppRoute({ kind: 'native', name: 'settings' })).toEqual({
      kind: 'native',
      name: 'settings',
      params: undefined,
    });
  });

  it('accepts an RN feature route and rejects arbitrary routes', () => {
    expect(
      parseAppRoute({
        kind: 'react-native',
        feature: 'example',
        screen: 'Details',
      }),
    ).toEqual({
      kind: 'react-native',
      feature: 'example',
      screen: 'Details',
      params: undefined,
    });
    expect(parseAppRoute({ kind: 'native', name: 'admin' })).toBeNull();
    expect(
      parseAppRoute({ kind: 'react-native', feature: 'unknown' }),
    ).toBeNull();
  });
});
