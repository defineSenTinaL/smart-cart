export function generateTicketId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5); // Using a random 5-character string
  return `${timestamp}${randomPart}`;
}
