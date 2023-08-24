function Home() {
  return (
    <section className="homepage">
      <h1>Read Charts</h1>
      <p>
        Welcome to our cryptocurrency tracking website! Here, you can stay
        updated with the latest prices of various cryptocurrencies using
        real-time data from the CoinGecko API. Our user-friendly platform offers
        a range of valuable features, including interactive charts and essential
        indicators to help you make informed decisions and potentially maximize
        your profits.
      </p>
      <section id="offer">
        <h2>What we offer:</h2>
        <p>
          <span>Real-time Cryptocurrency Prices:</span> Our platform fetches
          data directly from the CoinGecko API, ensuring that you receive the
          most up-to-date prices for a wide range of cryptocurrencies.{" "}
        </p>

        <p>
          <span>Interactive Charts:</span> We provide both Line and Candlestick
          charts, giving you a comprehensive view of the price movements over
          different timeframes. The Line chart offers a smooth visualization of
          price trends, while the Candlestick chart provides valuable insights
          into price fluctuations, including open, close, high, and low values.{" "}
        </p>

        <p>
          <span>Essential Indicators:</span> To assist you in making
          well-informed trading decisions, we offer three essential indicators -
          Exponential Moving Average (EMA), Simple Moving Average (SMA), and the
          combined EMA & SMA indicator. These tools help identify potential
          trends and market sentiment, aiding you in understanding when to buy
          or sell a particular cryptocurrency.
        </p>
      </section>

      <section>
        <h2>How to use our charts to potentially make profit:</h2>
        <div id="use">
          <p>
            <span>Identify Trends:</span> Analyze the price movements displayed
            on our charts to identify upward or downward trends. Trends can
            provide valuable information on potential price movements, helping
            you decide on your trading strategy.
          </p>
          <p>
            <span>Timing Your Trades:</span> Observe the indicators on our
            charts, such as EMA, SMA, or the combined EMA & SMA indicator. These
            indicators can help you pinpoint favorable entry and exit points for
            your trades based on moving average crossovers and market momentum.
          </p>
          <p>
            <span>Risk Management:</span> While our platform offers valuable
            insights, remember that cryptocurrency trading involves inherent
            risks. Set clear risk management strategies, such as stop-loss
            orders, to protect your investments. Stay Informed: Keep yourself
            updated with the latest news and developments in the cryptocurrency
            market. External factors can significantly impact prices, and being
            well-informed can enhance your trading decisions.
          </p>
        </div>
      </section>
    </section>
  );
}

export default Home;
