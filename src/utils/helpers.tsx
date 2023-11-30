import { AreaChart, Atom, BookOpenText, FlaskConical, Globe, Syringe } from "lucide-react";

export const ERROR_HELPER_MESSAGES = {
    birthAfterDeath:
      "The year of death cannot be earlier than the year of birth.",
    awardBeforeBirth: "Year awarded cannot be earlier than the year of birth.",
    birthDateFromTo: "Birth year (to) must be later than birth year (from).",
    deathDateFromTo: "Death year (to) must be later than death year (from).",
    deathToEnable: "Fill in Year of Death (from) to enable this field.",
    birthToEnable: "Fill in Year of Birth (from) to enable this field.",
    awardToEnable: "Fill in Year Awarded (from) to enable this field.",
  };

  export const CATEGORY_ICONS: any = {
    Literature: { icon: <BookOpenText />, color: "#910d2e" },
    Peace: { icon: <Globe />, color: "#6fc5f7" },
    Physics: { icon: <Atom />, color: "#1d30c2" },
    Chemistry: { icon: <FlaskConical />, color: "#8f34eb" },
    "Physiology or Medicine": { icon: <Syringe />, color: "#3cb5a9" },
    "Economic Sciences": { icon: <AreaChart />, color: "#1aa343" },
  };
