import { useEffect, useState } from "react";

import TranslateBox from "./TranslateBox";

const TranslationApp = () => {
  const [sourceText, setSourceText] = useState("Hello, how are you?");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!sourceText.trim()) {
      setTranslatedText("");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          sourceText
        )}&langpair=${sourceLang}|${targetLang}`
      );

      if (!response.ok) {
        throw new Error("Error Receiving Translation!");
      }

      const data = await response.json();

      setTranslatedText(
        data.responseData.translatedText || "No translation found."
      );
    } catch (err) {
      console.log(err.message || "An unknown error has occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sourceText.trim() === "") {
      setTranslatedText("");
      return;
    }

    const debounceTimeout = setTimeout(() => {
      translateText();
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [sourceText, sourceLang, targetLang]);

  const handleSwapLanguages = (newSource, newTarget) => {
    setSourceLang(newSource);
    setTargetLang(newTarget);
    setSourceText(translatedText);
  };

  return (
    <div className="flex xl:flex-row flex-col items-center justify-center xl:space-y-0 xl:space-x-2.5 sm:space-y-4 space-y-1 ">
      <TranslateBox
        label="Enter text to translate"
        text={sourceText}
        setText={setSourceText}
        language={sourceLang}
        setLanguage={setSourceLang}
        translateText={translateText}
      />
      <TranslateBox
        label="Translated text"
        text={loading ? "Translating..." : translatedText}
        setText={setTranslatedText}
        language={targetLang}
        setLanguage={setTargetLang}
        isOutput={true}
        ShowElements={false}
        onSwap={handleSwapLanguages}
        currentLanguage={sourceLang}
      />
    </div>
  );
};
export default TranslationApp;
