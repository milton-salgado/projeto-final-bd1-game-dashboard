import React from "react";

import ChartCountGamesPlatforms from "../Chart/ChartCountGamesPlatforms";
import ChartCountGamesStores from "../Chart/ChartCountGamesStores/index.js";
import ChartCountGamesPublishers from "../Chart/ChartCountGamesPublishers/index.js";
import ChartCountGamesGenders from "../Chart/ChartCountGamesGenders/index.js";
import GamesPlatformsTable from "../GamesPlatformsTable/index.js";
import ChartAvgGenderAvaliation from "../Chart/ChartAvgGenderAvaliation/index.js";
import { StyledContainer } from "./styles";
import GamesDeveloperTable from "../GamesDevelopersTable/index.js";
import CreatorsRolesTable from "../CreatorsRolesTable/index.js";

const Dashboard = () => {
    return (
        <StyledContainer>
            <ChartCountGamesPlatforms />
            <ChartCountGamesStores />
            <ChartCountGamesPublishers />
            <ChartCountGamesGenders />
            <GamesPlatformsTable />
            <ChartAvgGenderAvaliation />
            <GamesDeveloperTable />
            <CreatorsRolesTable />
        </StyledContainer>
    );
};

export default Dashboard;
