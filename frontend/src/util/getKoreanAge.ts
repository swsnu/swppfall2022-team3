export function getKoreanAge(birthday: Date | string): number {
  return (new Date().getFullYear() - new Date(birthday).getFullYear() + 1);
}
