import {
  IHeaderTeamsDropdown,
  IMainCarouselContent,
  IStandingsTableColumns,
} from '../types/constantsTypes';

import nba_75 from '../assets/nba_75.webp';
import nba_league_pass from '../assets/nba_league_pass.webp';
import nba_store from '../assets/nba_store.webp';
import nba_tickets from '../assets/nba_tickets.webp';
import nba_cares from '../assets/nba_cares.webp';

export const headerTeamsDropdown: IHeaderTeamsDropdown[] = [
  {
    division: 'Atlantic',
    teams: [
      {
        teamName: 'Boston Celtics',
        nickName: 'celtics',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
      },
      {
        teamName: 'Brooklyn Nets',
        nickName: 'nets',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png',
      },
      {
        teamName: 'New York Knicks',
        nickName: 'knicks',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/d/dc/NY_Knicks_Logo_2011.png',
      },
      {
        teamName: 'Philadelphia 76ers',
        nickName: 'sixers',
        teamLogo: 'https://upload.wikimedia.org/wikipedia/fr/4/48/76ers_2016.png',
      },
      {
        teamName: 'Toronto Raptors',
        nickName: 'raptors',
        teamLogo: 'https://upload.wikimedia.org/wikipedia/fr/8/89/Raptors2015.png',
      },
    ],
  },
  {
    division: 'Central',
    teams: [
      {
        teamName: 'Chicago Bulls',
        nickName: 'bulls',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d1/Bulls_de_Chicago_logo.svg/1200px-Bulls_de_Chicago_logo.svg.png',
      },
      {
        teamName: 'Cleveland Cavaliers',
        nickName: 'cavaliers',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png',
      },
      {
        teamName: 'Detroit Pistons',
        nickName: 'pistons',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Detroit_Pistons_primary_logo_2017.png/150px-Detroit_Pistons_primary_logo_2017.png',
      },
      {
        teamName: 'Indiana Pacers',
        nickName: 'pacers',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/c/cf/Pacers_de_l%27Indiana_logo.svg/1180px-Pacers_de_l%27Indiana_logo.svg.png',
      },
      {
        teamName: 'Milwaukee Bucks',
        nickName: 'bucks',
        teamLogo: 'https://upload.wikimedia.org/wikipedia/fr/3/34/Bucks2015.png',
      },
    ],
  },
  {
    division: 'Southeast',
    teams: [
      {
        teamName: 'Atlanta Hawks',
        nickName: 'hawks',
        teamLogo: 'https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png',
      },
      {
        teamName: 'Charlotte Hornets',
        nickName: 'hornets',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Hornets_de_Charlotte_logo.svg/1200px-Hornets_de_Charlotte_logo.svg.png',
      },
      {
        teamName: 'Miami Heat',
        nickName: 'heat',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png',
      },
      {
        teamName: 'Orlando Magic',
        nickName: 'magic',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/b/bd/Orlando_Magic_logo_2010.png',
      },
      {
        teamName: 'Washington Wizards',
        nickName: 'wizards',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/archive/d/d6/20161212034849%21Wizards2015.png',
      },
    ],
  },
  {
    division: 'Northwest',
    teams: [
      {
        teamName: 'Denver Nuggets',
        nickName: 'nuggets',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/3/35/Nuggets_de_Denver_2018.png/180px-Nuggets_de_Denver_2018.png',
      },
      {
        teamName: 'Minnesota Timberwolves',
        nickName: 'timberwolves',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/d/d9/Timberwolves_du_Minnesota_logo_2017.png/200px-Timberwolves_du_Minnesota_logo_2017.png',
      },
      {
        teamName: 'Oklahoma City Thunder',
        nickName: 'thunder',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Thunder_d%27Oklahoma_City_logo.svg/1200px-Thunder_d%27Oklahoma_City_logo.svg.png',
      },
      {
        teamName: 'Portland Trail Blazers',
        nickName: 'blazers',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Portland_Trail_Blazers_logo.svg/1200px-Portland_Trail_Blazers_logo.svg.png',
      },
      {
        teamName: 'Utah Jazz',
        nickName: 'jazz',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/3/3b/Jazz_de_l%27Utah_logo.png',
      },
    ],
  },
  {
    division: 'Pacific',
    teams: [
      {
        teamName: 'Golden State Warriors',
        nickName: 'warriors',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png',
      },
      {
        teamName: 'Los Angeles Clippers',
        nickName: 'clippers',

        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/d/d6/Los_Angeles_Clippers_logo_2010.png',
      },
      {
        teamName: 'Los Angeles Lakers',
        nickName: 'lakers',

        teamLogo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/220px-Los_Angeles_Lakers_logo.svg.png',
      },
      {
        teamName: 'Phoenix Suns',
        nickName: 'suns',

        teamLogo: 'https://upload.wikimedia.org/wikipedia/fr/5/56/Phoenix_Suns_2013.png',
      },
      {
        teamName: 'Sacramento Kings',
        nickName: 'kings',

        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/9/95/Kings_de_Sacramento_logo.svg/1200px-Kings_de_Sacramento_logo.svg.png',
      },
    ],
  },
  {
    division: 'Southwest',
    teams: [
      {
        teamName: 'Dallas Mavericks',
        nickName: 'mavericks',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png',
      },
      {
        teamName: 'Houston Rockets',
        nickName: 'rockets',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Houston_Rockets_logo_2003.png/330px-Houston_Rockets_logo_2003.png',
      },
      {
        teamName: 'Memphis Grizzlies',
        nickName: 'grizzlies',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/1200px-Memphis_Grizzlies.svg.png',
      },
      {
        teamName: 'New Orleans Pelicans',
        nickName: 'pelicans',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/thumb/2/21/New_Orleans_Pelicans.png/200px-New_Orleans_Pelicans.png',
      },
      {
        teamName: 'San Antonio Spurs',
        nickName: 'spurs',
        teamLogo:
          'https://upload.wikimedia.org/wikipedia/fr/0/0e/San_Antonio_Spurs_2018.png',
      },
    ],
  },
];

