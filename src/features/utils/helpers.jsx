const triggerClickOutside = (ref, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  document.addEventListener('click', handleClickOutside, true);

  return () => {
    document.removeEventListener('click', handleClickOutside, true);
  };
};

const filterCheckboxData = [
  {
    uuid: 1,
    label: 'All',
    value: 'all',
  },
  {
    uuid: 2,
    label: 'Unread',
    value: 'unread',
  },
  {
    uuid: 3,
    label: 'Read',
    value: 'read',
  },
];

const filterViewData = [
  {
    uuid: 1,
    label: 'All',
    value: 'all',
  },
  {
    uuid: 2,
    label: 'Sent',
    value: 'Sent',
  },
  {
    uuid: 3,
    label: 'Drafts',
    value: 'drafts',
  },
  {
    uuid: 4,
    label: 'Trash',
    value: 'trash',
  },
];

const filterByDatetime = [
  {
    uuid: 1,
    label: 'Any time',
    value: 'any_time',
  },
  {
    uuid: 2,
    label: 'Last 7 days',
    value: 'last7days',
  },
  {
    uuid: 3,
    label: 'Last 30 days',
    value: 'last30days',
  },
  {
    uuid: 4,
    label: 'Last 6 months',
    value: 'last6months',
  },
  {
    uuid: 5,
    label: 'Custom range',
    value: 'custom_range',
  },
];

const moreAction = [
  {
    uuid: 1,
    label: 'Mask as read',
    value: 'mask_as_read',
  },
  {
    uuid: 2,
    label: 'Delete',
    value: 'delete',
  },
];

export { filterCheckboxData, filterViewData, filterByDatetime, moreAction, triggerClickOutside };
