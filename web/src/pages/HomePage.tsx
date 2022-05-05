import { Button } from "../components/Button";
import { Section } from "../components/Section";
import { DISCORD_INVITE_URL, Prize, prizes, rules } from "../constants";

export function HomePage() {
  return (
    <main>
      <h1>
        1K Members <span>CODEJAM</span>
      </h1>
      <Button onClick={() => {}}>Register Now</Button>

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
