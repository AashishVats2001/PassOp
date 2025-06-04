import "./App.css";
import Footer from "./components/Footer";
import Manager from "./components/Manager";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#174024_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <Manager />

      <Footer />
    </>
  );
}

export default App;
