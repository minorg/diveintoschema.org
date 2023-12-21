export default function Footer() {
  return (
    <footer
      className="flex items-center mt-auto p-4"
      style={{
        background: "var(--foreground-color)",
        color: "var(--background-color)",
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl text-center">
        © 2023 Minor Gordon.
        <br />
        Licensed under the&nbsp;
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          Creative Commons Attribution-ShareAlike License 4.0
        </a>
        .
      </div>
    </footer>
  );
}
