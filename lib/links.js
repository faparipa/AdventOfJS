// import { DUMMY_PRODUCTS } from '@/dummy_products2';

// export function getAllProducts() {
//   //const Products = DUMMY_PRODUCTS;
//   return DUMMY_PRODUCTS;
// }

// export function getBrands() {
//   return DUMMY_PRODUCTS.reduce((brands, products) => {
//     const brand = products?.brand;

//     if (!brands.includes(brand)) {
//       if (brand) {
//         brands.push(brand);
//       } else if (!brand && !brands.includes('No brand')) {
//         brands.push('No brand');
//       }
//     }
//     const sortedBrands = brands.sort();
//     return sortedBrands;
//   }, []);
// }

// export function getBrandsProducts(brandName) {
//   return DUMMY_PRODUCTS.filter((product) => product.brand === brandName);
// }
const Links = [
  { href: '/2024/showpass', num: '1', title: 'Show Password' },
  { href: '/2024/favoritemovie', num: '2', title: 'Search Favorite Movie' },
  { href: '/2024/resizabletextarea', num: '3', title: 'Resizable Text Area' },
  { href: '/2024/resizablepanel', num: '4', title: 'Resizable Panels' },
  { href: '/2024/charactercounter', num: '5', title: 'Character counter' },
  { href: '/2024/copyclipboard', num: '6', title: 'Copy to clipboard' },
  { href: '/2024/slugifyinput', num: '7', title: 'Slugify input text' },
  { href: '/2024/taginputeditor', num: '8', title: 'Tag input editor' },
  { href: '/2024/persistformdata', num: '9', title: 'Presist Form Data' },
  {
    href: '/2024/floatingactionbutton',
    num: '10',
    title: 'Floating Action Button',
  },
  { href: '/2024/digitalclock', num: '11', title: 'Digital Clock' },
  { href: '/2024/quotegenerator', num: '12', title: 'Quote Generator' },
  {
    href: '/2024/temperatureconverter',
    num: '13',
    title: 'Temperature Converter',
  },
  {
    href: '/2024/selectmenu',
    num: '14',
    title: 'Conditional Select Menu',
  },
  {
    href: '/2024/youTubeEmbed',
    num: '15',
    title: 'YouTube Embed Responsive',
  },
  {
    href: '/2024/gridgenerator',
    num: '16',
    title: 'CSS Grid Generator',
  },
  {
    href: '/2024/sidenavigation',
    num: '17',
    title: 'Side Navigation',
  },
  {
    href: '/2024/pricingchart',
    num: '18',
    title: 'Pricing Chart Togle',
  },
  {
    href: '/2024/multistepform',
    num: '19',
    title: 'Multi Step Form',
  },
  {
    href: '/2024/infinitescroll',
    num: '20',
    title: 'Infinitie Scroll',
  },
  {
    href: '/2024/datepicker',
    num: '21',
    title: 'Date Picker ',
  },
  {
    href: '/2024/kanbanboard',
    num: '22',
    title: 'Kanban Board ',
  },
  {
    href: '/2024/expensetracker',
    num: '23',
    title: 'Basic Expense Tracker',
  },
  {
    href: '/2024/cssboxshadowgenerator',
    num: '24',
    title: 'CSS Box Shadow Generator',
  },
];
export default Links;
