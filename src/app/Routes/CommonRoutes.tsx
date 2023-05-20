import { Route, Routes } from 'react-router-dom';

import Home from '../../features/Common/Home/Home';

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default CommonRoutes;
