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
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="w-full px-6 lg:px-48 mb-auto">
        <h1 className="font-heading text-4xl text-center leading-relaxed">
          1K Members <span className="text-orange">CODEJAM</span>
        </h1>
        <Button
          className="mt-2 mx-auto font-bold"
          onClick={() => (oauthURL ? (window.location.href = oauthURL) : null)}
        >
          Register Now
        </Button>

        <Section className="mt-16 mb-8" heading="Discord">
          <Button href={DISCORD_INVITE_URL}>Join Coder's System</Button>
        </Section>

        <Section className="mb-8" heading="Prizes">
          <div className="flex gap-3 flex-col lg:flex-row">
            {prizes.map((p) => (
              <PrizeCard prize={p} />
            ))}
          </div>
        </Section>

        <Section className="mb-8" heading="Rules">
          <ul className="ml-6 mt-4 list-disc w-full">
            {rules.map((p) => (
              <li className="">
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
    <div className="bg-lightOrange text-gray-800 rounded-md flex p-3 gap-3 items-center">
      <p className="font-heading text-purple text-lg">#{prize.position}</p>
      <img className="w-8 h-8" src={prize.prizeIcon} alt="prize icon" />
      <p className="">{prize.prizeText}</p>
    </div>
  );
}
