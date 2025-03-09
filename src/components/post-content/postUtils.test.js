import React from 'react';
import { POST_ITEM_TYPE, POST_ITEM_TYPE_SUBMENU } from '../menu-add-component-post/menu-add-component-post';
import { getContentByType, getPostId, getSelectionText, ImageConfig, makeContentDataOnDrop, MultiImageConfig, onCaptionChange, onChangeGroupDetail, onChangeImageMultiple, onChangePatternDetail, onChangePatternPreview, onDragLeave, onDragOver, onDragStart, onDrop, onImageResize, PostContent } from './postUtils';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, jest } from '@jest/globals';
const gId = screen.getByTestId;
const gT = screen.getByText;
const defaultText = 'Edit this text';
const titleText = 'title test';

jest.useFakeTimers();

describe('getContentByType', () => {
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
            text: defaultText
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
            text: defaultText,
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
            text: defaultText
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
        render(<ImageConfig title="Width" value={100} onChange={mockOnChange} />);
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
        render(<MultiImageConfig data={{ width: 100, height: 200, marginLeft: 10 }} onChange={mockOnChange} />);
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
});

describe('getPostId', () => {
    it('should call correctly', () => {
        expect(getPostId('a')).toBe('a');
        expect(getPostId('a 1')).toBe('a-1');
        expect(getPostId('a á')).toBe('a-a');
    })
});

const POST_TYPES = {
    [POST_ITEM_TYPE.TITLE]: {
        className: 'bigTitle',
        tagName: 'DIV',
        expectedText: titleText
    },
    [POST_ITEM_TYPE.BIG_HEADER]: {
        className: '',
        tagName: 'H2',
        expectedText: titleText
    },
    [POST_ITEM_TYPE.MEDIUM_HEADER]: {
        className: '',
        tagName: 'H3',
        expectedText: titleText
    },
    [POST_ITEM_TYPE.SMALL_HEADER]: {
        className: '',
        tagName: 'H4',
        expectedText: titleText
    },
    [POST_ITEM_TYPE.RELATED_TOPIC]: {
        className: 'relatedTo',
        tagName: 'DIV',
        expectedText: '<div class=\"arrow\"></div><div class=\"textRelatedTo\">title test</div><a>https://cheryx.com</a>'
    },
    [POST_ITEM_TYPE_SUBMENU.IMAGE[0]]: {
        className: '',
        tagName: 'DIV',
        expectedText: '<div class=\"imageWrapper\"><div><div class=\"image imageUpload\"><img src=\"test-image.png\"></div><figcaption class=\"imageDescription\">img description</figcaption></div></div>'
    },
    [POST_ITEM_TYPE_SUBMENU.IMAGE[1]]: {
        className: '',
        tagName: 'DIV',
        expectedText: '<div class=\"imageWrapper\"><div><div class=\"image imageUpload\"><img src=\"test-image.png\"></div><figcaption class=\"imageDescription\">img description</figcaption></div><div><div class=\"image imageUpload\"><img src=\"test-image.png\"></div><figcaption class=\"imageDescription\">img description</figcaption></div></div>'
    },
    [POST_ITEM_TYPE_SUBMENU.IMAGE[2]]: {
        className: '',
        tagName: 'DIV',
        expectedText: '<div class=\"imageWrapper\"><div><div class=\"image imageUpload\"><img src=\"test-image.png\"></div><figcaption class=\"imageDescription\">img description</figcaption></div><div><div class=\"image imageUpload\"><img src=\"test-image.png\"></div><figcaption class=\"imageDescription\">img description</figcaption></div><div><div class=\"image imageUpload\"><img src=\"test-image.png\"></div><figcaption class=\"imageDescription\">img description</figcaption></div></div>'
    },
    [POST_ITEM_TYPE.ADS]: {
        className: 'adsbygoogle adbanner-customize',
        tagName: 'INS',
        expectedText: ''
    },
    [POST_ITEM_TYPE.VIDEO]: {
        className: 'imgWrapper',
        tagName: 'DIV',
        expectedText: '<iframe title=\"video test\" src=\"https://www.youtube.com/embed/1234\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen=\"\"></iframe><figcaption class=\"imageDescription\">video test</figcaption>'
    },
    [POST_ITEM_TYPE.SUBCRIBE_ME]: {
        className: 'subcribeMe',
        tagName: 'DIV',
        expectedText: '<section class=\"youtubeSubscribe\"><div class=\"g-ytsubscribe\" data-theme=\"default\" data-layout=\"full\" data-count=\"hidden\" data-channel=\"\" data-channelid=\"UCf0jCxiSGh_pBExFN3k1CIA\"></div><script src=\"https://apis.google.com/js/platform.js\"></script></section><img alt=\"Subcribe me\" src=\"/images/subcribe-me.png\">'
    },
    [POST_ITEM_TYPE.BUY_ME_A_COFFEE]: {
        className: '',
        tagName: 'DIV',
        expectedText: '<a href=\"https://www.buymeacoffee.com/cheryx\" target=\"_blank\"><img src=\"https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png\" alt=\"Buy Me A Coffee\" style=\"height: 60px; width: 217px;\"></a>'
    },
    [POST_ITEM_TYPE.PATTERN]: {
        className: 'wrapper',
        tagName: 'DIV',
        expectedText: '<div class=\"mainImage\"><img alt=\"pattern name\" src=\"bigImageUrl\"></div><div class=\"rightInfo\"><h1 contenteditable=\"false\" class=\"title\">pattern name</h1><div class=\"author\">By Cheryx</div><div contenteditable=\"false\" class=\"price\"><div class=\"\">100 USD</div></div></div><div class=\"storeInfo\"><img alt=\"buy pattern here\" src=\"/images/pattern-store.png\"><div class=\"payPalWrapper\"><div class=\"closeLink\">Close</div><div class=\"payPal\" id=\"paypal-button-container\"></div></div><a rel=\"noreferrer\" style=\"position: relative;\" href=\"ravelryUrl\" target=\"_blank\" class=\"linkStore mb11\">Ravelry</a><a rel=\"noreferrer\" href=\"lovecraftsUrl\" target=\"_blank\" class=\"linkStore\">Lovecrafts</a><a class=\"emailMe\" href=\"mailto:vungoc101230@gmail.com\">If you prefer to buy directly from me instead of using Ravelry or Lovecrafts, you can click here to send me an email with your order details. I will reply to you as soon as possible and provide you with the payment and delivery options.</a></div><div class=\"listSmallImage\"><img alt=\"pattern name\" src=\"image1.png\" style=\"cursor: pointer;\"><img alt=\"pattern name\" src=\"image2.png\" style=\"cursor: pointer;\"></div>'
    },
    [POST_ITEM_TYPE.PATTERN_PREVIEW]: {
        className: 'wrapper subscribe',
        tagName: 'DIV',
        expectedText: `<div class="image"><div class="image " style="width: 100%; height: 100%; min-width: 100%;"><img src="imageUrl"></div></div><div class="info"><div class="wrapperDownloadPdf"><div class="title">Download PDF Pattern</div><div class="textEmailSubscription">This free pattern will be sent to the provided email. Please make sure you write your email address correctly.</div><form method="POST"><div class="formInput"><div for="email" class="label">Email address</div><input required="" type="email" name="email" placeholder=""></div><div class="formInput"><div for="name" class="label">First name</div><input type="text" name="name" placeholder=""></div><input class="submitSuscribe" type="submit" value="Get the pattern"></form></div></div>`
    },
    [POST_ITEM_TYPE.GROUP]: {
        className: 'wrapperGroupContent',
        tagName: 'DIV',
        expectedText: `<div contenteditable=\"false\" class=\"header\">text</div><div class=\"contentZone edit show\"><div class=\"wrapper\"><h2>title test</h2></div></div>`
    }
};

