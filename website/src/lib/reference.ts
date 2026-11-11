import { randomInt } from "node:crypto";

// No 0/O, 1/I/L or other look-alikes: the number is read aloud over the phone.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/** Short reference such as "LB-7K3Q9F" that the rider and dispatch can both quote. */
export function newReference(): string {
  let code = "";
  for (let i = 0; i < 6; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return `LB-${code}`;
}
