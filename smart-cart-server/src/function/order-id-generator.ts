export class OrderIdGenerator {
  private static readonly prefix = 'DINTLY-';
  private static readonly randomNumberLength = 4;

  static generate(): string {
    const timestamp = Date.now().toString();
    const randomNumber = this.getRandomNumberString();
    return `${this.prefix}${timestamp}-${randomNumber}`;
  }

  private static getRandomNumberString(): string {
    const random = Math.floor(
      Math.random() * Math.pow(10, this.randomNumberLength),
    );
    return random.toString().padStart(this.randomNumberLength, '0');
  }
}
