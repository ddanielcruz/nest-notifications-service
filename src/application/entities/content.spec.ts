import { Content } from './content';

describe('Content', () => {
  it('should be able to create a content', async () => {
    const value = 'valid_content';
    const content = new Content(value);
    expect(content.value).toBe(value);
  });

  it('should not be able to create a content with less than four characters', async () => {
    expect(() => new Content('a'.repeat(3))).toThrowError();
  });

  it('should not be able to create a content with more than 255 characters', async () => {
    expect(() => new Content('a'.repeat(256))).toThrowError();
  });
});
