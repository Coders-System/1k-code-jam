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
    <>
      <Navbar />
      <main>
        <h1>
          1K Members <span>CODEJAM</span>
        </h1>
        <Button
          onClick={() => (oauthURL ? (window.location.href = oauthURL) : null)}
        >
          Register Now
        </Button>

        <Section heading="Discord">
          <Button href={DISCORD_INVITE_URL}>Join Coder's System</Button>
        </Section>

        <Section heading="Prizes">
          {prizes.map((p) => (
            <PrizeCard prize={p} />
          ))}
        </Section>
        <Section heading="Rules">
          <ul>
            {rules.map((p) => (
              <li>
                <p>{p}</p>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}

interface PrizeCardProps {
  prize: Prize;
}
export function PrizeCard({ prize }: PrizeCardProps) {
  return (
    <div>
      <p># {prize.position}</p>
      <img src={prize.prizeIcon} alt="prize icon" />
      <p>{prize.prizeText}</p>
    </div>
  );
}
