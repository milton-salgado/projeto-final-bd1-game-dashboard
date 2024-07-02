import React from "react";

import ChartCountGamesPlatforms from "../Chart/ChartCountGamesPlatforms";
import ChartCountGamesStores from "../Chart/ChartCountGamesStores/index.js";
import ChartCountGamesPublishers from "../Chart/ChartCountGamesPublishers/index.js";
import ChartCountGamesGenders from "../Chart/ChartCountGamesGenders/index.js";
import GamesPlatformsTable from "../GamesPlatformsTable/index.js";
import { StyledContainer } from "./styles";

const Dashboard = () => {
    return (
        <StyledContainer>
            <ChartCountGamesPlatforms />
            <ChartCountGamesStores />
            <ChartCountGamesPublishers />
            <ChartCountGamesGenders />
            <GamesPlatformsTable />
        </StyledContainer>
    );
};

export default Dashboard;
