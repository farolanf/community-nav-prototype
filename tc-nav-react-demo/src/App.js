import React, { useState } from 'react'
import TopNav from './components/TopNav'
import './app.css'

function App() {
  var navMenus = [
    {
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
            { title: "Overview" },
            { title: "Work List" },
            { title: "Stats" },
            { title: "Problem archive" },
            { title: "Learn" },
            { title: "Topcoder Open" },
          ]
        },
        {
          title: "Carreers",
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
          title: "Terms & Conditions",
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
          title: "Social",
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
          title: "Press Kits",
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
          title: "Partner Programs",
          subMenu: [
            { title: "Overview" },
            { title: "Work List" },
            { title: "Stats" },
            { title: "Problem archive" },
            { title: "Learn" },
            { title: "Topcoder Open" },
          ]
        },
      ]
    },
    {
      title: 'LOGIN',
      rightMenu: true
    }
  ]

  const [theme, setTheme] = useState('light')

  const handleClickToggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light') 

  return (
    <div>
      <TopNav
        menu={navMenus}
        logo={<img src='/img/tc-logo.svg' alt='logo' />}
        theme={theme}
      />
      <div className='help'>
        <h2>Theme support</h2>
        <p>* Note: Theme example only implemented on the wide version.</p>
        <p>Click a level 2 menu item to show the level 3 menu then click the following button.</p>
        <button className='theme-btn' onClick={handleClickToggleTheme}>
          Toggle light/dark theme
        </button>
      </div>
    </div>
  )
}

export default App
