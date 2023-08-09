import { render } from '@testing-library/react';

import OrderFormUi from './order-form-ui';

describe('OrderFormUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderFormUi />);
    expect(baseElement).toBeTruthy();
  });
});
