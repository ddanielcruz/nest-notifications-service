export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  constructor(content: string) {
    const isLengthValid = this.isContentLengthValid(content);
    if (!isLengthValid) {
      throw new Error('Content must be between 4 and 255 characters.');
    }

    this.content = content;
  }

  private isContentLengthValid(content: string) {
    return content.length >= 4 && content.length <= 255;
  }
}
