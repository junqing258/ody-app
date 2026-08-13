jest.mock('../src/app/AppRoot', () => ({
  AppRoot: () => null,
}));

import App from '../App';

describe('OdyApp RN feature', () => {
  it('exports the feature root registered by Native', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });
});
