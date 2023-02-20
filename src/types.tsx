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
