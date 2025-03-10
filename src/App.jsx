import TranslationApp from "./components/TranslationApp";
import Logo from "./assets/logo.svg";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative ">
      <div
        className="absolute top-0 left-0 w-full h-[50vh] bg-no-repeat bg-cover bg-center "
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 70%, black 100%), url('/hero_img.jpg')",
        }}
      ></div>

      <div className="absolute xl:top-24 md:top-20 left-1/2 -translate-x-1/2 top-14">
        <img src={Logo} alt="Logo" className="w-32" />
      </div>

      <div className="relative z-10">
        <TranslationApp />
      </div>
    </div>
  );
}
export default App;
