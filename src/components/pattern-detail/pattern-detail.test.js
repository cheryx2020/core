import React from 'react';
import { beforeAll, describe, expect, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.unstable_mockModule('../../../gtag', () => ({
  default: {
    event: jest.fn()
  },
}));

global.window.paypal = {
  Buttons: jest.fn(() => ({
    render: jest.fn(),
  })),
};

global.prompt = jest.fn();

describe('PatternDetail Component', () => {
  let gtag;
  let PatternDetail;
  const defaultProps = {
    name: 'Test Pattern',
    price: '10 USD',
    discount: 20,
    ravelryUrl: 'https://ravelry.com/test',
    lovecraftsUrl: 'https://lovecrafts.com/test',
    bigImageUrl: 'https://example.com/big.jpg',
    imageList: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    isAdmin: false,
    onChange: jest.fn(),
    index: 0,
    noImageUrl: '/images/no-image.png',
  };

  beforeAll(async () => {
    gtag = (await import('../../../gtag')).default;
    PatternDetail = (await import('./pattern-detail')).default;
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cheryx pattern details correctly for non-admin', () => {
    const { container } = render(<PatternDetail {...defaultProps} />);
    const { name, bigImageUrl, imageList } = defaultProps;

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText('By Cheryx')).toBeInTheDocument();
    expect(screen.getByText('10 USD')).toHaveClass('lineThrough');
    expect(screen.getByText('8.00 USD')).toBeInTheDocument();
    expect(screen.getByText('-20%')).toBeInTheDocument();
    
    const getImg = url => container.querySelector(`img[src="${url}"]`);
    expect(getImg(bigImageUrl)).toBeInTheDocument();
    imageList.forEach(img => {
      expect(getImg(img)).toBeInTheDocument();
    })
    const ravelryLinkEl = screen.getByText('Ravelry', { selector: 'a[href="https://ravelry.com/test"]' });
    expect(ravelryLinkEl).toBeInTheDocument();
    
    fireEvent.click(ravelryLinkEl);
    const commonEvent = { action: "pattern_store_click", category: "engagement", label: "pattern_store_click", value: `ravelryUrl - Test Pattern` };
    expect(gtag.event).toHaveBeenCalledWith(commonEvent);
    const loveScraftLinkEl = screen.getByText('Lovecrafts', { selector: 'a[href="https://lovecrafts.com/test"]' });
    expect(loveScraftLinkEl).toBeInTheDocument();
    fireEvent.click(loveScraftLinkEl);
    expect(gtag.event).toHaveBeenCalledWith({...commonEvent, value: `lovecraftsUrl - Test Pattern`});
  });

  test('renders cheryx pattern details correctly for admin', () => {
    const { container } = render(<PatternDetail {...defaultProps} isAdmin />);
    const ravelryLinkEl = screen.getByText('Ravelry', { selector: 'a[href="https://ravelry.com/test"]' });
    expect(ravelryLinkEl).toBeInTheDocument();
    fireEvent.click(ravelryLinkEl);

    expect(global.prompt).toHaveBeenCalledWith(
      `Nhập đường dẫn tới trang Ravelry`,
      'https://ravelry.com/test'
    );
    
    const loveScraftLinkEl = screen.getByText('Lovecrafts', { selector: 'a[href="https://lovecrafts.com/test"]' });
    expect(loveScraftLinkEl).toBeInTheDocument();
    fireEvent.click(loveScraftLinkEl);
    expect(global.prompt).toHaveBeenCalledWith(
      `Nhập đường dẫn tới trang Lovecrafts`,
      'https://lovecrafts.com/test'
    );
  });

});