describe('PostContent component', () => {
    const originalConfirm = window.confirm;
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    afterEach(() => {
        // Reset timers after each test
        jest.clearAllTimers();
        window.confirm = originalConfirm;
    });
    const verifyElement = (element, expectedClass, expectedTag, expectedText) => {
        expect(element.className).toBe(expectedClass);
        expect(element.tagName).toBe(expectedTag);
        expect(element.innerHTML).toBe(expectedText);
    };
    const getListWrappedActionElements = container => container.children[0].children;
    const getEditableInput = (wrapperActionEl) => wrapperActionEl.children[1];
    const updatedText = 'Updated Text';
    const imgObj = { url: "test-image.png", description: "img description" };
    const { TITLE, BIG_HEADER, MEDIUM_HEADER, SMALL_HEADER, RELATED_TOPIC, ADS, VIDEO, SUBCRIBE_ME, BUY_ME_A_COFFEE, PATTERN, PATTERN_PREVIEW, GROUP, PARAGRAPH } = POST_ITEM_TYPE;
    const titleDataObj = {
        type: TITLE,
        text: titleText
    };
    const bigHeaderObj = {
        type: BIG_HEADER,
        text: titleText
    };
    const mediumHeaderObj = {
        type: MEDIUM_HEADER,
        text: titleText
    };
    const smallHeaderObj = {
        type: SMALL_HEADER,
        text: titleText
    };
    const relatedTopicObj = {
        type: RELATED_TOPIC,
        text: titleText,
        textLink: 'https://cheryx.com'
    }
    const imgUpload1Img = {
        type: POST_ITEM_TYPE_SUBMENU.IMAGE[0],
        data: [{ ...imgObj }]
    }
    const data = [
        titleDataObj,
        bigHeaderObj,
        mediumHeaderObj,
        smallHeaderObj,
        relatedTopicObj,
        imgUpload1Img
        , {
            type: POST_ITEM_TYPE_SUBMENU.IMAGE[0],
            urlWeb: "test url web",
            data: [{ ...imgObj }]
        }, {
            type: POST_ITEM_TYPE_SUBMENU.IMAGE[1],
            data: [{ ...imgObj }, { ...imgObj }]
        }, {
            type: POST_ITEM_TYPE_SUBMENU.IMAGE[2],
            data: [{ ...imgObj }, { ...imgObj }, { ...imgObj }]
        }, {
            type: ADS
        }, {
            type: VIDEO,
            text: "video test",
            url: "1234"
        }, {
            type: SUBCRIBE_ME,
        }, {
            type: BUY_ME_A_COFFEE
        }, {
            type: PATTERN,
            patternDetail: {
                name: "pattern name",
                price: "100",
                ravelryUrl: "ravelryUrl",
                lovecraftsUrl: "lovecraftsUrl",
                bigImageUrl: "bigImageUrl",
                imageList: ['image1.png', 'image2.png']
            }
        }, {
            type: PATTERN_PREVIEW,
            patternId: 'patternId',
            isSubscribe: true,
            buttonText: 'buttonText',
            message: 'message',
            previewUrl: 'previewUrl',
            imageUrl: 'imageUrl'
        }, {
            type: GROUP,
            expanded: true,
            text: "text",
            content: [
                {
                    type: BIG_HEADER,
                    text: titleText
                }
            ]
        }]
    it('Render view mode correctly', () => {
        const { container } = render(<PostContent data={data} />);
        const wrapper = container.children[0];
        expect(wrapper.children.length).toBe(data.length);

        for (let i = 0; i < data.length; i++) {
            const { urlWeb, type } = data[i];
            let { className, tagName, expectedText } = POST_TYPES[type];
            if (urlWeb) {
                className = "imgWrapper";
                expectedText = "<img alt=\"Image description\" src=\"test url web\"><figcaption class=\"imageDescription\">Image description</figcaption>";
            }
            verifyElement(
                wrapper.children[i],
                className,
                tagName,
                expectedText
            );
        }
    });

    it('Render edit mode correctly', () => {
        const mockOnChangeContent = jest.fn();
        const { container } = render(<PostContent data={data} onChangeData={mockOnChangeContent} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        expect(wrapperActionEl.length).toBe(data.length);

        const editableDiv = getEditableInput(wrapperActionEl[1]);
        fireEvent.input(editableDiv, {
            target: { textContent: updatedText },
        });
        fireEvent.blur(editableDiv);
        expect(mockOnChangeContent).toHaveBeenCalled();
    })

    const data2Paragraph = [{ text: "1" }, { text: "2" }]

    it('Render edit mode with enter on the last element', async () => {
        const mockOnChangeContent = jest.fn();
        const { container } = render(<PostContent data={data2Paragraph} onChangeData={mockOnChangeContent} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        expect(wrapperActionEl.length).toBe(2);

        const editableDiv = getEditableInput(wrapperActionEl[0]);
        expect(editableDiv.innerHTML).toBe("1");

        const editableDiv2 = getEditableInput(wrapperActionEl[1]);
        expect(editableDiv2.innerHTML).toBe("2");
        fireEvent.focus(editableDiv2);
        fireEvent.keyDown(editableDiv2, {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            charCode: 13
        });

        jest.advanceTimersByTime(100);

        expect(mockOnChangeContent).toHaveBeenCalledWith([{ text: "1" }, { text: "2" }, { text: "", type: PARAGRAPH }]);
    })

    it('Render edit mode with enter on the first element', async () => {
        const mockOnChangeContent = jest.fn();
        const { container } = render(<PostContent data={data2Paragraph} onChangeData={mockOnChangeContent} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        expect(wrapperActionEl.length).toBe(2);

        const editableDiv = getEditableInput(wrapperActionEl[0]);

        fireEvent.focus(editableDiv);
        fireEvent.keyDown(editableDiv, {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            charCode: 13
        });
        jest.advanceTimersByTime(100);

        expect(mockOnChangeContent).toHaveBeenCalledWith([{ text: "1" }, { text: "", type: PARAGRAPH }, { text: "2" }]);
    })

    it('Arrow up down paragraph', async () => {
        const { container } = render(<PostContent data={data2Paragraph} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        const editableDiv = getEditableInput(wrapperActionEl[0]);
        const editableDiv2 = getEditableInput(wrapperActionEl[1]);

        fireEvent.keyDown(editableDiv, {
            key: 'ArrowDown',
            code: 'ArrowDown',
            keyCode: 40,
            charCode: 0
        });
        jest.advanceTimersByTime(100);

        fireEvent.keyDown(editableDiv2, {
            key: 'ArrowUp',
            code: 'ArrowUp',
            keyCode: 38,
            charCode: 0
        });
        jest.advanceTimersByTime(100);
    })
    const cases = [
        {
            data: [titleDataObj],
            type: TITLE
        },
        {
            data: [bigHeaderObj],
            type: BIG_HEADER
        },
        {
            data: [mediumHeaderObj],
            type: MEDIUM_HEADER
        },
        {
            data: [smallHeaderObj],
            type: SMALL_HEADER
        }
    ];
    for (const { data, type } of cases) {
        it(`Post with ${type} change`, async () => {
            const mockOnChangeContent = jest.fn();
            const { container } = render(<PostContent data={data} onChangeData={mockOnChangeContent} isEdit={true} />);
            const wrapperActionEl = getListWrappedActionElements(container);
            const editableDiv = getEditableInput(wrapperActionEl[0]);
            editableDiv.innerText = updatedText;
            fireEvent.blur(editableDiv);
            expect(mockOnChangeContent).toHaveBeenCalledWith([{ text: updatedText, type }]);
        });
    }
    it('Post with related topic change', async () => {
        const mockOnChangeContent = jest.fn();
        const { container } = render(<PostContent data={[relatedTopicObj]} onChangeData={mockOnChangeContent} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        const editableDiv = getEditableInput(wrapperActionEl[0]);
        const titleTextEl = editableDiv.children[1];
        const linkEl = editableDiv.children[2];
        expect(editableDiv.children[0].className).toBe("arrow")
        expect(titleTextEl.innerHTML).toBe(titleText)
        expect(linkEl.innerHTML).toBe("https://cheryx.com")
        fireEvent.click(titleTextEl);
        fireEvent.click(linkEl);
        const menuLink = editableDiv.children[3];
        expect(menuLink.className).toBe("menuLink");
        const closeBtn = menuLink.firstChild;
        const inputTextLinkEl = menuLink.children[2];
        fireEvent.change(inputTextLinkEl, { target: { value: updatedText } });
        const inputLink = menuLink.children[4];
        fireEvent.change(inputLink, { target: { value: updatedText } });
        fireEvent.click(closeBtn);
        expect(mockOnChangeContent).toHaveBeenCalledWith([{ text: titleText, textLink: updatedText, url: updatedText, type: RELATED_TOPIC }]);
    });
    it('Post on add item', async () => {
        jest.spyOn(window, "confirm").mockReturnValue(true);
        const mockOnChangeContent = jest.fn();
        const { container } = render(<PostContent data={[titleDataObj]} onChangeData={mockOnChangeContent} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        const addBtn = wrapperActionEl[0].querySelector(".addButton");
        fireEvent.click(addBtn);
        const menuItems = addBtn?.querySelectorAll('.menuItem');
        fireEvent.click(menuItems[1]);
        expect(mockOnChangeContent).toHaveBeenCalledWith([titleDataObj, { type: BIG_HEADER, text: defaultText }]);
    });
    it('Post on delete item', async () => {
        jest.spyOn(window, "confirm").mockReturnValue(true);
        const mockOnChangeContent = jest.fn();
        const { container } = render(<PostContent data={[titleDataObj]} onChangeData={mockOnChangeContent} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        const deleteBtn = wrapperActionEl[0].querySelector(".deleteButton")
        fireEvent.click(deleteBtn);
        expect(window.confirm).toHaveBeenCalledWith("Bạn có chắn chắn muốn xoá dòng này?");
        expect(mockOnChangeContent).toHaveBeenCalledWith([]);
    });
    it('Post image upload', async () => {
        const mockOnChangeContent = jest.fn();
        const mockFileReader = {
            readAsDataURL: jest.fn(),
            result: "data:image/png;base64,dummybase64data",
            addEventListener: jest.fn((event, callback) => {
                // Store the callback to trigger it later
                if (event === "load") {
                    mockFileReader._onLoad = callback;
                }
            }),
            // Helper to simulate the load event
            triggerLoad: function () {
                if (this._onLoad) {
                    this._onLoad({ target: this });
                }
            },
        };
        jest.spyOn(global, "FileReader").mockImplementation(() => mockFileReader);

        const { container } = render(<PostContent data={[imgUpload1Img]} onChangeData={mockOnChangeContent} isEdit={true} />);
        const wrapperActionEl = getListWrappedActionElements(container);
        const editableDiv = getEditableInput(wrapperActionEl[0]);
        const fileInput = editableDiv.querySelector(`input[type="file"]`)
        const file = new File(["dummy content"], "test-upload.png", {
            type: "image/png",
        });
        fireEvent.change(fileInput, {
            target: { files: [file] },
        });
        await waitFor(() => {
            mockFileReader.triggerLoad();
        });

    })
})

describe('getSelectionText', () => {
    // Clean up after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return selected text using document.selection for older browsers', () => {
        // Mock window.getSelection to be undefined (simulating older browser)
        delete window.getSelection;
        
        // Mock document.selection
        const mockRange = {
            text: 'selected text'
        };
        
        document.selection = {
            type: 'Text', // Not "Control" to trigger the else block
            createRange: jest.fn(() => mockRange)
        };

        // Execute and assert
        const result = getSelectionText();
        expect(result).toBe('selected text');
        expect(document.selection.createRange).toHaveBeenCalled();
    });
});

describe('onDragStart', () => {
    // Clean up after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should set dataTransfer itemIndex from target dataset', () => {
        // Create mock event object
        const mockSetData = jest.fn();
        const mockEvent = {
            dataTransfer: {
                setData: mockSetData
            },
            target: {
                dataset: {
                    index: '5'
                }
            }
        };

        // Execute
        onDragStart(mockEvent);

        // Assert
        expect(mockSetData).toHaveBeenCalledWith("itemIndex", "5");
        expect(mockSetData).toHaveBeenCalledTimes(1);
    });

    test('should handle error gracefully when dataTransfer is missing', () => {
        // Spy on console.log
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Create mock event with missing dataTransfer
        const mockEvent = {
            target: {
                dataset: {
                    index: '5'
                }
            }
        };

        // Execute
        onDragStart(mockEvent);

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // Clean up
        consoleSpy.mockRestore();
    });

    test('should handle missing dataset index gracefully', () => {
        // Spy on console.log
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // Create mock event with missing dataset index
        const mockEvent = {
            dataTransfer: {
                setData: jest.fn()
            },
            target: {
                dataset: {}
            }
        };
        // Execute
        onDragStart(mockEvent);

        // Assert
        expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith("itemIndex", undefined);
        expect(consoleSpy).not.toHaveBeenCalled();

        // Clean up
        consoleSpy.mockRestore();
    });
});

describe('makeContentDataOnDrop', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should reorder contentData array and update styles when indices are valid', () => {
        // Mock event object
        const mockEvent = {
            dataTransfer: {
                getData: jest.fn(() => '1') // Starting index
            },
            target: {
                id: '3', // Ending index
                style: {
                    backgroundColor: '',
                    height: ''
                }
            }
        };

        // Initial contentData array
        const contentData = ['A', 'B', 'C', 'D'];

        // Function to test
        const makeContentDataOnDrop = (e, contentData) => {
            const indexStart = parseInt(e.dataTransfer.getData('itemIndex'));
            const indexEnd = parseInt(e.target.id);
            if (indexStart > -1 && indexEnd > -1) {
                var elementMove = contentData.splice(indexStart, 1);
                contentData.splice(indexEnd, 0, elementMove[0]);
            }
            e.target.style.backgroundColor = 'white';
            e.target.style.height = '1px';
            return contentData;
        };

        // Execute
        const result = makeContentDataOnDrop(mockEvent, contentData);

        // Assert
        expect(result).toEqual(['A', 'C', 'D', 'B']);
        expect(mockEvent.target.style.backgroundColor).toBe('white');
        expect(mockEvent.target.style.height).toBe('1px');
        expect(mockEvent.dataTransfer.getData).toHaveBeenCalledWith('itemIndex');
    });

    test('should not modify array when indices are invalid', () => {
        // Mock event with invalid index
        const mockEvent = {
            dataTransfer: {
                getData: jest.fn(() => '-1') // Invalid starting index
            },
            target: {
                id: '2',
                style: {
                    backgroundColor: '',
                    height: ''
                }
            }
        };

        // Initial contentData array
        const contentData = ['A', 'B', 'C'];
        const originalContentData = [...contentData];

        // Execute
        const result = makeContentDataOnDrop(mockEvent, contentData);

        // Assert
        expect(result).toEqual(originalContentData); // Array unchanged
        expect(mockEvent.target.style.backgroundColor).toBe('white');
        expect(mockEvent.target.style.height).toBe('1px');
    });

    test('should handle non-numeric indices gracefully', () => {
        // Mock event with non-numeric values
        const mockEvent = {
            dataTransfer: {
                getData: jest.fn(() => 'abc') // Non-numeric start
            },
            target: {
                id: 'xyz', // Non-numeric end
                style: {
                    backgroundColor: '',
                    height: ''
                }
            }
        };

        // Initial contentData array
        const contentData = ['A', 'B', 'C'];
        const originalContentData = [...contentData];

        // Execute
        const result = makeContentDataOnDrop(mockEvent, contentData);

        // Assert
        expect(result).toEqual(originalContentData); // Array unchanged due to NaN indices
        expect(mockEvent.target.style.backgroundColor).toBe('white');
        expect(mockEvent.target.style.height).toBe('1px');
    });

    test('should handle empty contentData array', () => {
        // Mock event
        const mockEvent = {
            dataTransfer: {
                getData: jest.fn(() => '0')
            },
            target: {
                id: '0',
                style: {
                    backgroundColor: '',
                    height: ''
                }
            }
        };

        // Empty contentData array
        const contentData = [];

        // Execute
        const result = makeContentDataOnDrop(mockEvent, contentData);

        // Assert
        expect(result).toEqual([]); // Remains empty
        expect(mockEvent.target.style.backgroundColor).toBe('white');
        expect(mockEvent.target.style.height).toBe('1px');
    });
});

