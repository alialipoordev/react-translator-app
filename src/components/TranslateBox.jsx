import LanguageSelector from "./LanguageSelector";
import CopyIcon from "../assets/Copy.svg";
import SoundIcon from "../assets/sound_max_fill.svg";
import TranslateIcon from "../assets/Sort_alfa.svg";

const TranslateBox = ({
  label,
  text,
  setText,
  language,
  setLanguage,
  isOutput,
  translateText,
  ShowElements = true,
  onSwap,
  currentLanguage,
}) => {
  const maxChars = 500;

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "auto" ? "en" : language;
    speechSynthesis.speak(utterance);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div>
      <div
        className={`p-5 rounded-3xl text-white xl:w-[45vw] sm:w-[90vw] w-[99vw] border-1 border-[#4D5562]/50 `}
        style={{
          backgroundColor: ShowElements ? "#212936CC" : "#121826CC",
        }}
      >
        <div className="my-1">
          <LanguageSelector
            selected={language}
            onChange={setLanguage}
            ShowElements={ShowElements}
            onSwap={onSwap}
            currentLanguage={currentLanguage}
          />
        </div>

        <div className="border-t border-[#4D5562]/50 mt-3.5 mb-1" />

        <textarea
          className={`w-full h-[10rem] resize-none outline-none bg-transparent font-medium pt-5 px-1 overflow-auto custom-scrollbar ${
            !ShowElements && "h-[12.40rem] "
          } text-xs sm:text-sm md:text-base`}
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={maxChars}
          placeholder={label}
          readOnly={isOutput}
        />

        {ShowElements && (
          <div
            className="text-right text-gray-400 text-xs mb-2 pr-1 "
            style={{ minHeight: "20px" }}
          >
            {text.length} / {maxChars}
          </div>
        )}

        <div className="flex justify-between px-[2.7px] ">
          <div className="flex items-end justify-center ">
            <button
              className="bg-inherit p-[6px]  mr-2 border-[2.8px] border-[#4D5562]/80  rounded-xl cursor-pointer"
              onClick={speakText}
            >
              <img src={SoundIcon} alt="Play Sound" />
            </button>
            <button
              className="bg-inherit p-[6px]  border-[2.8px] border-[#4D5562]/80 rounded-xl cursor-pointer"
              onClick={copyToClipboard}
            >
              <img src={CopyIcon} alt="Copy" />
            </button>
          </div>

          <div>
            {ShowElements && (
              <button
                className="bg-[#263FA9] text-white py-2.5 px-5 rounded-xl flex items-center justify-center space-x-3  border-[#7CA9F3] border-[1.9px] cursor-pointer"
                onClick={translateText}
              >
                <img
                  src={TranslateIcon}
                  alt="Translate Icon"
                  className="w-6 h-6"
                />
                <span className="font-medium">Translate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TranslateBox;
