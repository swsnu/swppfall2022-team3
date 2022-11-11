export function getKoreanAge(birthday: Date): number {
  return (new Date().getFullYear() - new Date(birthday).getFullYear() + 1);
}
