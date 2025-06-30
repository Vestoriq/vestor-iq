export default async function handler(req, res) {
  const API_KEY = process.env.APCA_API_KEY_ID;
  const SECRET_KEY = process.env.APCA_API_SECRET_KEY;

  const order = {
    symbol: "AAPL",
    qty: 1,
    side: "buy",
    type: "market",
    time_in_force: "gtc"
  };

  const result = await fetch("https://paper-api.alpaca.markets/v2/orders", {
    method: "POST",
    headers: {
      "APCA-API-KEY-ID": API_KEY,
      "APCA-API-SECRET-KEY": SECRET_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  const data = await result.json();
  res.status(200).json(data);
}
