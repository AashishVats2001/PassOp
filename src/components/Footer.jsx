const Footer = () => {
  return (
    <footer className="py-2  flex flex-col items-center justify-center bg-slate-900 w-full">
      <div>
        <h2>
          <div className="logo font-bold text-3xl text-white">
            <span className="text-green-600">&lt;</span>
            Pass
            <span className="text-green-600">OP/&gt;</span>
          </div>
        </h2>
      </div>
      <div className="flex">
        <h2 className="text-slate-200 text-xl px-1">Created with</h2>
        <lord-icon
          className=" text-amber-600"
          src="https://cdn.lordicon.com/aydxrkfl.json"
          trigger="morph"
          state="morph-slider"
          colors="primary:#7bf1a8,secondary:#000000"
        ></lord-icon>
        <h2 className="text-slate-200 text-xl px-1">
          by{" "}
          <a
            href="https"
            className="text-slate-200 hover:text-green-300 transition duration-300 ease-in-out"
          >
            Aashish Vats
          </a>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
