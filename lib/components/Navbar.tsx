export default function Navbar() {
  return (
    <nav className="mb-6 flex flex-wrap items-center justify-between text-green-800 ">
      <div className="mr-6 mt-4 flex flex-shrink-0 items-center">
        <img
          alt="Brunswick UNITED logo"
          className="mr-2 w-64 fill-current"
          src="/img/color-logo.webp"
        />
      </div>
      <div className="block flex-grow text-2xl">
        <a
          href="/"
          className="mr-8 block  hover:text-green-900  lg:inline-block"
        >
          Home
        </a>
        {/* <a
          href="/candidates"
          className="block hover:text-green-900 lg:inline-block"
        >
          Our Candidates
        </a> */}
      </div>
    </nav>
  );
}
