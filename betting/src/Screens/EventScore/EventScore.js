import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./EventScore.css";

import {
  Card,
  Row,
  Col,
  Button,
  Badge,
  Tab,
  Tabs,
  Image,
  Container,
  Dropdown,
  Form,
} from "react-bootstrap";
import { BsCalendar3 } from "react-icons/bs"; // Import from react-icons
import {
  Box,
  Typography,
  Paper,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import moment from "moment";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { apiCallNew } from "../../Network_Call/apiservices";
import { PulseLoader } from "react-spinners";
import { getToken } from "../../Helper/Storage";

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
};
const sampleData = [
  {
    key: "fanduel",
    title: "FanDuel",
    markets: [
      {
        key: "player_pass_tds",
        outcomes: [
          // {
          //   name: "Yes",
          //   description: "Saquon Barkley",
          //   price: -200,
          // },
          // {
          //   name: "Yes",
          //   description: "Jalen Hurts",
          //   price: 100,
          // },
          // {
          //   name: "Yes",
          //   description: "AJ Brown",
          //   price: 105,
          // },
          // {
          //   name: "Yes",
          //   description: "Brian Robinson Jr.",
          //   price: 110,
          // },
          // {
          //   name: "Yes",
          //   description: "Terry McLaurin",
          //   price: 100,
          // },
          // {
          //   name: "Yes",
          //   description: "Austin Ekeler",
          //   price: 115,
          // },
          // {
          //   name: "Yes",
          //   description: "DeVonta Smith",
          //   price: 145,
          // },
          // {
          //   name: "Yes",
          //   description: "Dallas Goedert",
          //   price: 190,
          // },
          // {
          //   name: "Yes",
          //   description: "Jayden Daniels",
          //   price: 210,
          // },
          // {
          //   name: "Yes",
          //   description: "Zach Ertz",
          //   price: 260,
          // },
          // {
          //   name: "Yes",
          //   description: "Jeremy McNichols",
          //   price: 360,
          // },
          {
            name: "Over",
            description: "Jayden Daniels",
            price: 136,
            point: 1.5,
          },
          {
            name: "Under",
            description: "Jayden Daniels",
            price: -178,
            point: 1.5,
          },
          {
            name: "Over",
            description: "Jalen Hurts",
            price: 126,
            point: 1.5,
          },
          {
            name: "Under",
            description: "Jalen Hurts",
            price: -165,
            point: 1.5,
          },
        ],
      },
    ],
  },
];

