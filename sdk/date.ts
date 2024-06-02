export function dateDifference(date: string | Date): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const currentDate = new Date();

  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "1 dia";
  } else if (diffDays < 7) {
    return `${diffDays} dias`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    if (weeks === 1) {
      return "1 semana";
    } else {
      return `${weeks} semanas`;
    }
  } else if (diffDays < 60) {
    return "1 mês";
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    if (months === 1) {
      return "1 mês";
    } else {
      return `${months} meses`;
    }
  } else {
    const years = Math.floor(diffDays / 365);
    if (years === 1) {
      return "1 ano";
    } else {
      return `${years} anos`;
    }
  }
}
