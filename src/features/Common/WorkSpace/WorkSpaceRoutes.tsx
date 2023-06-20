import { Route, Routes } from 'react-router-dom';
import ContainerDrafts from './Drafts/ContainerDrafts';
import ContainerInbox from './Inbox/ContainerInbox';
import ContainerSent from './Sent/ContainerSent';
import SettingsManagement from './Settings/SettingsManagement';
import ContainerTrash from './Trash/ContainerTrash';

const WorkSpaceRoutes = () => {
  return (
    <Routes>
      <Route path="/inbox/*" element={<ContainerInbox />} />
      <Route path="/sent/*" element={<ContainerSent />} />
      <Route path="/drafts/*" element={<ContainerDrafts />} />
      <Route path="/trash/*" element={<ContainerTrash />} />
      <Route path="/settings" element={<SettingsManagement />} />
    </Routes>
  );
};
export default WorkSpaceRoutes;
