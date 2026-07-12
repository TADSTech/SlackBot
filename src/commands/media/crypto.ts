import { registerCommand } from "../../utils/register";
import { apiGet } from "../../utils/api";

registerCommand({
  name: "/toc-crypto",
  category: "Media",
  description: "Check a cryptocurrency price",
  handler: async ({ ack, respond, command }) => {
    await ack();
    const coin = command.text?.trim().toLowerCase() || "bitcoin";
    try {
      const data = await apiGet(
        `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
          coin,
        )}&vs_currencies=usd&include_24hr_change=true`,
      );
      if (!data[coin]) {
        await respond({
          text: `Couldn't find crypto "${coin}". Try: bitcoin, ethereum, solana, dogecoin`,
        });
        return;
      }
      const price = data[coin].usd;
      const change = data[coin]["usd_24hr_change"]?.toFixed(2);
      const arrow = change && parseFloat(change) >= 0 ? "📈" : "📉";
      await respond({
        text: `${arrow} *${coin.charAt(0).toUpperCase() + coin.slice(1)}*\nPrice: $${price.toLocaleString()}\n24h Change: ${change || "N/A"}%`,
      });
    } catch {
      await respond({
        text: "Crypto market is volatile — even the API is down. Try again later.",
      });
    }
  },
});
