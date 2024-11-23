import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import oddsData from "../../JSON/Odds";
import moment from "moment";
import { useParams } from "react-router-dom";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import RecentStory from "../../Components/RecentStory";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { FaChampagneGlasses } from "react-icons/fa6";
import { apiCallNew } from "../../Network_Call/apiservices";
import { getToken } from "../../Helper/Storage";
const Data = oddsData;
const apikey = "0119dd31fef7c240837b6c47a04c03ee";

export const OddsScreen = () => {
  const { key } = useParams();
  const token = getToken();
  const [sport, setSport] = React.useState(key ? key : "americanfootball_cfl");
  const [market, setMarket] = React.useState("h2h");

  const [data, setData] = React.useState([]);
  const [cartData, setCartData] = useState(() => {
    const storedMarkets = localStorage.getItem("cartData");
    return storedMarkets ? JSON.parse(storedMarkets) : [];
  });
  const [activeTabs, setActiveTabs] = React.useState("Straights");
  const [parlayBet, setParlayBet] = React.useState();
  const [parlayResult, setParlayResult] = React.useState(0);
  const [bookmakers, setBookmakers] = React.useState([]);
  const [Bookmaker, setBookmaker] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [sportData, setSportData] = React.useState({
    key: "americanfootball_nfl",
    group: "American Football",
    title: "NFL",
    description: "US Football",
    active: true,
    has_outrights: false,
  });
  const totalWager = cartData.reduce(
    (total, market) => total + (market.wager || 0),
    0
  );

  const totalPays = cartData.reduce(
    (total, market) => total + (market.winAmount || 0),
    0
  );
  console.log("BOOKMAKERS", bookmakers);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    if (activeTabs === "Parlay") {
      calculateParlay();
    }
  }, [activeTabs, parlayBet, cartData]);

  const handleSportData = (item) => {
    setSportData(item);
  };

  const SportList = [
    {
      key: "americanfootball_cfl",
      group: "American Football",
      title: "CFL",
      description: "Canadian Football League",
      active: false,
      has_outrights: false,
    },
    {
      key: "americanfootball_ncaaf",
      group: "American Football",
      title: "NCAAF",
      description: "US College Football",
      active: true,
      has_outrights: false,
    },
    {
      key: "americanfootball_ncaaf_championship_winner",
      group: "American Football",
      title: "NCAAF Championship Winner",
      description: "US College Football Championship Winner",
      active: true,
      has_outrights: true,
    },
    {
      key: "americanfootball_nfl",
      group: "American Football",
      title: "NFL",
      description: "US Football",
      active: true,
      has_outrights: false,
    },
    {
      key: "americanfootball_nfl_preseason",
      group: "American Football",
      title: "NFL Preseason",
      description: "US Football",
      active: false,
      has_outrights: false,
    },
    {
      key: "americanfootball_nfl_super_bowl_winner",
      group: "American Football",
      title: "NFL Super Bowl Winner",
      description: "Super Bowl Winner 2024/2025",
      active: true,
      has_outrights: true,
    },
    {
      key: "americanfootball_ufl",
      group: "American Football",
      title: "UFL",
      description: "United Football League",
      active: false,
      has_outrights: false,
    },
    {
      key: "aussierules_afl",
      group: "Aussie Rules",
      title: "AFL",
      description: "Aussie Football",
      active: false,
      has_outrights: false,
    },
    {
      key: "baseball_kbo",
      group: "Baseball",
      title: "KBO",
      description: "KBO League",
      active: true,
      has_outrights: false,
    },
    {
      key: "baseball_milb",
      group: "Baseball",
      title: "MiLB",
      description: "Minor League Baseball",
      active: false,
      has_outrights: false,
    },
    {
      key: "baseball_mlb",
      group: "Baseball",
      title: "MLB",
      description: "Major League Baseball",
      active: true,
      has_outrights: false,
    },
    {
      key: "baseball_mlb_preseason",
      group: "Baseball",
      title: "MLB Preseason",
      description: "Major League Baseball",
      active: false,
      has_outrights: false,
    },
    {
      key: "baseball_mlb_world_series_winner",
      group: "Baseball",
      title: "MLB World Series Winner",
      description: "World Series Winner 2024",
      active: true,
      has_outrights: true,
    },
    {
      key: "baseball_ncaa",
      group: "Baseball",
      title: "NCAA Baseball",
      description: "US College Baseball",
      active: false,
      has_outrights: false,
    },
    {
      key: "baseball_npb",
      group: "Baseball",
      title: "NPB",
      description: "Nippon Professional Baseball",
      active: true,
      has_outrights: false,
    },
    {
      key: "basketball_euroleague",
      group: "Basketball",
      title: "Basketball Euroleague",
      description: "Basketball Euroleague",
      active: true,
      has_outrights: false,
    },
    {
      key: "basketball_nba",
      group: "Basketball",
      title: "NBA",
      description: "US Basketball",
      active: true,
      has_outrights: false,
    },
    {
      key: "basketball_nba_championship_winner",
      group: "Basketball",
      title: "NBA Championship Winner",
      description: "Championship Winner 2024/2025",
      active: true,
      has_outrights: true,
    },
    {
      key: "basketball_nba_preseason",
      group: "Basketball",
      title: "NBA Preseason",
      description: "US Basketball",
      active: false,
      has_outrights: false,
    },
    {
      key: "basketball_nbl",
      group: "Basketball",
      title: "NBL",
      description: "AU National Basketball League",
      active: true,
      has_outrights: false,
    },
    {
      key: "basketball_ncaab",
      group: "Basketball",
      title: "NCAAB",
      description: "US College Basketball",
      active: false,
      has_outrights: false,
    },
    {
      key: "basketball_ncaab_championship_winner",
      group: "Basketball",
      title: "NCAAB Championship Winner",
      description: "US College Basketball Championship Winner",
      active: true,
      has_outrights: true,
    },
    {
      key: "basketball_wnba",
      group: "Basketball",
      title: "WNBA",
      description: "US Basketball",
      active: false,
      has_outrights: false,
    },
    {
      key: "boxing_boxing",
      group: "Boxing",
      title: "Boxing",
      description: "Boxing Bouts",
      active: true,
      has_outrights: false,
    },
    {
      key: "cricket_asia_cup",
      group: "Cricket",
      title: "Asia Cup",
      description: "Asia Cup",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_big_bash",
      group: "Cricket",
      title: "Big Bash",
      description: "Big Bash League",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_caribbean_premier_league",
      group: "Cricket",
      title: "CPLT20",
      description: "Caribbean Premier League",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_icc_world_cup",
      group: "Cricket",
      title: "ICC World Cup",
      description: "ICC World Cup",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_international_t20",
      group: "Cricket",
      title: "International Twenty20",
      description: "International Twenty20",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_ipl",
      group: "Cricket",
      title: "IPL",
      description: "Indian Premier League",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_odi",
      group: "Cricket",
      title: "One Day Internationals",
      description: "One Day Internationals",
      active: true,
      has_outrights: false,
    },
    {
      key: "cricket_psl",
      group: "Cricket",
      title: "Pakistan Super League",
      description: "Pakistan Super League",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_t20_blast",
      group: "Cricket",
      title: "T20 Blast",
      description: "T20 Blast",
      active: false,
      has_outrights: false,
    },
    {
      key: "cricket_test_match",
      group: "Cricket",
      title: "Test Matches",
      description: "International Test Matches",
      active: true,
      has_outrights: false,
    },
    {
      key: "cricket_the_hundred",
      group: "Cricket",
      title: "The Hundred",
      description: "The Hundred",
      active: false,
      has_outrights: false,
    },
    {
      key: "golf_masters_tournament_winner",
      group: "Golf",
      title: "Masters Tournament Winner",
      description: "2025 Winner",
      active: true,
      has_outrights: true,
    },
    {
      key: "golf_pga_championship_winner",
      group: "Golf",
      title: "PGA Championship Winner",
      description: "2025 Winner",
      active: true,
      has_outrights: true,
    },
    {
      key: "golf_the_open_championship_winner",
      group: "Golf",
      title: "The Open Winner",
      description: "2024 Winner",
      active: false,
      has_outrights: true,
    },
    {
      key: "golf_us_open_winner",
      group: "Golf",
      title: "US Open Winner",
      description: "2024 Winner",
      active: false,
      has_outrights: true,
    },
    {
      key: "icehockey_nhl",
      group: "Ice Hockey",
      title: "NHL",
      description: "US Ice Hockey",
      active: true,
      has_outrights: false,
    },
    {
      key: "icehockey_nhl_championship_winner",
      group: "Ice Hockey",
      title: "NHL Championship Winner",
      description: "Stanley Cup Winner 2024/2025",
      active: true,
      has_outrights: true,
    },
    {
      key: "icehockey_sweden_allsvenskan",
      group: "Ice Hockey",
      title: "HockeyAllsvenskan",
      description: "Swedish Hockey Allsvenskan",
      active: true,
      has_outrights: false,
    },
    {
      key: "icehockey_sweden_hockey_league",
      group: "Ice Hockey",
      title: "SHL",
      description: "Swedish Hockey League",
      active: true,
      has_outrights: false,
    },
    {
      key: "lacrosse_pll",
      group: "Lacrosse",
      title: "PLL",
      description: "Premier Lacrosse League",
      active: false,
      has_outrights: false,
    },
    {
      key: "mma_mixed_martial_arts",
      group: "Mixed Martial Arts",
      title: "MMA",
      description: "Mixed Martial Arts",
      active: true,
      has_outrights: false,
    },
    {
      key: "politics_us_presidential_election_winner",
      group: "Politics",
      title: "US Presidential Elections Winner",
      description: "2024 US Presidential Election Winner",
      active: true,
      has_outrights: true,
    },
    {
      key: "rugbyleague_nrl",
      group: "Rugby League",
      title: "NRL",
      description: "Aussie Rugby League",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_africa_cup_of_nations",
      group: "Soccer",
      title: "Africa Cup of Nations",
      description: "Africa Cup of Nations",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_argentina_primera_division",
      group: "Soccer",
      title: "Primera División - Argentina",
      description: "Argentine Primera División",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_australia_aleague",
      group: "Soccer",
      title: "A-League",
      description: "Aussie Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_austria_bundesliga",
      group: "Soccer",
      title: "Austrian Football Bundesliga",
      description: "Austrian Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_belgium_first_div",
      group: "Soccer",
      title: "Belgium First Div",
      description: "Belgian First Division A",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_brazil_campeonato",
      group: "Soccer",
      title: "Brazil Série A",
      description: "Brasileirão Série A",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_brazil_serie_b",
      group: "Soccer",
      title: "Brazil Série B",
      description: "Campeonato Brasileiro Série B",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_chile_campeonato",
      group: "Soccer",
      title: "Primera División - Chile",
      description: "Campeonato Chileno",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_china_superleague",
      group: "Soccer",
      title: "Super League - China",
      description: "Chinese Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_conmebol_copa_america",
      group: "Soccer",
      title: "Copa América",
      description: "CONMEBOL Copa América",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_conmebol_copa_libertadores",
      group: "Soccer",
      title: "Copa Libertadores",
      description: "CONMEBOL Copa Libertadores",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_denmark_superliga",
      group: "Soccer",
      title: "Denmark Superliga",
      description: "Danish Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_efl_champ",
      group: "Soccer",
      title: "Championship",
      description: "EFL Championship",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_england_efl_cup",
      group: "Soccer",
      title: "EFL Cup",
      description: "League Cup",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_england_league1",
      group: "Soccer",
      title: "League 1",
      description: "EFL League 1",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_england_league2",
      group: "Soccer",
      title: "League 2",
      description: "EFL League 2 ",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_epl",
      group: "Soccer",
      title: "EPL",
      description: "English Premier League",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_fa_cup",
      group: "Soccer",
      title: "FA Cup",
      description: "Football Association Challenge Cup",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_fifa_world_cup",
      group: "Soccer",
      title: "FIFA World Cup",
      description: "FIFA World Cup 2022",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_fifa_world_cup_winner",
      group: "Soccer",
      title: "FIFA World Cup Winner",
      description: "FIFA World Cup Winner 2026",
      active: true,
      has_outrights: true,
    },
    {
      key: "soccer_fifa_world_cup_womens",
      group: "Soccer",
      title: "FIFA Women's World Cup",
      description: "FIFA Women's World Cup",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_finland_veikkausliiga",
      group: "Soccer",
      title: "Veikkausliiga - Finland",
      description: "Finnish  Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_france_ligue_one",
      group: "Soccer",
      title: "Ligue 1 - France",
      description: "French Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_france_ligue_two",
      group: "Soccer",
      title: "Ligue 2 - France",
      description: "French Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_germany_bundesliga",
      group: "Soccer",
      title: "Bundesliga - Germany",
      description: "German Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_germany_bundesliga2",
      group: "Soccer",
      title: "Bundesliga 2 - Germany",
      description: "German Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_germany_liga3",
      group: "Soccer",
      title: "3. Liga - Germany",
      description: "German Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_greece_super_league",
      group: "Soccer",
      title: "Super League - Greece",
      description: "Greek Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_italy_serie_a",
      group: "Soccer",
      title: "Serie A - Italy",
      description: "Italian Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_italy_serie_b",
      group: "Soccer",
      title: "Serie B - Italy",
      description: "Italian Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_japan_j_league",
      group: "Soccer",
      title: "J League",
      description: "Japan Soccer League",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_korea_kleague1",
      group: "Soccer",
      title: "K League 1",
      description: "Korean Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_league_of_ireland",
      group: "Soccer",
      title: "League of Ireland",
      description: "Airtricity League Premier Division",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_mexico_ligamx",
      group: "Soccer",
      title: "Liga MX",
      description: "Mexican Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_netherlands_eredivisie",
      group: "Soccer",
      title: "Dutch Eredivisie",
      description: "Dutch Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_norway_eliteserien",
      group: "Soccer",
      title: "Eliteserien - Norway",
      description: "Norwegian Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_poland_ekstraklasa",
      group: "Soccer",
      title: "Ekstraklasa - Poland",
      description: "Polish Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_portugal_primeira_liga",
      group: "Soccer",
      title: "Primeira Liga - Portugal",
      description: "Portugese Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_spain_la_liga",
      group: "Soccer",
      title: "La Liga - Spain",
      description: "Spanish Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_spain_segunda_division",
      group: "Soccer",
      title: "La Liga 2 - Spain",
      description: "Spanish Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_spl",
      group: "Soccer",
      title: "Premiership - Scotland",
      description: "Scottish Premiership",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_sweden_allsvenskan",
      group: "Soccer",
      title: "Allsvenskan - Sweden",
      description: "Swedish Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_sweden_superettan",
      group: "Soccer",
      title: "Superettan - Sweden",
      description: "Swedish Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_switzerland_superleague",
      group: "Soccer",
      title: "Swiss Superleague",
      description: "Swiss Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_turkey_super_league",
      group: "Soccer",
      title: "Turkey Super League",
      description: "Turkish Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_uefa_champs_league",
      group: "Soccer",
      title: "UEFA Champions League",
      description: "European Champions League",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_uefa_champs_league_qualification",
      group: "Soccer",
      title: "UEFA Champions League Qualification",
      description: "European Champions League Qualification",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_uefa_euro_qualification",
      group: "Soccer",
      title: "UEFA Euro Qualification",
      description: "European Championship Qualification",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_uefa_europa_conference_league",
      group: "Soccer",
      title: "UEFA Europa Conference League",
      description: "UEFA Europa Conference League",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_uefa_europa_league",
      group: "Soccer",
      title: "UEFA Europa League",
      description: "European Europa League",
      active: true,
      has_outrights: false,
    },
    {
      key: "soccer_uefa_european_championship",
      group: "Soccer",
      title: "UEFA Euro 2024",
      description: "UEFA European Championship",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_uefa_nations_league",
      group: "Soccer",
      title: "UEFA Nations League",
      description: "UEFA Nations League",
      active: false,
      has_outrights: false,
    },
    {
      key: "soccer_usa_mls",
      group: "Soccer",
      title: "MLS",
      description: "Major League Soccer",
      active: true,
      has_outrights: false,
    },
    {
      key: "tennis_atp_aus_open_singles",
      group: "Tennis",
      title: "ATP Australian Open",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_atp_canadian_open",
      group: "Tennis",
      title: "ATP Canadian Open",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_atp_china_open",
      group: "Tennis",
      title: "ATP China Open",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_atp_cincinnati_open",
      group: "Tennis",
      title: "ATP Cincinnati Open",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_atp_french_open",
      group: "Tennis",
      title: "ATP French Open",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_atp_shanghai_masters",
      group: "Tennis",
      title: "ATP Shanghai Masters",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_atp_us_open",
      group: "Tennis",
      title: "ATP US Open",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_atp_wimbledon",
      group: "Tennis",
      title: "ATP Wimbledon",
      description: "Men's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_aus_open_singles",
      group: "Tennis",
      title: "WTA Australian Open",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_canadian_open",
      group: "Tennis",
      title: "WTA Canadian Open",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_china_open",
      group: "Tennis",
      title: "WTA China Open",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_cincinnati_open",
      group: "Tennis",
      title: "WTA Cincinnati Open",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_french_open",
      group: "Tennis",
      title: "WTA French Open",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_us_open",
      group: "Tennis",
      title: "WTA US Open",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_wimbledon",
      group: "Tennis",
      title: "WTA Wimbledon",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
    {
      key: "tennis_wta_wuhan_open",
      group: "Tennis",
      title: "WTA Wuhan Open",
      description: "Women's Singles",
      active: false,
      has_outrights: false,
    },
  ];
  const teamImages = {
    "Miami Dolphins":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkjtDn-Bjqfksx8JmTF4S6hTMo2pU3EpAOg&s",
    "Arizona Cardinals":
      "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/ari.png",
    "Tampa Bay Buccaneers":
      "https://s.yimg.com/cv/apiv2/default/nfl/20200508/500x500/buccaneers_wbg.png",
    "Atlanta Falcons": "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
    "Cleveland Browns":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5_SHiF_yAYbBSETLZuNEibZVlRkJK9qxng&s",
    "Baltimore Ravens":
      "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/bal.png",
    "Cincinnati Bengals":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDppAnFbz2lOHRN9zJwk9pcR6rJuNIELLW3g&s",
    "Philadelphia Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3dvuXHhgej47jbV4hzvBC5A1SXOutMSMCaQ&s",
    "Detroit Lions":
      "https://i.pinimg.com/564x/b1/25/7e/b1257e5575a2f9fc4be1525d99cbdba7.jpg",
    "Tennessee Titans":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqyWzdbNoWlQ3gNiTRBs25Irr9K8-7ZcctQ&s",
    "Jacksonville Jaguars":
      "https://logos-world.net/wp-content/uploads/2020/05/Jacksonville-Jaguars-logo.png",
    "Green Bay Packers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0jBDfjBjyaoGMWt_R2Ot3w8ZZvfgW1FxPSg&s",
    "Houston Texans ":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4S2cxlWIl7hix8DsFjpnCf8jihH7EV0jhkQ&s",
    "Indianapolis Colts":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzglwjrScKxVzFEoK9W5rPh3Mo8SbcZ7TFA&s",
    "New England Patriots":
      "https://i.pinimg.com/736x/8a/63/ce/8a63ce622b259803664a005af2af1246.jpg",
    "New York Jets":
      "https://upload.wikimedia.org/wikipedia/commons/6/69/New_York_Jets_2024.svg",
    "Los Angeles Chargers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ3XUuD3vggtDNtqHN8cFJZzjKBLTeGwoiWg&s",
    "New Orleans Saints":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAUsJ0RNgSO_iBeYSSfoRvhVpu5ayGSC9CQw&s",
    "Denver Broncos":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScc7P9_0RgZCha0_IMK1aEc4fSWID12i1xNQ&s",
    "Carolina Panthers":
      "https://static.vecteezy.com/system/resources/previews/015/863/696/non_2x/carolina-panthers-logo-on-transparent-background-free-vector.jpg",
    "Washington Commanders":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Washington_Commanders_logo.svg/1200px-Washington_Commanders_logo.svg.png",
    "Chicago Bears":
      "https://i.pinimg.com/originals/89/b2/03/89b2034542640a7163e19b10feae7d8c.jpg",
    "Las Vegas Raiders":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQSPM0GNafhVzkW3we-PhDy8bCSbxqzbkdQ&s",
    "Kansas City Chiefs":
      "https://logos-world.net/wp-content/uploads/2020/05/Kansas-City-Chiefs-logo.png",
    "San Francisco 49ers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrNZ-Akry_wiS5_qyYnFsi9e_A_z1CkrUMmQ&s",
    "Dallas Cowboys":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Dallas_Cowboys.svg/1076px-Dallas_Cowboys.svg.png",
    "Pittsburgh Steelers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pittsburgh_Steelers_logo.svg/2048px-Pittsburgh_Steelers_logo.svg.png",
    "Seattle Seahawks":
      "https://static.www.nfl.com/t_q-best/league/api/clubs/logos/SEA",
    "Buffalo Bills":
      "https://i.pinimg.com/736x/4e/3f/b5/4e3fb55ae54317fbaf15e4f7e8628cb3.jpg",
    "Houston Texans":
      "https://static.www.nfl.com/t_q-best/league/api/clubs/logos/HOU",
    "New York Giants":
      "https://i.pinimg.com/736x/cb/f4/5e/cbf45e420aeabf14c8aff15e02f3acb4.jpg",
    "Los Angeles Rams":
      "https://media.rams.1rmg.com/wp-content/uploads/2020/03/24153922/2020_LA_Mark_thumb_up.png",
    "Minnesota Vikings":
      "https://static.www.nfl.com/t_q-best/league/api/clubs/logos/MIN",
    "Toronto Argonauts":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjNligZVHoY5xXPLoYx8GoaSWIgeKVG4eJg&s",
    "Florida International Panthers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/FIU_Panthers_logo.svg/800px-FIU_Panthers_logo.svg.png",
    "Texas State Bobcats":
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Texas_State_Bobcats_logo.svg/640px-Texas_State_Bobcats_logo.svg.png",
    "Sam Houston State Bearkats":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibMSvFLHicJvVtY3rYUIVvtAIcnfUcWxClw&s",
    "Louisiana Tech Bulldogs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzENC-yroo1QjC7zeTeyfJKzpFxCULsb6SjQ&s",
    "Liberty Flames":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQRZCa5Djo_GS2EriJR_cQUsGbah5_qKAnJw&s",
    "Jacksonville State Gamecocks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Jacksonville_State_Gamecocks_logo.svg/800px-Jacksonville_State_Gamecocks_logo.svg.png",
    "Western Kentucky Hilltoppers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/WKU_Athletics_logo.svg/1200px-WKU_Athletics_logo.svg.png",
    "Kennesaw State Owls":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/WKU_Athletics_logo.svg/1200px-WKU_Athletics_logo.svg.png",
    "New Mexico State Aggies":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/New_Mexico_State_Aggies_logo.svg/800px-New_Mexico_State_Aggies_logo.svg.png",
    "Louisiana Ragin Cajuns":
      "https://1000logos.net/wp-content/uploads/2021/06/Louisiana-Ragin-Cajuns-logo.png",
    "Charlotte 49ers":
      "https://static.charlotte49ers.com/custompages/New%20logos/Primary_C_RGB_7484.png",
    "Tulane Green Wave":
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Tulane_Green_Wave_logo.svg/1200px-Tulane_Green_Wave_logo.svg.png",
    "Ottawa Redblacks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa57oOcscrYo7STspGQHMJGNMG4242MUyzTg&s",
    "Saskatchewan Roughriders":
      "https://i.pinimg.com/originals/e8/b7/46/e8b746398101e297622be001814d6b57.gif",
    "BC Lions":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGhNPmJI4sKkyvi8ifjMZ_c4UBK4N-W48wQ&s",
    "Kennesaw State Owls":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpamIyjM4-BJyEEZQuPtjrUu5FCprY66kGnQ&s",
    "UConn Huskies":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6A4QEZ2dAl5alkNc632xyr4fouQlr4VcOw&s",
    "Georgia State Panthers":
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Georgia_State_Athletics_logo.svg",
    "Florida Atlantic Owls":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkQU9ZaWGU2SUvgWMOXFlD5E5uAlpOPt1tgA&s",
    "South Florida Bulls":
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Official_USF_Bulls_Athletic_Logo.png",
    "Kia Tigers":
      "https://upload.wikimedia.org/wikipedia/en/e/e0/Kia_Tigers_2017_New_Team_Logo.png",
    "Samsung Lions":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbkD8Xn5tLzuHIyAs6Gjl1hXyHNUwmDoHf3g&s",
    "New York Yankees":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6h3rsvDZBUGa9nMjhl71KvUUoYPZJc7rv0w&s",
    "Los Angeles Dodgers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Los_Angeles_Dodgers_Logo.svg/640px-Los_Angeles_Dodgers_Logo.svg.png",
    "Fukuoka SoftBank Hawks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Softbank_hawks_emblem.svg/1200px-Softbank_hawks_emblem.svg.png",
    "Yokohama DeNA BayStars":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdn9TwUvBcbZ4d6OJ31yvXKABC8vgt-ttuzw&s",
    "Ohio State Buckeyes":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ohio_State_Buckeyes_logo.svg/1200px-Ohio_State_Buckeyes_logo.svg.png",
    "Texas Longhorns":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Texas_Longhorns_logo.svg/1200px-Texas_Longhorns_logo.svg.png",
    "Gonzaga Bulldogs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbJzW41l0zd4sb3o6ixV-G3EHNkUgFq9D0og&s",
    "Baylor Bears":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYIP8pRPJtpjvmDw7Q9MGHpUm_3EvExCP13A&s",
    Nepal: "https://cdn.worldvectorlogo.com/logos/nepal-1.svg",
    Scotland:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQXXcqTsJdsanTfYOCY5phWLeJSTICITn5g&s",
    Bangladesh:
      "https://i.pinimg.com/originals/94/0e/8e/940e8e796893938ca9d483219e57d492.jpg",
    "South Africa":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC49PeN61VvuP7ORqGKr_cFHFyZRlF8DdU6w&s",
    "Brisbane Roar":
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Brisbane_Roar_FC_logo.svg/1200px-Brisbane_Roar_FC_logo.svg.png",
    "Sydney FC":
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Sydney_FC_Logo.svg/1200px-Sydney_FC_Logo.svg.png",
    "Coastal Carolina Chanticleers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Coastal_Carolina_Chanticleers_logo.svg/1200px-Coastal_Carolina_Chanticleers_logo.svg.png",
    "Appalachian State Mountaineers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jB5Py9_7R7wl6cI7MCOe_n6n1vi5TyUpFA&s",
    "East Carolina Pirates":
      "https://upload.wikimedia.org/wikipedia/en/c/c7/East_Carolina_Pirates_logo.svg",
    "Wake Forest Demon Deacons":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTokSf00bdqJJoBfUy0JMhVKwuM8SDac3My5A&s",
    "California Golden Bears":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFTXOT5G47H31zVnvtIyEyIwYf36V8NidrQ&s",
    "Montreal Alouettes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt9Va1Hpuf5zW_EQbgYq1v859oBHNSpZwmg&s",
    "Winnipeg Blue Bombers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt9Va1Hpuf5zW_EQbgYq1v859oBHNSpZwmg&s",
    "Winnipeg Blue Bombers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8_2WzZutk2qDDuXSEf5TCm-L2OVySoLtalg&s",
    "Brynäs IF":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSorUs4k9sOAoyc1sdeXH9fI8XFLSdPqCXnbg&s",
    "UCLA Bruins":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_HDseanPbGEwlTxlEYUjo2O8YdQIWsHKOg&s",
    "Iowa Hawkeyes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQkUnTXylCBou7z-WzwE2o25a_L7xHGk3MA&s",
    "Memphis Tigers":
      "https://upload.wikimedia.org/wikipedia/en/4/45/Memphis_Tigers_logo.svg",
    "Rice Owls":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rice_Owls_logo.svg/640px-Rice_Owls_logo.svg.png",
  };
  useEffect(() => {
    fetchEvent();
  }, [sport]);
  useEffect(() => {
    if (data?.[0]?.bookmakers) {
      const bookmakerKeysAndTitles = data[0].bookmakers.map((bookmaker) => ({
        key: bookmaker.key,
        title: bookmaker.title,
      }));
      setBookmakers(bookmakerKeysAndTitles);
    }
  }, [data]);
  const handleBookmaker = (e) => {
    setBookmaker(e.target.value);
  };
  const handleSelect = (key) => {
    setActiveTabs(key);
  };

  const handleSportClick = (prev) => {
    setCartData((currentCartData) => [...currentCartData, prev]);
  };

  const handleRemoveMarket = (index) => {
    const updatedMarkets = cartData.filter((_, i) => i !== index);
    setCartData(updatedMarkets);
  };

  const handleWagerChange = (index, wager) => {
    setCartData((prevMarkets) =>
      prevMarkets.map((market, i) =>
        i === index
          ? {
              ...market,
              wager,
              winAmount:
                market.price > 0
                  ? (market.price / 100) * wager
                  : (100 / Math.abs(market.price)) * wager,
            }
          : market
      )
    );
  };

  const convertToDecimalOdds = (price) => {
    if (price > 0) {
      // For positive odds, calculate: 1 + (price / 100)
      return price / 100 + 1;
    } else if (price < 0) {
      // For negative odds, calculate: 1 + (100 / |price|)
      return 100 / Math.abs(price) + 1;
    }
    return 1; // Default if odds are zero or invalid
  };

  const calculateParlay = () => {
    const wagerAmount = parseFloat(parlayBet) || 0;

    // Calculate the total odds for the parlay by reducing the betData array
    const totalOdds = cartData.reduce((acc, data) => {
      let price = parseFloat(data?.price); // Parse the odds for each bet

      if (price) {
        price = convertToDecimalOdds(price); // Convert the odds to decimal format
      }

      return acc * (price || 1); // Multiply the accumulated odds with the current odds
    }, 1);

    // Calculate the total result by multiplying the wager amount with the total odds
    const result = wagerAmount * totalOdds;
    const result2 = result - parlayBet;
    // Set the result to the state with 2 decimal points
    setParlayResult(result2.toFixed(2));
  };

  const SubmitPlaceBet = async () => {
    const formData = new FormData();

    for (let item of cartData) {
      if ((activeTabs == "Straights" && !item.wager) || item.wager <= 0) {
        toast.error(`Please enter wager amount`);
        return;
      }
      if ((activeTabs == "Parlay" && !parlayBet) || parlayBet <= 0) {
        toast.error(`Please enter wager amount`);
        return;
      }
    }

    cartData?.forEach((item, index) => {
      formData.append(`odds[${index}][market_key]`, item.market);
      formData.append(`odds[${index}][outcomes_odds_price1]`, item.price);
      formData.append(`odds[${index}][sport_name]`, item.team);
      formData.append(`odds[${index}][outcomes_odds_point1]`, item.point);
      formData.append(`odds[${index}][amount]`, item.wager);
      formData.append(
        `odds[${index}][win_amount]`,
        item?.winAmount?.toFixed(2)
      );
      formData.append(`odds[${index}][outcomes_odds_price2]`, 0);
      formData.append(`odds[${index}][outcomes_odds_point2]`, 0);
      formData.append(`odds[${index}][loss_amount]`, 0);
      formData.append(`odds[${index}][sport_key]`, item.key);
      formData.append(`odds[${index}][sport_id]`, item.id);
      formData.append(`odds[${index}][sport_name]`, item.title);
    });
    formData.append(`bet_type`, activeTabs);
    formData.append(
      `total_amount`,
      activeTabs == "Straights" ? totalWager?.toFixed(2) : parlayBet
    );
    formData.append(
      `bet_win_amount`,
      activeTabs == "Straights" ? totalPays?.toFixed(2) : parlayResult
    );
    formData.append(`bet_loss_amount`, 0);

    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.PlaceBet
      );
      if (response.success === true) {
        toast.success(response.msg);
        setLoad(false);
        setCartData([]);
        setParlayBet(0);
        setParlayResult(0);
      } else {
        toast.error(response.msg);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const BetSlip = () => {
    return (
      <Container className="border  rounded p-4">
        <Row className="d-flex justify-content-between align-items-center mb-3">
          <Col xs="auto">
            <h5 className="mb-0">
              Betslip <Badge bg="success">{cartData.length}</Badge>
            </h5>
          </Col>
          <Col xs="auto">
            <Button
              variant="link"
              size="sm"
              className="p-0 text-decoration-none ms-3"
            >
              Settled
            </Button>
          </Col>
        </Row>

        <Row className="d-flex justify-content-between align-items-center mb-2">
          {cartData?.length == 2 && (
            <Col xs="auto">
              <Tabs
                className="mb-2 odds-tab-bar-new border-bottom-0"
                onSelect={handleSelect}
              >
                <Tab eventKey="Straights" title="Straights"></Tab>
                <Tab eventKey="Parlay" title="Parlay"></Tab>
              </Tabs>
            </Col>
          )}
          <Col xs="auto">
            <Button
              onClick={() => setCartData([])}
              variant="link"
              size="sm"
              className="text-danger p-0"
            >
              Clear All
            </Button>
          </Col>
        </Row>

        {activeTabs === "Straights" ? (
          <>
            <div style={{ maxHeight: "350px" }} className="overflow-y-scroll">
              {cartData?.length === 0 && (
                <p className="text-center">No bets added</p>
              )}

              {cartData?.map((market, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <Row className="justify-content-between align-items-center">
                      <Row className="d-flex ">
                        <Col xs={10} md={10} className="">
                          <Card.Title
                            className="mb-0"
                            style={{ fontSize: "16px" }}
                          >
                            {market?.team}
                          </Card.Title>
                        </Col>
                        <Col xs={2} md={2} className="p-0 text-end">
                          <MdDelete
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveMarket(index)}
                          />
                        </Col>
                      </Row>

                      <Col xs="auto" className=" ">
                        <span className="fw-bold">
                          {market?.name === "Over"
                            ? "Over"
                            : market?.name === "Under"
                            ? "Under"
                            : ""}{" "}
                          {market?.point}
                        </span>
                        <span className="text-muted">({market?.price})</span>
                        <span className="text-muted small fw-bold   ms-1">
                          {market?.home_team?.slice(0, 3).toUpperCase()}@
                          {market?.away_team?.slice(0, 3).toUpperCase()}
                        </span>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col lg={12}>
                        <div className="d-flex flex-column">
                          <div>
                            <span
                              className="fw-bold"
                              style={{ fontSize: "12px", marginBottom: "5px" }}
                            >
                              ({market?.bookmaker})
                            </span>
                            <span
                              className="ms-2"
                              style={{ fontSize: "12px", marginBottom: "5px" }}
                            >
                              {market?.market == "h2h"
                                ? "Moneyline"
                                : market?.market}
                            </span>
                          </div>

                          <span>Wager</span>
                          <input
                            key={index}
                            type="text"
                            placeholder="0.00"
                            className="form-control"
                            value={market.wager || ""}
                            onChange={(e) =>
                              handleWagerChange(
                                index,
                                parseFloat(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="d-flex flex-column">
                          <span>To Win</span>
                          <input
                            placeholder="0.00"
                            className="form-control"
                            value={market?.winAmount?.toFixed(2) || ""}
                            readOnly
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Row className="mt-2 mb-2">
              <Col xs={6}>
                <h6>Cash Wager:</h6>
              </Col>
              <Col xs={6} className="text-end">
                <h6>${totalWager.toFixed(2)}</h6>
              </Col>
            </Row>

            <Row className="mt-2 mb-4">
              <Col xs={6}>
                <h6>Pays:</h6>
              </Col>
              <Col xs={6} className="text-end">
                <h6>${totalPays.toFixed(2)}</h6>
              </Col>
            </Row>

            <Button
              disabled={!token || cartData?.length === 0}
              variant="#155239"
              style={{ backgroundColor: "#155239", color: "white" }}
              size="lg"
              className="w-100"
              onClick={SubmitPlaceBet}
            >
              Bet Now
            </Button>
          </>
        ) : (
          <>
            <div
              style={{ maxHeight: "350px" }}
              className="overflow-y-scroll overflow-x-hidden"
            >
              {cartData?.length === 0 && (
                <p className="text-center">No bets added</p>
              )}
              {cartData?.length > 0 && (
                <Row className="mt-2 mb-2">
                  <Col lg={12}>
                    <div className="d-flex flex-column">
                      <span>Wager</span>
                      <input
                        type="text"
                        placeholder="0.00"
                        className="form-control"
                        value={parlayBet}
                        onChange={(e) => setParlayBet(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="d-flex flex-column">
                      <span>To Win</span>
                      <input
                        placeholder="0.00"
                        className="form-control"
                        value={parlayResult}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
              )}
              {cartData?.map((market, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <Row className="justify-content-between align-items-center">
                      <Row className="d-flex ">
                        <Col xs={10} md={10} className="">
                          <Card.Title
                            className="mb-0"
                            style={{ fontSize: "16px" }}
                          >
                            {market?.team}
                          </Card.Title>
                        </Col>
                        <Col xs={2} md={2} className="p-0 text-end">
                          <MdDelete
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveMarket(index)}
                          />
                        </Col>
                      </Row>

                      <Col xs="auto" className=" ">
                        <span className="fw-bold"> {market?.point}</span>
                        <span className="text-muted"> ({market?.price})</span>
                        <span className="text-muted small fw-bold   ms-1">
                          {market?.home_team?.slice(0, 3).toUpperCase()}@
                          {market?.away_team?.slice(0, 3).toUpperCase()}
                        </span>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      {market?.market !== "h2h" && (
                        <Col lg={12}>
                          <div className="d-flex flex-column">
                            <div>
                              <span
                                className="fw-bold"
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "5px",
                                }}
                              >
                                ({market?.bookmaker})
                              </span>
                              <span
                                className="ms-2"
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "5px",
                                }}
                              >
                                {market?.market == "h2h"
                                  ? "Moneyline"
                                  : market?.market}
                              </span>
                            </div>
                            <input
                              type="text"
                              placeholder="0.00"
                              className="form-control"
                              value={market.point || ""}
                              readOnly
                            />
                          </div>
                        </Col>
                      )}

                      <Col lg={12}>
                        <div className="d-flex flex-column">
                          <span>Odds</span>
                          <input
                            placeholder="0.00"
                            className="form-control"
                            value={market.price || ""}
                            readOnly
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Row className="mt-2 mb-2">
              <Col xs={6}>
                <h6>Cash Wager:</h6>
              </Col>
              <Col xs={6} className="text-end">
                <h6>${parlayBet}</h6>
              </Col>
            </Row>

            <Row className="mt-2 mb-4">
              <Col xs={6}>
                <h6>To Win:</h6>
              </Col>
              <Col xs={6} className="text-end">
                <h6>${parlayResult}</h6>
              </Col>
            </Row>

            <Button
              onClick={SubmitPlaceBet}
              variant="#155239"
              style={{ backgroundColor: "#155239", color: "white" }}
              size="lg"
              className="w-100"
            >
              Bet Now
            </Button>
          </>
        )}
      </Container>
    );
  };
  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${ApiEndPoints.ApiKey}&regions=us&markets=totals,h2h,spreads&oddsFormat=american`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("response", data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col lg={12}>
          <h4 className="text-start fw-bold">Odds & Betting Lines</h4>
        </Col>
      </Row>
      <Form>
        <Row className="mt-3">
          <Col md={4}>
            <Form.Group controlId="firstSelect">
              <Form.Label className="fw-bold">Sports</Form.Label>
              <Form.Select
                value={sport}
                onChange={(e) => {
                  const selectedSport = SportList?.find(
                    (s) => s.key === e.target.value
                  );
                  setSport(e.target.value);
                  handleSportData(selectedSport);
                }}
                className=""
              >
                {SportList.map((sport, index) => (
                  <option className="fw-bold" key={index} value={sport.key}>
                    {sport.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group onChange={handleBookmaker} controlId="secondSelect">
              <Form.Label className="fw-bold">Bookmakers</Form.Label>
              <Form.Select
                className=""
                value={Bookmaker}
                onChange={(e) => setMarket(e.target.value)}
              >
                {bookmakers?.map((bookmaker, index) => (
                  <option className="fw-bold" key={index} value={bookmaker.key}>
                    {bookmaker.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className="mt-3">
        <Col className="text-start" lg={8}>
          <div className="odds-table">
            {data.map((game) => {
              const fanduelBookmaker = game?.bookmakers.find(
                (bookmaker) => bookmaker.key === Bookmaker
              );

              const moneylineMarket = fanduelBookmaker?.markets.find(
                (market) => market.key === "h2h"
              );
              const spreadMarket = fanduelBookmaker?.markets.find(
                (market) => market.key === "spreads"
              );
              const totalsMarket = fanduelBookmaker?.markets.find(
                (market) => market.key === "totals"
              );
              if (!fanduelBookmaker) return null;
              return (
                <div key={game.id} className="game-row">
                  <Row className="mb-4">
                    <Col lg={5}>
                      <div className="team-info d-flex align-items-center">
                        <img
                          src={
                            teamImages[moneylineMarket?.outcomes[0].name] ||
                            "https://assets.actionnetwork.com/372790_jets.png"
                          }
                          alt={game.home_team}
                          className="team-logo"
                          style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "10px",
                          }}
                        />
                        <span className="team-name">
                          {moneylineMarket?.outcomes[0].name}
                        </span>
                      </div>
                    </Col>

                    <Col lg={7} sm={12} md={12}>
                      <Row className="text-center justify-content-evenly font-weight-bold text-muted">
                        <Col xs={2} className="fw-bold">
                          Moneyline
                        </Col>
                        <Col xs={2} className="fw-bold">
                          Spread
                        </Col>
                        <Col xs={2} className="fw-bold">
                          Total
                        </Col>
                      </Row>

                      <Row className="justify-content-evenly text-center mt-2">
                        <Col xs={2}>
                          {moneylineMarket?.outcomes[0] && (
                            <Button
                              variant="outline-secondary"
                              style={{ minWidth: "100px", minHeight: "62px" }}
                              disabled={!moneylineMarket?.outcomes[0].price}
                              onClick={() =>
                                handleSportClick({
                                  market:
                                    moneylineMarket.key == "h2h"
                                      ? "moneyline"
                                      : moneylineMarket.key,
                                  price: moneylineMarket?.outcomes[0].price,
                                  name: moneylineMarket?.outcomes[0].name,
                                  team: moneylineMarket?.outcomes[0].name,
                                  home_team: game?.home_team,
                                  away_team: game?.away_team,
                                  ...moneylineMarket?.outcomes[0],
                                  key: sportData?.key,
                                  title: sportData?.title,
                                  id: game?.id,
                                  bookmaker: Bookmaker,
                                })
                              }
                            >
                              {moneylineMarket?.outcomes[0].price > 0
                                ? `+${moneylineMarket?.outcomes[0].price}`
                                : moneylineMarket?.outcomes[0].price}
                            </Button>
                          )}
                        </Col>

                        <Col xs={2}>
                          {spreadMarket?.outcomes[0] && (
                            <Button
                              variant="outline-secondary"
                              style={{ minWidth: "100px", minHeight: "62px" }}
                              disabled={!spreadMarket?.outcomes[0].price}
                              onClick={() =>
                                handleSportClick({
                                  market: spreadMarket.key,
                                  price: spreadMarket?.outcomes[0].price,
                                  name: spreadMarket?.outcomes[0].name,
                                  team: spreadMarket?.outcomes[0].name,
                                  home_team: game?.home_team,
                                  away_team: game?.away_team,
                                  ...spreadMarket?.outcomes[0],
                                  key: sportData?.key,
                                  title: sportData?.title,
                                  id: game?.id,
                                  bookmaker: Bookmaker,
                                })
                              }
                            >
                              {spreadMarket?.outcomes[0].point > 0
                                ? `+${spreadMarket?.outcomes[0].point}`
                                : spreadMarket?.outcomes[0].point}
                              <br />(
                              {spreadMarket?.outcomes[0].price > 0
                                ? `+${spreadMarket?.outcomes[0].price}`
                                : spreadMarket?.outcomes[0].price}
                              )
                            </Button>
                          )}
                        </Col>

                        <Col xs={2}>
                          {totalsMarket?.outcomes[0] && (
                            <Button
                              variant="outline-secondary"
                              style={{ minWidth: "100px", minHeight: "62px" }}
                              disabled={!totalsMarket?.outcomes[0].price}
                              onClick={() =>
                                handleSportClick({
                                  market: totalsMarket.key,
                                  price: totalsMarket?.outcomes[0].price,
                                  name: totalsMarket?.outcomes[0].name,
                                  team: moneylineMarket?.outcomes[0].name,
                                  home_team: game?.home_team,
                                  away_team: game?.away_team,
                                  ...totalsMarket?.outcomes[0],
                                  key: sportData?.key,
                                  title: sportData?.title,
                                  id: game?.id,
                                  bookmaker: Bookmaker,
                                })
                              }
                            >
                              o{totalsMarket?.outcomes[0].point}
                              <br />(
                              {totalsMarket?.outcomes[0].price > 0
                                ? `+${totalsMarket?.outcomes[0].price}`
                                : totalsMarket?.outcomes[0].price}
                              )
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={5}>
                      <div className="team-info d-flex align-items-center mt-1">
                        <img
                          src={
                            teamImages[moneylineMarket?.outcomes[1].name] ||
                            "https://assets.actionnetwork.com/372790_jets.png"
                          }
                          alt={game.away_team}
                          className="team-logo"
                          style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "10px",
                          }}
                        />
                        <span className="team-name">
                          {moneylineMarket?.outcomes[1].name}
                        </span>
                      </div>
                    </Col>

                    <Col lg={7} sm={12} md={12}>
                      <Row className="justify-content-evenly text-center mt-2">
                        <Col xs={2}>
                          {moneylineMarket?.outcomes[1] && (
                            <Button
                              variant="outline-secondary"
                              style={{ minWidth: "100px", minHeight: "62px" }}
                              disabled={!moneylineMarket?.outcomes[1].price}
                              onClick={() =>
                                handleSportClick({
                                  market:
                                    moneylineMarket.key == "h2h"
                                      ? "moneyline"
                                      : moneylineMarket.key,
                                  price: moneylineMarket?.outcomes[1].price,
                                  name: moneylineMarket?.outcomes[1].name,
                                  team: moneylineMarket?.outcomes[1].name,
                                  home_team: game?.home_team,
                                  away_team: game?.away_team,
                                  ...moneylineMarket?.outcomes[1],
                                  key: sportData?.key,
                                  title: sportData?.title,
                                  id: game?.id,
                                  bookmaker: Bookmaker,
                                })
                              }
                            >
                              {moneylineMarket?.outcomes[1].price > 0
                                ? `+${moneylineMarket?.outcomes[1].price}`
                                : moneylineMarket?.outcomes[1].price}
                            </Button>
                          )}
                        </Col>

                        <Col xs={2}>
                          {spreadMarket?.outcomes[1] && (
                            <Button
                              variant="outline-secondary"
                              style={{ minWidth: "100px", minHeight: "62px" }}
                              disabled={!spreadMarket?.outcomes[1].price}
                              onClick={() =>
                                handleSportClick({
                                  market: spreadMarket?.key,
                                  price: spreadMarket?.outcomes[1].price,
                                  name: spreadMarket?.outcomes[1].name,
                                  team: spreadMarket?.outcomes[1].name,
                                  home_team: game?.home_team,
                                  away_team: game?.away_team,
                                  ...spreadMarket?.outcomes[1],
                                  key: sportData?.key,
                                  title: sportData?.title,
                                  id: game?.id,
                                  bookmaker: Bookmaker,
                                })
                              }
                            >
                              {spreadMarket?.outcomes[1].point > 0
                                ? `+${spreadMarket?.outcomes[1].point}`
                                : spreadMarket?.outcomes[1].point}
                              <br />(
                              {spreadMarket?.outcomes[1].price > 0
                                ? `+${spreadMarket?.outcomes[1].price}`
                                : spreadMarket?.outcomes[1].price}
                              )
                            </Button>
                          )}
                        </Col>
                        <Col xs={2}>
                          {totalsMarket?.outcomes[1] && (
                            <Button
                              variant="outline-secondary"
                              style={{ minWidth: "100px", minHeight: "62px" }}
                              disabled={!totalsMarket?.outcomes[1].price}
                              onClick={() =>
                                handleSportClick({
                                  market: totalsMarket.key,
                                  price: totalsMarket?.outcomes[1].price,
                                  name: totalsMarket?.outcomes[1].name,
                                  team: moneylineMarket?.outcomes[1].name,
                                  home_team: game?.home_team,
                                  away_team: game?.away_team,
                                  ...totalsMarket?.outcomes[1],
                                  key: sportData?.key,
                                  title: sportData?.title,
                                  id: game?.id,
                                  bookmaker: Bookmaker,
                                })
                              }
                            >
                              u{totalsMarket?.outcomes[1].point}
                              <br />(
                              {totalsMarket?.outcomes[1].price > 0
                                ? `+${totalsMarket?.outcomes[1].price}`
                                : totalsMarket?.outcomes[1].price}
                              )
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={12} className="text-start mt-3">
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          marginTop: "10px",
                        }}
                      >
                        {moment(game?.commence_time).format(
                          "MMMM Do YYYY, h:mm A"
                        )}
                      </p>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        </Col>
        <Col lg={4}>{BetSlip()}</Col>
      </Row>
      <RecentStory />
    </Container>
  );
};
