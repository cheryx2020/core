import React from 'react';
import { POST_ITEM_TYPE, POST_ITEM_TYPE_SUBMENU } from '../menu-add-component-post/menu-add-component-post';
import { getContentByType, getPostId, ImageConfig, MultiImageConfig, PostContent } from './postUtils';
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

        expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
    })
})