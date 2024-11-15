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
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, [sport]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${ApiEndPoints.ApiKey}`,
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
              {event.length > 0 ? (
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
                        {/* Home Team Image and Name */}
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
                          }}
                        >
                          <img
                            src={teamImages[event.home_team]}
                            // alt={`${event.home_team} logo`}
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
                        </div>

                        <span style={{ fontSize: "12px", color: "white" }}>
                          vs
                        </span>

                        {/* Away Team Image and Name */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            gap: "8px",
                            maxWidth: "180px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <img
                            src={teamImages[event.away_team]}
                            // alt={`${event.away_team} logo`}
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
                        </div>
                      </div>

                      {/* Event Time */}
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
