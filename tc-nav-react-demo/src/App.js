import React, { useState } from 'react'
import TopNav from './components/TopNav'
import LoginNav from './components/LoginNav'
import './app.css'

function App() {
  var navMenus = [
    {
      id: 'business', // required for 'Switch to BUSINESS' to work
      title: 'BUSINESS',
      subMenu: [
        {
          title: 'Solutions',
          subMenu: [
            { title: 'All Solutions' },
            { title: 'Apps' },
            { title: 'Websites' },
            { title: 'Product Design' },
            { title: 'Development Tasks' },
            { title: 'Analytics & Data Science' },
            { title: 'Testing & QA' },
            { title: 'How It Works' },
          ]
        },
        {
          title: 'Enterprise Programs',
          subMenu: [
            { title: 'All Solutions2' },
            { title: 'Apps2' },
            { title: 'Websites2' },
            { title: 'Product Design2' },
            { title: 'Development Tasks2' },
            { title: 'Analytics & Data Science2' },
            { title: 'Testing & QA2' },
            { title: 'How It Works2' },
          ]
        },
        {
          title: 'Customer Success',
          subMenu: [
            { title: 'All Solutions3' },
            { title: 'Apps3' },
            { title: 'Websites3' },
            { title: 'Product Design3' },
            { title: 'Development Tasks3' },
            { title: 'Analytics & Data Science3' },
            { title: 'Testing & QA3' },
            { title: 'How It Works3' },
          ]
        },
        {
          title: 'Company',
          subMenu: [
            { title: 'All Solutions4' },
            { title: 'Apps4' },
            { title: 'Websites4' },
            { title: 'Product Design4' },
            { title: 'Development Tasks4' },
            { title: 'Analytics & Data Science4' },
            { title: 'Testing & QA4' },
            { title: 'How It Works4' },
          ]
        },
        {
          title: 'Resources',
          subMenu: [
            { title: 'All Solutions5' },
            { title: 'Apps5' },
            { title: 'Websites5' },
            { title: 'Product Design5' },
            { title: 'Development Tasks5' },
            { title: 'Analytics & Data Science5' },
            { title: 'Testing & QA5' },
            { title: 'How It Works5' },
          ]
        },
        {
          title: 'Blog',
          subMenu: [
            { title: 'All Solutions6' },
            { title: 'Apps6' },
            { title: 'Websites6' },
            { title: 'Product Design6' },
            { title: 'Development Tasks6' },
            { title: 'Analytics & Data Science6' },
            { title: 'Testing & QA6' },
            { title: 'How It Works6' },
          ]
        },
      ]
    },
    {
      id: 'work', // required for 'Switch to BUSINESS' to work
      title: 'WORK',
      subMenu: [
        {
          title: 'Design',
          subMenu: [
            { title: 'Overview' },
            { title: 'Work List' },
            { title: 'Stats' },
            { title: 'Problem archive' },
            { title: 'Learn' },
            { title: 'Topcoder Open' },
          ]
        },
        {
          title: 'Development',
          subMenu: [
            { title: 'Overview2' },
            { title: 'Work List2' },
            { title: 'Stats2' },
            { title: 'Problem archive2' },
            { title: 'Learn2' },
            { title: 'Topcoder Open2' },
          ]
        },
        {
          title: 'Data Science',
          subMenu: [
            { title: 'Overview3' },
            { title: 'Work List3' },
            { title: 'Stats3' },
            { title: 'Problem archive3' },
            { title: 'Learn3' },
            { title: 'Topcoder Open3' },
          ]
        },
        {
          title: 'QA',
          subMenu: [
            { title: 'Overview4' },
            { title: 'Work List4' },
            { title: 'Stats4' },
            { title: 'Problem archive4' },
            { title: 'Learn4' },
            { title: 'Topcoder Open4' },
          ]
        },
        {
          title: 'Topcoder Open',
          subMenu: [
            { title: 'Overview5' },
            { title: 'Work List5' },
            { title: 'Stats5' },
            { title: 'Problem archive5' },
            { title: 'Learn5' },
            { title: 'Topcoder Open5' },
          ]
        }
      ]
    },
    {
      title: 'MORE',
      mobileOnly: true,
      subMenu: [
        {
          title: "About Topcoder",
          subMenu: [
            { title: "Overview" },
            { title: "Work List" },
            { title: "Stats" },
            { title: "Problem archive" },
            { title: "Learn" },
            { title: "Topcoder Open" },
          ]
        },
        {
          title: "Contact Us",
          subMenu: [
            { title: "Overview2" },
            { title: "Work List2" },
            { title: "Stats2" },
            { title: "Problem archive2" },
            { title: "Learn2" },
            { title: "Topcoder Open2" },
          ]
        },
        {
          title: "Carreers",
          subMenu: [
            { title: "Overview3" },
            { title: "Work List3" },
            { title: "Stats3" },
            { title: "Problem archive3" },
            { title: "Learn3" },
            { title: "Topcoder Open3" },
          ]
        },
        {
          title: "Terms & Conditions",
          subMenu: [
            { title: "Overview4" },
            { title: "Work List4" },
            { title: "Stats4" },
            { title: "Problem archive4" },
            { title: "Learn4" },
            { title: "Topcoder Open4" },
          ]
        },
        {
          title: "Social",
          subMenu: [
            { title: "Overview5" },
            { title: "Work List5" },
            { title: "Stats5" },
            { title: "Problem archive5" },
            { title: "Learn5" },
            { title: "Topcoder Open5" },
          ]
        },
        {
          title: "Press Kits",
          subMenu: [
            { title: "Overview6" },
            { title: "Work List6" },
            { title: "Stats6" },
            { title: "Problem archive6" },
            { title: "Learn6" },
            { title: "Topcoder Open6" },
          ]
        },
        {
          title: "Partner Programs",
          subMenu: [
            { title: "Overview7" },
            { title: "Work List7" },
            { title: "Stats7" },
            { title: "Problem archive7" },
            { title: "Learn7" },
            { title: "Topcoder Open7" },
          ]
        },
      ]
    }
  ]

  const notifications = [
    {
      content: `Northumbrian Water (NWL) - Customer Engagement Gamification Mobile App Design Concepts Challenge is now open for registrations`,
      tags: ['Concept Design'],
      timestamp: Date.now() - 2 * 60 * 60 * 1000
    },
    {
      content: `Eniatus Bank Internal Product Dashboard Design Challenge is now open for registrations`,
      tags: ['Application Front-End Design'],
      timestamp: Date.now() - 2.5 * 60 * 60 * 1000
    },
    {
      content: `Your submission ID513A23433-1 is now in review`,
      category: 'Topcoder Copilot Recruitment Challenge',
      timestamp: Date.now() - 10 * 60 * 1000,
    },
    {
      content: `Your submission ID513A23433-1 was processed successfully`,
      category: 'Topcoder Copilot Recruitment Challenge',
      timestamp: Date.now() - 2.1 * 60 * 60 * 1000,
    },
    {
      content: `Your submission ID513A23433-2 was uploaded successfully`,
      category: 'Topcoder Copilot Recruitment Challenge',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
    },
    {
      content: `Challenge is now in Review phase. No new submissions are accepted at this point.`,
      category: 'TOSCA Editor - Web Application Wireframe Challenge',
      timestamp: Date.now() - 60 * 60 * 1000,
    },
    {
      content: `Northumbrian Water (NWL) - Customer Engagement Gamification Mobile App Design Concepts Challenge is now open for registrations`,
      tags: ['Concept Design'],
      timestamp: new Date('2019-04-05'),
    },
    {
      content: `FAST 48Hr! Patient Concierge Chatbot Web Application UX Testing Challenge is now open for registrations`,
      tags: ['Rapid UX'],
      timestamp: new Date('2019-04-01 10:43'),
    },
    {
      content: `Juno Claims Reporting Tool iOS Mobile Design Application is now open for registrations`,
      tags: ['Application Front-End Design'],
      timestamp: new Date('2019-03-28 15:45'),
    },
    {
      content: `Your submission ID513A23433-1 was uploaded successfully`,
      category: 'Topcoder Copilot Recruitment Challenge',
      timestamp: new Date('2019-04-10 10:52'),
    },
    {
      content: `You are now registered for Topcoder Copilot Recruitment Challenge`,
      category: 'Topcoder Copilot Recruitment Challenge',
      timestamp: new Date('2019-04-08 12:45'),
    }
  ]

  const [theme, setTheme] = useState('light')
  const [loggedIn, setLoggedIn] = useState()
  const [notificationState, setNotificationState] = useState('none')
  const [activeLevel1Id, setActiveLevel1Id] = useState()
  const [switchText, setSwitchText] = useState('Switch to BUSINESS')

  const handleClickToggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light') 

  const handleClickLogin = () => setLoggedIn(x => !x)

  const handleClickLogout = () => setLoggedIn(false)

  const handleChangeNotificationState = () => {
    setNotificationState(x => x === 'none' ? 'new' : x === 'new' ? 'seen' : 'none')
  }

  const handleChangeLevel1Id = menuId => {
    setActiveLevel1Id(menuId)
    setSwitchText('Switch to ' + (menuId === 'business' ? 'WORK' : 'BUSINESS'))
  }

  const handleSwitchMenu = () => {
    setActiveLevel1Id(x => x === 'business' ? 'work' : 'business')
  }

  return (
    <div>
      <TopNav
        menu={navMenus}
        rightMenu={(
          <LoginNav
            loggedIn={loggedIn}
            avatarSrc='/img/img-vic-tor-avatar.svg'
            username='vic-tor'
            notificationButtonState={notificationState}
            notifications={notificationState !== 'none' ? notifications : []}
            onClickLogin={handleClickLogin}
            accountMenu={[
              { title: 'Settings' },
              { title: 'Payments', },
              { title: 'All projects', },
              { separator: true },
              { title: 'Help', },
              { title: 'About Topcoder', },
              { title: 'Log Out', onClick: handleClickLogout },
            ]}
            switchText={switchText}
            onSwitch={handleSwitchMenu}
          />
        )}
        logo={<img src='/img/tc-logo.svg' alt='logo' />}
        theme={theme}
        currentLevel1Id={activeLevel1Id}
        onChangeLevel1Id={handleChangeLevel1Id}
      />
      <div className='help'>
        <h2>Theme support</h2>
        <p>Click a level 2 menu item to show the level 3 menu then click the following button.</p>
        <button onClick={handleClickToggleTheme}>
          Toggle light/dark theme
        </button>

        <h2>Notifications</h2>
        <button onClick={handleChangeNotificationState}>Change notification state</button>
      </div>
    </div>
  )
}

export default App
