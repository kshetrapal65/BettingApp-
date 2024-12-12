import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  "Miami Hurricanes": "https://www.cdnlogo.com/logos/m/75/miami-hurricanes.svg",
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
  //new image ncaa
  "Portland Pilots":
    "https://upload.wikimedia.org/wikipedia/commons/a/a8/Portland_pilots_logo.png",
  "Princeton Tigers":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Princeton_Tigers_logo.svg/1200px-Princeton_Tigers_logo.svg.png",
  "St. John's Red Storm":
    "https://i.pinimg.com/736x/7d/14/f9/7d14f91691ee94e633fca49fd8b3a1d6.jpg",
  "Howard Bison":
    "https://upload.wikimedia.org/wikipedia/en/b/b4/Howard_Bison_logo.svg",
  "Holy Cross Crusaders":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Holy_Cross_Crusaders_logo.svg/800px-Holy_Cross_Crusaders_logo.svg.png",
  "Maine Black Bears":
    "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Maine_Black_Bears_logo.svg/800px-Maine_Black_Bears_logo.svg.png",
  "American Eagles":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCbH5T7D2LhJJpVTwXDCWve4Kgie2ZlPQIftAjlV_MpdoQoac4hiijBs&s",
  "Albany Great Danes":
    "https://i.pinimg.com/736x/86/e7/5e/86e75e51b822d86e86ba5a498fca5abd.jpg",
  "Lamar Cardinals":
    "https://loodibee.com/wp-content/uploads/Lamar-Cardinals-logo.png",
  "Omaha Mavericks":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYooWCKIti07HG14HbncrflYfWySuuVhNkaOBcVcAx3rJLixFpxJscERX8oQmAXYCONq8&usqp=CAU",
  "Northeastern Huskies":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgM0S5dBRGz6MnmonN2eMxIAJlAR40TMXAaA&s",
  "CSU Bakersfield Roadrunners":
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Cal_State_Bakersfield_Roadrunners_logo.svg/640px-Cal_State_Bakersfield_Roadrunners_logo.svg.png",
  "Charleston Cougars":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/College_of_Charleston_Cougars_logo.svg/1760px-College_of_Charleston_Cougars_logo.svg.png",
  "Rhode Island Rams":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Rhode_Island_Rams_logo.svg/800px-Rhode_Island_Rams_logo.svg.png",
  "Portland St Vikings":
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Portland_State_Vikings_logo.svg",
  "VCU Rams":
    "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/VCU_Athletics_Logo.svg/800px-VCU_Athletics_Logo.svg.png",
  "Central Connecticut St Blue Devils":
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Central_Connecticut_Blue_Devils_logo.svg/800px-Central_Connecticut_Blue_Devils_logo.svg.png",
  "Wright St Raiders":
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Wright_State_Raiders_logo.svg/1200px-Wright_State_Raiders_logo.svg.png",
  "William & Mary Tribe":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVrQs6i8yVfU7wkNthsKyBfMHNljNeYaiDww&s",
  "Kennesaw St Owls":
    "https://content.sportslogos.net/logos/32/4949/full/kennesaw_state_owls_logo_secondary_20205230.png",
  "South Dakota St Jackrabbits":
    "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/South_Dakota_State_Jackrabbits_logo.svg/1200px-South_Dakota_State_Jackrabbits_logo.svg.png",
  "Bryant Bulldogs":
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Bryant_Bulldogs_logo.svg/800px-Bryant_Bulldogs_logo.svg.png",
  "St. Bonaventure Bonnies":
    "https://gobonnies.com/images/2024/7/15/Primary_white_wide.jpg?width=2000",
  "UNC Asheville Bulldogs":
    "https://1000logos.net/wp-content/uploads/2019/12/North-Carolina-Asheville-Bulldogs-Logo-1998.png",
  "Central Arkansas Bears":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLcDri4o87xDsNOszU7CIzLsJtxJO_oNHirw&s",
  "Valparaiso Beacons":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGCGqM7BS-AGPVLjjGF0r4sVTcPBymyI1xcg&s",
  "St. Thomas (MN) Tommies":
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/St._Thomas_Tommies_primary_logo.svg/1200px-St._Thomas_Tommies_primary_logo.svg.png",
  "Oklahoma St Cowboys":
    "https://brand.okstate.edu/site-files/images/brand-guide/primary-brand.png",
  "North Alabama Lions":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4t34BdqzHCu6AiTEbrHJureOGi1RekDimvw&s",
  "Northwestern St Demons":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6GjHRprVbQZAcRWlTQhVsmnASQ5Fb7QOuoQ&s",
  "Alabama St Hornets":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHoV6MAnzIDTtvKddcON-_SlGZM4xPqnltLQ&s",
  "Florida Int'l Golden Panthers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSRjXRPnMaCtp4ifWmJMwI-BObBCxwzPqLLg&s",
  "Florida Gulf Coast Eagles":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpuwh8WOkKMiJxeRdyz4GKrsSSMNMsE7H_1A&s",
  "Massachusetts Minutemen":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/UMass_Amherst_athletics_logo.svg/1200px-UMass_Amherst_athletics_logo.svg.png",
  "Sacramento St Hornets":
    "https://1000logos.net/wp-content/uploads/2022/04/Sacramento-State-Hornets-Logo-2004.png",
  "Towson Tigers":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Towson_Tigers_logo.svg/800px-Towson_Tigers_logo.svg.png",
  "Morgan St Bears":
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Morgan_State_Bears_logo.svg/250px-Morgan_State_Bears_logo.svg.png",
  "Utah Tech Trailblazers":
    "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Utah_Tech_Trailblazers_logo_2022.svg/1200px-Utah_Tech_Trailblazers_logo_2022.svg.png",
  "CSU Northridge Matadors":
    "https://upload.wikimedia.org/wikipedia/en/5/51/CSUN_Matadors_logo.svg",
  "Campbell Fighting Camels":
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Campbell_Fighting_Camels_logo.svg/800px-Campbell_Fighting_Camels_logo.svg.png",
  "Mercyhurst Lakers":
    "https://1000logos.net/wp-content/uploads/2019/09/Mercyhurst-Lakers-Logo.jpg",
  "Arkansas-Pine Bluff Golden Lions":
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Arkansas%E2%80%93Pine_Bluff_Golden_Lions_logo.svg/1200px-Arkansas%E2%80%93Pine_Bluff_Golden_Lions_logo.svg.png",
  "Idaho Vandals":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Idaho_Vandals_logo.svg/1200px-Idaho_Vandals_logo.svg.png",
  "San Diego Toreros":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/San_Diego_Toreros_logo.svg/1200px-San_Diego_Toreros_logo.svg.png",
  "Jackson St Tigers":
    "https://i.pinimg.com/originals/25/74/ed/2574edb6c3a0fb858e587048b6d7b71a.png",
  "High Point Panthers":
    "https://i.pinimg.com/originals/0b/dd/ac/0bddaca0992abbb380112a4c1048c5f2.png",
  "Bradley Braves":
    "https://upload.wikimedia.org/wikipedia/commons/1/17/Bradley_Braves_2012_New_Logo.png",
  "McNeese Cowboys":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwW3TTGQ9SF65LKTYEjzumo607yG9dYO4og&s",
  "Seton Hall Pirates":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqZmsAkUSOVsm0sREqbxWmjHcTXa-y4Y_ug&s",
  "Yale Bulldogs": "https://cdn.worldvectorlogo.com/logos/yale-bulldogs-1.svg",
  "Delaware Blue Hens":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF493kLxU1gpfUAtv8x9Ms1ZOkMeIZa8kyrA&s",
  "Denver Pioneers":
    "https://1000logos.net/wp-content/uploads/2019/12/Denver-Pioneers-Logo.jpg",
  "Montana Grizzlies":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMYwTsEZB6EGXlTV3nBhAwAcZTyxQVhH__Tw&s",
  "Grambling St Tigers":
    "https://www.kroger.com/product/images/large/front/0030820320907",
  "Texas Southern Tigers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgTOSQhOinEDFA2sgux8zjsVW6xY9N_0hFHw&s",
  "Southern Miss Golden Eagles":
    "https://lh3.googleusercontent.com/proxy/KBwx5fKMVNEFD5lO7XhaG9WmRXXPc6StEp2-Sljj02jOGqkqGdYLYDtWzkOQeHe7Xn9LUG2lxBXPWMyBbmJyyymUSZAHeNgb4UdgTwIWi7R5mUdC0xrJJngsiC8KcUTfDSA-UMgvSl29TdIGP6dlQshLd6U",
  "Drake Bulldogs":
    "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Drake_Bulldogs_logo.svg/640px-Drake_Bulldogs_logo.svg.png",
  "Radford Highlanders":
    "https://images.sidearmdev.com/convert?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fruhighlanders.com%2Fimages%2F2016%2F10%2F13%2FLOGORELEASE_GRAPHIC_jpg.jpeg&type=webp",
  "Siena Saints":
    "https://npr.brightspotcdn.com/dims4/default/df00da1/2147483647/strip/true/crop/3507x2160+333+0/resize/880x542!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Ffd%2Fa3%2F7493d58f4173bc946997506041bb%2Fsiena-saints-logo.png",
  "Fort Wayne Mastodons":
    "https://1000logos.net/wp-content/uploads/2019/10/Purdue-Fort-Wayne-Mastodons-Logo-2016.png",
  "Jacksonville Dolphins":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Jacksonville_Dolphins_logo_2018.svg/1200px-Jacksonville_Dolphins_logo_2018.svg.png",
  "Mercer Bears":
    "https://www.mercer.edu/wp-content/uploads/2019/04/Spirit-mercer-spirit-mark-01.png",
  "IUPUI Jaguars":
    "https://1000logos.net/wp-content/uploads/2022/02/IUPUI-Jaguars-logo.png",
  "Illinois St Redbirds":
    "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Illinois_State_Athletics_logo.svg/800px-Illinois_State_Athletics_logo.svg.png",
  "GW Revolutionaries":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/George_Washington_Athletics_logo.svg/1200px-George_Washington_Athletics_logo.svg.png",
  "Southern Illinois Salukis":
    "https://images.sidearmdev.com/resize?url=https%3A%2F%2Fsiusalukis.com%2Fimages%2F2019%2F2%2F28%2FSalukiLogo_PressRelease_2000x1000.jpg&width=1600",
  "CSU Northridge Matadors":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEaAef0OYcOSsQjevP8AEA2fpOWPkcfdDP0Q&s",
  "Fordham Rams":
    "https://logowik.com/content/uploads/images/fordham-rams6755.logowik.com.webp",
  "Merrimack Warriors": "https://pbs.twimg.com/media/EtYzBHJXEAQQ3gi.jpg",
  "UMass Lowell River Hawks":
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/UMass_Lowell_River_Hawks_logo.svg/640px-UMass_Lowell_River_Hawks_logo.svg.png",
  "San Francisco Dons":
    "https://upload.wikimedia.org/wikipedia/commons/a/af/San_Francisco_Dons_logo.svg",
  "North Carolina A&T Aggies":
    "https://fathead.com/cdn/shop/products/nnveii0dddhixol9wsto.jpg?v=1663312456",
  "LIU Sharks":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7PDPGAIMF6g_957trU31M5t73hZqyBtKV6A&s",
  "Winthrop Eagles":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92f5hJo6fomyd0no_3bp90XOZLw7kvTLsOg&s",
  "Tennessee St Tigers":
    "https://upload.wikimedia.org/wikipedia/en/d/d3/Tennessee_State_Athletics_logo.svg",
  "Chattanooga Mocs":
    "https://i.pinimg.com/564x/5f/a6/fe/5fa6fea978cb9ab8aa0e43906cd2fc54.jpg",
  "New Hampshire Wildcats":
    "https://1000logos.net/wp-content/uploads/2021/07/New-Hampshire-Wildcats-logo.png",
  "Columbia Lions":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdddWisfeALqKNEGLsQPDuPBD9FyM9k93S2g&s",
  "Cornell Big Red":
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Cornell_Big_Red_logo.svg/1200px-Cornell_Big_Red_logo.svg.png",
  "Iona Gaels":
    "https://www.iona.edu/sites/default/files/2020-08/ancillary-images/iona-gaels.jpg",
  "Stonehill Skyhawks":
    "https://content.sportslogos.net/logos/34/6861/full/stonehill_skyhawks_logo_primary_2012_sportslogosnet-9830.png",
  "Le Moyne Dolphins":
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Le_Moyne_Dolphins_logo.svg/1200px-Le_Moyne_Dolphins_logo.svg.png",
  "UT Rio Grande Valley Vaqueros":
    "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/UTRGV_Athletics_logo.svg/1200px-UTRGV_Athletics_logo.svg.png",
  "Maryland-Eastern Shore Hawks":
    "https://1000logos.net/wp-content/uploads/2021/06/Maryland-Eastern-Shore-Hawks-logo.png",
  "Oregon St Beavers":
    "https://i.pinimg.com/originals/78/88/91/788891e826b1db28de6e9648b2c6d273.png",
  "Houston Christian Huskies":
    "https://hc.edu/wp-content-uploads/marketing/athletic-logos/png-logos/HCU-Husky-Full-Color.png",
  "Incarnate Word Cardinals":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyJfnkAq-6s4v5z6kNaK2rS1ataQEqMqHnIw&s",
  "Indiana St Sycamores":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Indiana_State_Sycamores_logo.svg/1200px-Indiana_State_Sycamores_logo.svg.png",
  "Southern Indiana Screaming Eagles":
    "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Southern_Indiana_Screaming_Eagles_logo.svg/1200px-Southern_Indiana_Screaming_Eagles_logo.svg.png",
  "Saint Louis Billikens":
    "https://slubillikens.com/images/2020/6/1/Logo_without_lense_flare.jpg",
  "San José St Spartans":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcvBZB5ZHt4tic3HAhBCPU4UMbWM2thAkQkw&s",
  "Xavier Musketeers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJhIlc0vesjuvTEfNKCanI9e4UtZibpnyEA&s",
  "Abilene Christian Wildcats":
    "https://upload.wikimedia.org/wikipedia/en/6/6c/Abilene_Christian_Wildcats_logo.svg",
  "Southern Miss Golden Eagles":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILDO8X72yIcV5bZw-auqTKxqvNODvqony9A&s",
  "Norfolk St Spartans":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Norfork_State_Spartans_logo.svg/1200px-Norfork_State_Spartans_logo.svg.png",
  "UC Davis Aggies":
    "https://logos-world.net/wp-content/uploads/2020/06/California-Davis-Aggies-Logo.png",
  "Arkansas-Little Rock Trojans":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6cXcdYq-v__-jP-yhcWkL-sSMc1XROcxrQ&s",
  "Long Beach St 49ers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQgT_Br2sMGkGcaH7rqx3PTpeyLULOm-iMg&s",
  "UNC Greensboro Spartans":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/UNCG_Spartans_logo.svg/800px-UNCG_Spartans_logo.svg.png",
  "Dayton Flyers":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Dayton_Flyers_logo.svg/2560px-Dayton_Flyers_logo.svg.png",
  "Detroit Mercy Titans":
    "https://upload.wikimedia.org/wikipedia/en/a/a6/Detroit_Titans_logo.svg",
  "SE Louisiana Lions":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TkSiwCyQFLylUmvggvi1CgITIvPqf-n3Dw&s",
  "San Diego St Aztecs":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIpcUVh2cQX8NH7w6ZweDC9dZQEtNa0jklAQ&s",
  "Creighton Bluejays":
    "https://content.sportslogos.net/logos/30/652/full/3707_creighton_blue_jays-alternate-2013.png",
  "Austin Peay Governors":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAf5IQFq9oscZu_oj8sFx4u2IWiLnxZplbmQ&s",
  "Georgia St Panthers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqmV738GS_WX8lLifd3HfzF84pCR4gt_UmQ&s",
  "Richmond Spiders":
    "https://content.sportslogos.net/logos/33/814/full/richmond_spiders_logo_alternate_20022544.png",
  "Murray St Racers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ouv6d4LD0Kgd66Ft553397Vb_Y_Xoog-MA&s",
  "Utah Valley Wolverines":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVi-BPv5TsCclk0alyL0zMdoyQ3ry-TRFyTg&s",
  "NJIT Highlanders":
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/NJIT_Highlanders_logo.svg/1200px-NJIT_Highlanders_logo.svg.png",
  "Coppin St Eagles":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv9kU3VJfrNgTMt132VGPtHNclpd4XhzWuKQ&s",
  "Saint Joseph's Hawks":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Saint_Joseph%27s_Hawks_logo.svg/1200px-Saint_Joseph%27s_Hawks_logo.svg.png",
  "Saint Peter's Peacocks":
    "https://content.sportslogos.net/logos/34/853/full/saint_peters_peacocks_logo_primary_20124558.png",
  "Fairleigh Dickinson Knights":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiq2NgZW1mwMxHUeJu2VzcKlnPY9mgkPSAzA&s",
  "Georgetown Hoyas":
    "https://i.pinimg.com/originals/1e/e3/f2/1ee3f2de9c22a3eeab525420ce4de473.png",
  "Grand Canyon Antelopes":
    "https://1000logos.net/wp-content/uploads/2019/11/Grand-Canyon-Antelopes-Logo-2013.png",
  "Lehigh Mountain Hawks":
    "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/LehighMountainHawks.svg/1200px-LehighMountainHawks.svg.png",
  "St. Francis (PA) Red Flash":
    "https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2598.png",
  "VMI Keydets":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/VMI_Keydets_logo.svg/1200px-VMI_Keydets_logo.svg.png",
  "Manhattan Jaspers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbMjdWwbl4M9R_8fyqFWFbffXUnh4ujWB8CQ&s",
  "North Dakota St Bison":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/North_Dakota_State_Bison_logo.svg/1200px-North_Dakota_State_Bison_logo.svg.png",
  "South Carolina Upstate Spartans":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/USC_Upstate_Spartans_logo.svg/800px-USC_Upstate_Spartans_logo.svg.png",
  "Loyola Marymount Lions":
    "https://1000logos.net/wp-content/uploads/2019/09/LMU_Loyola-Marymount-Lions-logo.png",
  "CSU Fullerton Titans":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/CSUF_Titans_Logo.svg/2058px-CSUF_Titans_Logo.svg.png",
  "Pepperdine Waves":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-JCmChMGZKIYwAs6QafizxCcjJyCAvPobcA&s",
  "Cal Baptist Lancers":
    "https://content.sportslogos.net/logos/30/6812/full/california_baptist_lancers_logo_primary_2017_sportslogosnet-5309.png",
  "Cal Poly Mustangs":
    "https://logos-world.net/wp-content/uploads/2020/06/Cal-Poly-Mustangs-Logo.png",
  "Eastern Washington Eagles":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13FF4Y-ezs2gLr7VAAQ9dZtbPurmTm7FtAQ&s",
  "UC Santa Barbara Gauchos":
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/UC_Santa_Barbara_Gauchos_logo.svg/1200px-UC_Santa_Barbara_Gauchos_logo.svg.png",
  "Furman Paladins":
    "https://www.furman.edu/wp-content/uploads/2019/01/paladins-logo/PNG/Paladins-Logo-RGB.png",
  "Seattle Redhawks":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOsnTUlgpNxRHSA5u9Q5KxGONxcWIgw-ThQ&s",
  "Fresno St Bulldogs":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6xD0n1YUKBOsu2Fnds8BK9m7sQnBuj2riQ&s",
  "Washington St Cougars":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvSBJJ9fR-u-snnjkioSDhXwRfRvvtiAml8A&s",
  "Perth Glory":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRPM2-OnyfMRXo9PXGs-Hht2bNo9CPW9vAg&s",
  "Adelaide United":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcHpDugZU4kYt3X3H-nHUmVD36gs3yRNolnw&s",
  "Newcastle Jets FC":
    "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Newcastle_United_Jets_Logo.svg/1200px-Newcastle_United_Jets_Logo.svg.png",
  "Auckland FC":
    "https://upload.wikimedia.org/wikipedia/en/8/8c/Auckland_FC_crest.svg",
  "Western Sydney Wanderers":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Logo_of_Western_Sydney_Wanderers_FC.svg/1200px-Logo_of_Western_Sydney_Wanderers_FC.svg.png",
  "Melbourne City":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7q14P-ZZo1qYi59ecZ0NpVxPbdBEyRagGAw&s",
  "Macarthur FC":
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Macarthur_FC_logo.svg/1200px-Macarthur_FC_logo.svg.png",
  "Melbourne Victory":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM0AyDroCyJ-EEZ-7cqvgH4FpfTDzOIGHXg&s",
  "Western United FC":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qmrVRzE5XkwXbt_FqvMJW_8Hfo63T0Dc_w&s",
  "Wellington Phoenix FC":
    "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Wellington_Phoenix_FC_logo.svg/1200px-Wellington_Phoenix_FC_logo.svg.png",
  "Central Coast Mariners":
    "https://e7.pngegg.com/pngimages/493/458/png-clipart-central-coast-mariners-fc-north-shore-mariners-fc-a-league-melbourne-city-fc-ffa-cup-football-text-sport-thumbnail.png",
  "Wolfsberger AC":
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Wolfsberger_AC_logo.svg/1200px-Wolfsberger_AC_logo.svg.png",
  "Grazer AK":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThc9VxoPPz4olYXhohBxOe4dBjC-2erGOAKA&s",
  "RB Salzburg":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/FC_Red_Bull_Salzburg_logo.svg/1200px-FC_Red_Bull_Salzburg_logo.svg.png",
  Hartberg:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLSwSnR3zsRwLPBi3_g_SUzeD9K2b3PRRcA&s",
  "Sturm Graz":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThyimx9fnFwa5YJ-dQIoNA6JS7bSxzVMMVJQ&s",
  "Rheindorf Altach":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/SC_Rheindorf_Altach_logo.svg/1200px-SC_Rheindorf_Altach_logo.svg.png",
  "WSG Tirol":
    "https://upload.wikimedia.org/wikipedia/en/3/33/WSG_Tirol_logo.png",
  "Austria Klagenfurt":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/SK_Austria_Klagenfurt_2007_Logo.svg/1200px-SK_Austria_Klagenfurt_2007_Logo.svg.png",
  "FC Blau-Weiß Linz":
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/FC_Blau-Wei%C3%9F_Linz_logo.svg/1200px-FC_Blau-Wei%C3%9F_Linz_logo.svg.png",
  "Rapid Wien":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/SK_Rapid_Wien_Logo.svg/815px-SK_Rapid_Wien_Logo.svg.png",
  "Austria Wien":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Z4PGkVOrCkGgw38PT-lhs-KFWkWiZgKUQ&s",
  LASK: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/LASK-Logo_2023.svg/1621px-LASK-Logo_2023.svg.png",
  "KV Mechelen":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLL0TyzP_Z-Z4bIX02v1zUa2ezguxexneh7w&s",
  "KV Kortrijk":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq-9xkVtnBkDc5HJ-UaCoib4Duj-xbcLhfqQ&s",
  Dender:
    "https://seeklogo.com/images/F/fc-verbroedering-dender-eh-logo-45F2E5CB64-seeklogo.com.png",
  "Club Brugge":
    "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Club_Brugge_KV_logo.svg/1200px-Club_Brugge_KV_logo.svg.png",
  "Standard Liege":
    "https://upload.wikimedia.org/wikipedia/en/b/bd/Standard_Li%C3%A8ge_BC_logo.png",
  Charleroi:
    "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Royal_Charleroi_Sporting_Club_logo.svg/1200px-Royal_Charleroi_Sporting_Club_logo.svg.png",
  Genk: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/KRC_Genk_Logo_2016.svg/1633px-KRC_Genk_Logo_2016.svg.png",
  "Sint Truiden":
    "https://upload.wikimedia.org/wikipedia/en/f/f1/K._Sint-Truidense_V.V._logo.png",
  Anderlecht:
    "https://logos-world.net/wp-content/uploads/2020/11/Anderlecht-Logo.png",
  Leuven:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQFY0EjjKkg1s8S8zsB7tKfPHrDCIAmfvLXg&s",
  "Cercle Brugge KSV":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzOvhNaoNPJdZlgJGuTKlELdBxiAb2fR4GHw&s",
  "Beerschot Wilrijk":
    "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Koninklijke_Beerschot_Voetbalclub_Antwerpen_logo.svg/1200px-Koninklijke_Beerschot_Voetbalclub_Antwerpen_logo.svg.png",
  "Royal Antwerp":
    "https://logowik.com/content/uploads/images/royal-antwerp-fc2501.jpg",
  "Union Saint-Gilloise":
    "https://w7.pngwing.com/pngs/908/790/png-transparent-union-saint-gilloise-logo-football-belgian-football-clubs-logos.png",
  Gent: "https://banner2.cleanpng.com/20180627/owk/aay0k7sq0.webp",
  Westerlo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jnyft9TYy52UZayQY6fEDXEKPZ2TEHhhbw&s",
  Criciuma:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/EscudoCriciumaEC.svg",
  Fluminense:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/EscudoCriciumaEC.svg",
  Flamengo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/1200px-Flamengo_braz_logo.svg.png",
  Fortaleza:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRayCOHSg5DkLr6sa59uyPoMcVjtiY6cuqIeg&s",
};

