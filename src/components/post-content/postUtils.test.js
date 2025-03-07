import React from 'react';
import { POST_ITEM_TYPE, POST_ITEM_TYPE_SUBMENU } from '../menu-add-component-post/menu-add-component-post';
import { getContentByType, ImageConfig, MultiImageConfig } from './postUtils';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, jest } from '@jest/globals';
const gId = screen.getByTestId;
const gT = screen.getByText;

describe('getContentByType', () => {
    const defaultText = 'Edit this text';
    const contentData = [{ type: 'test', text: 'existing' }];
    const imgStyles = { width: 250, height: 250, marginLeft: 10, marginRight: 10 };
    const defaultImage = {
        description: "Image description",
        url: "https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg",
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test basic functionality
    it('returns basic object for unknown type', () => {
        const result = getContentByType('unknown', defaultText, -1, []);
        expect(result).toEqual([{ type: 'unknown', text: defaultText }]);
    });

    // Test all POST_ITEM_TYPE cases
    it('handles TITLE correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.TITLE, defaultText, -1, []);
        expect(result[0]).toEqual({ type: POST_ITEM_TYPE.TITLE, text: defaultText });
    });

    it('handles BIG_HEADER correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.BIG_HEADER, defaultText, -1, []);
        expect(result[0]).toEqual({ type: POST_ITEM_TYPE.BIG_HEADER, text: defaultText });
    });

    it('handles MEDIUM_HEADER correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.MEDIUM_HEADER, defaultText, -1, []);
        expect(result[0]).toEqual({ type: POST_ITEM_TYPE.MEDIUM_HEADER, text: defaultText });
    });

    it('handles SMALL_HEADER correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.SMALL_HEADER, defaultText, -1, []);
        expect(result[0]).toEqual({ type: POST_ITEM_TYPE.SMALL_HEADER, text: defaultText });
    });

    it('handles PARAGRAPH correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.PARAGRAPH, defaultText, -1, []);
        expect(result[0]).toEqual({ type: POST_ITEM_TYPE.PARAGRAPH, text: defaultText });
    });

    it('handles PATTERN_PREVIEW correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.PATTERN_PREVIEW, defaultText, -1, []);
        expect(result[0]).toEqual({
            type: POST_ITEM_TYPE.PATTERN_PREVIEW,
            text: defaultText,
            imageUrl: '/images/assets/image-pattern-preview.png'
        });
    });

    it('handles RELATED_TOPIC correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.RELATED_TOPIC, defaultText, -1, []);
        expect(result[0]).toEqual({
            type: POST_ITEM_TYPE.RELATED_TOPIC,
            text: 'Xem thêm:',
            textLink: 'Link',
            url: '#'
        });
    });

    it('handles SUBCRIBE_ME correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.SUBCRIBE_ME, defaultText, -1, []);
        expect(result[0]).toEqual({
            type: POST_ITEM_TYPE.SUBCRIBE_ME,
            text: 'Edit this text'
        });
    });

    it('handles IMAGE correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.IMAGE, defaultText, -1, []);
        expect(result[0]).toMatchObject({
            type: POST_ITEM_TYPE.IMAGE,
            text: defaultText,
            style: imgStyles,
            data: [defaultImage]
        });
    });

    it('handles BUY_ME_A_COFFEE correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.BUY_ME_A_COFFEE, defaultText, -1, []);
        expect(result[0]).toEqual({
            type: POST_ITEM_TYPE.BUY_ME_A_COFFEE,
            text: 'Edit this text',
        });
    });

    it('handles VIDEO correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.VIDEO, defaultText, -1, []);
        expect(result[0]).toEqual({
            type: POST_ITEM_TYPE.VIDEO,
            text: 'Video Description'
        });
    });

    it('handles ADS correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.ADS, defaultText, -1, []);
        expect(result[0]).toEqual({
            type: POST_ITEM_TYPE.ADS,
            text: 'Edit this text'
        });
    });

    it('handles PATTERN correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.PATTERN, defaultText, -1, []);
        expect(result[0]).toMatchObject({
            type: POST_ITEM_TYPE.PATTERN,
            text: defaultText,
            patternDetail: {
                name: "Pattern Name",
                price: "Học phí: 100.000",
                ravelryUrl: "",
                lovecraftsUrl: "",
                imageList: ['/images/no-image.png'],
                bigImageUrl: '/images/no-image.png'
            }
        });
    });

    it('handles GROUP correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE.GROUP, defaultText, -1, []);
        expect(result[0]).toEqual({
            type: POST_ITEM_TYPE.GROUP,
            text: 'Group 1',
            content: []
        });
    });

    // Test image submenu cases
    it('handles ONE_IMAGE correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE_SUBMENU.IMAGE[0], defaultText, -1, []);
        expect(result[0]).toMatchObject({
            type: POST_ITEM_TYPE_SUBMENU.IMAGE[0],
            text: defaultText,
            style: imgStyles,
            data: [defaultImage]
        });
    });

    it('handles TWO_IMAGE correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE_SUBMENU.IMAGE[1], defaultText, -1, []);
        expect(result[0].data).toHaveLength(2);
        expect(result[0].data).toEqual([defaultImage, defaultImage]);
    });

    it('handles THREE_IMAGE correctly', () => {
        const result = getContentByType(POST_ITEM_TYPE_SUBMENU.IMAGE[2], defaultText, -1, []);
        expect(result[0].data).toHaveLength(3);
        expect(result[0].data).toEqual([defaultImage, defaultImage, defaultImage]);
    });

    // Test index handling
    it('inserts at specific index when currentIndex is provided', () => {
        const result = getContentByType(POST_ITEM_TYPE.GROUP, defaultText, 0, contentData);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(contentData[0]);
        expect(result[1]).toEqual({
            type: POST_ITEM_TYPE.GROUP,
            text: 'Group 1',
            content: []
        });
    });

    it('appends when currentIndex is -1', () => {
        const result = getContentByType(POST_ITEM_TYPE.GROUP, defaultText, -1, contentData);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(contentData[0]);
        expect(result[1]).toEqual({
            type: POST_ITEM_TYPE.GROUP,
            text: 'Group 1',
            content: []
        });
    });

    it('appends when currentIndex equals last index', () => {
        const result = getContentByType(POST_ITEM_TYPE.GROUP, defaultText, 0, contentData);
        expect(result).toHaveLength(2);
    });
});

