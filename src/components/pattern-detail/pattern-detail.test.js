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

const testLinkClick = (linkText, url) => {
  const linkEl = screen.getByText(linkText, { selector: `a[href="${url}"]` });
  expect(linkEl).toBeInTheDocument();
  fireEvent.click(linkEl);
  expect(global.prompt).toHaveBeenCalledWith(`Nhập đường dẫn tới trang ${linkText}`, url);
};

const testLinkClickAnalytics = (gtag, linkText, url, value) => {
  const linkEl = screen.getByText(linkText, { selector: `a[href="${url}"]` });
  expect(linkEl).toBeInTheDocument();
  
  fireEvent.click(linkEl);
  const commonEvent = { 
    action: "pattern_store_click", 
    category: "engagement", 
    label: "pattern_store_click", 
    value 
  };
  expect(gtag.event).toHaveBeenCalledWith(commonEvent);
};

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
    testLinkClickAnalytics(gtag, 'Ravelry', 'https://ravelry.com/test', 'ravelryUrl - Test Pattern');
    testLinkClickAnalytics(gtag, 'Lovecrafts', 'https://lovecrafts.com/test', 'lovecraftsUrl - Test Pattern');
  });

  test('renders cheryx pattern details correctly for admin', async () => {
    const { container } = render(<PatternDetail {...defaultProps} isAdmin />);
    testLinkClick('Ravelry', 'https://ravelry.com/test');
    testLinkClick('Lovecrafts', 'https://lovecrafts.com/test');
    // const mainImageWrapperEl = container.querySelector('.mainImage');
    // const fileInput = mainImageWrapperEl.querySelector('input[type="file"]');
    // const file = new File(['test image content'], 'test.png', { type: 'image/png' });
    // fireEvent.change(fileInput, {
    //   target: { files: [file] }
    // });
  });

});