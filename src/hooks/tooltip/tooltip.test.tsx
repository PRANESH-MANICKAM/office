
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppTooltip from './tooltip';

describe('AppTooltip', () => {
  it('should render the tooltip on click', () => {
    const tooltipData = 'This is a tooltip';
    render(
      <AppTooltip
        placement="bottom"
        data={tooltipData}
        name="Click me"
      />
    );

    const triggerElement = screen.getByText('Click me');
    fireEvent.click(triggerElement);

    const tooltipElement = screen.getByText(tooltipData);
    expect(tooltipElement).toBeInTheDocument();
  });
});
