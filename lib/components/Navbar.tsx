import {PuzzlePieceIcon} from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <nav
      className="flex items-center p-4"
      style={{
        background: "var(--foreground-color)",
        color: "var(--background-color)",
      }}
    >
      <div className="flex items-center">
        <PuzzlePieceIcon className="mr-2 w-6" />
        <a href="/" className="mr-8 block lg:inline-block text-xl">
          <b>Dive Into Schema.org</b>
        </a>
      </div>
      <div className="flex-grow text-xl">
        <a href="/candidates" className="blocklg:inline-block">
          Other Page
        </a>
      </div>
    </nav>
  );
}