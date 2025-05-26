export function zipCodeMask(value: string): string {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
}

export function zipCodeUnmask(value: string): string {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  return value;
}
