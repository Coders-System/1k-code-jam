import { useContext } from "react";
import { DISCORD_INVITE_URL, SERVER_LOGO } from "../constants";
import { authContext, logout } from "../http/auth";
import { Button } from "./Button";

interface Props {
  oauthURL?: string | null;
}

export const Navbar: React.FC<Props> = ({ oauthURL }) => {
  const user = useContext(authContext);

  return (
    <nav className="bg-darkPurple container mx-auto px-2 py-3 flex items-center justify-between">
      <a href="/" className="flex items-center gap-3">
        <img src={SERVER_LOGO} className="rounded-full h-10" alt="" />
        <p className="text-lg">Coder's System</p>
      </a>
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
        {user ? (
          <Button
            onClick={async () => {
              await logout();
              window.location.href = "/";
            }}
            className="text-lg"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={async () => {
              window.location.href = oauthURL?.toString()!;
            }}
            className="text-lg"
          >
            Register
          </Button>
        )}
      </ul>
    </nav>
  );
};
