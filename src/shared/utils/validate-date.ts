export const validateDate = (value: string): boolean =>
  !isNaN(new Date(value).getTime());
