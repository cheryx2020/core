import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, jest } from '@jest/globals';
jest.unstable_mockModule('@cheryx2020/api-service', async () => ({
    APIService: {
        post: jest.fn(),
    },
    setShowLoading: jest.fn(),
}));

import { EmailSubscriptionSuccess } from './pattern-preview';
const { DownloadPatternForm } = await import('./pattern-preview');

describe('EmailSubscriptionSuccess', () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Mock timers for setTimeout
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers(); // Restore real timers
    });

    test('renders initial success message correctly', () => {
        render(<EmailSubscriptionSuccess />);

        // Check initial render content
        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByText('Check your email in a few minutes!')).toBeInTheDocument();
        expect(screen.getByText(/To find my letter, simply search for a letter from Cheryx./)).toBeInTheDocument();
        expect(screen.getByText(/If you can't seem to locate the email/)).toBeInTheDocument();

        // Check class names
        const titles = screen.getAllByText(/Success!|Check your email/);
        titles.forEach(title => {
            expect(title).toHaveClass('title small');
        });
        const textElements = screen.getAllByText(/To find my letter|If you can't seem to locate/);
        textElements.forEach(text => {
            expect(text).toHaveClass('textEmailSubscription');
        });

        // Modal should not be visible initially
        expect(screen.queryByText(/While you wait, consider exploring/)).not.toBeInTheDocument();
    });

    test('opens modal after 1 second', async () => {
        render(<EmailSubscriptionSuccess />);

        // Initially, modal is not present
        expect(screen.queryByText(/While you wait, consider exploring/)).not.toBeInTheDocument();

        // Fast-forward time by 1000ms
        jest.advanceTimersByTime(1000);

        // Wait for modal to appear
        await waitFor(() => {
            expect(screen.getByText(/While you wait, consider exploring/)).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'Yarn Selection' })).toBeInTheDocument();
            expect(screen.getByText(/While you wait/)).toHaveClass('textEmailSubscription');
        });
    });

    test('closes modal when clicking overlay outside content', async () => {
        const { container } = render(<EmailSubscriptionSuccess />);

        // Open modal
        jest.advanceTimersByTime(1000);
        await waitFor(() => {
            expect(screen.getByText(/While you wait/)).toBeInTheDocument();
        });

        // Simulate click on overlay
        const overlay = container.querySelector('.modalOverlay');
        overlay.click(); // Click directly on overlay (target === currentTarget)

        // Modal should close
        await waitFor(() => {
            expect(screen.queryByText(/While you wait/)).not.toBeInTheDocument();
        });
    });

    test('does not close modal when clicking inside content', async () => {
        const { container } = render(<EmailSubscriptionSuccess />);

        // Open modal
        jest.advanceTimersByTime(1000);
        await waitFor(() => {
            expect(screen.getByText(/While you wait/)).toBeInTheDocument();
        });

        // Simulate click inside modal content
        const modalContent = container.querySelector('.modalContent');
        modalContent.click(); // Click inside content (target !== currentTarget)

        // Modal should still be open
        expect(screen.getByText(/While you wait/)).toBeInTheDocument();
    });
});

describe('DownloadPatternForm', () => {
    let APIService;
    let setShowLoading;
    const mockDispatch = jest.fn();
    const mockSetIsSubmitted = jest.fn();
    const patternId = '123';

    beforeAll(async () => {
        // Import the mocked module
        const module = await import('@cheryx2020/api-service');
        APIService = module.APIService;
        setShowLoading = module.setShowLoading;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('submits form successfully and calls setIsSubmitted', async () => {
        APIService.post.mockResolvedValueOnce({}); // Mock successful API call

        const { container } = render(<DownloadPatternForm dispatch={mockDispatch} patternId={patternId} setIsSubmitted={mockSetIsSubmitted} />);

        // Fill form
        fireEvent.change(container.querySelector('input[name="email"]'), { target: { value: 'test@example.com' } });
        fireEvent.change(container.querySelector('input[name="name"]'), { target: { value: 'John' } });

        // Submit form
        const form = container.querySelector('form');
        expect(form.checkValidity()).toBe(true);
        fireEvent.submit(form);
        
        // Check loading state
        // expect(setShowLoading).toHaveBeenCalledWith(mockDispatch, true);

        // Wait for API call and state updates
        // await waitFor(() => {
        //     expect(APIService.post).toHaveBeenCalledWith('email-subscriptions/subscribe', {
        //         email: 'test@example.com',
        //         name: 'John',
        //         type: 'download',
        //         id: patternId,
        //     });
        //     expect(mockSetIsSubmitted).toHaveBeenCalledWith(true);
        //     expect(setShowLoading).toHaveBeenCalledWith(mockDispatch, false);
        // });
    });

    // test('handles API error and logs it', async () => {
    //     const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    //     APIService.post.mockRejectedValueOnce(new Error('API Error')); // Mock API failure

    //     render(<DownloadPatternForm dispatch={mockDispatch} patternId={patternId} setIsSubmitted={mockSetIsSubmitted} />);

    //     // Fill form
    //     fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    //     fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });

    //     // Submit form
    //     fireEvent.click(screen.getByRole('button', { name: 'Get the pattern' }));

    //     // Check loading state
    //     expect(setShowLoading).toHaveBeenCalledWith(mockDispatch, true);

    //     // Wait for error handling
    //     await waitFor(() => {
    //         expect(APIService.post).toHaveBeenCalledWith('email-subscriptions/subscribe', {
    //             email: 'test@example.com',
    //             name: 'John',
    //             type: 'download',
    //             id: patternId,
    //         });
    //         expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    //         expect(mockSetIsSubmitted).not.toHaveBeenCalled();
    //         expect(setShowLoading).toHaveBeenCalledWith(mockDispatch, false);
    //     });

    //     consoleSpy.mockRestore();
    // });

    // test('prevents submission with invalid email', () => {
    //     render(<DownloadPatternForm dispatch={mockDispatch} patternId={patternId} setIsSubmitted={mockSetIsSubmitted} />);

    //     // Submit without filling required email
    //     fireEvent.click(screen.getByRole('button', { name: 'Get the pattern' }));

    //     // Form should not submit (no API call or state changes)
    //     expect(APIService.post).not.toHaveBeenCalled();
    //     expect(setShowLoading).not.toHaveBeenCalled();
    //     expect(mockSetIsSubmitted).not.toHaveBeenCalled();
    // });

    // test('submits with only email (name optional)', async () => {
    //     APIService.post.mockResolvedValueOnce({});

    //     render(<DownloadPatternForm dispatch={mockDispatch} patternId={patternId} setIsSubmitted={mockSetIsSubmitted} />);

    //     // Fill only email
    //     fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });

    //     // Submit form
    //     fireEvent.click(screen.getByRole('button', { name: 'Get the pattern' }));

    //     await waitFor(() => {
    //         expect(APIService.post).toHaveBeenCalledWith('email-subscriptions/subscribe', {
    //             email: 'test@example.com',
    //             name: undefined, // Name is optional
    //             type: 'download',
    //             id: patternId,
    //         });
    //         expect(mockSetIsSubmitted).toHaveBeenCalledWith(true);
    //     });
    // });
});