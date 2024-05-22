export class MTIGenerator {
  private static readonly prefix = 'TXN-';
  private static readonly randomNumberLength = 4;

  static generate(): string {
    const timestamp = Date.now().toString();
    const randomNumber = this.getRandomNumberString();
    let merchantTransactionId = `${this.prefix}${timestamp}-${randomNumber}`;

    // Ensure the length is less than 35 characters
    if (merchantTransactionId.length > 35) {
      merchantTransactionId = merchantTransactionId.substring(0, 35);
    }

    return merchantTransactionId;
  }

  private static getRandomNumberString(): string {
    const random = Math.floor(
      Math.random() * Math.pow(10, this.randomNumberLength),
    );
    return random.toString().padStart(this.randomNumberLength, '0');
  }
}
