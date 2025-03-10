import { useEffect, useState } from "react";

import HorizontalIcon from "../assets/Horizontal_top_left_main.svg";

const languages = [
  { code: "auto", name: "Detect Language" },
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "fa", name: "Persian" },
];

const LanguageSelector = ({
  selected,
  onChange,
  ShowElements,
  onSwap,
  currentLanguage,
}) => {
  const [primaryLanguages, setPrimaryLanguages] = useState(
    ShowElements ? languages.slice(0, 3) : languages.slice(1, 3)
  );
  const [otherLanguages, setOtherLanguages] = useState(languages.slice(3));

  useEffect(() => {
    const selectedInOther = otherLanguages.find(
      (lang) => lang.code === selected
    );

    if (selectedInOther) {
      handleLanguageSwap(selected);
    }
  }, [selected, otherLanguages]);

  const handleLanguageSwap = (selectedLanguageCode) => {
    const selectedLanguage = otherLanguages.find(
      (lang) => lang.code === selectedLanguageCode
    );

    if (!selectedLanguage) return;

    const updatedPrimaryLanguages = [
      ...primaryLanguages.slice(0, -1),
      selectedLanguage,
    ];
    const updatedOtherLanguages = sortLanguages([
      ...otherLanguages.filter((lang) => lang.code !== selectedLanguageCode),
      primaryLanguages[primaryLanguages.length - 1],
    ]);

    setPrimaryLanguages(updatedPrimaryLanguages);
    setOtherLanguages(updatedOtherLanguages);
    onChange(selectedLanguageCode);
  };

  const sortLanguages = (languages) =>
    [...languages].sort((a, b) => a.name.localeCompare(b.name));

  const renderLanguageButton = (lang) => (
    <button
      key={lang.code}
      disabled={lang.code === "auto"}
      className={`px-3.5 h-8.5 tracking-wide rounded-xl text-xs sm:text-sm font-medium  transition-all ${
        selected === lang.code
          ? "bg-[#4D5562] text-white"
          : "bg-inherit text-white"
      } ${lang.code !== "auto" && "cursor-pointer"}`}
      onClick={() => onChange(lang.code)}
    >
      {lang.name}
    </button>
  );

  return (
    <div className={`flex items-center ${!ShowElements && "justify-between"}`}>
      <div className={`flex ${ShowElements ? "sm:gap-1" : "sm:gap-4 gap-2"}`}>
        <div className="flex sm:gap-3">
          {primaryLanguages.map(renderLanguageButton)}
        </div>

        <div>
          <select
            value=""
            className="p-2 rounded bg-inherit text-white text-xs sm:text-sm cursor-pointer outline-none focus:ring-0 focus:border-transparent font-medium"
            onChange={(e) => handleLanguageSwap(e.target.value)}
            style={{ backgroundColor: "inherit" }}
          >
            <option value="" disabled className="bg-gray-800 hidden">
              {otherLanguages[0].name}
            </option>
            {otherLanguages.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
                className="bg-gray-800 text-white"
              >
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!ShowElements && (
        <button
          onClick={() => onSwap(selected, currentLanguage)}
          className="bg-inherit border-[2.8px] h-8 p-1 border-[#4D5562]/80 rounded-xl cursor-pointer"
        >
          <img src={HorizontalIcon} alt="Switch Languages" />
        </button>
      )}
    </div>
  );
};

export default LanguageSelector;
