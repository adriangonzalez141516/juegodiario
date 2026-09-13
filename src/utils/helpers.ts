export function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .trim();
}
