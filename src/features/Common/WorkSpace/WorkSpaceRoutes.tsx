import { Route, Routes } from 'react-router-dom';
import ContainerDrafts from './Drafts/ContainerDrafts';
import ContainerInbox from './Inbox/ContainerInbox';
import ContainerSchedule from './Schedule/ContainerSchedule';
import SearchPage from './SearchPage/SearchPage';
import ContainerSent from './Sent/ContainerSent';
import SettingsManagement from './Settings/SettingsManagement';
import Starred from './Starred/Starred';
import ContainerTrash from './Trash/ContainerTrash';

const WorkSpaceRoutes = () => {
  return (
    <Routes>
      <Route path="/inbox/*" element={<ContainerInbox />} />
      <Route path="/sent/*" element={<ContainerSent />} />
      <Route path="/drafts/*" element={<ContainerDrafts />} />
      <Route path="/trash/*" element={<ContainerTrash />} />
      <Route path="/settings/" element={<SettingsManagement />}>
        <Route path=":idTag" element={<SettingsManagement />} />
      </Route>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/starred" element={<Starred />} />
      <Route path="/schedule" element={<ContainerSchedule />} />
    </Routes>
  );
};
export default WorkSpaceRoutes;
