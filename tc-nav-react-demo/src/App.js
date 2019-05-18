import React, { useState } from 'react'
import TopNav from './components/TopNav'
import LoginNav from './components/LoginNav'
import NotificationSettings from './components/NotificationSettings'
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
      timestamp: Date.now() - 2.2 * 60 * 60 * 1000
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
      timestamp: new Date('2019-04-05').valueOf(),
    },
    {
      content: `FAST 48Hr! Patient Concierge Chatbot Web Application UX Testing Challenge is now open for registrations`,
      tags: ['Rapid UX'],
      timestamp: new Date('2019-04-01 10:43').valueOf(),
    },
    {
      content: `Juno Claims Reporting Tool iOS Mobile Design Application is now open for registrations`,
      tags: ['Application Front-End Design'],
      timestamp: new Date('2019-03-28 15:45').valueOf(),
    },
    {
      content: `Your submission ID513A23433-1 was uploaded successfully`,
      category: 'Topcoder Copilot Recruitment Challenge',
      timestamp: new Date('2019-04-10 10:52').valueOf(),
    },
    {
      content: `You are now registered for Topcoder Copilot Recruitment Challenge`,
      category: 'Topcoder Copilot Recruitment Challenge',
      timestamp: new Date('2019-04-08 12:45').valueOf(),
    }
  ]

  const emailOptions = [
    { value: 'off', label: 'Off' },
    { value: 'immediately', label: 'Immediately' },
    { value: 'daily', label: 'Daily' },
    { value: 'everyOtherDay', label: 'Every other day' },
  ]

  const notificationSettings = [
    {
      category: 'Project notifications',
      title: 'New posts and replies',
      description: `Get a notification any time somebody posts on your project. This will make sure you can stay up-to-date with what's happening on your project.`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'immediately',
      emailOptions
    },
    {
      category: 'Project notifications',
      title: 'Project status',
      description: `Receive a notification any time your porject status changes`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'daily',
      emailOptions
    },
    {
      category: 'Project notifications',
      title: 'Project scope',
      description: `Receive a notification any time your project scope is updated`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'everyOtherDay',
      emailOptions
    },
    {
      category: 'Project notifications',
      title: 'File uploads',
      description: `Receive a notification any time a new file is uploaded to your project`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'daily',
      emailOptions
    },
    {
      category: 'Project notifications',
      title: 'New project link',
      description: `Receive a notification any time a new link is added to your project`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'off',
      emailOptions
    },
    {
      category: 'Project notifications',
      title: 'Project team',
      description: `Receive a notification any time a person joins or leaves the team`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'off',
      emailOptions
    },
    {
      category: 'Project notifications',
      title: 'Project plan',
      description: `Receive a notification when a phase is added to your project plan`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'daily',
      emailOptions
    },
    {
      category: 'Project notifications',
      title: 'Project phase updates',
      description: `Receive a notification for any activity on your project phase
      Immediately`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'immediately',
      emailOptions
    },
    {
      category: 'System notifications',
      title: 'System updates',
      description: `From time to time we change things. We are required by law to get you informed for those updates.`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'checkbox',
      email: true
    },
    {
      category: 'System notifications',
      title: 'Product announcements and updates',
      description: `Stay up to date with latest updates and learn about the amazing new features we are developing for Topcoder.`,
      websiteControl: 'checkbox',
      website: false,
      emailControl: 'switch',
      email: true
    },
    {
      category: 'System notifications',
      title: 'Marketing messages',
      description: `Learn about new solutions and important promotions from Topcoder.`,
      websiteControl: 'checkbox',
      website: false,
      emailControl: 'switch',
      email: false
    },
  ]

  const [theme, setTheme] = useState('light')
  const [loggedIn, setLoggedIn] = useState()
  const [notificationState, setNotificationState] = useState('new')
  const [activeLevel1Id, setActiveLevel1Id] = useState()
  const [switchText, setSwitchText] = useState('Switch to BUSINESS')
  const [openSettings, setOpenSettings] = useState()
  const [settings, setSettings] = useState(notificationSettings)

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

  const handleChangeSettings = (settings, item, name) => {
    setSettings(settings)
    console.log(`"${item.title}"`, `${name} = ${item[name]}`)
  }

  const handleSaveSettings = () => {
    console.log('save settings')
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
              { title: 'Settings', onClick: () => setOpenSettings(true) },
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
      <NotificationSettings
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        settings={settings}
        onChange={handleChangeSettings}
        onSave={handleSaveSettings}
      />
    </div>
  )
}

export default App
