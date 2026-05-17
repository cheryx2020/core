import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import DashboardItem from '../src/components/dashboard-item/dashboard-item';
import LeftMenu from '../src/components/left-menu/left-menu';

describe('default Link fallbacks', () => {
  it('renders DashboardItem as a styled anchor when no Link is provided', () => {
    const onClick = jest.fn();

    render(<DashboardItem url="/dashboard" text="Dashboard" onClick={onClick} />);

    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).toHaveAttribute('href', '#');
    expect(link).toHaveStyle({ display: 'flex' });

    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders LeftMenu items as anchors when no Link is provided', () => {
    render(
      <LeftMenu
        data={[
          {
            key: 'patterns',
            title: 'Patterns',
            url: '/patterns',
            icon: '/icon.png',
          },
        ]}
      />
    );

    const link = screen.getByRole('link', { name: 'Patterns' });
    expect(link).toHaveAttribute('href', '/patterns');
  });
});
