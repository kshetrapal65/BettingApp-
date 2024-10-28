// import React from "react";

// const SportsTitle = () => {
//   return <div>SportsTitle</div>;
// };

// export default SportsTitle;
import React from "react";
import { Container, Row, Col, Card, Image, Form } from "react-bootstrap";
// index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useParams } from "react-router-dom";
import oddsData from "../../JSON/Odds";

import "./SportsTitle.css";
import moment from "moment";

// Sample data (your data should be passed or fetched as needed)
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
const Data = oddsData;

const SportsTitle = () => {
  const { group } = useParams();

  // Filter the data to only include Soccer group titles
  const soccerData = SportList.filter((item) => item.group === group);
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
  };

  return (
    // <Container className="">
    //   <h2 className="text-start">{group}</h2>
    //   <Row>
    //     {soccerData.map((item) => (
    //       <Col key={item.key} md={4} className="mb-3">
    //         <Card>
    //           <Card.Body>
    //             <Card.Title>{item.title}</Card.Title>
    //             <Card.Text>
    //               {item.description || "No description available"}
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
    //  >>>>>>>>>>>>>>>>>>Titles>>>>>>>>>>>>>>>>>>

    // <div className="odds-table">
    //   {Data.map((game) => (
    //     <div key={game.id} className="game-row">
    //       <div className="team-info">
    //         <div className="team">
    //           <img
    //             src={`/logos/${game.home_team}.png`}
    //             alt={game.home_team}
    //             className="team-logo"
    //           />
    //           <span className="team-name">{game.home_team}</span>
    //         </div>
    //         <div className="team">
    //           <img
    //             src={`/logos/${game.away_team}.png`}
    //             alt={game.away_team}
    //             className="team-logo"
    //           />
    //           <span className="team-name">{game.away_team}</span>
    //         </div>
    //       </div>
    //       <div className="odds-info">
    //         {game.bookmakers.map((bookmaker) => (
    //           <div key={bookmaker.key} className="bookmaker">
    //             {/* Display bookmaker title */}
    //             <div className="bookmaker-title">{bookmaker.title}</div>
    //             <div className="odds">
    //               <span className="point">
    //                 {bookmaker.markets[0].outcomes[0].point}
    //               </span>
    //               <span className="price">
    //                 {bookmaker.markets[0].outcomes[0].price}
    //               </span>
    //             </div>
    //             <div className="odds">
    //               <span className="point">
    //                 {bookmaker.markets[0].outcomes[1].point}
    //               </span>
    //               <span className="price">
    //                 {bookmaker.markets[0].outcomes[1].price}
    //               </span>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>

    // >>>>>>>>>>>>>>>>>>>>>>>>Old Odds Design>>>>>>>>>>>>>>>>>>>>>>>>>>
    <Container className="mt-3">
      <Row>
        <Col lg={12}>
          <h3 className="text-start fw-bold">Odds & Betting Lines</h3>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group controlId="firstSelect">
              <Form.Select
                // value={firstSelect}
                // onChange={(e) => setFirstSelect(e.target.value)}
                className="fw-bold"
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
            <Form.Group controlId="secondSelect">
              <Form.Select
                className="fw-bold"
                // value={secondSelect}
                // onChange={(e) => setSecondSelect(e.target.value)}
              >
                <option value="">Select Markets</option>
                <option className="fw-bold" value="optionA">
                  spreads
                </option>
                <option className="fw-bold" value="optionB">
                  totals
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="secondSelect">
              <Form.Select
                className="fw-bold"
                // value={secondSelect}
                // onChange={(e) => setSecondSelect(e.target.value)}
              >
                <option className="fw-bold" value="">
                  Select Region
                </option>
                <option className="fw-bold" value="optionA">
                  US
                </option>
                <option className="fw-bold" value="optionB">
                  UK
                </option>
                <option className="fw-bold" value="optionC">
                  EU
                </option>
                <option className="fw-bold" value="optionC">
                  AU
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className="mt-3">
        <Col className="text-start" lg={8}>
          <div className="odds-table">
            {Data.map((game) => (
              <div key={game.id} className="game-row">
                <Row className="">
                  <Col lg={5}>
                    <div className="team-info">
                      <div className="team">
                        <img
                          src={
                            teamImages[game.home_team] ||
                            "https://assets.actionnetwork.com/372790_jets.png"
                          }
                          alt={game.home_team}
                          className="team-logo"
                        />
                        <span className="team-name">{game.home_team}</span>
                      </div>
                      <div className="team">
                        <img
                          src={
                            teamImages[game.away_team] ||
                            "https://assets.actionnetwork.com/372790_jets.png"
                          }
                          alt={game.away_team}
                          className="team-logo"
                        />
                        <span className="team-name">{game.away_team}</span>
                      </div>
                      <p
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "#666",
                          marginTop: "10px",
                        }}
                      >
                        {moment(game.commence_time).format(
                          "MMMM Do YYYY, h:mm A"
                        )}
                      </p>
                    </div>
                  </Col>
                  <Col className="" lg={7}>
                    <div className="odds-info">
                      {game.bookmakers.map((bookmaker) => (
                        <div key={bookmaker.key} className="bookmaker shadow">
                          {/* Display bookmaker title */}
                          <div className="bookmaker-title">
                            {bookmaker.title}
                          </div>
                          <div style={{ cursor: "pointer" }} className="odds">
                            <span className="point">
                              {bookmaker.markets[0].outcomes[0].point}
                            </span>
                            <span className="price">
                              {bookmaker.markets[0].outcomes[0].price}
                            </span>
                          </div>
                          <div style={{ cursor: "pointer" }} className="odds">
                            <span className="point">
                              {bookmaker.markets[0].outcomes[1].point}
                            </span>
                            <span className="price">
                              {bookmaker.markets[0].outcomes[1].price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-5 justify-content-around  ">
        <Col className="bg-light p-4 rounded-5" lg={8}>
          <Row>
            <Col>
              <h5>Recent Stories</h5>
            </Col>
            <Col className="text-end">
              <h5 className="text-primary">
                <span style={{ cursor: "pointer" }}>See All</span>
              </h5>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={6} className="d-flex ">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/NFL-Pass-or-Play-Week-8.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={6} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/nfl-luck-rankings-picks.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={6} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/juan-soto-2.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={6} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/vikings-vs-rams-parlay.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="  text-end" lg={4}></Col>
      </Row>
    </Container>
  );
};

export default SportsTitle;
