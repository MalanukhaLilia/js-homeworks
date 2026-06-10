export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'sales', label: 'Sales', icon: 'sales' },
  { id: 'catalog', label: 'Catalog', icon: 'catalog' },
  { id: 'customers', label: 'Customers', icon: 'customers' },
  { id: 'reviews', label: 'Reviews', icon: 'reviews' },
];

export const kpiData = [
  {
    id: 'revenue',
    title: 'Monthly Revenue',
    value: '1 385 $US',
    icon: '$',
    type: 'revenue',
  },
  {
    id: 'orders',
    title: 'New Orders',
    value: '12',
    icon: '🛒',
    type: 'orders',
  },
  {
    id: 'reviews',
    title: 'Pending Reviews',
    value: '3',
    icon: '💬',
    type: 'reviews',
  },
  {
    id: 'customers',
    title: 'New Customers',
    value: '9',
    icon: '👤+',
    type: 'customers',
  },
];

export const pendingOrders = [
  {
    id: 1,
    date: '01/08/2019, 21:56:26',
    customer: 'Sallie Marks',
    items: 'one item',
    price: '31.81$',
    avatarColor: '#ff8a80',
    initials: 'SM',
  },
  {
    id: 2,
    date: '21/07/2019, 22:47:54',
    customer: 'Loma Quigley',
    items: 'three items',
    price: '89.74$',
    avatarColor: '#ea80fc',
    initials: 'LQ',
  },
  {
    id: 3,
    date: '15/07/2019, 09:12:05',
    customer: 'Cedrick Kirlin',
    items: 'two items',
    price: '54.20$',
    avatarColor: '#8c9eff',
    initials: 'CK',
  },
  {
    id: 4,
    date: '10/07/2019, 14:35:18',
    customer: 'Donnell Nienow',
    items: 'one item',
    price: '18.99$',
    avatarColor: '#a7ffeb',
    initials: 'DN',
  },
];

export const pendingReviews = [
  {
    id: 1,
    customer: 'Ed',
    rating: 4,
    comment: 'At eaque omnis. Dolores laborum nihil occaecati...',
    avatarColor: '#ffd180',
    initials: 'E',
  },
  {
    id: 2,
    customer: 'Max',
    rating: 3,
    comment: 'Autem consequuntur dolores. Ut sit aut eum...',
    avatarColor: '#b9f6ca',
    initials: 'M',
  },
  {
    id: 3,
    customer: 'Sophie',
    rating: 5,
    comment: 'Harum quos exercitationem inventor...',
    avatarColor: '#80d8ff',
    initials: 'S',
  },
];

export const newCustomers = [
  { id: 1, name: 'Cedrick Kirlin', initials: 'CK', avatarColor: '#cfd8dc' },
  { id: 2, name: 'Alessandra Simonis', initials: 'AS', avatarColor: '#ffcc80' },
  { id: 3, name: 'Lempi Gorczany', initials: 'LG', avatarColor: '#c8e6c9' },
  { id: 4, name: 'Loma Quigley', initials: 'LQ', avatarColor: '#bbdefb' },
  { id: 5, name: 'Donnell Nienow', initials: 'DN', avatarColor: '#d1c4e9' },
  { id: 6, name: 'Ross Lockman', initials: 'RL', avatarColor: '#ff8a80' },
  { id: 7, name: 'Vidal Kuhlman', initials: 'VK', avatarColor: '#ffe082' },
  { id: 8, name: 'Ralph Hoppe', initials: 'RH', avatarColor: '#a7ffeb' },
  { id: 9, name: 'Angelo Kautzer', initials: 'AK', avatarColor: '#e1bee7' },
];