export const mainCarouselContent: IMainCarouselContent[] = [
  {
    heading: 'NBA 75th Anniversary Team announced',
    paragraph_1:
      'A total of 158 NBA championships and 730 NBA All-Star selections. A combined 110 Kia NBA Most Valuable Player Awards and Bill Russell NBA Finals MVP Awards. More than 1.5 million points scored. The NBA 75th Anniversary Team was selected by a blue-ribbon panel of current and former NBA players, coaches, general managers and team and league executives, WNBA legends and sportswriters and broadcasters. ',
    paragraph_2:
      'Voters were asked to select the 75 Greatest Players in NBA History without regard to position. Panelists did not rank their selections. Current and former players were not allowed to vote for themselves.',
    link: 'https://www.nba.com/75',
    image: nba_75,
    paginationText: 'This is the NBA 75th Anniversary Team',
  },
  {
    heading: 'Stream live and on-demand games on the NBA app or on nba.com.',
    paragraph_1:
      "NBA League Pass is a regular-season package you can subscribe to with Prime Video Channels. It provides subscribers access to games they would not be able to watch on cable or local over-the-air stations. NBA League Pass subscribers get live access to Home, Away, and Mobile Optimized broadcast feeds for all regular season games that aren't subject to a regional or national blackout. ",
    paragraph_2:
      'NBA League Pass also includes on-demand replays for each broadcast, and an 8-12 minute condensed replay of each game.',
    link: 'https://watch.nba.com/streaming-subscriptions',
    image: nba_league_pass,
    paginationText: 'Explore the World of NBA with League Pass',
  },
  {
    heading: 'NBA Apparel and Jerseys at www.nbastore.eu',
    paragraph_1:
      'Choose from the assortment at the NBA Store to find the perfect NBA merchandise for your collection. In addition to NBA jerseys, t-shirts and sweatshirts, our shop offers tons of officially licensed NBA collectibles that you can show off in your home or office. ',
    paragraph_2:
      'Find the newest player merchandise in a wide range of sizes so you and your fellow fans can represent your favorite basketball team in authentic NBA style. Browse the NBA Store for the greatest assortment of basketball jerseys and clothing online.',
    link: 'https://www.nbastore.eu/en/',
    image: nba_store,
    paginationText: 'Checkout the Official NBA Store',
  },
  {
    heading: 'Authentic and Verified. All Tickets. One Site.',
    paragraph_1:
      'The only trustworthy source for authentic NBA Tickets: 100% guaranteed to get fans into every game for every team. Search tickets available from the team or browse the resale marketplace. ',
    paragraph_2:
      'NBATickets.com is the NBA’s one-stop shop for all ticket types for all teams: Fans can link out to buy single game tickets directly from the team, browse resale options, or view more options on team ticket pages, including promotions and deals.',
    link: 'https://nbatickets.nba.com/home/',
    image: nba_tickets,
    paginationText: 'Official Source of Authentic NBA Tickets',
  },
  {
    heading:
      'NBA and society: education, youth and family development, health and wellness.',
    paragraph_1:
      'NBA Cares is the league’s global social responsibility program that builds on the NBA’s mission of addressing important social issues in the U.S. and around the world. ',
    paragraph_2:
      'NBA Cares programs and participants have provided more than 5.8 million hours of hands-on service, created more than 1,650 places where kids and families can live, learn or play and engaged more than 60 million youth in basketball programs in communities around the world. Internationally, NBA Cares has created more than 332 places where kids and families can live, learn, or play in 40 countries.',
    link: 'https://cares.nba.com/',
    image: nba_cares,
    paginationText: 'NBA Cares - the League’s Global Social Responsibility Program',
  },
];

export const standingsTableColumns: IStandingsTableColumns[] = [
  {
    title: 'TEAM',
    dataIndex: 'team',
    key: 'team',
    width: 250,
  },
  {
    title: 'WIN',
    dataIndex: 'totalWin',
    key: 'totalWin',
    align: 'center' as const,
  },
  {
    title: 'LOSS',
    dataIndex: 'totalLoss',
    key: 'totalLoss',
    align: 'center' as const,
  },
  {
    title: 'WIN%',
    dataIndex: 'winPercentage',
    key: 'winPercentage',
    align: 'center' as const,
  },
  {
    title: 'GB',
    dataIndex: 'gamesBehind',
    key: 'gamesBehind',
    align: 'center' as const,
  },
  {
    title: 'CONF',
    dataIndex: 'conf',
    key: 'conf',
    align: 'center' as const,
  },
  {
    title: 'DIV',
    dataIndex: 'div',
    key: 'div',
    align: 'center' as const,
  },
  {
    title: 'HOME',
    dataIndex: 'home',
    key: 'home',
    align: 'center' as const,
  },
  {
    title: 'ROAD',
    dataIndex: 'road',
    key: 'road',
    align: 'center' as const,
  },
  {
    title: 'LAST 10',
    dataIndex: 'last10',
    key: 'last10',
    align: 'center' as const,
  },
  {
    title: 'STREAK',
    dataIndex: 'streak',
    key: 'streak',
    align: 'center' as const,
  },
];
