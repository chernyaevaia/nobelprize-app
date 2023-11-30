import { ReactElement } from "react";
import { BookOpenText, Atom, FlaskConical, AreaChart, Syringe, Globe } from 'lucide-react';

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
    };
  };
  wikipedia: {
    english: string
  }
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
  death?: {
    date: string,
    place: {
      city: {
        en: string,
      },
      country: {
        en: string,
      },
    };
  }
}

export interface Option {
  label: string;
  value?: string;
  icon?: ReactElement
}

export const GENDER_OPTIONS: Option[] = [
  { label: "any", value: "undefined" },
  { label: "male", value: "male" },
  { label: "female", value: "female" },
];

export const NOBEL_PRIZE_CATEGORIES: Option[] = [
  { label: "all", value: "undefined" },
  { label: "Literature", value: "lit", icon: <BookOpenText/>},
  { label: "Physics", value: "phy", icon: <Atom/> },
  { label: "Peace", value: "pea", icon: <Globe/> },
  { label: "Chemistry", value: "che", icon: <FlaskConical/> },
  { label: "Physiology or Medicine", value: "med", icon: <Syringe/>},
  { label: "Economic Sciences", value: "eco", icon: <AreaChart/> },
];

export const BIRTH_CONTINENT: Option[] = [
  { label: "all", value: "undefined" },
  { label: "Africa", value: "Africa" },
  { label: "Asia", value: "Asia" },
  { label: "Europe", value: "Europe" },
  { label: "North America", value: "North America" },
  { label: "Oceania", value: "Oceania" },
  { label: "South America", value: "South America" },
];
