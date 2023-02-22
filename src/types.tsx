export interface Laureat {
  knownName: {
    en: string;
  };
  gender: string;
  birth: {
    date: string;
    place: {
      city: {
        en: string;
      };
      country: {
        en: string;
      };
      continent: {
        en: string;
      };
    };
  };
  nobelPrizes: [
    {
      awardYear: string;
      category: {
        en: string;
      };
      dateAwarded: string;
      prizeStatus: string;
      motivation: {
        en: string;
      };
    }
  ];
}

export interface Option {
  label: string;
  value: string;
}

export const GENDER_OPTIONS: Option[] = [
  { label: "male", value: "male" },
  { label: "female", value: "female" },
];

export const NOBEL_PRIZE_CATEGORIES: Option[] = [
  { label: "Literature", value: "lit" },
  { label: "Physics", value: "phy" },
  { label: "Peace", value: "pea" },
  { label: "Chemistry", value: "che" },
  { label: "Physiology or Medicine", value: "med" },
  { label: "Economic sciences", value: "eco" },
];

export const BIRTH_CONTINENT: Option[] = [
  { label: "Africa", value: "Africa" },
  { label: "Asia", value: "Asia" },
  { label: "Europe", value: "Europe" },
  { label: "North America", value: "North America" },
  { label: "Oceania", value: "Oceania" },
  { label: "South America", value: "South America" },
  { label: "Antarctica", value: "Antarctica" },
];
