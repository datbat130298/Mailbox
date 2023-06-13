import { Route, Routes } from 'react-router-dom';
import ViewMailSpace from '../Components/Mail/ViewMailSpace';
import ContainerDrafts from './Drafts/ContainerDrafts';
import ContainerInbox from './Inbox/ContainerInbox';
import ContainerSent from './Sent/ContainerSent';
import ContainerTrash from './Trash/ContainerTrash';

const WorkSpaceRoutes = () => {
  return (
    <Routes>
      <Route path="/inbox" element={<ContainerInbox />} />
      <Route path="/sent" element={<ContainerSent />} />
      <Route path="/drafts" element={<ContainerDrafts />} />
      <Route path="/trash" element={<ContainerTrash />} />
      <Route path="inbox/:id" element={<ViewMailSpace />} />
      <Route path="sent/:id" element={<ViewMailSpace />} />
      <Route path="drafts/:id" element={<ViewMailSpace />} />
      <Route path="trash/:id" element={<ViewMailSpace />} />
    </Routes>
  );
};
export default WorkSpaceRoutes;