describe('ImageConfig Component', () => {
    it('renders correctly with given props', () => {
        const mockOnChange = jest.fn();
        render(<ImageConfig title="Width" value={100} onChange={mockOnChange}/>);
        expect(gId('wrapper')).toBeInTheDocument();
        const lb = gId('label');
        const ip = gId('input');
        expect(lb).toBeInTheDocument();
        expect(lb.innerHTML).toBe("Width: ");
        expect(ip.value).toBe("100");
        fireEvent.change(ip, { target: { value: '75' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(75);
    });

    it('does not crash when onChange is undefined', () => {
        render(<ImageConfig title="Height" value={50} onChange={undefined} />);
        const ip = gId('input');
        fireEvent.change(ip, { target: { value: '75' } });
        expect(ip.value).toBe('50');
    });
});

describe('MultiImageConfig Component', () => {
    it('renders correctly', () => {
        const mockOnChange = jest.fn();
        render(<MultiImageConfig data={{ width: 100, height: 200, marginLeft: 10 }} onChange={mockOnChange}/>);
        const linkWH = gId("link-width-height");
        const color1 = 'black';
        const color2 = 'lightgray';
        const firstLastStyle = (color) => `background-color: ${color}; width: 5px; height: 1px;`;
        const middleStyle = (color) => `background-color: ${color}; width: 1px; height: 28px;`

        expect(linkWH.firstChild).toHaveStyle(firstLastStyle(color1));
        expect(linkWH.children[1]).toHaveStyle(middleStyle(color1));
        expect(linkWH.children[2]).toHaveStyle(firstLastStyle(color1));
        fireEvent.click(linkWH);
        expect(linkWH.firstChild).toHaveStyle(firstLastStyle(color2));
        expect(linkWH.children[1]).toHaveStyle(middleStyle(color2));
        expect(linkWH.children[2]).toHaveStyle(firstLastStyle(color2));
        
        const widthEl = gT('Width:');
        const widthInput = widthEl.parentElement.querySelector("input");
        fireEvent.change(widthInput, { target: { value: '75' } });
        expect(mockOnChange).toHaveBeenCalledWith({ width: 75, height: 200, marginLeft: 10 });

        const heightEl = gT('Height:');
        const heightInput = heightEl.parentElement.querySelector("input");
        fireEvent.change(heightInput, { target: { value: '75' } });
        expect(mockOnChange).toHaveBeenCalledWith({ width: 100, height: 75, marginLeft: 10 });

        const gapEl = gT('Gap:');
        const gapInput = gapEl.parentElement.querySelector("input");
        fireEvent.change(gapInput, { target: { value: '6' } });
        expect(mockOnChange).toHaveBeenCalledWith({ width: 100, height: 200, marginLeft: 3, marginRight: 3 });

        fireEvent.click(linkWH);
        expect(linkWH.firstChild).toHaveStyle(firstLastStyle(color1));
        expect(linkWH.children[1]).toHaveStyle(middleStyle(color1));
        expect(linkWH.children[2]).toHaveStyle(firstLastStyle(color1));

        fireEvent.change(widthInput, { target: { value: '75' } });
        expect(mockOnChange).toHaveBeenCalledWith({ width: 75, height: 75, marginLeft: 10 });

        fireEvent.change(heightInput, { target: { value: '75' } });
        expect(mockOnChange).toHaveBeenCalledWith({ width: 75, height: 75, marginLeft: 10 });
    });

    // it('toggles isLinkWidthHeight state when clicking the toggle button', () => {
    //     render(<MultiImageConfig data={{ width: 100, height: 200, marginLeft: 10 }} />);
        
    //     const toggleButton = screen.getByRole('button', { hidden: true }); // The div acting as a toggle
        
    //     // Initially, the line should be "black" (linked state)
    //     expect(toggleButton.firstChild).toHaveStyle('background-color: black');
        
    //     // Click to toggle
    //     fireEvent.click(toggleButton);
        
    //     // After clicking, it should change to "lightgray" (unlinked state)
    //     expect(toggleButton.firstChild).toHaveStyle('background-color: lightgray');
    // });

    // it('calls onChange when width is changed', () => {
    //     const mockOnChange = jest.fn();
    //     render(<MultiImageConfig data={{ width: 100, height: 200, marginLeft: 10 }} onChange={mockOnChange} />);
        
    //     const widthInput = screen.getByLabelText('Width:');
        
    //     // Change width value
    //     fireEvent.change(widthInput, { target: { value: '150' } });
        
    //     expect(mockOnChange).toHaveBeenCalledWith({ width: 150, height: 150, marginLeft: 10 });
    // });

    // it('calls onChange when height is changed', () => {
    //     const mockOnChange = jest.fn();
    //     render(<MultiImageConfig data={{ width: 100, height: 200, marginLeft: 10 }} onChange={mockOnChange} />);
        
    //     const heightInput = screen.getByLabelText('Height:');
        
    //     // Change height value
    //     fireEvent.change(heightInput, { target: { value: '250' } });
        
    //     expect(mockOnChange).toHaveBeenCalledWith({ width: 100, height: 250, marginLeft: 10 });
    // });

    // it('calls onChange when gap is changed', () => {
    //     const mockOnChange = jest.fn();
    //     render(<MultiImageConfig data={{ width: 100, height: 200, marginLeft: 10 }} onChange={mockOnChange} />);
        
    //     const gapInput = screen.getByLabelText('Gap:');
        
    //     // Change gap value
    //     fireEvent.change(gapInput, { target: { value: '40' } });
        
    //     expect(mockOnChange).toHaveBeenCalledWith({ width: 100, height: 200, marginLeft: 20, marginRight: 20 });
    // });
});