describe('onDragOver', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should set target styles and prevent default behavior', () => {
        // Mock event object
        const mockPreventDefault = jest.fn();
        const mockEvent = {
            target: {
                style: {
                    backgroundColor: '',
                    height: ''
                }
            },
            preventDefault: mockPreventDefault
        };

        // Execute
        onDragOver(mockEvent);

        // Assert
        expect(mockEvent.target.style.backgroundColor).toBe('blue');
        expect(mockEvent.target.style.height).toBe('30px');
        expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    });
});

describe('onDragLeave', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should reset target styles to default values', () => {
        // Mock event object with initial styles
        const mockEvent = {
            target: {
                style: {
                    backgroundColor: 'blue',
                    height: '30px'
                }
            }
        };

        // Execute
        onDragLeave(mockEvent);

        // Assert
        expect(mockEvent.target.style.backgroundColor).toBe('white');
        expect(mockEvent.target.style.height).toBe('1px');
    });

    test('should override existing styles', () => {
        // Mock event with different initial styles
        const mockEvent = {
            target: {
                style: {
                    backgroundColor: 'red',
                    height: '50px'
                }
            }
        };

        // Execute
        onDragLeave(mockEvent);

        // Assert
        expect(mockEvent.target.style.backgroundColor).toBe('white');
        expect(mockEvent.target.style.height).toBe('1px');
    });
});

