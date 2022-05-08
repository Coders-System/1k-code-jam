import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PrizeCard } from "../components/PrizeCard";
import { Section } from "../components/Section";
import { DISCORD_INVITE_URL, prizes, rules } from "../constants";
import { authContext, getOAuthCallbackURL } from "../http/auth";

export function HomePage() {
  // State for holding Oauth url
  const [oauthURL, setOauthUrl] = useState<string | null>();
  const user = useContext(authContext);

  useEffect(() => {
    getOAuthCallbackURL().then((url) => setOauthUrl(url));
  }, []);

  return (
    <div className="flex flex-col bg-darkPurple">
      <Navbar oauthURL={oauthURL} />
      <section
        id="hero"
        className="h-[85vh] flex items-center flex-col justify-center"
      >
        <p className="text-lg">Coder's System presents</p>
        <h1 className="font-heading mt-2 text-7xl text-center">
          1K Members <span className="text-orange">CODE JAM</span>
        </h1>
        <div className="flex gap-4 mt-8">
          {user ? (
            <Button href="/dashboard">Dashboard</Button>
          ) : (
            <Button
              onClick={() =>
                oauthURL ? (window.location.href = oauthURL) : null
              }
            >
              Register Now
            </Button>
          )}
          <Button href={DISCORD_INVITE_URL}>Join The Discord</Button>
        </div>
      </section>
      <main className="w-full container px-2 mx-auto mb-auto mt-10">
        <Section
          className="flex flex-col items-center mb-8 w-full"
          heading="Prizes"
        >
          <div className="flex mt-4 gap-8 flex-col lg:flex-row">
            {prizes.map((p, i) => (
              <PrizeCard key={i} prize={p} />
            ))}
          </div>
        </Section>

        <Section
          className="flex flex-col items-center mb-8 w-full pt-8"
          heading="Rules"
        >
          <ul className="mt-4 list-disc ml-6">
            {rules.map((p, i) => (
              <li key={i} className="lg:text-lg my-2">
                <p>{p}</p>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