export const EventScore = React.memo(() => {
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState({});
  const [activeTab, setActiveTab] = useState("spreads,totals,h2h");
  const [marketkey, setMarketKey] = useState([]);
  const [propData, setPropData] = useState([]);
  const [markets, setMarket] = useState("player_assists");
  const [marketName, setMarketName] = useState("");
  const [eventOdds, setEventOdds] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState(() => {
    const storedMarkets = localStorage.getItem("cartData");
    return storedMarkets ? JSON.parse(storedMarkets) : [];
  });
  console.log("SCOREDATA", scoreData);

  const [activeTabs, setActiveTabs] = useState("Straights");
  const [parlayBet, setParlayBet] = React.useState();
  const [parlayResult, setParlayResult] = React.useState(0);
  const [bookmakers, setBookmakers] = React.useState([]);
  const [bookmaker, setBookmaker] = React.useState("draftkings");
  const [propBookmaker, setPropBookmaker] = React.useState("draftkings");
  const [bookmakerName, setBookmakername] = React.useState("DraftKings");
  const [load, setLoad] = React.useState(false);
  const token = getToken();
  const [teaser, setTeaser] = React.useState(6);
  const [teaserBet, setTeaserBet] = React.useState();
  const [teaserResult, setTeaserResult] = React.useState(0);
  const location = useLocation();
  const event = location.state || {};

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(selectedMarkets));
  }, [selectedMarkets]);

  React.useEffect(() => {
    if (event?.sport_key === "americanfootball_nfl") {
      setTeaser(6);
    } else if (event?.sport_key === "basketball_nba") {
      setTeaser(4);
    } else {
      setTeaser(6);
    }
  }, [event?.sport_key]);

  const Fandualodds = eventOdds?.bookmakers?.find((m) => m.key === bookmaker);
  const getmonyline = selectedMarkets?.find(
    (item) => item?.market == "moneyline"
  );
  const totalWager = selectedMarkets.reduce(
    (total, market) => total + (market.wager || 0),
    0
  );
  const handleBookmaker = (e) => {
    setBookmaker(e.target.value);
    setBookmakername(e.target.options[e.target.selectedIndex].text);
  };
  const handlePropBookmaker = (e) => {
    setPropBookmaker(e.target.value);
    // setBookmakername(e.target.options[e.target.selectedIndex].text);
  };
  useEffect(() => {
    fetchScore();
    fetchEventOdds();
  }, [event, activeTab]);
  useEffect(() => {
    if (eventOdds?.bookmakers) {
      const bookmakerKeysAndTitles = eventOdds?.bookmakers?.map(
        (bookmaker) => ({
          key: bookmaker.key,
          title: bookmaker.title,
        })
      );

      setBookmakers(bookmakerKeysAndTitles);
    }
  }, [eventOdds]);

  const totalPays = selectedMarkets.reduce(
    (total, market) => total + (market.winAmount || 0),
    0
  );

  const handleMarketClick = (newItem) => {
    setSelectedMarkets((currentCartData) => {
      const exists = currentCartData.some(
        (item) =>
          item.id === newItem.id &&
          item.market === newItem.market &&
          item.team === newItem.team &&
          item?.point === newItem?.point &&
          item?.bookmaker === newItem?.bookmaker
      );
      if (exists) {
        toast.error(`Item already exists in the BetSlip`);
        return currentCartData;
      }
      const updatedCart = [...currentCartData, newItem];
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setMarket(e.target.value);
    setMarketName(e.target.options[selectedIndex].text);
  };

  useEffect(() => {
    fetchMarket();
    fetchProps();
  }, [markets]);

  const fetchMarket = async () => {
    try {
      const response = await fetch(
        `${ApiEndPoints.Get_Market}${event?.sport_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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

  useEffect(() => {
    if (activeTabs === "Teaser") {
      calculateTeaser();
    }
  }, [activeTabs, teaserBet, selectedMarkets]);

  const handleSelect = (key) => {
    setActiveTabs(key);
  };

  const fetchScore = async () => {
    try {
      const response = await fetch(
        // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${apikey}`,
        // ` https://api.the-odds-api.com/v4/sports/${event?.sport_key}/scores/?daysFrom=1&apiKey=${ApiEndPoints.ApiKey}&eventIds=${event?.sport_key_id}`,
        ApiEndPoints.getScoreById + event?.sport_key_id,
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
      setScoreData(data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEventOdds = async () => {
    try {
      const response = await fetch(
        // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${apikey}`,
        `https://api.the-odds-api.com/v4/sports/${event?.sport_key}/events/${event?.sport_key_id}/odds?apiKey=${ApiEndPoints.ApiKey}&regions=us&markets=${activeTab}&oddsFormat=american`,
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
      setEventOdds(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProps = async () => {
    try {
      const response = await fetch(
        // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${apikey}`,
        `https://api.the-odds-api.com/v4/sports/${event?.sport_key}/events/${event?.sport_key_id}/odds?apiKey=${ApiEndPoints.ApiKey}&regions=us&markets=${markets}&oddsFormat=american`,
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
                src={teamImages[scoreData?.home_team]}
                alt="Denver Broncos"
                style={{ width: "60px" }}
              />
              <h6 className="mt-2 fw-bold">{scoreData?.home_team}</h6>
              {/* <p className="text-muted">5-4</p> */}
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h2 className="mb-0">
                {scoreData?.scores?.[1]?.score ?? ""} -
                {scoreData?.scores?.[0]?.score ?? ""}
              </h2>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <img
                src={teamImages[scoreData?.away_team]}
                alt="Baltimore Ravens"
                style={{ width: "60px" }}
              />
              <h6 className="mt-2 fw-bold">{scoreData?.away_team}</h6>
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

  const calculateTeaser = () => {
    const nflTeaserOdds = {
      2: { 6: -120, 6.5: -130, 7: -140 },
      3: { 6: +150, 6.5: +135, 7: +120 },
      4: { 6: +300, 6.5: +275, 7: +250 },
      5: { 6: +450, 6.5: +400, 7: +375 },
      6: { 6: +600, 6.5: +550, 7: +500 },
    };

    const nbaTeaserOdds = {
      2: { 4: -110, 4.5: -120, 5: -130 },
      3: { 4: +140, 4.5: +130, 5: +120 },
      4: { 4: +300, 4.5: +250, 5: +200 },
      5: { 4: +450, 4.5: +400, 5: +350 },
      6: { 4: +600, 4.5: +500, 5: +450 },
    };

    let oddsTable;
    if (event?.sport_key === "americanfootball_nfl") {
      oddsTable = nflTeaserOdds;
    } else if (event?.sport_key === "basketball_nba") {
      oddsTable = nbaTeaserOdds;
    } else {
      console.error("Unsupported sport type");
      return;
    }

    const formattedTease = teaser?.toString();
    const validOdds = oddsTable[selectedMarkets?.length]?.[formattedTease];

    if (validOdds === undefined) {
      console.log("Invalid number of teams or teaser points.");
      return;
    }

    let decimalOdds;
    if (validOdds < 0) {
      decimalOdds = 1 + 100 / Math.abs(validOdds);
    } else {
      decimalOdds = 1 + validOdds / 100;
    }

    const totalPayout = teaserBet * decimalOdds;
    const profit = totalPayout - teaserBet;

    setTeaserResult(profit?.toFixed(2));

    return {
      totalPayout: totalPayout.toFixed(2),
      profit: profit.toFixed(2),
      odds: validOdds,
    };
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
    for (let item of selectedMarkets) {
      if ((activeTabs == "Straights" && !item.wager) || item.wager <= 0) {
        toast.error(`Please enter wager amount`);
        return;
      }
      if ((activeTabs == "Parlay" && !parlayBet) || parlayBet <= 0) {
        toast.error(`Please enter wager amount`);
        return;
      }
      if ((activeTabs == "Teaser" && !teaserBet) || teaserBet <= 0) {
        toast.error(`Please enter wager amount`);
        return;
      }
    }
    selectedMarkets?.forEach((item, index) => {
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
      formData.append(`odds[${index}][sport_key]`, item.key);
      formData.append(`odds[${index}][sport_id]`, item?.id);
      formData.append(`odds[${index}][sport_name]`, item?.title);
      formData.append(`odds[${index}][loss_amount]`, 0);
      formData.append(`odds[${index}][bookmaker_key]`, item?.bookmaker);
      formData.append(`odds[${index}][bookmaker_name]`, item?.bookmakerName);
    });
    formData.append(`bet_type`, activeTabs);
    formData.append(
      `total_amount`,
      activeTabs == "Straights"
        ? totalWager
        : activeTabs == "Parlay"
        ? parlayBet
        : teaserBet
    );
    formData.append(
      `bet_win_amount`,
      activeTabs == "Straights"
        ? totalPays
        : activeTabs == "Parlay"
        ? parlayResult
        : teaserResult
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
        setSelectedMarkets([]);
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

  const SubmitBet = () => {
    if (token) {
      SubmitPlaceBet();
    } else {
      navigate("/login");
    }
  };
  const GameOdds1 = React.memo(({ data }) => {
    const spreadMarket = data?.markets?.find(
      // (m) => m.key === "spreads" || "spreads_h1"
      (m) =>
        [
          "spreads",
          "spreads_q1",
          "spreads_q2",
          "spreads_q3",
          "spreads_q4",
          "spreads_h1",
          "spreads_h2",
        ].includes(m.key)
    );
    const moneylineMarket = data?.markets?.find((m) =>
      [
        "h2h",
        "h2h_h1",
        "h2h_h2",
        "h2h_q4",
        "h2h_q3",
        "h2h_q2",
        "h2h_q1",
      ].includes(m.key)
    );
    const totalsMarket = data?.markets?.find(
      // (m) => m.key === "totals" || "totals_h1"
      (m) =>
        [
          "totals_q1",
          "totals_q2",
          "totals_q3",
          "totals_q4",
          "totals_h1",
          "totals_h2",
          "totals",
        ].includes(m.key)
    );

    return (
      <Container className="p-4 ">
        <Card className="p-4 text-start">
          <h5 className="fw-bold">
            {event?.home_team} vs. {event?.away_team} Odds
          </h5>
          <Row className="mt-2">
            <Col>
              <h7 className="text-start font-weight-bold">
                Spread, Total, Moneyline
              </h7>
            </Col>
            <Col>
              {bookmakers?.length > 0 && (
                <Form.Group
                  onChange={handleBookmaker}
                  controlId="formSelect "
                  className="mb-3"
                >
                  <Form.Select value={bookmaker} aria-label="Select option">
                    {bookmakers?.map((sport, index) => (
                      <option key={index} value={sport.key}>
                        {sport.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </Col>
          </Row>

          <hr />
          {OddsTabBar()}
          <hr />
          <Row className="text-center font-weight-bold text-muted">
            <Col className="fw-bold" xs={12} lg={4}>
              Matchup
            </Col>
            <Col className="fw-bold" xs={4} lg={2}>
              Spread
            </Col>
            <Col className="fw-bold" xs={4} lg={2}>
              Total
            </Col>
            <Col className="fw-bold" xs={4} lg={2}>
              Moneyline
            </Col>
          </Row>
          <hr />

          {/* Away Team Row */}
          <Row className="align-items-center mt-3 text-center">
            <Col
              xs={12}
              lg={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={teamImages[event?.away_team]}
                // alt={eventOdds?.away_team}
                width="30"
                className="mr-2"
              />
              <span className="fw-bold ms-2">
                {event?.away_team?.slice(0, 15) + "..."}
              </span>
            </Col>
            <Col xs={4} lg={2}>
              <Button
                variant="#155239"
                className="odds-btn"
                disabled={!spreadMarket?.outcomes[1].price}
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() => {
                  handleMarketClick({
                    team: eventOdds?.away_team,
                    market: "spreads",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...spreadMarket?.outcomes[1],
                    key: event?.sport_key,
                    title: event?.sport_title,
                    id: event?.id,
                    bookmaker: bookmaker,
                    bookmakerName: bookmakerName,
                  });
                }}
              >
                {!spreadMarket?.outcomes[1]?.price ? (
                  "N/A"
                ) : (
                  <>
                    {spreadMarket?.outcomes[1]?.point} <br />(
                    {spreadMarket?.outcomes[1]?.price})
                  </>
                )}
              </Button>
            </Col>
            <Col xs={4} lg={2}>
              <Button
                variant="#155239"
                className="odds-btn"
                disabled={!totalsMarket?.outcomes[0].price}
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.away_team,
                    market: "totals",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...totalsMarket?.outcomes[0],
                    key: event?.sport_key,
                    title: event?.sport_title,
                    id: event?.id,
                    bookmaker: bookmaker,
                    bookmakerName: bookmakerName,
                  })
                }
              >
                {totalsMarket?.outcomes[0]?.point ? (
                  <>
                    o{totalsMarket?.outcomes[0]?.point} <br />(
                    {totalsMarket?.outcomes[0]?.price})
                  </>
                ) : (
                  "N/A"
                )}
              </Button>
            </Col>
            <Col xs={4} lg={2}>
              <Button
                variant="#155239"
                className="odds-btn"
                disabled={!moneylineMarket?.outcomes[1].price}
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
                    id: event?.id,
                    bookmaker: bookmaker,
                    bookmakerName: bookmakerName,
                  })
                }
              >
                {moneylineMarket?.outcomes[1]?.price
                  ? moneylineMarket.outcomes[1].price
                  : "N/A"}
              </Button>
            </Col>
          </Row>

          {/* Home Team Row */}
          <Row className="align-items-center mt-3 text-center">
            <Col
              xs={12}
              lg={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={teamImages[event?.home_team]}
                // alt={eventOdds?.home_team}
                width="30"
                className="mr-2"
              />
              <span className="fw-bold ms-2">
                {event?.home_team?.slice(0, 15) + ".."}
              </span>
            </Col>
            <Col xs={4} lg={2}>
              <Button
                variant="#155239"
                className="odds-btn"
                disabled={!spreadMarket?.outcomes[0].price}
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.home_team,
                    market: "spreads",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...spreadMarket?.outcomes[0],
                    key: event?.sport_key,
                    title: event?.sport_title,
                    id: event?.id,
                    bookmaker: bookmaker,
                    bookmakerName: bookmakerName,
                  })
                }
              >
                {/* {spreadMarket?.outcomes[0].point} <br /> (
                {spreadMarket?.outcomes[0].price}) */}
                {!spreadMarket?.outcomes[0]?.price ? (
                  "N/A"
                ) : (
                  <>
                    {spreadMarket?.outcomes[0]?.point} <br />(
                    {spreadMarket?.outcomes[0]?.price})
                  </>
                )}
              </Button>
            </Col>
            <Col xs={4} lg={2}>
              <Button
                variant="#155239"
                className="odds-btn"
                disabled={!totalsMarket?.outcomes[1].price}
                style={{ minWidth: "80px", minHeight: "62px" }}
                onClick={() =>
                  handleMarketClick({
                    team: eventOdds?.home_team,
                    market: "totals",
                    home_team: eventOdds?.home_team,
                    away_team: eventOdds?.away_team,
                    ...totalsMarket?.outcomes[1],
                    key: event?.sport_key,
                    title: event?.sport_title,
                    id: event?.id,
                    bookmaker: bookmaker,
                    bookmakerName: bookmakerName,
                  })
                }
              >
                {/* u{totalsMarket?.outcomes[1].point} (
                {totalsMarket?.outcomes[1].price}) */}
                {totalsMarket?.outcomes[1]?.point ? (
                  <>
                    u{totalsMarket?.outcomes[1]?.point} <br />(
                    {totalsMarket?.outcomes[1]?.price})
                  </>
                ) : (
                  "N/A"
                )}
              </Button>
            </Col>
            <Col xs={4} lg={2}>
              <Button
                variant="#155239"
                className="odds-btn"
                disabled={!moneylineMarket?.outcomes[0].price}
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
                    id: event?.id,
                    bookmaker: bookmaker,
                    bookmakerName: bookmakerName,
                  })
                }
              >
                {/* {moneylineMarket?.outcomes[0].price} */}
                {moneylineMarket?.outcomes[0]?.price
                  ? moneylineMarket.outcomes[0].price
                  : "N/A"}
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

  const BetSlip = () => {
    return (
      <Container className="border mt-4 rounded p-4">
        <Row className="d-flex justify-content-between align-items-center mb-3">
          <Col xs="auto">
            <h5 className="mb-0">
              Betslip{" "}
              <Badge bg="#155239" style={{ backgroundColor: "#155239" }}>
                {selectedMarkets.length}
              </Badge>
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
          {selectedMarkets?.length >= 2 && (
            <Col xs="auto">
              <Tabs
                className="mb-2 odds-tab-bar-new border-bottom-0"
                onSelect={handleSelect}
              >
                <Tab eventKey="Straights" title="Straights"></Tab>
                <Tab eventKey="Parlay" title="Parlay"></Tab>
                <Tab eventKey="Teaser" title="Teaser"></Tab>
              </Tabs>
            </Col>
          )}
          <Col xs="auto">
            <Button
              onClick={() => setSelectedMarkets([])}
              variant="link"
              size="sm"
              className="text-danger p-0"
              style={{ fontSize: "12px", fontWeight: "500" }}
            >
              Clear All
            </Button>
          </Col>
        </Row>

        {activeTabs === "Parlay" ? (
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
                            {market?.market == "moneyline" ? null : (
                              <input
                                type="text"
                                placeholder="0.00"
                                className="form-control"
                                value={market.point || ""}
                                readOnly
                              />
                            )}
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
              onClick={SubmitBet}
              disabled={selectedMarkets.length === 0}
              variant="#155239"
              style={{ backgroundColor: "#155239", color: "white" }}
              size="lg"
              className="w-100"
            >
              Bet Now
            </Button>
          </>
        ) : activeTabs === "Teaser" ? (
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
                  <Col xs={12} md={4} lg={4}>
                    <div className="d-flex flex-column">
                      <span>Wager</span>
                      <input
                        type="text"
                        placeholder="0.00"
                        className="form-control"
                        value={teaserBet}
                        onChange={(e) => setTeaserBet(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={4}>
                    <div className="d-flex flex-column">
                      <span>To Win</span>
                      <input
                        placeholder="0.00"
                        className="form-control"
                        value={teaserResult}
                        readOnly
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={4} lg={4}>
                    <div className="d-flex flex-column">
                      <span>Tease</span>
                      <input
                        placeholder="0.00"
                        className="form-control"
                        value={teaser >= 0 ? `+${teaser}` : teaser}
                        onChange={(e) => {
                          let value = e.target.value;

                          let numericValue = value.replace(/[^0-9.-]/g, "");

                          const parsedValue = parseFloat(numericValue);
                          setTeaser(isNaN(parsedValue) ? 0 : parsedValue);
                        }}
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
                        <span className="small">
                          {market?.market == "totals" ? market?.name : ""}
                        </span>{" "}
                        <span className="fw-bold">
                          {market?.market !== "totals" &&
                            (market?.point + teaser >= 0 ? "+" : "-")}

                          {market?.name === "Over"
                            ? (parseFloat(market?.point) - teaser).toFixed(1)
                            : (parseFloat(market?.point) + teaser).toFixed(1)}
                        </span>
                        <span className="text-muted"> ({market?.price})</span>
                        <span className="text-muted small fw-bold   ms-1">
                          {market?.home_team?.slice(0, 3).toUpperCase()}@
                          {market?.away_team?.slice(0, 3).toUpperCase()}
                        </span>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      {market?.market !== "moneyline" &&
                        market?.market !== "h2h" && (
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
                                  {market?.market}
                                </span>
                              </div>
                              <div>
                                {market.market === "spreads" ? (
                                  <div>
                                    <span className="form-control">
                                      {typeof parseFloat(market?.point) ===
                                        "number" &&
                                      !isNaN(parseFloat(market?.point)) &&
                                      typeof teaser === "number" &&
                                      !isNaN(teaser)
                                        ? (
                                            parseFloat(market?.point) + teaser
                                          ).toFixed(1)
                                        : 0}
                                    </span>
                                  </div>
                                ) : market.market === "totals" &&
                                  market?.name === "Over" ? (
                                  <div>
                                    <span className="form-control">
                                      {typeof parseFloat(market?.point) ===
                                        "number" &&
                                      !isNaN(parseFloat(market?.point)) &&
                                      typeof teaser === "number" &&
                                      !isNaN(teaser)
                                        ? (
                                            parseFloat(market?.point) - teaser
                                          ).toFixed(1)
                                        : 0}
                                    </span>
                                  </div>
                                ) : market.market === "totals" &&
                                  market?.name === "Under" ? (
                                  <div>
                                    <span className="form-control">
                                      {typeof parseFloat(market?.point) ===
                                        "number" &&
                                      !isNaN(parseFloat(market?.point)) &&
                                      typeof teaser === "number" &&
                                      !isNaN(teaser)
                                        ? (
                                            parseFloat(market?.point) + teaser
                                          ).toFixed(1)
                                        : 0}
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                        )}
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
                <h6>${teaserBet}</h6>
              </Col>
            </Row>

            <Row className="mt-2 mb-4">
              <Col xs={6}>
                <h6>To Win:</h6>
              </Col>
              <Col xs={6} className="text-end">
                <h6>${teaserResult}</h6>
              </Col>
            </Row>

            {getmonyline && (
              <span className="text-danger" style={{ fontSize: "12px" }}>
                Teasers can only include spreads and totals from football and
                basketball. Please remove invalid picks or select a different
                bet type.
              </span>
            )}
            <Button
              onClick={SubmitBet}
              variant="#155239"
              disabled={selectedMarkets?.length === 0 || getmonyline}
              style={{ backgroundColor: "#155239", color: "white" }}
              size="lg"
              className="w-100"
            >
              Bet Now
            </Button>
          </>
        ) : (
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
              onClick={SubmitBet}
              disabled={selectedMarkets.length === 0}
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
    const handleSelect = (key) => setActiveTab(key);

    return (
      <Tabs
        activeKey={activeTab}
        onSelect={handleSelect}
        className="mb-2 odds-tab-bar border-bottom-0"
      >
        <Tab eventKey="spreads,totals,h2h" title="Game"></Tab>
        <Tab eventKey="h2h_h1,spreads_h1,totals_h1" title="1H"></Tab>
        <Tab eventKey="h2h_h2,spreads_h2,totals_h2" title="2H"></Tab>
        <Tab eventKey="h2h_q1,spreads_q1,totals_q1" title="1Q"></Tab>
        <Tab eventKey="h2h_q2,totals_q2,spreads_q2" title="2Q"></Tab>
        <Tab eventKey="h2h_q3,spreads_q3,totals_q3" title="3Q"></Tab>
        <Tab eventKey="h2h_q4,spreads_q4,totals_q4" title="4Q"></Tab>
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
            <Col className="mb-3" lg={5} md={4}>
              <h5 className="fw-bold">Prop Odds</h5>
            </Col>
            {/* <Col className="mb-3" lg={4} md={4}>
              <Form.Group controlId="formSelect ">
                <Form.Select
                  onChange={handlePropBookmaker}
                  aria-label="Select option"
                >
                  {bookmakers?.map((market, index) => (
                    <option key={index} value={market.key}>
                      {market.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col> */}
            <Col className="mb-3" lg={5} md={4}>
              <Form.Group controlId="formSelect ">
                <Form.Select
                  onChange={handleSelectChange}
                  aria-label="Select option"
                >
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
            <Col xs={4} lg={4}>
              <strong>PLAYER</strong>
            </Col>
            <Col className="" lg={8} xs={3}>
              <strong>ODDS</strong>
            </Col>
          </Row>
          <hr />

          {propData?.bookmakers?.filter((market) => market.key === "fanduel")
            .length === 0 ? (
            <p>No props found</p>
          ) : (
            propData?.bookmakers
              ?.filter((market) => market.key === bookmaker)
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
                        <Row>
                          {group.odds.map((outcome, idx) => (
                            <Col xs={6}>
                              <Button
                                key={idx}
                                variant="#155239"
                                className="odds-btn"
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
                                    bookmaker: bookmaker,
                                    bookmakerName: bookmakerName,
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
                            </Col>
                          ))}
                        </Row>
                      </Col>
                      <hr className="mt-2" />
                    </Row>
                  ))}
                </div>
              ))
          )}
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
