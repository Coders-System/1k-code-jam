import { DISCORD_INVITE_URL, SERVER_LOGO } from "../constants";
import { logout } from "../http/auth";
import { Button } from "./Button";

export function Navbar() {
  return (
    <nav className="bg-darkPurple container mx-auto px-2 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={SERVER_LOGO} className="rounded-full h-10" alt="" />
        <p className="text-lg">Coder's System</p>
      </div>
      <ul className="flex items-center gap-7 text-2xl">
        <a target="_blank" rel="noreferrer" href={DISCORD_INVITE_URL}>
          <i className="fa-brands fa-discord"></i>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Coders-System"
        >
          <i className="fa-brands fa-github"></i>
        </a>

        {/* TODO Auth CTX */}
        <Button
          onClick={() => {
            logout();
          }}
        >
          LOGOUT
        </Button>
      </ul>
    </nav>
  );
}
