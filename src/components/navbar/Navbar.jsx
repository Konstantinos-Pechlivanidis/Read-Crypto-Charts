import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
// import { useSelector } from "react-redux";
import "./Navbar.css"; // import your CSS file for styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
// import { faCoins } from "@fortawesome/free-solid-svg-icons";

import SelectDays from "../Selects/SelectDays";
import SelectPeriod from "../Selects/SelectPeriod";
import Search from "../SearchCrypto/Search";

// import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  // const { value: crypto } = useSelector((state) => state.crypto.coin);

  const [showMenuChart, setShowMenuChart] = useState(false);
  const [iconMenuChart, setIconMenuChart] = useState(false);
  const [showMenuInd, setShowMenuInd] = useState(false);
  const [iconMenuInd, setIconMenuInd] = useState(false);

  const toggleMenuChart = () => {
    setShowMenuChart(!showMenuChart);
    setIconMenuChart(!iconMenuChart);
    setIconMenuInd(false);
  };

  const toggleMenuInd = () => {
    setShowMenuInd(!showMenuInd);
    setIconMenuInd(!iconMenuInd);
    setIconMenuChart(false);
  };

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle isActive state on click
    setIsActive((current) => !current);
  };

  const location = useLocation();
  const hiddenPathsForPeriods = ["/", "/line", "/candlestick"];
  const hiddenPathsForTabs = ["/"];
  const hiddenPathsForSearch = ["/"];
  // const hiddenPathsForCrypto= ["/"];

  const hideSelectPeriod = hiddenPathsForPeriods.includes(location.pathname);
  const hideSelectTabs = hiddenPathsForTabs.includes(location.pathname);
  const hideSearch = hiddenPathsForSearch.includes(location.pathname);
  // const hideCrypto = hiddenPathsForCrypto.includes(location.pathname);

  // const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <FontAwesomeIcon icon={faChartLine} />
          </li>

          <li className="nav-item">
            <a href="/" className="nav-link">
              <FontAwesomeIcon icon={faHouse} />
              <span className="link-text">Home</span>
            </a>
          </li>

          <li className="nav-item nav-link" onClick={toggleMenuChart}>
            <FontAwesomeIcon icon={faChartSimple} />
            <span className="link-text">Charts</span>
            <FontAwesomeIcon
              className="icon-menu"
              icon={iconMenuChart ? faAngleUp : faAngleDown}
            />
          </li>
          <div className={iconMenuChart ? "menu-open" : "menu-hidden"}>
            <ul className="navbar-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="/line">
                  Line
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="/candlestick">
                  Candle
                </a>
              </li>
            </ul>
          </div>

          <li className="nav-item nav-link" onClick={toggleMenuInd}>
            <FontAwesomeIcon icon={faMagnifyingGlassChart} />
            <span className="link-text">Indicators</span>
            <FontAwesomeIcon
              className="icon-menu"
              icon={iconMenuInd ? faAngleUp : faAngleDown}
            />
          </li>
          <div className={iconMenuInd ? "menu-open" : "menu-hidden"}>
            <ul className="navbar-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="/sma">
                  Sma
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="/ema">
                  Ema
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="/sma-ema">
                  Sma&Ema
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="/rsi">
                  Rsi
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </nav>

      <main>
        {!hideSearch && (
          <div className="header">
            <h1>Read Charts</h1>
            <button className="nav-open-btn" onClick={handleClick}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        )}
        {/* {!hideCrypto && <h2 className="crypto"><FontAwesomeIcon icon={faCoins} /> {crypto}</h2>} */}
        <Outlet />
        <div className={isActive ? "tabsMobile" : "tabs "}>
          <button className="nav-close-btn" onClick={handleClick}>
            <FontAwesomeIcon icon={faX} />
          </button>
          {!hideSearch && <Search />}
          {!hideSelectTabs && <SelectDays />}
          {!hideSelectPeriod && <SelectPeriod />}
        </div>
      </main>
    </>
  );
};

export default Navbar;