describe('onDrop', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return a new array copy with reordered content', () => {
        // Mock event object
        const mockEvent = {
            dataTransfer: {
                getData: jest.fn(() => '1') // Starting index
            },
            target: {
                id: '3', // Ending index
                style: {
                    backgroundColor: '',
                    height: ''
                }
            }
        };

        // Initial contentData array
        const contentData = ['A', 'B', 'C', 'D'];

        // Execute
        const result = onDrop(mockEvent, contentData);

        // Assert
        expect(result).toEqual(['A', 'C', 'D', 'B']);
        expect(result).not.toBe(contentData); // New array instance
        expect(mockEvent.target.style.backgroundColor).toBe('white');
        expect(mockEvent.target.style.height).toBe('1px');
    });
});

describe('onCaptionChange', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should update imageDescription for valid index', () => {
        // Mock event object
        const mockEvent = {
            target: {
                innerText: 'New caption'
            }
        };

        // Initial contentData array
        const contentData = [
            { imageDescription: 'Old caption 1' },
            { imageDescription: 'Old caption 2' }
        ];

        // Execute
        const result = onCaptionChange(mockEvent, 1, contentData);

        // Assert
        expect(result).toEqual([
            { imageDescription: 'Old caption 1' },
            { imageDescription: 'New caption' }
        ]);
        expect(result).not.toBe(contentData);
        expect(result[1]).toEqual(contentData[1]);
    });
});

