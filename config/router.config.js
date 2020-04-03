
export default [

  {
    path: '/third/check',
    component: '../layouts/ThirdCheck',
  },

  // app菜单页面
  {
   path: '/',
   component: '../layouts/BasicLayout.js',
   routes: [
     {
      path: '/',
      redirect: '/testPage1'
     },
     {
       path: '/testPage1',
       name: 'TestPage1',
       component: './TestPage1/testPage1.js'
     },
     {
      path: '/testPage2',
      name: 'TestPage2',
      component: './TestPage2/testPage2.js'
    },
    {
      path: '/testPage3',
      name: 'TestPage3',
      routes: [
        {
          path: "/testPage3/page3Item1",
          name: "Page3Item1",
          component: './TestPage3/Page3Item1/page3Item1',
          exact: true
        },
        {
          path: "/testPage3/page3Item2",
          name: "Page3Item2",
          component: './TestPage3/Page3Item2/page3Item2',
          exact: true
        },
      ]
    },
   ]
  },
];
