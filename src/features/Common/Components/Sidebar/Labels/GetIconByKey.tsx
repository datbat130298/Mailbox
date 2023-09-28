import { BiSend } from 'react-icons/bi';
import { BsMailbox, BsPersonLinesFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { HiOutlineChatAlt } from 'react-icons/hi';
import {
  MdLabelImportantOutline,
  MdOutlineContactMail,
  MdOutlineDiscount,
  MdOutlineLabel,
  MdOutlineStarBorder,
  MdOutlineSystemUpdateAlt,
  MdOutlineWatchLater,
} from 'react-icons/md';
import { RiDraftLine, RiSpam2Line } from 'react-icons/ri';
import { TbMail } from 'react-icons/tb';

interface GetIconByKeyProp {
  name: string;
}

const GetIconByKey = ({ name }: GetIconByKeyProp) => {
  let icon;
  switch (name) {
    case 'inbox':
      icon = <TbMail size={20} />;
      break;
    case 'starred':
      icon = <MdOutlineStarBorder size={22} />;
      break;
    case 'snoozed':
      icon = <MdOutlineWatchLater size={20} />;
      break;
    case 'important':
      icon = <MdLabelImportantOutline size={20} />;
      break;
    case 'chats':
      icon = <HiOutlineChatAlt size={21} className="" />;
      break;
    case 'sent':
      icon = <BiSend size={21} className="" />;
      break;
    case 'spam':
      icon = <RiSpam2Line size={18} />;
      break;
    case 'trash':
      icon = <FiTrash2 size={17} />;
      break;
    case 'all_mail':
      icon = <BsMailbox size={16} />;
      break;
    case 'drafts':
      icon = <RiDraftLine size={19} />;
      break;
    case 'forums':
      icon = <MdOutlineContactMail size={18} />;
      break;
    case 'social':
      icon = <BsPersonLinesFill size={18} />;
      break;
    case 'updates':
      icon = <MdOutlineSystemUpdateAlt size={18} />;
      break;
    case 'promotions':
      icon = <MdOutlineDiscount size={18} />;
      break;
    default:
      icon = <MdOutlineLabel size={18} />;
      break;
  }
  return <div className="flex w-6 items-center justify-center">{icon}</div>;
};

export default GetIconByKey;
