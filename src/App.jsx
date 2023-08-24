import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/Homepage";
import Candle from "./pages/charts/Candle";
import Line from "./pages/charts/Line";
import Sma from "./pages/indicators/Sma";
import Ema from "./pages/indicators/Ema";
import Sma_Ema from "./pages/indicators/Sma&Ema";
import Rsi from "./pages/indicators/Rsi";

const client = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<Navbar />}>
              <Route index element={<Homepage />} />
              <Route path="candlestick" element={<Candle />} />
              <Route path="line" element={<Line />} />
              <Route path="sma" element={<Sma />} />
              <Route path="ema" element={<Ema />} />
              <Route path="sma-ema" element={<Sma_Ema />} />
              <Route path="rsi" element={<Rsi />} />
              <Route path="*" element={<h2>Error..</h2>} />
            </Route>
          )
        )}
      />
    </QueryClientProvider>
  );
}

export default App;
