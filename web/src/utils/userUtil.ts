export function getUserInitials(name?: string) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  // Se só tem uma palavra, pega as duas primeiras letras
  return parts[0].substring(0, 2).toUpperCase();
}