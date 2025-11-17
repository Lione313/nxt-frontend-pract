

export const isRequired = (value: string): boolean => value.trim() !== "";

export const minLength = (value: string, length: number): boolean =>
  value.length >= length;

export const passwordsMatch = (pass1: string, pass2: string): boolean =>
  pass1 === pass2;

export const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
