export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `NO-${timestamp}-${randomStr}`.toUpperCase();
}

export function validatePESEL(pesel: string): boolean {
  if (pesel.length !== 11 || !/^\d+$/.test(pesel)) {
    return false;
  }

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const digits = pesel.split('').map(Number);
  const checksum = digits.slice(0, 10).reduce((sum, digit, index) => {
    return sum + digit * weights[index];
  }, 0);

  const controlDigit = (10 - (checksum % 10)) % 10;
  return controlDigit === digits[10];
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
