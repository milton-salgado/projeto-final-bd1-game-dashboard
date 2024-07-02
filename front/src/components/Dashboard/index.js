import React from "react";

import ChartCountGamesPlatforms from "../Chart/ChartCountGamesPlatforms";
import ChartCountGamesStores from "../Chart/ChartCountGamesStores/index.js";
import ChartCountGamesPublishers from "../Chart/ChartCountGamesPublishers/index.js";
import ChartCountGamesGenders from "../Chart/ChartCountGamesGenders/index.js";
import GamesPlatformsTable from "../Table/GamesPlatformsTable/index.js";
import ChartAvgGenderAvaliation from "../Chart/ChartAvgGenderAvaliation/index.js";
import { StyledContainer } from "./styles.js";
import GamesDeveloperTable from "../Table/GamesDevelopersTable/index.js";
import CreatorsRolesTable from "../Table/CreatorsRolesTable/index.js";

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
