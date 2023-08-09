import { render } from '@testing-library/react';

import CatalogUi from './catalog-ui';

describe('CatalogUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CatalogUi />);
    expect(baseElement).toBeTruthy();
  });
});
