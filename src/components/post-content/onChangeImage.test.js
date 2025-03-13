import { jest } from '@jest/globals';
const imageFile = '/uploaded/file.jpg';

jest.unstable_mockModule('@cheryx2020/utils', async () => {
    return {
        uploadFile: jest.fn(() => Promise.resolve(imageFile)),
        isBigFile: jest.fn(),
    };
});

describe('onChangeImage', () => {
    let uploadFile;
    let isBigFile;
    let onChangeImage;
    beforeAll(async () => {
        const utils = await import('@cheryx2020/utils');
        uploadFile = utils.uploadFile;
        isBigFile = utils.isBigFile;
        const module = await import('./onChangeImage');
        onChangeImage = module.onChangeImage;
        // Mock window.alert
        global.alert = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should update urlWeb with successful upload', async () => {
        // Mock event and file
        const mockFile = { name: 'test.jpg' };
        const mockEvent = {
            target: {
                files: [mockFile]
            }
        };

        // Initial contentData
        const contentData = [{ urlWeb: 'old-url' }];

        // Configure mocks
        isBigFile.mockReturnValue(false);
        uploadFile.mockResolvedValue(imageFile);

        // Execute
        const result = await onChangeImage(mockEvent, 0, contentData);

        // Assert
        expect(result).toEqual([{ urlWeb: imageFile }]);
        expect(result).not.toBe(contentData); // New array instance
        expect(isBigFile).toHaveBeenCalledWith(mockFile);
        expect(uploadFile).toHaveBeenCalledWith(
            mockFile,
            process.env.NEXT_PUBLIC_publicImagesPath,
            false,
            expect.stringMatching(/^post_\d+_image$/),
            true
        );
        expect(global.alert).not.toHaveBeenCalled();
    });

    test('should alert and return undefined for big file', async () => {
        // Mock event and file
        const mockFile = { name: 'big.jpg' };
        const mockEvent = {
            target: {
                files: [mockFile]
            }
        };

        // Initial contentData
        const contentData = [{ urlWeb: 'old-url' }];
        const originalContentData = [...contentData];

        // Configure mocks
        isBigFile.mockReturnValue(true);

        // Execute
        const result = await onChangeImage(mockEvent, 0, contentData);

        // Assert
        expect(result).toBeUndefined(); // Early return
        expect(global.alert).toHaveBeenCalledWith('Kích thước file không được vượt quá 500KB');
        expect(isBigFile).toHaveBeenCalledWith(mockFile);
        expect(uploadFile).not.toHaveBeenCalled();
        expect(contentData).toEqual(originalContentData); // Unchanged
    });

    test('should handle upload error and set empty url', async () => {
        // Mock event and file
        const mockFile = { name: 'test.jpg' };
        const mockEvent = {
            target: {
                files: [mockFile]
            }
        };

        // Initial contentData
        const contentData = [{ urlWeb: 'old-url' }];

        // Configure mocks
        isBigFile.mockReturnValue(false);
        uploadFile.mockRejectedValue(new Error('Upload failed'));

        // Execute
        const result = await onChangeImage(mockEvent, 0, contentData);

        // Assert
        expect(result).toEqual([{ urlWeb: '' }]);
        expect(result).not.toBe(contentData); // New array instance
        expect(isBigFile).toHaveBeenCalledWith(mockFile);
        expect(uploadFile).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith('Có lỗi xảy ra khi tải ảnh lên.');
    });
    test('should return unchanged array for invalid index', async () => {
        // Mock event
        const mockEvent = {
            target: {
                files: [{ name: 'test.jpg' }]
            }
        };

        // Initial contentData
        const contentData = [{ urlWeb: 'old-url' }];
        const originalContentData = [...contentData];

        // Execute with invalid index
        const result = await onChangeImage(mockEvent, 5, contentData);

        // Assert
        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData); // New array instance
        expect(isBigFile).not.toHaveBeenCalled();
        expect(uploadFile).not.toHaveBeenCalled();
    });

    test('should handle null event gracefully', async () => {
        // Initial contentData
        const contentData = [{ urlWeb: 'old-url' }];
        const originalContentData = [...contentData];

        // Execute with null event
        const result = await onChangeImage(null, 0, contentData);

        // Assert
        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData); // New array instance
        expect(isBigFile).not.toHaveBeenCalled();
        expect(uploadFile).not.toHaveBeenCalled();
    });

    test('should handle missing files array', async () => {
        // Mock event with no files
        const mockEvent = {
            target: {
                files: []
            }
        };

        // Initial contentData
        const contentData = [{ urlWeb: 'old-url' }];
        const originalContentData = [...contentData];

        // Execute
        const result = await onChangeImage(mockEvent, 0, contentData);

        // Assert
        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData); // New array instance
        expect(isBigFile).not.toHaveBeenCalled();
        expect(uploadFile).not.toHaveBeenCalled();
    });

    test('should handle null contentData', async () => {
        // Mock event
        const mockEvent = {
            target: {
                files: [{ name: 'test.jpg' }]
            }
        };

        // Execute with null contentData
        const result = await onChangeImage(mockEvent, 0, null);

        // Assert
        expect(result).toEqual([]); // Returns empty array
        expect(isBigFile).not.toHaveBeenCalled();
        expect(uploadFile).not.toHaveBeenCalled();
    });

    test('should handle missing target', async () => {
        // Mock event with no target
        const mockEvent = {};

        // Initial contentData
        const contentData = [{ urlWeb: 'old-url' }];
        const originalContentData = [...contentData];

        // Execute
        const result = await onChangeImage(mockEvent, 0, contentData);

        // Assert
        expect(result).toEqual(originalContentData);
        expect(result).not.toBe(contentData); // New array instance
        expect(isBigFile).not.toHaveBeenCalled();
        expect(uploadFile).not.toHaveBeenCalled();
    });
});