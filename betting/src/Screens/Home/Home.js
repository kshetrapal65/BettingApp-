import React, { useEffect } from "react";
import { Row, Col, Form, FormGroup, Card, Image } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SportList from "../../JSON/SportList";
import { apiCallNew } from "../../Network_Call/apiservices";
import moment from "moment";
import Event from "../../JSON/event";
import { useNavigate } from "react-router-dom";
import RecentStory from "../../Components/RecentStory";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
const sports = SportList;

const Home = () => {
  const [sport, setSport] = React.useState("americanfootball_cfl");
  const [event, setEvent] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, [sport]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${ApiEndPoints.ApiKey}`,
        `https://api.the-odds-api.com/v4/sports/${sport}/scores/?daysFrom=1&apiKey=${ApiEndPoints.ApiKey}`,
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
      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getRecentNews = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=d15e48e364304da9acd805c5c0a9a239",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("responsenewsresponse", response);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log("responsenews", data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const Data = Event;
  const matches = [
    {
      team1: {
        name: "India",
        logo: "https://static.sprtactn.co/teamlogos/nba/100/bos.png",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://static.sprtactn.co/teamlogos/nba/100/wsh.png",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://static.sprtactn.co/teamlogos/nba/100/sas.png",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://static.sprtactn.co/teamlogos/nba/100/dal.png",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNItTkdkisTH6IX25Q6eexy0gFT0bLh5BwUA&s",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://static.sprtactn.co/teamlogos/nba/100/okc.png",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://assets.actionnetwork.com/725847_nba_den_150x150.png",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://static.sprtactn.co/teamlogos/ncaab/100/shs.png",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNItTkdkisTH6IX25Q6eexy0gFT0bLh5BwUA&s",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://media.istockphoto.com/id/1160777145/vector/us-circle-flag-icon-waving-american-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=it5YEg0mYlnJDF-aQ98srEwTRC4fb0RQwTW9yJ0SCsc=",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNItTkdkisTH6IX25Q6eexy0gFT0bLh5BwUA&s",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://media.istockphoto.com/id/1160777145/vector/us-circle-flag-icon-waving-american-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=it5YEg0mYlnJDF-aQ98srEwTRC4fb0RQwTW9yJ0SCsc=",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNItTkdkisTH6IX25Q6eexy0gFT0bLh5BwUA&s",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://media.istockphoto.com/id/1160777145/vector/us-circle-flag-icon-waving-american-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=it5YEg0mYlnJDF-aQ98srEwTRC4fb0RQwTW9yJ0SCsc=",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNItTkdkisTH6IX25Q6eexy0gFT0bLh5BwUA&s",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://media.istockphoto.com/id/1160777145/vector/us-circle-flag-icon-waving-american-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=it5YEg0mYlnJDF-aQ98srEwTRC4fb0RQwTW9yJ0SCsc=",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNItTkdkisTH6IX25Q6eexy0gFT0bLh5BwUA&s",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://media.istockphoto.com/id/1160777145/vector/us-circle-flag-icon-waving-american-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=it5YEg0mYlnJDF-aQ98srEwTRC4fb0RQwTW9yJ0SCsc=",
        odds: 2.1,
      },
    },
    {
      team1: {
        name: "India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNItTkdkisTH6IX25Q6eexy0gFT0bLh5BwUA&s",
        odds: 1.75,
      },
      team2: {
        name: "Pak",
        logo: "https://media.istockphoto.com/id/1160777145/vector/us-circle-flag-icon-waving-american-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=it5YEg0mYlnJDF-aQ98srEwTRC4fb0RQwTW9yJ0SCsc=",
        odds: 2.1,
      },
    },
  ];
  const handleSport = (e) => {
    setSport(e.target.value);
  };

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
    "Kent State Golden Flashes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNraZ1_UF3xaTQLUyOi8wa6kdFdX9bVVsPWQ&s",
    "Akron Zips":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Akron_Zips_logo_2022.svg/1200px-Akron_Zips_logo_2022.svg.png",
    "Central Michigan Chippewas":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKKv0V2BSE3tKoF-dSJFSmpBEi_opm-ZIBg&s",
    "Western Michigan Broncos":
      "https://cdn.vox-cdn.com/thumbor/WA6bulFaVqI8-ftaiTfJTbPbxMs=/0x0:2244x1004/1200x0/filters:focal(0x0:2244x1004):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22640488/Screen_Shot_2021_06_06_at_12.20.52_AM.png",
    "Miami (OH) RedHawks":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Miami_Redhawks_logo.svg/1200px-Miami_Redhawks_logo.svg.png",
    "Northern Illinois Huskies":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5U9gvGYMQI7kcmqLirv1BWFWdcbGVpKCdQ&s",
    "Eastern Michigan Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksk9xkCS5UUNLfSYcAsf49zknzDn8_ydjgQ&s",
    "Buffalo Bulls":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJva39kmj3ZFY9joTHed4abeTQE8kY8Xsyng&s",
    "Toledo Rockets":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThGOg4E0A9aev2DJLonR_nW7WxDKD-Wt_j6A&s",
    "Ohio Bobcats":
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Ohio_Bobcats_logo.svg/640px-Ohio_Bobcats_logo.svg.png",
    "Georgia Tech Yellow Jackets":
      "https://1000logos.net/wp-content/uploads/2019/11/Georgia-Tech-Yellow-Jackets-Logo.jpg",
    "NC State Wolfpack":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/NC_State_Wolfpack_logo.svg/1200px-NC_State_Wolfpack_logo.svg.png",
    "UTSA Roadrunners":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/UTSA_Athletics_logo.svg/800px-UTSA_Athletics_logo.svg.png",
    "Temple Owls":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYKQ06h-Dm2npBKpgp0lh_cD3eE2mgViyqRw&s",
    "Michigan State Spartans":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYKQ06h-Dm2npBKpgp0lh_cD3eE2mgViyqRw&s",
    "Purdue Boilermakers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/1200px-Purdue_Boilermakers_logo.svg.png",
    "San Jose State Spartans":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcvBZB5ZHt4tic3HAhBCPU4UMbWM2thAkQkw&s",
    "Boston College Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvDEyw_5MzF1f6BM3z4VUaeNqppX_3KED7w&s",
    "North Carolina Tar Heels":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/North_Carolina_Tar_Heels_logo.svg/2560px-North_Carolina_Tar_Heels_logo.svg.png",
    "Florida Gators":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png",
    "Ole Miss Rebels":
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Logo_of_The_Ole_Miss_Rebels.png",
    "UNLV Rebels":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIiud__kme_WWFG0Hv1l1OmkKOECCtRH2Mew&s",
    "Rutgers Scarlet Knights":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw5f1xsieuA0AXMXH5cn4kt49hTsIr5mLr3w&s",
    "Illinois Fighting Illini":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROoZ5HxAvVW7OXemOojKv_XoIXu_61pg8ZEg&s",
    "Ohio State Buckeyes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYmN2lMDNForWXjxGmi1LD1wVeyDdSco8EQ&s",
    "Indiana Hoosiers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Indiana_Hoosiers_logo.svg/1621px-Indiana_Hoosiers_logo.svg.png",
    "Maryland Terrapins":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Indiana_Hoosiers_logo.svg/1621px-Indiana_Hoosiers_logo.svg.png",
    "Iowa Hawkeyes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQkUnTXylCBou7z-WzwE2o25a_L7xHGk3MA&s",
    "Jacksonville State Gamecocks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Jacksonville_State_Gamecocks_logo.svg/1200px-Jacksonville_State_Gamecocks_logo.svg.png",
    "Miami Hurricanes":
      "https://www.cdnlogo.com/logos/m/75/miami-hurricanes.svg",
    "Virginia Cavaliers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Virginia_Cavaliers_logo.svg/1200px-Virginia_Cavaliers_logo.svg.png",
    "SMU Mustangs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1nrZI5maPqBjVcI8eSPhW8T4YqgI0TRxbDg&s",
    "Syracuse Orange":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Syracuse_Orange_logo.svg/1200px-Syracuse_Orange_logo.svg.png",
    "Georgia Bulldogs":
      "https://i.pinimg.com/originals/ef/55/f6/ef55f6edbca911421955a1715892b99a.png",
    "UMass Minutemen":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/UMass_Amherst_athletics_logo.svg/1200px-UMass_Amherst_athletics_logo.svg.png",
    "Tennessee Volunteers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tennessee_Volunteers_logo.svg/2048px-Tennessee_Volunteers_logo.svg.png",
    "UTEP Miners":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWvlt6LegJB86WGPs1icmgnxEs57cG-jCIoA&s",
    "Florida State Seminoles":
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Florida_State_Seminoles_logo.svg/1200px-Florida_State_Seminoles_logo.svg.png",
    "Charleston Southern Buccaneers":
      "https://upload.wikimedia.org/wikipedia/en/8/86/Charleston_Southern_Buccaneers_logo.svg",
    "Ball State Cardinals":
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Ball_State_Cardinals_logo.svg/1200px-Ball_State_Cardinals_logo.svg.png",
    "Bowling Green Falcons":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGK0aGR8x5i1H1wORqtvrhXYbdF5ESizyqqA&s",
    "UAB Blazers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMUZNrfVJpnodoXvd304QaejDSGlRq0vjBSQ&s",
    "James Madison Dukes":
      "https://upload.wikimedia.org/wikipedia/en/f/fb/JMU_Duke_Dog_Head_logo.png",
    "Middle Tennessee Blue Raiders":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaRhRBNx_OR6aHoqVEgpZF9N2Jtb7UwdgYYQ&s",
    "TCU Horned Frogs":
      "https://i.pinimg.com/originals/9d/61/ee/9d61ee658ad402a246f5d229fe7faec6.gif",
    "Arizona Wildcats":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Arizona_Wildcats_logo.svg/1200px-Arizona_Wildcats_logo.svg.png",
    "Arkansas State Red Wolves":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmQealrEtz3ds-Ue_dJER2bgsILGAn2lT4qg&s",
    "UL Monroe Warhawks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Louisiana-Monroe_Warhawks_logo.svg/1200px-Louisiana-Monroe_Warhawks_logo.svg.png",
    "Southern Mississippi Golden Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILDO8X72yIcV5bZw-auqTKxqvNODvqony9A&s",
    "South Alabama Jaguars":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTplmrc6bE_jDmloUPLVaf8UrdW-K3EU1q4yw&s",
    "Arizona State Sun Devils":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQIwx6cX-xj3kObdFIf-oEJh86k4Ih9wAoyA&s",
    "BYU Cougars":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbUU3okS2m-Ep1-ZkDwPtCgmFdgPMEZrVkA&s",
    "Stanford Cardinal":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1341px-Stanford_Cardinal_logo.svg.png",
    "Clemson Tigers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Clemson_Tigers_logo.svg/1071px-Clemson_Tigers_logo.svg.png",
    "Citadel Bulldogs":
      "https://i.pinimg.com/736x/fa/20/90/fa20903fc6bb5478cf579ae8badcb144.jpg",
    "Georgia Southern Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzkZ7hG63lWPJarqzsOevxSXlSu1gww631A&s",
    "Kansas Jayhawks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17aPkRJ4xnSKYe8UiY0ubyZbVn6xSaZqG9Q&s",
    "Colorado Buffaloes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0m1ycaWDMUhY0dJ1zpSio7wI0axPJqyBdQ&s",
    "North Texas Mean Green":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tjiBVwJOJlPsOIwVawwcX3ECCFevLyv6hw&s",
    "Kentucky Wildcats":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Kentucky_Wildcats_logo.svg/1200px-Kentucky_Wildcats_logo.svg.png",
    "Michigan Wolverines":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/1280px-Michigan_Wolverines_logo.svg.png",
    "Northwestern Wildcats":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Northwestern_wildcats_CMKY_80_100_0_0.svg/1646px-Northwestern_wildcats_CMKY_80_100_0_0.svg.png",
    "Minnesota Golden Gophers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3QhGMce_9STZZU42BjPFg5lNATwHnH83Rw&s",
    "Penn State Nittany Lions":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDanvIm1cHrwr87TxtqgVZXnlOF9yy9p4dmw&s",
    "Nebraska Cornhuskers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQmzhbH_TMDwrdbUADlnd2Dbegb8ZUamYNaw&s",
    "Wisconsin Badgers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTuY6R3RH-YO_hHIUGSQDbpCSmOlOvxZRrHA&s",
    "Oklahoma State Cowboys":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfkXcLARuVvYI_vqMFlfCN9eyCcmOFwNcXOQ&s",
    "Texas Tech Red Raiders":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFxvknsNY6OPBt5d58_S10IwYDEqm2lWgcNg&s",
    "Utah State Aggies":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReWs-TRjvg2A_Iy1WbV-GHfspJS9BIFXDnAQ&s",
    "San Diego State Aztecs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIpcUVh2cQX8NH7w6ZweDC9dZQEtNa0jklAQ&s",
    "Tulsa Golden Hurricane":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3EI9yTU8fRNLQ4aMbwNACAuQa89qhs2BoEA&s",
    "West Virginia Mountaineers":
      "https://m.media-amazon.com/images/I/71dsdB9-MiL.jpg",
    "UCF Knights":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/UCF_Knights_logo.svg/1200px-UCF_Knights_logo.svg.png",
    "Arkansas Razorbacks":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Arkansas_Razorbacks_logo.svg/2560px-Arkansas_Razorbacks_logo.svg.png",
    "Louisville Cardinals":
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Louisville_Cardinals_logo.svg/1200px-Louisville_Cardinals_logo.svg.png",
    "Pittsburgh Panthers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpe3GYkyRWzYhNK0Poy8a9nytIEqWlWhEkkQ&s",
    "South Carolina Gamecocks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDmlEvrybvCQ6nS7xqhEOy2r09uQsI0Aegg&s",
    "Wofford Terriers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdBu9y8T5fkkIaMGvGP2-gyMlSbCVTPO4KrA&s",
    "Mississippi State Bulldogs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGKFOI9pA4Q_aN0SOkwF6TbngjLdgg_ZSp8g&s",
    "Missouri Tigers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKzGddgpH3TdrE7-gIkjmNr4w57DA0WW-NjA&s",
    "Troy Trojans":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX3H_3Bx9ts-2FtAXZ1woD5MlJDjJ3kTraFw&s",
    "Notre Dame Fighting Irish":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGCG7poiMAajTMYX4rqHFeJNiXXkniWRiQQ&s",
    "Army Black Knights":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Army_West_Point_logo.svg/1200px-Army_West_Point_logo.svg.png",
    "Houston Cougars":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Houston_Cougars_primary_logo.svg/1200px-Houston_Cougars_primary_logo.svg.png",
    "Wyoming Cowboys":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQulfA-RoxiPb2P8oUAyadG6cSOAFtAFGCN5w&s",
    "Boise State Broncos":
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Primary_Boise_State_Broncos_Athletics_Logo.svg/1200px-Primary_Boise_State_Broncos_Athletics_Logo.svg.png",
    "Oregon State Beavers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRrSIt27kPZaduCIB43_mClKvDresSWdmRKA&s",
    "Kentucky Wildcats":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Kentucky_Wildcats_logo.svg/1200px-Kentucky_Wildcats_logo.svg.png",
    "Washington State Cougars":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0qZQhozsr5Agc_ZG8EthzD9s0L_iO4OC5wg&s",
    "Oklahoma Sooners":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMfequ6jxXGmsyT8_oGm51dgLdAGngPcJN2Q&s",
    "Alabama Crimson Tide":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Alabama_Crimson_Tide_logo.svg/1200px-Alabama_Crimson_Tide_logo.svg.png",
    "Auburn Tigers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Auburn_Tigers_logo.svg/1200px-Auburn_Tigers_logo.svg.png",
    "Texas A&M Aggies":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_UuT4Mw_QoD1uHXR9t-fKZVkEPGEXsBkmgg&s",
    "Utah Utes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA8mePMZjgPphxYt9JX_yq-hqNMcA3Gxscrw&s",
    "Iowa State Cyclones":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Iowa_State_Cyclones_logo.svg/2560px-Iowa_State_Cyclones_logo.svg.png",
    "Old Dominion Monarchs":
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Old_Dominion_Athletics_logo.svg/640px-Old_Dominion_Athletics_logo.svg.png",
    "Marshall Thundering Herd":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsK58BK3cp3LXYtYP4m1WJ94rXp4xvHHlKsQ&s",
    "LSU Tigers":
      "https://w7.pngwing.com/pngs/1012/375/png-transparent-lsu-tigers-logo-illustration-lsu-tigers-football-louisiana-state-university-southeastern-conference-lsu-tigers-women-s-soccer-alabama-crimson-tide-football-tiger-miscellaneous-mammal-cat-thumbnail.png",
    "Vanderbilt Commodores":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBNGrEv4xeWUVqF1no79WIhfm7cR4Aj-xxA&s",

    "Kansas State Wildcats":
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Kansas_State_Wildcats_logo.svg/640px-Kansas_State_Wildcats_logo.svg.png",
    "Cincinnati Bearcats":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cincinnati_Bearcats_logo.svg/1311px-Cincinnati_Bearcats_logo.svg.png",
    "Duke Blue Devils":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Duke_Blue_Devils_logo.svg/1200px-Duke_Blue_Devils_logo.svg.png",
    "Virginia Tech Hokies":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv_Uy0fYjnopKzXt0PLO_KC5Xfj5I8fbXkUA&s",
    "Nevada Wolf Pack":
      "https://upload.wikimedia.org/wikipedia/en/2/21/Nevada_Wolf_Pack_logo.svg",
    "Air Force Falcons":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Air_Force_Falcons_logo.svg/1200px-Air_Force_Falcons_logo.svg.png",
    "Fresno State Bulldogs":
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Fresno_State_Bulldogs_logo.svg/1200px-Fresno_State_Bulldogs_logo.svg.png",
    "Colorado State Rams":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ47Hgg7Z0lgvdQXWNCuGywBS2CmZhZHVWsGQ&s",
    "USC Trojans":
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/72/USC_Trojan_head.svg/1200px-USC_Trojan_head.svg.png",
    "Oregon Ducks":
      "https://i.pinimg.com/736x/94/58/b4/9458b46183ea73572b2ab2db9ebb8c81.jpg",
    "Washington Huskies":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Washington_Huskies_logo.svg/2560px-Washington_Huskies_logo.svg.png",
    "Brisbane Lions":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Brisbane_Lions_logo_2010.svg/1200px-Brisbane_Lions_logo_2010.svg.png",
    "Geelong Cats":
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Geelong_Cats_logo.svg/1200px-Geelong_Cats_logo.svg.png",
    "Sydney Swans":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-uMcENSmNefBAMNxFFp5oKmNAexHQOe4zEw&s",
    "Hawthorn Hawks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4y8YdGAqZlggK6vxoU6ZtFd_bswPokurIag&s",
    "Gold Coast Suns":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9iR9LiCabUB6075hXsJWl0HRDO-Ll7954xg&s",
    "Essendon Bombers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2j0qnH7P62bRcaiF4mo5ThdfbYSoi-2hngA&s",
    "Greater Western Sydney Giants":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2svu5rQE2JyCR3RU0KwZtfANfzbCeBUpUg&s",
    "Collingwood Magpies":
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Collingwood_Football_Club_Logo_%282017%E2%80%93present%29.svg/1200px-Collingwood_Football_Club_Logo_%282017%E2%80%93present%29.svg.png",
    "Richmond Tigers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Richmond_Tigers_logo.svg/1200px-Richmond_Tigers_logo.svg.png",
    "Carlton Blues":
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Carlton_FC_Logo_2020.svg/1200px-Carlton_FC_Logo_2020.svg.png",
    "Hawthorn Hawks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Hawthorn-football-club-brand.svg/1200px-Hawthorn-football-club-brand.svg.png",
    "Essendon Bombers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2j0qnH7P62bRcaiF4mo5ThdfbYSoi-2hngA&s",
    "Fremantle Dockers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Fremantle_FC_logo.svg/1200px-Fremantle_FC_logo.svg.png",
    "Port Adelaide Power":
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Port_Adelaide_Football_Club_logo.svg/1200px-Port_Adelaide_Football_Club_logo.svg.png",
    "Western Bulldogs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUDzSLpt0yLJjBKk4_Ja67A-eZk0sJb8P_w&s",
    "North Melbourne Kangaroos":
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/North_Melbourne_FC_logo.svg/1200px-North_Melbourne_FC_logo.svg.png",
    "Adelaide Crows":
      "https://logos-download.com/wp-content/uploads/2016/05/Adelaide_Crows_logo_logotype_emblem.png",
    "St Kilda Saints":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4kl1oM7qJifYeggxpANTP2g5KkXOddJqT7Q&s",
    "Melbourne Demons":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Melbournefc.svg/1200px-Melbournefc.svg.png",
    "West Coast Eagles":
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/West_Coast_Eagles_logo_2017.svg/800px-West_Coast_Eagles_logo_2017.svg.png",
    "Virtus Segafredo Bologna":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Virtus_Bologna_logo.svg/1200px-Virtus_Bologna_logo.svg.png",
    "Fenerbahce SK":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8NQ0k6kACLOCzjOwySPp4IVMeuMOOCTDo9g&s",
    "Anadolu Efes":
      "https://upload.wikimedia.org/wikipedia/en/7/74/Anadolu_Efes_SK_logo.svg",
    "Paris Basketball":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqYF0LSRl4JmHEria9GR5SINRZQfPeftXYA&s",
    "AS Monaco":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/LogoASMonacoFC2021.svg/1200px-LogoASMonacoFC2021.svg.png",
    "ASVEL Lyon Villeurbanne":
      "https://i.pinimg.com/736x/a9/8d/5b/a98d5b0843d41e89c16715a55d9150ec.jpg",
    "KK Crvena zvezda":
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/KK_Crvena_zvezda_logo.svg/1200px-KK_Crvena_zvezda_logo.svg.png",
    "KK Partizan NIS":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvcGBRD-rf2PsttGDEh-Z6hB9fmGFPqbROZA&s",
    Olympiacos:
      "https://upload.wikimedia.org/wikipedia/en/b/b3/Olympiacos2024emblem.png",
    "Saski Baskonia":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7j6hewC4CTfiRzcU9j8lp-LZ6hF5NZBr7g&s",
    "Pallacanestro Olimpia Milano":
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Pallacanestro_Olimpia_Milano_logo.svg/1200px-Pallacanestro_Olimpia_Milano_logo.svg.png",
    "Maccabi Tel Aviv":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIErDbBtqr-UB4114sN4g91jcgqDVCK_TXA&s",
    "Real Madri":
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    "ALBA Berlin":
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Alba_Berlin_logo.svg/1200px-Alba_Berlin_logo.svg.png",
    Žalgiris:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/BC_%C5%BDalgiris_logo.svg/1200px-BC_%C5%BDalgiris_logo.svg.png",
    Panathinaikos:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Panathinaikos_F.C._logo.svg/1200px-Panathinaikos_F.C._logo.svg.png",
    "FC Bayern München":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/2048px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    "FC Barcelona Bàsquet":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/205px-FC_Barcelona_%28crest%29.svg.png",
    "Boston Celtics":
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/640px-Boston_Celtics.svg.png",
    "Cleveland Cavaliers":
      "https://i.pinimg.com/originals/c6/ab/23/c6ab23dffc718678b34dadb5d8d43a66.jpg",
    "Brooklyn Nets":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Brooklyn_Nets_primary_icon_logo_2024.svg/1200px-Brooklyn_Nets_primary_icon_logo_2024.svg.png",
    "Charlotte Hornets":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Dko8scEUyxbOgewzjBZCj7vCEhZgw_MiTg&s",
    "Memphis Grizzlies":
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/1200px-Memphis_Grizzlies.svg.png",
    "Denver Nuggets":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFsGhpBWAY_K7xdIy5bzduDzYaaaOJvZZxhA&s",
    "Dallas Mavericks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/800px-Dallas_Mavericks_logo.svg.png",
    "New Orleans Pelicans":
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/New_Orleans_Pelicans_logo.svg/1200px-New_Orleans_Pelicans_logo.svg.png",
    "San Antonio Spurs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZi8j3Ua_wFT8OwxzHqZt-pr8PosTowWuj5w&s",
    "Oklahoma City Thunder":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7OoiWln8MaGGQuewVp75zpaMfEfS3rSsgRg&s",
    "Los Angeles Lakers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5NiwPNr2sKc_R8yVX19Caz1uOH28uBsu0Bg&s",
    "Utah Jazz":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeACIwVsZd2hlUQ_VS12xquGvHlkR5qs9BQ&s",
    "New York Knicks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/1200px-New_York_Knicks_logo.svg.png",
    "Minnesota Timberwolves":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Minnesota_Timberwolves_logo.svg/1200px-Minnesota_Timberwolves_logo.svg.png",
    "Philadelphia 76ers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/1200px-Philadelphia_76ers_logo.svg.png",
    "Golden State Warriors":
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/1200px-Golden_State_Warriors_logo.svg.png",
    "Phoenix Suns":
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Phoenix_Suns_logo.svg/800px-Phoenix_Suns_logo.svg.png",
    "Navy Midshipmen":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLa6TuoIvYlarcaU-3RPFD5nvyrF3NAPErwg&s",
    "Quinnipiac Bobcats":
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Quinnipiac_Bobcats_logo.svg/1200px-Quinnipiac_Bobcats_logo.svg.png",
    "Loyola (MD) Greyhounds":
      "https://content.sportslogos.net/logos/32/736/full/loyola-maryland_greyhounds_logo_secondary_2009_sportslogosnet-1558.png",
    "Binghamton Bearcats":
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Binghamton_Bearcats_logo.svg/1200px-Binghamton_Bearcats_logo.svg.png",

    "Longwood Lancers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuggY1yGR8wC1UzwG3tayzYUEgU35X0Zux5g&s",
    "Appalachian St Mountaineers":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Appalachian_State_Mountaineers_logo.svg/1200px-Appalachian_State_Mountaineers_logo.svg.png",
    "Queens University Royals":
      "https://upload.wikimedia.org/wikipedia/en/6/6b/Queens_Royals_logo.svg",
    "Alabama A&M Bulldogs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE1bRjbM9QoQAX3OZ_3_tLxN9Z8vEtZbgeRg&s",
    "Bellarmine Knights":
      "https://i.pinimg.com/originals/c0/f6/05/c0f605508adc6a6fc11f1fa0b8b3f847.png",
    "Boston Univ. Terriers":
      "https://upload.wikimedia.org/wikipedia/en/1/15/Boston_University_Terriers_logo.svg",
    "Wagner Seahawks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw2meaDzRjNz79Ya4sqsHV1w_aoL80mxeYdA&s",
    "Niagara Purple Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsTJw90CieJcq21OTgc3hKikcC7tf3SON1dA&s",
    "Vermont Catamounts":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiQMhz7nSnC7e9U-u9OjUMneDDwWgarHGa4g&s",
    "Canisius Golden Griffins":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpmZexI1iMK0asp_ZfgKlMy7dDrl4AwcPUjQ&s",
    "Gardner-Webb Bulldogs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3RejJnYGUN6q_bZivQDbzok6CAe1yZRBPNQ&s",
    "Chicago St Cougars":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhx4da3b08fcvyJglS2ZHoQAAuwoDVqzXGEw&s",
    "Eastern Kentucky Colonels":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMW5uLiJJGY5e_4Ey_VgpoU3aI12pYemhrrQ&s",
    "Northern Kentucky Norse":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3-Se8bkIBkk115Z6AsjBXqogK3cFqCYJg7Q&s",
    "Cleveland St Vikings":
      "https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/clevelandst.sidearmsports.com/images/responsive_2024/logo_main.png",
    "Marist Red Foxes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5bBAZLklh-kWnl-MtV4FRAKnXLKnJAdg-kQ&s",
    "Dartmouth Big Green":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Dartmouth_College_Big_Green_logo.svg/1200px-Dartmouth_College_Big_Green_logo.svg.png",
    "Providence Friars":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVjWkafHtk3mPWuWIEVSGNJCUqQKEUIm4jQ&s",
    "Delaware St Hornets":
      "https://pbs.twimg.com/profile_images/1727130349337997312/CguKYiTw_400x400.jpg",
    "Fairfield Stags":
      "https://content.sportslogos.net/logos/31/673/full/2475.png",
    "Drexel Dragons":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAMbw2dAqORZ8L6zFi2I-dfazc0vx4ckMoaQ&s",
    "Duquesne Dukes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNfYwGWl1r3Ge8dct1sGxOEqlDxFpGAbY8g&s",
    "Milwaukee Panthers":
      "https://cdn.worldvectorlogo.com/logos/wisconsin-milwaukee-panthers.svg",
    "Evansville Purple Aces":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpR0v9oQC5IV-HUIWJI9wh_mk9HgvTR-QjXA&s",
    "Florida A&M Rattlers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFTU3o29RqLfkCPaotudyBGXdho12p_CZpZw&s",
    "Florida St Seminoles":
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Florida_State_Seminoles_logo.svg/1200px-Florida_State_Seminoles_logo.svg.png",
    "Hofstra Pride":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Hofstra_Pride_logo.svg/1200px-Hofstra_Pride_logo.svg.png",
    "Green Bay Phoenix":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Green_Bay_Phoenix_logo.svg/1200px-Green_Bay_Phoenix_logo.svg.png",
    "SIU-Edwardsville Cougars":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCaT8JhT3LH6hbTlmuDNgPaxnYqiOUVl5Dow&s",
    "UMBC Retrievers":
      "https://styleguide.umbc.edu/wp-content/uploads/sites/113/2015/10/UMBCretrievers_LOGO-300x279.jpg",
    "Hampton Pirates":
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Hampton_Pirates_logo.svg/800px-Hampton_Pirates_logo.svg.png",
    "Lipscomb Bisons":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKNMKo8qNg6um_CXVzp72ocmi7imtkh_0YA&s",
    "North Dakota Fighting Hawks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjwWZBAdTsBvS5aAzxX37Ja6FBe7OIjCwO3g&s",
    "Villanova Wildcats":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBphuv0qV4m-Vg25zQNOndCD2GEthfBry_A&s",
    "Pennsylvania Quakers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKsVoZBtKtl2cGECwuIBUDNxe-D7VG-R79yw&s",
    "Tennessee Tech Golden Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQJfsjx64yYIZwIK4zlxFfUPOWUuJ4zH0iBQ&s",
    "Texas A&M-Commerce Lions":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_MF12PgYQI2qp-ZeCrCD8JKd2W1UdbAIWQ&s",
    "West Georgia Wolves":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFl7EtrUNeVwjLC05BCegpT3Z2g8hibVBPGQ&s",
    "Western Carolina Catamounts":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAUasKSR7q6tqsjmc9pKNxEz9PzmvOzRbqRw&s",
    "Belmont Bruins":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqowBZ04o0KaX6yRE5S_SoDVsLg5B5z7njw&s",
    "Oral Roberts Golden Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9cRIxFA3WPoNivViLk02V7xgPgB6cXwp5Pg&s",
    "Bethune-Cookman Wildcats":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bethune%E2%80%93Cookman_Wildcats_logo.svg/1200px-Bethune%E2%80%93Cookman_Wildcats_logo.svg.png",
    "Alcorn St Braves":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2MI52zsVCy_z-6j0C29CC5DfcmdAWIU93Ng&s",
    "Rider Broncs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8e9SRhO16iJTyWVgDP0LDHLmAGV7amXgTBA&s",
    "UNC Wilmington Seahawks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5s-HBwtFzaxMHlwaY5bweFSgQHwLRVQly-w&s",
    "Kansas St Wildcats":
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Kansas_State_Wildcats_logo.svg/640px-Kansas_State_Wildcats_logo.svg.png",
    "Miss Valley St Delta Devils":
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Mississippi_Valley_State_University_athletics_logo.svg/1200px-Mississippi_Valley_State_University_athletics_logo.svg.png",
    "Michigan St Spartans":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIUua7b3xu8MTIP2OUEqUgRhyBXpGrNhmBg&s",
    "Samford Bulldogs":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUOYN_VgINxLDBbJCWEmK3GyykUjsurXZ3iA&s",
    "Missouri St Bears":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXPRhn_ed7GHJRP2cNHpdVdHvQTYbLiUw3Bw&s",
    "UT-Arlington Mavericks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAI2le3AMaTE1t1DJl53lLQZEl1RJkvtyQfA&s",
    "Northern Iowa Panthers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Northern_Iowa_Panters_logo.svg/800px-Northern_Iowa_Panters_logo.svg.png",
    "Western Illinois Leathernecks":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPCSZVPbU6bBtbldcPoJ9lD_XjnHn4o7srA&s",
    "Louisiana Ragin' Cajuns":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUZnenCRKMXz9yo63GkanlBv3pOEGQTvo-Q&s",

    "Loyola (Chi) Ramblers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAIK0LWVmO8uULdB_B2hn72Blty-cqKThOxA&s",
    "Southern Utah Thunderbirds":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQOUHpBvog-AVZCD7tLbDAqWs4J4ncbv6TjQ&s",
    "DePaul Blue Demons":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzlcj1TzA22BFC24Yr4f-npXuZiuKtvo6BQ&s",
    "Eastern Illinois Panthers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Eastern_Illinois_Panthers_logo.svg/800px-Eastern_Illinois_Panthers_logo.svg.png",
    "Marquette Golden Eagles":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUjJp6PZwpytzKSjjdhF7oYppW6NKg7liy0w&s",
    "Montana St Bobcats":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ66L-1MrFkHOUG06eUbS0AtbpUP6kdlNtimg&s",
    "Santa Clara Broncos":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3pRfVuTEKao7DsRFlN-e6W6FxU3rHBrSUuw&s",
    "UC Riverside Highlanders":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/UC_Riverside_Highlanders_logo.svg/1200px-UC_Riverside_Highlanders_logo.svg.png",
    "Chicago Bulls":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS671ygHQI-Podn72Qg7pLtY5BHTUzN28tdDA&s",
    "Milwaukee Bucks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Milwaukee_Bucks_logo.svg/640px-Milwaukee_Bucks_logo.svg.png",
    "Hawaii Rainbow Warriors":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Hawaii_Warriors_logo.svg/800px-Hawaii_Warriors_logo.svg.png",
    "New Mexico Lobos":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqG1U4rqKaY-V-n4OGx1h8Trw90zShFZ8z8w&s",
    "Real Madrid":
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/800px-Real_Madrid_CF.svg.png",
    "Houston Rockets":
      "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    "Indiana Pacers":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKNdCf-DjicbfMMX_LW4yxqIS0UnC-BiaSfA&s",
    "Portland Trail Blazers":
      "https://wp.usatodaysports.com/wp-content/uploads/sites/90/2019/04/unknown-2.jpeg",
    "Pittsburgh Penguins":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Pittsburgh_Penguins_logo_%282016%29.svg/800px-Pittsburgh_Penguins_logo_%282016%29.svg.png",
    "Tampa Bay Lightning":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd-M5TVKRL8h9SaUuqTwyhnGzK8yfyaR10cQ&s",
    "Ottawa Senators":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSYIZ8oEIJVBIrId4aMhWobNy8J8jWEVagQ&s",
    "Edmonton Oilers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_Edmonton_Oilers.svg/1200px-Logo_Edmonton_Oilers.svg.png",
    "Florida Panthers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Florida_Panthers_2016_logo.svg/640px-Florida_Panthers_2016_logo.svg.png",
    "St Louis Blues":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5pJQj7sb6uXvfbis71NEOMfIzYEVWfAHGQ&s",
    "Minnesota Wild":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfUGU5usevn3SatHJqqHug1_x68TIPBLUWKw&s",
    "Chicago Blackhawks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Chicago_Blackhawks_logo.svg/1200px-Chicago_Blackhawks_logo.svg.png",
    "Anaheim Ducks":
      "https://upload.wikimedia.org/wikipedia/en/9/95/Anaheim_Ducks_logo_2024.svg",
    "Calgary Flames":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRJtw1XErBo2iQHfoiAy56khTHsPu712h0w&s",
    "New York Islanders":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Logo_New_York_Islanders.svg/1200px-Logo_New_York_Islanders.svg.png",
    "Winnipeg Jets":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPLGb0qNd_PLRkUjugcqbQK743bBZk9xkXqA&s",
    "Hawaii Rainbow Warriors":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Hawaii_Warriors_logo.svg/800px-Hawaii_Warriors_logo.svg.png",
    "New Mexico Lobos":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqG1U4rqKaY-V-n4OGx1h8Trw90zShFZ8z8w&s",
    "Washington Wizards":
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Washington_Wizards_logo.svg/1200px-Washington_Wizards_logo.svg.png",
    "Chicago Bulls":
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Chicago_Bulls_logo.svg/1200px-Chicago_Bulls_logo.svg.png",
    "Atlanta Hawks":
      "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg",
    "Houston Rockets":
      "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    "Portland Trail Blazers":
      "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg",
    "Milwaukee Bucks":
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Milwaukee_Bucks_logo.svg/640px-Milwaukee_Bucks_logo.svg.png",
    "Indiana Pacers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Indiana_Pacers.svg/1200px-Indiana_Pacers.svg.png",
    "Sacramento Kings":
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/SacramentoKings.svg/800px-SacramentoKings.svg.png",
    "Los Angeles Clippers":
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Los_Angeles_Clippers_%282024%29.svg/1200px-Los_Angeles_Clippers_%282024%29.svg.png",
  };
  return (
    <>
      {/* <div className="bg-light w-100">
        <Container className="">
          <Row className="mt-3  bg-white rounded-2">
            <Col className="text-start align-content-center  " lg={2}>
              <Form.Group controlId="formSelect " className="mb-3">
                <Form.Select
                  onChange={handleSport}
                  aria-label="Select option  "
                >
                  {sports.map((sport, index) => (
                    <option key={index} value={sport.key}>
                      {sport.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formSelect ">
                <Form.Select aria-label="Select option">
                  <option value="1">spreads</option>
                  <option value="2">totals</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="" lg={10}>
              <div
                style={{
                  height: "220px",
                  overflowX: "scroll",
                  padding: "10px",
                  display: "flex",
                }}
              >
                {matches?.map((match, index) => (
                  <div
                    key={index}
                    className="border p-2 m-2"
                    style={{
                      marginRight: "20px",
                      alignContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Image
                        src={match.team1.logo}
                        alt={`${match.team1.name} logo`}
                        rounded
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "50px",
                        }}
                        className=" "
                      >
                        <span>{match.team1.name}</span>
                        <span
                          style={{
                            fontWeight: "",
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          {"+55"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                          height: "50px",
                          alignItems: "center",
                          borderRadius: "4px",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                        className="text-center ms-3"
                      >
                        <span>{+85}</span>
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          {-25}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={match.team2.logo}
                        alt={`${match.team2.name} logo`}
                        rounded
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "50px",
                        }}
                      >
                        <span>{match.team2.name}</span>

                        <span
                          style={{
                            fontWeight: "",
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          {"+55"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                          height: "50px",
                          alignItems: "center",
                          borderRadius: "4px",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                        className="text-center ms-3"
                      >
                        <span>{+85}</span>
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          {-25}
                        </span>
                      </div>
                    </div>
                    <p
                      className=" mt-2"
                      style={{ color: "grey", fontSize: "12px" }}
                    >
                      {moment(match.commence_time).format(
                        "MMMM Do YYYY, h:mm A"
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <Row className="mt-5 justify-content-around  ">
            <Col className="bg-white p-4 rounded-5" lg={8}>
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
      </div> */}

      <div className="w-100">
        <Container className="">
          <Row className="mt-3  bg-light rounded-2">
            <Col className="text-start align-content-center  " lg={2}>
              <Form.Group controlId="formSelect " className="mb-3">
                <Form.Select onChange={handleSport} aria-label="Select option">
                  {sports.map((sport, index) => (
                    <option key={index} value={sport.key}>
                      {sport.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/* <Form.Group controlId="formSelect ">
                <Form.Select aria-label="Select option">
                  <option value="1">spreads</option>
                  <option value="2">totals</option>
                </Form.Select>
              </Form.Group> */}
            </Col>
            {/* <Col className="" lg={10}>
              <div
                style={{
                  height: "220px",
                  overflowX: "scroll",
                  padding: "10px",
                  display: "flex",
                }}
              >
                {matches?.map((match, index) => (
                  <div
                    key={index}
                    className="border p-2 m-2"
                    style={{
                      marginRight: "20px",
                      alignContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Image
                        src={match.team1.logo}
                        alt={`${match.team1.name} logo`}
                        rounded
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "50px",
                        }}
                        className=" "
                      >
                        <span>{match.team1.name}</span>
                        <span
                          style={{
                            fontWeight: "",
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          {"+55"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                          height: "50px",
                          alignItems: "center",
                          borderRadius: "4px",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                        className="text-center ms-3"
                      >
                        <span>{+85}</span>
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          {-25}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={match.team2.logo}
                        alt={`${match.team2.name} logo`}
                        rounded
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "50px",
                        }}
                      >
                        <span>{match.team2.name}</span>

                        <span
                          style={{
                            fontWeight: "",
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          {"+55"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                          height: "50px",
                          alignItems: "center",
                          borderRadius: "4px",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                        className="text-center ms-3"
                      >
                        <span>{+85}</span>
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          {-25}
                        </span>
                      </div>
                    </div>
                    <p
                      className=" mt-2"
                      style={{ color: "grey", fontSize: "12px" }}
                    >
                      {moment(match.commence_time).format(
                        "MMMM Do YYYY, h:mm A"
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Col> */}
            {/* <Col lg={10}>
              <div
                style={{
                  height: "220px",
                  overflowX: "scroll",
                  padding: "10px",
                  display: "flex",
                  gap: "15px",
                  whiteSpace: "nowrap",
                }}
              >
                {Data.map((event) => (
                  <div
                    key={event.id}
                    className="border p-3"
                    style={{
                      minWidth: "200px",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#f8f9fa",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#333",
                          maxWidth: "180px", // Set max width to control text overflow
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {event.home_team}
                      </p>
                      <span style={{ fontSize: "12px", color: "grey" }}>
                        vs
                      </span>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#333",
                          maxWidth: "180px", // Set max width to control text overflow
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {event.away_team}
                      </p>
                    </div>

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        color: "#666",
                        marginTop: "10px",
                      }}
                    >
                      {moment(event.commence_time).format(
                        "MMMM Do YYYY, h:mm A"
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Col> */}
            <Col lg={10}>
              {/* {event.length > 0 ? (
                <div
                  style={{
                    height: "220px",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    padding: "10px",
                    display: "flex",
                    gap: "15px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {event.map((event) => (
                    <div
                      key={event.id}
                      className="border p-3"
                      style={{
                        minWidth: "300px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#f8f9fa",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/event-score", { state: event })}
                    >
                      <div style={{ textAlign: "center" }}>
                         
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            gap: "8px",
                            maxWidth: "300px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            backgroundColor: "red",
                          }}
                        >
                          <img
                            src={teamImages[event.home_team]}
                             
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <p
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#333",
                            }}
                          >
                            {event.home_team
                              ? event.home_team
                              : "Not Available"}
                          </p>
                          {event?.completed === true ? (
                            <span className="text-muted fw-bold">
                              {" "}
                              ({event?.scores[0]?.score})
                            </span>
                          ) : (
                            ""
                          )}
                        </div>

                        <span style={{ fontSize: "12px", color: "white" }}>
                          vs
                        </span>

                         
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            maxWidth: "300px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <img
                            src={teamImages[event.away_team]}
                           
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <p
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#333",
                            }}
                          >
                            {event.away_team
                              ? event.away_team
                              : "Not Available"}
                          </p>

                          {event?.completed === true ? (
                            <span className="text-muted fw-bold">
                              {" "}
                              ({event?.scores[1]?.score})
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      
                      <p
                        style={{
                          textAlign: "start",
                          fontSize: "13px",
                          color: "#666",
                          marginTop: "10px",
                        }}
                      >
                        {moment(event.commence_time).format(
                          "ddd MM/DD, h:mm A"
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: "center", color: "#666" }}>
                  No events available.
                </p>
              )} */}
              {event.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    padding: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {event.map((eventItem) => (
                    <Card
                      key={eventItem.id}
                      className="shadow-sm"
                      style={{
                        minWidth: "300px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/event-score", { state: eventItem })
                      }
                    >
                      <Card.Body>
                        {/* Teams */}
                        <div className="text-center">
                          {/* Home Team */}
                          <div className="d-flex align-items-center mb-2">
                            <img
                              src={teamImages[eventItem.home_team]}
                              alt="Home Team Logo"
                              className="rounded-circle"
                              style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "cover",
                              }}
                            />
                            <p className="ms-2 mb-0 text-truncate fw-bold text-dark">
                              {eventItem.home_team || "Not Available"}
                            </p>
                            {eventItem?.completed && (
                              <span className="text-muted fw-bold ms-2">
                                ({eventItem?.scores[0]?.score})
                              </span>
                            )}
                          </div>

                          <span className="text-muted fs-6">vs</span>

                          {/* Away Team */}
                          <div className="d-flex align-items-center mt-2">
                            <img
                              src={teamImages[eventItem.away_team]}
                              alt="Away Team Logo"
                              className="rounded-circle"
                              style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "cover",
                              }}
                            />
                            <p className="ms-2 mb-0 text-truncate fw-bold text-dark">
                              {eventItem.away_team || "Not Available"}
                            </p>
                            {eventItem?.completed && (
                              <span className="text-muted fw-bold ms-2">
                                ({eventItem?.scores[1]?.score})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Event Time */}
                        <p className="text-start text-muted small mt-3">
                          {moment(eventItem.commence_time).format(
                            "ddd MM/DD, h:mm A"
                          )}
                        </p>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted">No events available.</p>
              )}
            </Col>
          </Row>
          {/* <Row className="mt-5 justify-content-around  ">
            <Col className="bg-light p-4 rounded-5" lg={12}>
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

              <Row className="mt-3 p-3">
                {newsData?.map((item, index) => (
                  <Col lg={4} md={6} sm={12} className="d-flex" key={index}>
                    <div className="d-flex mb-3" style={{ width: "100%" }}>
                      <div style={{ flexShrink: 0, width: "120px" }}>
                        <Image
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            aspectRatio: "1/1",
                            borderRadius: "18px",
                          }}
                          src={item.urlToImage}
                        />
                      </div>
                      <div
                        className="d-flex flex-column ms-3"
                        style={{ flex: 1 }}
                      >
                        <h5 className="fw-bold">{item.title}</h5>
                        <p>{item.description}</p>
                        <p style={{ fontSize: "12px" }} className="text-muted">
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Col>
                ))} 
              </Row>
            </Col>
            <Col className="  text-end" lg={4}></Col>
          </Row> */}
          <RecentStory />
        </Container>
      </div>
    </>
  );
};

export default Home;