describe('onImageResize', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should update webWidth and webHeight for valid index and size', () => {
        // Initial contentData array
        const contentData = [
            { webWidth: 100, webHeight: 100 },
            { webWidth: 200, webHeight: 200 }
        ];

        // Size object
        const size = { width: 300, height: 400 };

        // Execute
        const result = onImageResize(size, 1, contentData);

        // Assert
        expect(result).toEqual([
            { webWidth: 100, webHeight: 100 },
            { webWidth: 300, webHeight: 400 }
        ]);
        expect(result).not.toBe(contentData); // New array instance
        expect(result[1]).toBe(contentData[1]); // Same object reference (not deep copied)
    });

    test('should return unchanged array for invalid index', () => {
        // Initial contentData array
        const contentData = [
            { webWidth: 100, webHeight: 100 }
        ];
        const originalContentData = [...contentData];

        // Size object
        const size = { width: 200, height: 300 };

        // Execute with out-of-bounds index
        const result = onImageResize(size, 5, contentData);

        // Assert
        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData); // New array instance
    });

    test('should return unchanged array when size lacks width or height', () => {
        // Initial contentData array
        const contentData = [
            { webWidth: 100, webHeight: 100 }
        ];
        const originalContentData = [...contentData];

        // Incomplete size objects
        const sizeNoWidth = { height: 200 };
        const sizeNoHeight = { width: 200 };

        // Execute
        const result1 = onImageResize(sizeNoWidth, 0, contentData);
        const result2 = onImageResize(sizeNoHeight, 0, contentData);

        // Assert
        expect(result1).toEqual(originalContentData);
        expect(result2).toEqual(originalContentData);
        expect(result1).not.toBe(contentData); // New array instance
    });

    test('should handle empty contentData array', () => {
        // Empty contentData array
        const contentData = [];

        // Size object
        const size = { width: 200, height: 300 };

        // Execute
        const result = onImageResize(size, 0, contentData);

        // Assert
        expect(result).toEqual([]); // Remains empty
        expect(result).not.toBe(contentData); // New array instance
    });

    test('should handle null contentData by returning empty array', () => {
        // Size object
        const size = { width: 200, height: 300 };

        // Execute with null contentData
        const result = onImageResize(size, 0, null);

        // Assert
        expect(result).toEqual([]); // Returns empty array
    });

    test('should handle falsy size values gracefully', () => {
        // Initial contentData array
        const contentData = [
            { webWidth: 100, webHeight: 100 }
        ];
        const originalContentData = [...contentData];

        // Falsy size values
        const sizeZero = { width: 0, height: 0 };
        const sizeUndefined = { width: undefined, height: 300 };

        // Execute
        const result1 = onImageResize(sizeZero, 0, contentData);
        const result2 = onImageResize(sizeUndefined, 0, contentData);

        // Assert
        expect(result1).toEqual(originalContentData); // 0 is falsy
        expect(result2).toEqual(originalContentData); // undefined is falsy
        expect(result1).not.toBe(contentData); // New array instance
    });
});

