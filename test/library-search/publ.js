const publicationsData = [
  {
    _id: '716991',
    authors: {
      author: [
        {
          '@pid': '281/4693',
          text: 'Alexander Sobolev'
        },
        {
          '@pid': '49/5572',
          text: 'Sergey Zykov'
        }
      ]
    },
    title: 'Functional Programming Patterns in JavaScript.',
    venue: 'KES-IDT',
    pages: '299-312',
    year: '2019',
    type: 'Conference and Workshop Papers',
    key: 'conf/kesidt/SobolevZ19',
    doi: '10.1007/978-981-13-8311-3_26',
    ee: 'https://doi.org/10.1007/978-981-13-8311-3_26',
    url: 'https://dblp.org/rec/conf/kesidt/SobolevZ19'
  },
  {
    _id: '1478685',
    authors: {
      author: [
        {
          '@pid': '197/7003',
          text: 'Lukás Janecek'
        },
        {
          '@pid': '94/6230',
          text: 'Robert Pergl'
        }
      ]
    },
    title: 'Analysing Functional Paradigm Concepts - The JavaScript Case.',
    venue: 'WorldCIST',
    pages: '882-891',
    year: '2017',
    type: 'Conference and Workshop Papers',
    key: 'conf/worldcist/JanecekP17',
    doi: '10.1007/978-3-319-56535-4_86',
    ee: 'https://doi.org/10.1007/978-3-319-56535-4_86',
    url: 'https://dblp.org/rec/conf/worldcist/JanecekP17'
  },
  {
    _id: '1535634',
    title: 'React - Facebook&apos;s functional turn on writing Javascript.',
    venue: 'Commun. ACM',
    volume: '59',
    number: '12',
    pages: '56-62',
    year: '2016',
    type: 'Journal Articles',
    key: 'journals/cacm/X16p',
    doi: '10.1145/2980991',
    ee: 'https://doi.org/10.1145/2980991',
    url: 'https://dblp.org/rec/journals/cacm/X16p'
  },
  {
    _id: '1608005',
    authors: {
      author: [
        {
          '@pid': '189/6201',
          text: 'Pete Hunt'
        },
        {
          '@pid': '189/6378',
          text: 'Paul O&apos;Shannessy'
        },
        {
          '@pid': '77/4016',
          text: 'Dave Smith'
        },
        {
          '@pid': '04/2922',
          text: 'Terry Coatta'
        }
      ]
    },
    title: 'React - Facebook&apos;s Functional Turn on Writing JavaScript.',
    venue: 'ACM Queue',
    volume: '14',
    number: '4',
    pages: '40',
    year: '2016',
    type: 'Journal Articles',
    key: 'journals/queue/HuntOSC16',
    doi: '10.1145/2984629.2994373',
    ee: 'http://doi.acm.org/10.1145/2984629.2994373',
    url: 'https://dblp.org/rec/journals/queue/HuntOSC16'
  },
  {
    _id: '2731234',
    authors: {
      author: {
        '@pid': '39/2573',
        text: 'Brian McKenna'
      }
    },
    title: 'Roy - A Statically Typed, Functional Language for JavaScript.',
    venue: 'IEEE Internet Comput.',
    volume: '16',
    number: '3',
    pages: '86-91',
    year: '2012',
    type: 'Journal Articles',
    key: 'journals/internet/McKenna12',
    doi: '10.1109/MIC.2012.56',
    ee: 'https://doi.org/10.1109/MIC.2012.56',
    url: 'https://dblp.org/rec/journals/internet/McKenna12'
  },
  {
    _id: '2988269',
    authors: {
      author: {
        '@pid': '47/7087',
        text: 'Mark McGranaghan'
      }
    },
    title: 'ClojureScript - Functional Programming for JavaScript Platforms.',
    venue: 'IEEE Internet Comput.',
    volume: '15',
    number: '6',
    pages: '97-102',
    year: '2011',
    type: 'Journal Articles',
    key: 'journals/internet/McGranaghan11',
    doi: '10.1109/MIC.2011.148',
    ee: 'https://doi.org/10.1109/MIC.2011.148',
    url: 'https://dblp.org/rec/journals/internet/McGranaghan11'
  },
  {
    _id: '3197897',
    authors: {
      author: [
        {
          '@pid': '19/7308',
          text: 'Jörn Heid'
        },
        {
          '@pid': '164/9686',
          text: 'Frank Hess'
        },
        {
          '@pid': '07/7251',
          text: 'Simone Huber'
        },
        {
          '@pid': '03/7308',
          text: 'Martin Haag'
        }
      ]
    },
    title:
      'Standardized and Extensible Javascript-API for Logging Functionality for the MVP Player.',
    venue: 'Bio Algorithms Med Syst.',
    volume: '6',
    number: '11',
    pages: '39',
    year: '2010',
    type: 'Journal Articles',
    key: 'journals/bams/HeidHHH10',
    url: 'https://dblp.org/rec/journals/bams/HeidHHH10'
  },
  {
    _id: '3290383',
    authors: {
      author: [
        {
          '@pid': '28/8733',
          text: 'Yinzhi Cao'
        },
        {
          '@pid': '55/4022',
          text: 'Zhichun Li'
        },
        {
          '@pid': '91/8736',
          text: 'Vaibhav Rastogi'
        },
        {
          '@pid': '88/2827-4',
          text: 'Yan Chen 0004'
        }
      ]
    },
    title:
      'Virtual browser - a web-level sandbox to secure third-party JavaScript without sacrificing functionality.',
    venue: 'CCS',
    pages: '654-656',
    year: '2010',
    type: 'Conference and Workshop Papers',
    key: 'conf/ccs/CaoLRC10',
    doi: '10.1145/1866307.1866387',
    ee: 'https://doi.org/10.1145/1866307.1866387',
    url: 'https://dblp.org/rec/conf/ccs/CaoLRC10'
  },
  {
    _id: '3591278',
    authors: {
      author: [
        {
          '@pid': '09/1441',
          text: 'Misko Hevery'
        },
        {
          '@pid': '35/7474',
          text: 'Adam Abrons'
        }
      ]
    },
    title:
      'Declarative web-applications without server - demonstration of how a fully functional web-application can be built in an hour with only HTML, CSS &amp; Javascript Library.',
    venue: 'OOPSLA Companion',
    pages: '801-802',
    year: '2009',
    type: 'Conference and Workshop Papers',
    key: 'conf/oopsla/HeveryA09',
    doi: '10.1145/1639950.1640022',
    ee: 'https://doi.org/10.1145/1639950.1640022',
    url: 'https://dblp.org/rec/conf/oopsla/HeveryA09'
  }
];
