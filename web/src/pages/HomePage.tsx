import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Section } from "../components/Section";
import { DISCORD_INVITE_URL, Prize, prizes, rules } from "../constants";
import { httpClient } from "../http";
import { ApiRoutes } from "../http/routes";

export function HomePage() {
  // State for holding Oauth url
  const [oauthURL, setOauthUrl] = useState<string | null>();

  useEffect(() => {
    const fetchOauthURL = async () => {
      // Fetching oauth url from API
      const resp = await httpClient.get(ApiRoutes.GET_OAUTH_URL);
      setOauthUrl(resp.data.url);
    };

    fetchOauthURL();
  }, []);

  return (
    <div className="flex flex-col bg-darkPurple">
      <Navbar />
      <section
        id="hero"
        className="h-[85vh] flex items-center flex-col justify-center"
      >
        <p className="text-lg">Coder's System presents</p>
        <h1 className="font-heading mt-2 text-7xl text-center">
          1K Members <span className="text-orange">CODE JAM</span>
        </h1>
        <div className="flex gap-4 mt-8">
          <Button
            onClick={() =>
              oauthURL ? (window.location.href = oauthURL) : null
            }
          >
            Register Now
          </Button>
          <Button href={DISCORD_INVITE_URL}>Join The Discord</Button>
        </div>
      </section>
      <main className="w-full container mx-auto mb-auto mt-10">
        <Section
          className="flex flex-col items-center mb-8 w-full"
          heading="Prizes"
        >
          <div className="flex mt-4 gap-8 flex-col lg:flex-row">
            {prizes.map((p) => (
              <PrizeCard prize={p} />
            ))}
          </div>
        </Section>

        <Section
          className="flex flex-col items-center mb-8 w-full pt-8"
          heading="Rules"
        >
          <ul className="ml-6 mt-4 list-disc w-full">
            {rules.map((p) => (
              <li className="text-lg ">
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

interface PrizeCardProps {
  prize: Prize;
}
export function PrizeCard({ prize }: PrizeCardProps) {
  return (
    <div
      id="prize-card"
      className="cursor-pointer transition duration-200 bg-lightOrange text-gray-800 shadow rounded-md flex px-6 py-4 gap-3 items-center"
    >
      <p className="font-heading text-purple text-lg">#{prize.position}</p>
      <img className="w-8 h-8" src={prize.prizeIcon} alt="prize icon" />
      <p>{prize.prizeText}</p>
    </div>
  );
}
