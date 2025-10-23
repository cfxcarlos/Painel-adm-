import { Route, Routes } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { Items } from "../pages/Players/Items";
import { Permissions } from "../pages/Players/Permissions";
import { PlayerInfos } from "../pages/Players/Infos";
import { PlayersMain } from "../pages/Players/Main";
import { Salary } from "../pages/Salary";
import { Vehicles } from "../pages/Players/Vehicles";

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/players/*" element={<PlayerRoutes />} />
      <Route path="/salary" element={<Salary />} />
    </Routes>
  );
};

const PlayerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PlayersMain />} />
      <Route path="/infos" element={<PlayerInfos />} />
      <Route path="/items" element={<Items />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/permissions" element={<Permissions />} />
    </Routes>
  );
};
