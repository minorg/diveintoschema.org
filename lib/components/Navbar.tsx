import {PuzzlePieceIcon} from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <nav className="mb-6 flex items-center mt-4">
      <div className="flex items-center">
        <PuzzlePieceIcon className="mr-2 w-6" />
        <a href="/" className="mr-8 block lg:inline-block text-xl">
          Dive Into Schema.org
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
