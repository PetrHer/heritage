export const formatName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export   const czechAlphabet = [
  "A",
  "B",
  "C",
  "Č",
  "D",
  "Ď",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ň",
  "O",
  "P",
  "Q",
  "R",
  "Ř",
  "S",
  "Š",
  "T",
  "Ť",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ž",
];
export const numberTypes = ["mother_id","father_id","year_of_birth","year_of_death","partner_id"]
export type Character = {
  name: string;
  surname: string;
  year_of_birth: number | undefined;
  year_of_death: number | undefined;
  birth_place: string;
  birth_surname: string;
  father_id: number | undefined;
  mother_id: number | undefined;
  description: string;
  partner_id: number | undefined;
};