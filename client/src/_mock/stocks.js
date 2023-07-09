import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const STOCK_NAME = [
  'Google',
  'Apple Inc',
  'Adobe Systems',
  'Microsoft Corporation',
  'Amazon.com Inc',
  'Tesla Inc',
  'International Business Machines',
  'Meta Platforms Inc.',
  'PayPal Holdings Inc',
  'HP Inc',
  'Oracle Corporation',
  'Salesforce.com Inc',
  'Intel Corporation',
  'Walmart Inc',
  'Accenture plc',
  'Infosys Ltd',
  'Cisco Systems Inc',
  'Dell Technologies Inc',
  'Shopify Inc',
  'Cognizant Technology Solutions',
  'Netflix Inc',
  'Walt Disney Company',
  'Airbnb Inc',
  'American Express Company',
];

const STOCK_SYMBOL = [
  'GOOGL',
  'AAPL',
  'ADBE',
  'MSFT',
  'AMZN',
  'TSLA',
  'IBM',
  'META',
  'PYPL',
  'HPQ',
  'ORCL',
  'CRM',
  'INTC',
  'WMT',
  'ACN',
  'INFY',
  'CSCO',
  'DELL',
  'SHOP',
  'CTSH',
  'NFLX',
  'DIS',
  'ABNB',
  'AXP',
];

const STOCK_IMG = [
  'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d2abd662597191.5a9589b09ddf5.jpg',
  'https://e0.pxfuel.com/wallpapers/534/409/desktop-wallpaper-awesome-apple-sign-apple-iphone-apple-logo-iphone-apple.jpg',
  'https://blog.adobe.com/en/publish/2020/05/28/media_1cc0fcc19cf0e64decbceb3a606707a3ad23f51dd.png?width=1200&format=pjpg&optimize=medium',
  'https://www.fineprintart.com/images/history-of-the-microsoft-logo/history-of-the-microsoft-logo-1.jpg',
  'https://files.cults3d.com/uploaders/27858512/illustration-file/c881b342-7d83-4ee4-b1cd-a9851e19c48e/amazon.jpg',
  'https://i.pinimg.com/736x/3c/0f/0c/3c0f0cb84645d779a55457f03bac406f.jpg',
  'https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHK1yrBfveT2I8aBsWbK2t8R1E5TieK9StA&usqp=CAU',
  'https://www.paypalobjects.com/marketing/web/US/en/rebrand/Mobile-apps/mobile-apps--card-content--pp-business--for=all.jpg',
  'https://wallpapercave.com/wp/wp3391511.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWHjW6frPzha9wUuG3a3SvOF1jjQq846iQ7A&usqp=CAU',
  'https://www.inclusionhub.com/hubfs/Blog/Light%20blue%20Salesforce%20logo%20on%20a%20royal%20blue%20background.jpg#keepProtocol',
  'https://www.intel.in/content/dam/www/public/us/en/images/logos/logo-blue-background-rwd.png.rendition.intel.web.576.324.png',
  'https://wallpapers.com/images/hd/walmart-navy-blue-logo-cyb1on3du9w4v0yr.jpg',
  'https://ik.imagekit.io/tp/20220201-accenture-logo.png',
  'https://images.cnbctv18.com/wp-content/uploads/2021/09/infosys-1-940x573.jpg?im=FitAndFill,width=1200,height=900',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjwOaYW9_41tDPXbee3gV0EGc1E8Zq0MV_LQ&usqp=CAU',
  'https://w0.peakpx.com/wallpaper/836/470/HD-wallpaper-dell-black-silk-background-dell-logo-emblem.jpg',
  'https://images.websitebuilderexpert.com/wp-content/uploads/2017/07/shopify-review-logo-new.png',
  'https://cognizant.scene7.com/is/image/cognizant/CognizantLogo400-6',
  'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
  'https://i0.wp.com/thinkmonsters.com/speakinghuman/media/wp-content/uploads/Disney-Updated-Movie-Logo-2011.png?fit=2880%2C1514&ssl=1',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7kbYKU_DxfstsbviMYmLEEkh85CnopO-Mwg&usqp=CAU',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png'
];
// ----------------------------------------------------------------------

const stocks = [...Array(24)].map((_, index) => {

  return {
    id: faker.datatype.uuid(),
    cover: STOCK_IMG[index],
    name: STOCK_NAME[index],
    symbol: STOCK_SYMBOL[index],
  };
});

export default stocks;
