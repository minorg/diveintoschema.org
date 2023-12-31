import LicenseLink from "./LicenseLink";
import Link from "./Link";

export default function Footer() {
  return (
    <footer
      className="flex items-center p-4"
      style={{
        background: "var(--foreground-color)",
        color: "var(--background-color)",
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl text-center">
        © 2024 <Link href="https://minorgordon.net">Minor Gordon</Link>
        <br />
        Licensed under the&nbsp;
        <LicenseLink />
      </div>
    </footer>
  );
}