export const EventScore = React.memo(() => {
  const [scoreData, setScoreData] = useState([]);
  const [marketkey, setMarketKey] = useState([]);
  const [propData, setPropData] = useState([]);
  const [markets, setMarket] = useState("player_assists");
  const [marketName, setMarketName] = useState("");
  const [eventOdds, setEventOdds] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState(() => {
    const storedMarkets = localStorage.getItem("cartData");
    return storedMarkets ? JSON.parse(storedMarkets) : [];
  });
  const [activeTabs, setActiveTabs] = useState("Straights");
  const [parlayBet, setParlayBet] = React.useState();
  const [parlayResult, setParlayResult] = React.useState(0);
  const [load, setLoad] = React.useState(false);
  const token = getToken();

  const location = useLocation();
  const event = location.state || {};
  const [sportData, setSportData] = React.useState([]);

  console.log("eventess", event);
  // console.log("sportData", sportData);
  // useEffect(() => {
  //   if (Object.keys(event).length !== 0) {
  //     setSportData((prev) => [...prev, event]);
  //   }
  // }, [event]);
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(selectedMarkets));
  }, [selectedMarkets]);

  const Fandualodds = eventOdds?.bookmakers?.find((m) => m.key === "fanduel");

  const totalWager = selectedMarkets.reduce(
    (total, market) => total + (market.wager || 0),
    0
  );

  const totalPays = selectedMarkets.reduce(
    (total, market) => total + (market.winAmount || 0),
    0
  );

  const handleMarketClick = (marketData) => {
    setSelectedMarkets((prev) => [...prev, marketData]);
  };
  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setMarket(e.target.value); // Set market_key
    setMarketName(e.target.options[selectedIndex].text); // Set market_name
  };

  useEffect(() => {
    fetchScore();
    fetchEventOdds();
  }, [event]);
  useEffect(() => {
    fetchMarket();
    fetchProps();
  }, [markets]);

  const fetchMarket = async () => {
    try {
      const response = await fetch(
        `${ApiEndPoints.Get_Market}${event?.sport_key}`,
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
      // console.log("responseOFSCOREEEEEE", data);
      setMarketKey(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTabs === "Parlay") {
      calculateParlay();
    }
  }, [activeTabs, parlayBet, selectedMarkets]);

  const handleSelect = (key) => {
    setActiveTabs(key);
  };

  const fetchScore = async () => {
    try {
      const response = await fetch(
        // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${apikey}`,
        ` https://api.the-odds-api.com/v4/sports/${event?.sport_key}/scores/?daysFrom=1&apiKey=${ApiEndPoints.ApiKey}&eventIds=${event?.id}`,
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
      //   console.log("responseOFSCOREEEEEE", data);
      setScoreData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEventOdds = async () => {
    try {
      const response = await fetch(
        // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${apikey}`,
        `https://api.the-odds-api.com/v4/sports/${event?.sport_key}/events/${event?.id}/odds?apiKey=${ApiEndPoints.ApiKey}&regions=us&markets=spreads,totals,h2h&oddsFormat=american`,
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
      // console.log("responseOFODSSSSSS>>>>", data);
      setEventOdds(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProps = async () => {
    try {
      const response = await fetch(
        // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${apikey}`,
        `https://api.the-odds-api.com/v4/sports/${event?.sport_key}/events/${event?.id}/odds?apiKey=${ApiEndPoints.ApiKey}&regions=us&markets=${markets}&oddsFormat=american`,
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

      setPropData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const GameInfo = ({ game }) => {
    return (
      <Card className="my-4 mx-auto">
        <Card.Body>
          {/* Game Heading */}
          <Card.Title className="text-center">
            Buccaneers vs. Chiefs Odds & Betting Predictions -{" "}
            {new Date(game.commence_time).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Card.Title>

          {/* Matchup Information */}
          <div className="text-center my-3">
            <h5>
              Tampa Bay Buccaneers <span className="mx-2">8-9</span> Kansas City
              Chiefs
            </h5>
          </div>

          {/* Game Time */}
          <p className="text-center text-muted">
            {new Date(game.commence_time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}{" "}
            • ESPN
          </p>

          {/* Team Logos and Records */}
          <Row className="text-center">
            <Col>
              <Image
                src="https://logos-world.net/wp-content/uploads/2020/05/Kansas-City-Chiefs-logo.png"
                alt="Buccaneers Logo"
                width={50}
                height={50}
                rounded
              />
              <h6 className="mt-2">Tampa Bay Buccaneers</h6>
              <p className="text-muted">4-4</p>
            </Col>
            <Col>
              <Image
                src="https://logos-world.net/wp-content/uploads/2020/05/Kansas-City-Chiefs-logo.png"
                alt="Chiefs Logo"
                width={50}
                height={50}
                rounded
              />
              <h6 className="mt-2">Kansas City Chiefs</h6>
              <p className="text-muted">7-0</p>
            </Col>
          </Row>

          {/* Tabs for Details, News, Picks, etc. */}
          {/* <Tabs defaultActiveKey="details" id="game-info-tabs" className="mt-4">
            <Tab eventKey="details" title="Details">
              <p className="mt-3">Game details will go here.</p>
            </Tab>
            <Tab eventKey="news" title="News">
              <p className="mt-3">Latest news will be shown here.</p>
            </Tab>
            <Tab eventKey="picks" title="Picks">
              <p className="mt-3">
                Picks and predictions will be displayed here.
              </p>
            </Tab>
            <Tab eventKey="props" title="Props">
              <p className="mt-3">Props information will be listed here.</p>
            </Tab>
            <Tab eventKey="trends" title="Trends">
              <p className="mt-3">Trending stats and information.</p>
            </Tab>
            <Tab eventKey="stats" title="Stats">
              <p className="mt-3">Stats data will be displayed here.</p>
            </Tab>
          </Tabs> */}
        </Card.Body>
      </Card>
    );
  };
  const GameScoreCard = () => {
    return (
      <Container className="p-4">
        <Card className="p-4 text-center">
          <h5 className="text-center fw-bold mb-4">
            {event?.home_team} vs. {event?.away_team}
          </h5>
          <h6>
            {/* {scoreData[0]?.home_team} at {scoreData[0]?.away_team}  */}
            <span className="text-muted">
              {/* {" "}
              {new Date(scoreData[0]?.commence_time).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })} */}
              {moment(event?.commence_time).format("ddd MM/DD, h:mm A")}
            </span>
          </h6>
          <hr />
          <Row className="mt-4">
            <Col className="d-flex flex-column align-items-center">
              <img
                src={teamImages[scoreData[0]?.home_team]}
                alt="Denver Broncos"
                style={{ width: "60px" }}
              />
              <h6 className="mt-2 fw-bold">{scoreData[0]?.home_team}</h6>
              {/* <p className="text-muted">5-4</p> */}
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h2 className="mb-0">
                {scoreData[0]?.home_score}-{scoreData[0]?.away_score}
              </h2>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <img
                src={teamImages[scoreData[0]?.away_team]}
                alt="Baltimore Ravens"
                style={{ width: "60px" }}
              />
              <h6 className="mt-2 fw-bold">{scoreData[0]?.away_team}</h6>
              {/* <p className="text-muted">6-3</p> */}
            </Col>
          </Row>
        </Card>
      </Container>
    );
  };

  const handleWagerChange = (index, wager) => {
    setSelectedMarkets((prevMarkets) =>
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

  const handleRemoveMarket = (index) => {
    const updatedMarkets = selectedMarkets.filter((_, i) => i !== index);
    setSelectedMarkets(updatedMarkets);
  };

  const convertToDecimalOdds = (price) => {
    if (price > 0) {
      return price / 100 + 1;
    } else if (price < 0) {
      return 100 / Math.abs(price) + 1;
    }
    return 1;
  };

  const calculateParlay = () => {
    const wagerAmount = parseFloat(parlayBet) || 0;

    const totalOdds = selectedMarkets.reduce((acc, data) => {
      let price = parseFloat(data?.price);

      if (price) {
        price = convertToDecimalOdds(price);
      }
      return acc * (price || 1);
    }, 1);

    const result = wagerAmount * totalOdds;
    const result2 = result - parlayBet;
    setParlayResult(result2.toFixed(2));
  };

  const SubmitPlaceBet = async () => {
    const formData = new FormData();
    selectedMarkets?.forEach((item, index) => {
      formData.append(`odds[${index}][market_key]`, item.market);
      formData.append(`odds[${index}][outcomes_odds_price1]`, item.price);
      formData.append(`odds[${index}][sport_name]`, item.team);
      formData.append(`odds[${index}][outcomes_odds_point1]`, item.point);
      formData.append(`odds[${index}][amount]`, item.wager);
      formData.append(`odds[${index}][win_amount]`, item.winAmount.toFixed(2));
      formData.append(`odds[${index}][outcomes_odds_price2]`, 0);
      formData.append(`odds[${index}][outcomes_odds_point2]`, 0);
      formData.append(`odds[${index}][sport_key]`, event?.sport_key);
      formData.append(`odds[${index}][sport_id]`, event?.id);
      formData.append(`odds[${index}][sport_name]`, event?.sport_title);
      formData.append(`odds[${index}][loss_amount]`, 0);
    });

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
        setSelectedMarkets([]);
      } else {
        toast.error(response.msg);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const gameData = {
    sport_key: "americanfootball_nfl",
    sport_title: "NFL",
    commence_time: "2024-11-05T01:15:00Z",
    completed: false,
    home_team: "Kansas City Chiefs",
    away_team: "Tampa Bay Buccaneers",
    scores: null,
    last_update: null,
  };

  const GameOdds = ({ data }) => {
    // const bookmaker = data.bookmakers[0];
    const spreadMarket = data?.markets?.find((m) => m.key === "spreads");
    const moneylineMarket = data?.markets?.find((m) => m.key === "h2h");
    const totalsMarket = data?.markets?.find((m) => m.key === "totals");

    return (
      <Container
        className="p-4"
        style={
          {
            // padding: "20px",
            // maxWidth: "800px",
            // backgroundColor: "#f9f9fb",
            // borderRadius: "8px",
          }
        }
      >
        {/* <p className="text-start f-md text-muted">Spread, Total, Moneyline</p> */}
        <Card className="p-4 text-start">
          <h5 className="text-start font-weight-bold">
            Spread, Total, Moneyline
          </h5>
          <hr />

          <Row className="text-center font-weight-bold text-muted">
            <Col xs={4}>Matchup</Col>
            {/* <Col xs={2}>Open</Col> */}
            <Col xs={2}>Spread</Col>
            <Col xs={2}>Total</Col>
            <Col xs={2}>Moneyline</Col>
          </Row>

          {/* Away Team Row */}
          <Row className="align-items-center mt-3 text-center">
            <Col
              xs={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={teamImages[eventOdds?.away_team]}
                alt={eventOdds?.away_team}
                width="30"
                className="mr-2"
              />
              <span>{eventOdds?.away_team}</span>
            </Col>
            {/* <Col xs={2}>+{spreadMarket.outcomes[1].point}</Col> */}
            <Col xs={2}>
              <Button
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "40px" }}
              >
                {spreadMarket?.outcomes[1].point} <br /> (
                {spreadMarket?.outcomes[1].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "40px" }}
              >
                o{totalsMarket?.outcomes[0].point} (
                {totalsMarket?.outcomes[0].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "40px" }}
              >
                {moneylineMarket?.outcomes[1].price}
              </Button>
            </Col>
          </Row>

          {/* Home Team Row */}
          <Row className="align-items-center mt-3 text-center">
            <Col
              xs={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={teamImages[eventOdds?.home_team]}
                alt={eventOdds?.home_team}
                width="30"
                className="mr-2"
              />
              <span>{eventOdds?.home_team}</span>
            </Col>
            {/* <Col xs={2}>u{totalsMarket.outcomes[1].point}</Col> */}
            <Col xs={2}>
              <Button
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "40px" }}
              >
                {spreadMarket?.outcomes[0].point} (
                {spreadMarket?.outcomes[0].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "40px" }}
              >
                u{totalsMarket?.outcomes[1].point} (
                {totalsMarket?.outcomes[1].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "40px" }}
              >
                {moneylineMarket?.outcomes[0].price}
              </Button>
            </Col>
          </Row>

          <hr />

          {/* Date and Time */}
          <div className="d-flex justify-content-start align-items-center mt-2">
            <BsCalendar3 className="me-1 text-muted" />
            <span className="text-muted">
              {new Date(eventOdds?.commence_time).toLocaleString("en-US", {
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              , {new Date(eventOdds?.commence_time).toLocaleDateString()}
            </span>
          </div>
        </Card>
      </Container>
    );
  };
  const GameOdds1 = React.memo(({ data }) => {
    const spreadMarket = data?.markets?.find((m) => m.key === "spreads");
    const moneylineMarket = data?.markets?.find((m) => m.key === "h2h");
    const totalsMarket = data?.markets?.find((m) => m.key === "totals");

    return (
      <Container className="p-4 ">
        <Card className="p-4 text-start">
          <h5 className="fw-bold">
            {event?.home_team} vs. {event?.away_team} Odds
          </h5>
          <h7 className="text-start font-weight-bold">
            Spread, Total, Moneyline
          </h7>
          <hr />
          <OddsTabBar />
          <hr />
          <Row className="text-center font-weight-bold text-muted">
            <Col className="fw-bold" xs={4}>
              Matchup
            </Col>
            <Col className="fw-bold" xs={2}>
              Spread
            </Col>
            <Col className="fw-bold" xs={2}>
              Total
            </Col>
            <Col className="fw-bold" xs={2}>
              Moneyline
            </Col>
          </Row>
          <hr />

          {/* Away Team Row */}
          <Row className="align-items-center mt-3 text-center">
            <Col
              xs={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={teamImages[eventOdds?.away_team]}
                // alt={eventOdds?.away_team}
                width="30"
                className="mr-2"
              />
              <span className="fw-bold ms-2">{event?.away_team}</span>
            </Col>
            <Col xs={2}>
              <Button
                className="shadow"
                disabled={!spreadMarket?.outcomes[1].price}
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() => {
                  handleMarketClick({
                    team: eventOdds?.away_team,
                    market: "spread",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...spreadMarket?.outcomes[1],
                    key: event?.sport_key,
                    title: event?.sport_title,
                  });
                }}
              >
                {spreadMarket?.outcomes[1].point} <br /> (
                {spreadMarket?.outcomes[1].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                className="shadow"
                disabled={!totalsMarket?.outcomes[0].price}
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.away_team,
                    market: "total",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...totalsMarket?.outcomes[0],
                    key: event?.sport_key,
                    title: event?.sport_title,
                  })
                }
              >
                o{totalsMarket?.outcomes[0].point} (
                {totalsMarket?.outcomes[0].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                className="shadow"
                disabled={!moneylineMarket?.outcomes[1].price}
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.away_team,
                    market: "moneyline",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...moneylineMarket?.outcomes[1],
                    key: event?.sport_key,
                    title: event?.sport_title,
                  })
                }
              >
                {moneylineMarket?.outcomes[1].price}
              </Button>
            </Col>
          </Row>

          {/* Home Team Row */}
          <Row className="align-items-center mt-3 text-center">
            <Col
              xs={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={teamImages[eventOdds?.home_team]}
                // alt={eventOdds?.home_team}
                width="30"
                className="mr-2"
              />
              <span className="fw-bold ms-2">{event?.home_team}</span>
            </Col>
            <Col xs={2}>
              <Button
                className="shadow"
                variant="outline-secondary"
                disabled={!spreadMarket?.outcomes[0].price}
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.home_team,
                    market: "spread",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...spreadMarket?.outcomes[0],
                    key: event?.sport_key,
                    title: event?.sport_title,
                  })
                }
              >
                {spreadMarket?.outcomes[0].point} <br /> (
                {spreadMarket?.outcomes[0].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                className="shadow"
                variant="outline-secondary"
                disabled={!totalsMarket?.outcomes[1].price}
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.home_team,
                    market: "total",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...totalsMarket?.outcomes[1],
                    key: event?.sport_key,
                    title: event?.sport_title,
                  })
                }
              >
                u{totalsMarket?.outcomes[1].point} (
                {totalsMarket?.outcomes[1].price})
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                className="shadow"
                disabled={!moneylineMarket?.outcomes[0].price}
                variant="outline-secondary"
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.home_team,
                    market: "moneyline",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...moneylineMarket?.outcomes[0],
                    key: event?.sport_key,
                    title: event?.sport_title,
                  })
                }
              >
                {moneylineMarket?.outcomes[0].price}
              </Button>
            </Col>
          </Row>

          <hr />

          {/* Date and Time */}
          <div className="d-flex justify-content-start align-items-center mt-2">
            {/* <BsCalendar3 className="me-1 text-muted" /> */}
            <span className="text-muted">
              {/* {new Date(eventOdds?.commence_time).toLocaleString("en-US", {
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              , {new Date(eventOdds?.commence_time).toLocaleDateString()} */}
              {moment(event.commence_time).format("ddd MM/DD, h:mm A")}
            </span>
          </div>

          {/* Display selected markets */}
          {/* <div className="mt-4">
          <h6>Selected Markets:</h6>
            {selectedMarkets.map((market, index) => (
              <div key={index} className="selected-market">
                <p>{`${market.team} - ${market.market} - Point: ${market.point}, Price: ${market.price}`}</p>
              </div>
            ))}
          </div> */}
        </Card>
      </Container>
    );
  });

  // Example usage with the data you provided
  const data = {
    away_team: "Cincinnati Bengals",
    home_team: "Baltimore Ravens",
    commence_time: "2024-11-08T01:15:00Z",
    bookmakers: [
      {
        title: "FanDuel",
        markets: [
          {
            key: "h2h",
            outcomes: [
              { name: "Baltimore Ravens", price: -260 },
              { name: "Cincinnati Bengals", price: 215 },
            ],
          },
          {
            key: "spreads",
            outcomes: [
              { name: "Baltimore Ravens", point: -6.5, price: -102 },
              { name: "Cincinnati Bengals", point: 6.5, price: -120 },
            ],
          },
          {
            key: "totals",
            outcomes: [
              { name: "Over", point: 52.5, price: -110 },
              { name: "Under", point: 52.5, price: -110 },
            ],
          },
        ],
      },
    ],
  };
  const BetSlip = () => {
    return (
      <Container className="border mt-4 rounded p-4">
        <Row className="d-flex justify-content-between align-items-center mb-3">
          <Col xs="auto">
            <h5 className="mb-0">
              Betslip <Badge bg="success">{selectedMarkets.length}</Badge>
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
          <Col xs="auto">
            <Tabs
              className="mb-2 odds-tab-bar-new border-bottom-0"
              onSelect={handleSelect}
            >
              <Tab eventKey="Straights" title="Straights"></Tab>
              <Tab eventKey="Parlay" title="Parlay"></Tab>
            </Tabs>
          </Col>
          <Col xs="auto">
            <Button
              onClick={() => setSelectedMarkets([])}
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
              {selectedMarkets?.length === 0 && (
                <p className="text-center">No bets added</p>
              )}

              {selectedMarkets?.map((market, index) => (
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
                          <span
                            style={{ fontSize: "12px", marginBottom: "5px" }}
                          >
                            {" "}
                            {market?.market == "h2h"
                              ? "Moneyline"
                              : market?.market}
                          </span>
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
              onClick={SubmitPlaceBet}
              disabled={!token}
              variant="#155239"
              style={{ backgroundColor: "#155239", color: "white" }}
              size="lg"
              className="w-100"
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
              {selectedMarkets?.length === 0 && (
                <p className="text-center">No bets added</p>
              )}
              {selectedMarkets?.length > 0 && (
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
              {selectedMarkets?.map((market, index) => (
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
                            <span>
                              {" "}
                              {market?.market == "h2h"
                                ? "Moneyline"
                                : market?.market}
                            </span>
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
              onClick={() => toast.success("Comming soon...")}
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
  function OddsTabBar() {
    const [activeTab, setActiveTab] = useState("game");

    const handleSelect = (key) => setActiveTab(key);

    return (
      <Tabs
        activeKey={activeTab}
        onSelect={handleSelect}
        className="mb-2 odds-tab-bar border-bottom-0"
      >
        <Tab eventKey="game" title="Game"></Tab>
        <Tab eventKey="1h" title="1H"></Tab>
        <Tab eventKey="2h" title="2H"></Tab>
        <Tab eventKey="1q" title="1Q"></Tab>
        <Tab eventKey="2q" title="2Q"></Tab>
        <Tab eventKey="3q" title="3Q"></Tab>
        <Tab eventKey="4q" title="4Q"></Tab>
      </Tabs>
    );
  }

  const PropOddsComparison = () => {
    return (
      <Container
        className="p-4"
        style={{ backgroundColor: "white", borderRadius: "10px" }}
      >
        <Card className="p-4 ">
          <Row className="justify-content-between">
            <Col className="mb-3" lg={6} md={9}>
              <h5 className="fw-bold">Prop Odds</h5>
            </Col>
            <Col className="mb-3" lg={6} md={3}>
              <Form.Group controlId="formSelect ">
                <Form.Select
                  onChange={handleSelectChange}
                  aria-label="Select option"
                >
                  {/* {sports.map((sport, index) => (
                    <option key={index} value={sport.key}>
                      {sport.title}
                    </option>
                  ))} */}
                  {marketkey?.result?.map((market, index) => (
                    <option key={index} value={market.market_key}>
                      {market.market_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <hr />
          </Row>

          {/* Filters */}

          <Row className="mb-2 justify-content-around fw-bold text-muted">
            <Col xs={3} lg={4}>
              <strong>PLAYER</strong>
            </Col>
            <Col className="" lg={8} xs={3}>
              <strong>ODDS</strong>
            </Col>
          </Row>
          <hr />

          {/* {[
            {
              name: "J. Daniels",
              bestOdds: { over: "o224.5", under: "u226.5", icon: true },
              consensus: { over: "o226.5", under: "u226.5" },
              image: "https://via.placeholder.com/30",
            },
            {
              name: "J. Hurts",
              bestOdds: { over: "o220.5", under: "u222.5" },
              consensus: { over: "o223", under: "u223" },
              image: "https://via.placeholder.com/30",
            },
          ].map((player, index) => (
            <Row key={index} className="justify-content-around  ">
              <Col xs={3} className="d-flex align-items-center">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkjtDn-Bjqfksx8JmTF4S6hTMo2pU3EpAOg&s"
                  roundedCircle
                  width="50"
                  height="50"
                  className="me-2"
                />
                <span className="fw-bold">{player.name}</span>
              </Col>
              <Col className="text-center" xs={3}>
                
                <Button
                  className="shadow"
                  variant="outline-secondary"
                  style={{ minWidth: "80px" }}
                >
                  {player.bestOdds.under} (<span>-113</span>)
                </Button>{" "}
                <br />
                <Button
                  className="shadow mt-2"
                  variant="outline-secondary"
                  style={{ minWidth: "80px" }}
                >
                  {player.bestOdds.under} (<span>-113</span>)
                </Button>
              </Col>
              <hr className="mt-2" />
            </Row>
          ))} */}
          {/* {propData?.bookmakers
            ?.filter((market) => market.key === "fanduel")
            .map((market, marketIndex) => (
              <div key={marketIndex}>
                {Object.values(
                  market.markets[0].outcomes.reduce((acc, outcome) => {
                    if (!acc[outcome.description]) {
                      acc[outcome.description] = {
                        description: outcome.description,
                        odds: [],
                      };
                    }
                    acc[outcome.description].odds.push(outcome);
                    return acc;
                  }, {})
                ).map((group, index) => (
                  <Row
                    key={index}
                    className="justify-content-around align-items-center"
                  >
                    <Col xs={12} lg={4} className="d-flex align-items-center">
                      <Image
                        src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/bal.png" // Replace with actual player image if available
                        roundedCircle
                        width="50"
                        height="50"
                        className="me-2"
                      />
                      <span className="fw-bold">{group.description}</span>
                    </Col>

                    <Col className="" xs={12} lg={8}>
                      {group.odds.map((outcome, idx) => (
                        // console.log("outcome>>>", outcome),
                        <Button
                          key={idx}
                          className={`shadow ${idx === 0 ? "" : "ms-1"}`}
                          variant="outline-secondary"
                          style={{ minWidth: "80px", minHeight: "60px" }}
                          onClick={() =>
                            handleMarketClick({
                              team: outcome?.description,
                              market: marketName,
                              name: outcome?.name,
                              point: outcome?.point,
                              price: outcome?.price,
                            })
                          }
                        >
                          {outcome.name} {outcome.point || ""} (
                          {outcome.price > 0
                            ? `+${outcome.price}`
                            : outcome.price}
                          )
                        </Button>
                      ))}
                    </Col>
                    <hr className="mt-2" />
                  </Row>
                ))}
              </div>
            ))} */}
          {propData?.bookmakers?.filter((market) => market.key === "fanduel")
            .length === 0 ? (
            <p>No props found</p>
          ) : (
            propData?.bookmakers
              ?.filter((market) => market.key === "fanduel")
              .map((market, marketIndex) => (
                <div key={marketIndex}>
                  {Object.values(
                    market.markets[0].outcomes.reduce((acc, outcome) => {
                      if (!acc[outcome.description]) {
                        acc[outcome.description] = {
                          description: outcome.description,
                          odds: [],
                        };
                      }
                      acc[outcome.description].odds.push(outcome);
                      return acc;
                    }, {})
                  ).map((group, index) => (
                    <Row
                      key={index}
                      className="justify-content-around align-items-center"
                    >
                      <Col xs={12} lg={4} className="d-flex align-items-center">
                        <Image
                          src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/bal.png" // Replace with actual player image if available
                          roundedCircle
                          width="50"
                          height="50"
                          className="me-2"
                        />
                        <span className="fw-bold">{group.description}</span>
                      </Col>

                      <Col xs={12} lg={8}>
                        {group.odds.map((outcome, idx) => (
                          <Button
                            key={idx}
                            className={`shadow ${idx === 0 ? "" : "ms-1"}`}
                            variant="outline-secondary"
                            style={{ minWidth: "80px", minHeight: "60px" }}
                            onClick={() =>
                              handleMarketClick({
                                team: outcome?.description,
                                market: marketName,
                                name: outcome?.name,
                                point: outcome?.point,
                                price: outcome?.price,
                                home_team: propData?.home_team,
                                away_team: propData?.away_team,
                              })
                            }
                          >
                            {outcome?.name == "Yes" ? "" : outcome?.name}{" "}
                            {outcome?.point || ""} (
                            {outcome?.price > 0
                              ? `+${outcome.price}`
                              : outcome.price}
                            )
                          </Button>
                        ))}
                      </Col>
                      <hr className="mt-2" />
                    </Row>
                  ))}
                </div>
              ))
          )}

          {/* <div>
            {Object?.values(
              propData?.markets[0]?.outcomes?.reduce((acc, outcome) => {
                if (!acc[outcome?.description]) {
                  acc[outcome?.description] = {
                    description: outcome?.description,
                    odds: [],
                  };
                }
                acc[outcome?.description]?.odds?.push(outcome);
                return acc;
              }, {})
            )?.map((group, index) => (
              <Row
                key={index}
                className="justify-content-around align-items-center"
              >
                <Col xs={12} lg={5} className="d-flex align-items-center">
                  <Image
                    src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/bal.png" // Replace with actual player image if available
                    roundedCircle
                    width="50"
                    height="50"
                    className="me-2"
                  />
                  <span className="fw-bold">{group.description}</span>
                </Col>

                <Col className="" xs={12} lg={6}>
                  {group.odds.map(
                    (outcome, idx) => (
                      console.log("outcome>>>", outcome),
                      (
                        <Button
                          key={idx}
                          className={`shadow ${idx === 0 ? "" : "ms-1"}`}
                          variant="outline-secondary"
                          style={{ minWidth: "80px", minHeight: "60px" }}
                          onClick={() =>
                            handleMarketClick({
                              team: outcome?.description,
                              market: marketName,
                              name: outcome?.name,
                              point: outcome?.point,
                              price: outcome?.price,
                            })
                          }
                        >
                          {outcome.name} {outcome.point || ""} (
                          {outcome.price > 0
                            ? `+${outcome.price}`
                            : outcome.price}
                          )
                        </Button>
                      )
                    )
                  )}
                </Col>
                <hr className="mt-2" />
              </Row>
            ))}
          </div> */}
        </Card>
      </Container>
    );
  };

  return (
    <Container className="">
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Row>
        <Col lg={8}>
          {/* <GameInfo game={gameData} /> */}
          <GameScoreCard />

          <GameOdds1 data={Fandualodds} />
          {PropOddsComparison()}
        </Col>
        <Col lg={4}>{BetSlip()}</Col>
      </Row>
    </Container>
  );
});

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#155239",
  },
};