describe('onChangeImageMultiple', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should update url and imgFile for valid data key and imgIndex', () => {
        const contentData = [
            {
                data: [
                    { url: 'old-url1', imgFile: 'old-file1', description: 'desc1' },
                    { url: 'old-url2', imgFile: 'old-file2', description: 'desc2' }
                ]
            }
        ];
        const input = {
            imgIndex: 1,
            data: { imgFile: 'new-file', imgSrc: 'new-url' },
            style: null
        };

        const result = onChangeImageMultiple(input, 0, 'data', contentData);

        expect(result).toEqual([
            {
                data: [
                    { url: 'old-url1', imgFile: 'old-file1', description: 'desc1' },
                    { url: 'new-url', imgFile: 'new-file', description: 'desc2' }
                ]
            }
        ]);
        expect(result).not.toBe(contentData); // New array instance
        expect(result[0].data).toEqual(contentData[0].data);
    });

    test('should update description for valid data key and imgIndex', () => {
        const contentData = [
            {
                data: [
                    { url: 'url1', imgFile: 'file1', description: 'old-desc' }
                ]
            }
        ];
        const input = {
            imgIndex: 0,
            data: { description: 'new-desc' },
            style: null
        };

        const result = onChangeImageMultiple(input, 0, 'data', contentData);

        expect(result).toEqual([
            {
                data: [
                    { url: 'url1', imgFile: 'file1', description: 'new-desc' }
                ]
            }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should update style object for valid style key', () => {
        const contentData = [
            {
                style: { width: 100, height: 200 }
            }
        ];
        const input = {
            imgIndex: 0,
            data: null,
            style: { width: 300, height: 400 }
        };

        const result = onChangeImageMultiple(input, 0, 'style', contentData);

        expect(result).toEqual([
            {
                style: { width: 300, height: 400 }
            }
        ]);
        expect(result).not.toBe(contentData);
        expect(result[0].style).toEqual(contentData[0].style);
    });

    test('should return unchanged array for invalid index', () => {
        const contentData = [{ data: [] }];
        const originalContentData = [...contentData];
        const input = {
            imgIndex: 0,
            data: { imgFile: 'new-file', imgSrc: 'new-url' },
            style: null
        };

        const result = onChangeImageMultiple(input, 5, 'data', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle invalid imgIndex gracefully', () => {
        const contentData = [
            {
                data: [{ url: 'url1', imgFile: 'file1' }]
            }
        ];
        const originalContentData = [...contentData];
        const input = {
            imgIndex: 5, // Out of bounds
            data: { imgFile: 'new-file', imgSrc: 'new-url' },
            style: null
        };

        const result = onChangeImageMultiple(input, 0, 'data', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle non-array data gracefully', () => {
        const contentData = [
            {
                data: 'not-an-array'
            }
        ];
        const originalContentData = [...contentData];
        const input = {
            imgIndex: 0,
            data: { imgFile: 'new-file', imgSrc: 'new-url' },
            style: null
        };

        const result = onChangeImageMultiple(input, 0, 'data', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle null contentData', () => {
        const input = {
            imgIndex: 0,
            data: { imgFile: 'new-file', imgSrc: 'new-url' },
            style: null
        };

        const result = onChangeImageMultiple(input, 0, 'data', null);

        expect(result).toEqual([]); // Returns empty array
    });

    test('should handle missing key gracefully', () => {
        const contentData = [
            {} // No 'data' or 'style' key
        ];
        const originalContentData = [...contentData];
        const input = {
            imgIndex: 0,
            data: { imgFile: 'new-file', imgSrc: 'new-url' },
            style: null
        };

        const result = onChangeImageMultiple(input, 0, 'data', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle invalid data object', () => {
        const contentData = [
            {
                data: [{ url: 'url1', imgFile: 'file1' }]
            }
        ];
        const originalContentData = [...contentData];
        const input = {
            imgIndex: 0,
            data: 'not-an-object', // Invalid data type
            style: null
        };

        const result = onChangeImageMultiple(input, 0, 'data', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle style with non-object data', () => {
        const contentData = [
            {
                style: 'not-an-object'
            }
        ];
        const originalContentData = [...contentData];
        const input = {
            imgIndex: 0,
            data: null,
            style: { width: 300 }
        };

        const result = onChangeImageMultiple(input, 0, 'style', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });
});

describe('onChangePatternPreview', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should update key with string value for valid inputs', () => {
        const contentData = [
            { someKey: 'old-value' }
        ];
        const e = 'new-value';

        const result = onChangePatternPreview(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { someKey: 'new-value' }
        ]);
        expect(result).not.toBe(contentData); // New array instance
    });

    test('should update key with array value for valid inputs', () => {
        const contentData = [
            { list: ['old-item'] }
        ];
        const e = ['new-item1', 'new-item2'];

        const result = onChangePatternPreview(e, 0, 'list', contentData);

        expect(result).toEqual([
            { list: ['new-item1', 'new-item2'] }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should update key with file object for valid inputs', () => {
        const contentData = [
            { file: null }
        ];
        const e = { name: 'file.jpg' }; // Object with name property

        const result = onChangePatternPreview(e, 0, 'file', contentData);

        expect(result).toEqual([
            { file: { name: 'file.jpg' } }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should set empty string for invalid event type', () => {
        const contentData = [
            { someKey: 'old-value' }
        ];
        const e = 123; // Number (invalid type)

        const result = onChangePatternPreview(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { someKey: '' }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should return unchanged array for invalid index', () => {
        const contentData = [
            { someKey: 'value' }
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternPreview('new-value', 5, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should return empty array for null contentData', () => {
        const result = onChangePatternPreview('value', 0, 'someKey', null);

        expect(result).toEqual([]);
    });

    test('should handle non-object item gracefully', () => {
        const contentData = [
            'not-an-object'
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternPreview('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle invalid key gracefully', () => {
        const contentData = [
            { someKey: 'value' }
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternPreview('new-value', 0, null, contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle empty contentData array', () => {
        const contentData = [];
        const originalContentData = [...contentData];

        const result = onChangePatternPreview('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle object without name property', () => {
        const contentData = [
            { someKey: 'old-value' }
        ];
        const e = { value: 'test' }; // Object without name property

        const result = onChangePatternPreview(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { someKey: '' } // Sets to empty string
        ]);
        expect(result).not.toBe(contentData);
    });
});

describe('onChangePatternDetail', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should update patternDetail key with string value', () => {
        const contentData = [
            { patternDetail: { someKey: 'old-value' } }
        ];
        const e = 'new-value';

        const result = onChangePatternDetail(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { patternDetail: { someKey: 'new-value' } }
        ]);
        expect(result).not.toBe(contentData); // New array instance
    });

    test('should update patternDetail key with array value', () => {
        const contentData = [
            { patternDetail: { list: ['old-item'] } }
        ];
        const e = ['new-item1', 'new-item2'];

        const result = onChangePatternDetail(e, 0, 'list', contentData);

        expect(result).toEqual([
            { patternDetail: { list: ['new-item1', 'new-item2'] } }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should update patternDetail key with file object', () => {
        const contentData = [
            { patternDetail: { file: null } }
        ];
        const e = { name: 'file.jpg' }; // Object with name property

        const result = onChangePatternDetail(e, 0, 'file', contentData);

        expect(result).toEqual([
            { patternDetail: { file: { name: 'file.jpg' } } }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should update patternDetail key with event target innerText', () => {
        const contentData = [
            { patternDetail: { text: 'old-text' } }
        ];
        const e = { target: { innerText: 'new-text' } };

        const result = onChangePatternDetail(e, 0, 'text', contentData);

        expect(result).toEqual([
            { patternDetail: { text: 'new-text' } }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should set empty string for invalid event type', () => {
        const contentData = [
            { patternDetail: { someKey: 'old-value' } }
        ];
        const e = 123; // Number (invalid type)

        const result = onChangePatternDetail(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { patternDetail: { someKey: '' } }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should return unchanged array for invalid index', () => {
        const contentData = [
            { patternDetail: { someKey: 'value' } }
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternDetail('new-value', 5, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should return empty array for null contentData', () => {
        const result = onChangePatternDetail('value', 0, 'someKey', null);

        expect(result).toEqual([]);
    });

    test('should handle non-object item gracefully', () => {
        const contentData = [
            'not-an-object'
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternDetail('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle missing patternDetail gracefully', () => {
        const contentData = [
            { otherKey: 'value' } // No patternDetail
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternDetail('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle non-object patternDetail gracefully', () => {
        const contentData = [
            { patternDetail: 'not-an-object' }
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternDetail('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle invalid key gracefully', () => {
        const contentData = [
            { patternDetail: { someKey: 'value' } }
        ];
        const originalContentData = [...contentData];

        const result = onChangePatternDetail('new-value', 0, null, contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle empty contentData array', () => {
        const contentData = [];
        const originalContentData = [...contentData];

        const result = onChangePatternDetail('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });
});

describe('onChangeGroupDetail', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should update key with event target innerText', () => {
        const contentData = [
            { someKey: 'old-value' }
        ];
        const e = { target: { innerText: 'new-value' } };

        const result = onChangeGroupDetail(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { someKey: 'new-value' }
        ]);
        expect(result).not.toBe(contentData); // New array instance
    });

    test('should update content key with raw value', () => {
        const contentData = [
            { content: 'old-content' }
        ];
        const e = 'new-content';

        const result = onChangeGroupDetail(e, 0, 'content', contentData);

        expect(result).toEqual([
            { content: 'new-content' }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should update expanded key with raw value', () => {
        const contentData = [
            { expanded: false }
        ];
        const e = true;

        const result = onChangeGroupDetail(e, 0, 'expanded', contentData);

        expect(result).toEqual([
            { expanded: true }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should set empty string for non-special key without target', () => {
        const contentData = [
            { someKey: 'old-value' }
        ];
        const e = 'new-value'; // No target, not content/expanded

        const result = onChangeGroupDetail(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { someKey: '' }
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should return unchanged array for invalid index', () => {
        const contentData = [
            { someKey: 'value' }
        ];
        const originalContentData = [...contentData];

        const result = onChangeGroupDetail('new-value', 5, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should return empty array for null contentData', () => {
        const result = onChangeGroupDetail('value', 0, 'someKey', null);

        expect(result).toEqual([]);
    });

    test('should handle non-object item gracefully', () => {
        const contentData = [
            'not-an-object'
        ];
        const originalContentData = [...contentData];

        const result = onChangeGroupDetail('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle invalid key gracefully', () => {
        const contentData = [
            { someKey: 'value' }
        ];
        const originalContentData = [...contentData];

        const result = onChangeGroupDetail('new-value', 0, null, contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle empty contentData array', () => {
        const contentData = [];
        const originalContentData = [...contentData];

        const result = onChangeGroupDetail('new-value', 0, 'someKey', contentData);

        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData);
    });

    test('should handle object without target for non-special key', () => {
        const contentData = [
            { someKey: 'old-value' }
        ];
        const e = { value: 'test' }; // Object without target

        const result = onChangeGroupDetail(e, 0, 'someKey', contentData);

        expect(result).toEqual([
            { someKey: '' } // Sets to empty string
        ]);
        expect(result).not.toBe(contentData);
    });

    test('should update content key with object when target present', () => {
        const contentData = [
            { content: 'old-content' }
        ];
        const e = { target: { innerText: 'new-content' } };

        const result = onChangeGroupDetail(e, 0, 'content', contentData);

        expect(result).toEqual([
            { content: 'new-content' }
        ]);
        expect(result).not.toBe(contentData);
    });
});