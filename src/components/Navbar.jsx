const Navbar = () => {
  return (
    <nav className="bg-slate-900 flex justify-between items-center px-10 py-2 text-white text-xl">
      <div className="logo font-bold">
        <span className="text-green-600">&lt;</span>
        Pass
        <span className="text-green-600">OP/&gt;</span></div>
      <ul>
        <li className="flex gap-3 ">
          <a href="/" className="font-medium hover:font-bold transition duration-300 ease-in-out">Home</a>
          <a href="#" className="font-medium hover:font-bold transition duration-300 ease-in-out">About</a>
          <a href="#" className="font-medium hover:font-bold transition duration-300 ease-in-out">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
