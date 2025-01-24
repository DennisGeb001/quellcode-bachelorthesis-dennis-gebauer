export function upperSnakeCaseToCamelCase(str: string): string {
  if (!str) return str;

  const parts = str.toLowerCase().split('_');

  return parts[0] + parts.slice(1).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}
