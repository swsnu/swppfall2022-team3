export function getKoreanAge(birthday: Date | string): number {
  return (new Date().getFullYear() - new Date(birthday).getFullYear() + 1);
}

export function dateToString(date: Date): string {
  const month = date.getMonth();
  const day = date.getDate();
  return `${date.getFullYear()}-${((month < 10) ? "0" : "") + month}-${((day < 10) ? "0" : "") + day}`;
}
