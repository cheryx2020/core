import { jest } from '@jest/globals';
const imageFile = '/uploaded/file.jpg';

jest.unstable_mockModule('@cheryx2020/utils', async () => {
    return {
        uploadFile: jest.fn(() => Promise.resolve(imageFile)),
    };
});

const { uploadFile } = await import('@cheryx2020/utils');
const { uploadContentImageFiles } = await import('./uploadContentImageFiles');

describe('uploadContentImageFiles', () => {
    it('should process and upload files correctly', async () => {
        const mockContentData = [
            {
                patternDetail: {
                    name: 'Pattern1',
                    bigImageUrl: { name: 'bigImage.jpg' },
                    imageList: [{ name: 'smallImage1.jpg' }, { name: 'smallImage2.jpg' }],
                },
                imageUrl: { name: 'preview.jpg' },
                data: [{ imgFile: { name: 'componentImage.jpg' } }],
                content: [
                    {
                        patternDetail: {
                            name: 'sub-pattern1',
                            bigImageUrl: { name: 'subBigImage1.jpg' },
                            imageList: [{ name: 'subSmallImage1.jpg' }]
                        },
                        imageUrl: { name: 'subPreview1.jpg' },
                        data: [{ imgFile: { name: 'subExtraImage1.jpg' } }]
                    }
                ]
            },
        ];

        const result = await uploadContentImageFiles(mockContentData);
        
        expect(uploadFile).toHaveBeenCalledTimes(9);
        expect(result.updatedContent[0].patternDetail.bigImageUrl).toBe(imageFile);
        expect(result.updatedContent[0].patternDetail.imageList[0]).toBe(imageFile);
        expect(result.updatedContent[0].patternDetail.imageList[1]).toBe(imageFile);
        expect(result.updatedContent[0].imageUrl).toBe(imageFile);
        expect(result.updatedContent[0].data[0].url).toBe(imageFile);
        expect(result.updatedContent[0].content[0].patternDetail.bigImageUrl).toBe(imageFile);
        expect(result.updatedContent[0].content[0].patternDetail.imageList[0]).toBe(imageFile);
        expect(result.updatedContent[0].content[0].imageUrl).toBe(imageFile);
        expect(result.updatedContent[0].content[0].data[0].url).toBe(imageFile);
    });
});