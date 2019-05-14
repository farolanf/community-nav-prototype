import React from 'react';
import { TopNav } from 'tc-nav-react'

function App() {
  var navMenus = [
    {
      title: 'BUSINESS',
      subMenu: [
        {
          title: "Solutions",
          subMenu: [
            { title: "All Solutions" },
            { title: "Apps" },
            { title: "Websites" },
            { title: "Product Design" },
            { title: "Development Tasks" },
            { title: "Analytics & Data Science" },
            { title: "Testing & QA" },
            { title: "How It Works" },
          ]
        },
        {
          title: "Enterprise Programs",
          subMenu: [
            { title: "All Solutions" },
            { title: "Apps" },
            { title: "Websites" },
            { title: "Product Design" },
            { title: "Development Tasks" },
            { title: "Analytics & Data Science" },
            { title: "Testing & QA" },
            { title: "How It Works" },
          ]
        },
        {
          title: "Customer Success",
          subMenu: [
            { title: "All Solutions" },
            { title: "Apps" },
            { title: "Websites" },
            { title: "Product Design" },
            { title: "Development Tasks" },
            { title: "Analytics & Data Science" },
            { title: "Testing & QA" },
            { title: "How It Works" },
          ]
        },
        {
          title: "Company",
          subMenu: [
            { title: "All Solutions" },
            { title: "Apps" },
            { title: "Websites" },
            { title: "Product Design" },
            { title: "Development Tasks" },
            { title: "Analytics & Data Science" },
            { title: "Testing & QA" },
            { title: "How It Works" },
          ]
        },
        {
          title: "Resources",
          subMenu: [
            { title: "All Solutions" },
            { title: "Apps" },
            { title: "Websites" },
            { title: "Product Design" },
            { title: "Development Tasks" },
            { title: "Analytics & Data Science" },
            { title: "Testing & QA" },
            { title: "How It Works" },
          ]
        },
        {
          title: "Blog",
          subMenu: [
            { title: "All Solutions" },
            { title: "Apps" },
            { title: "Websites" },
            { title: "Product Design" },
            { title: "Development Tasks" },
            { title: "Analytics & Data Science" },
            { title: "Testing & QA" },
            { title: "How It Works" },
          ]
        },
      ]
    },
    {
      title: 'WORK',
      subMenu: [
        {
          title: "Design",
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
          title: "Development",
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
          title: "Data Science",
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
          title: "QA",
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
          title: "Topcoder Open",
          subMenu: [
            { title: "Overview" },
            { title: "Work List" },
            { title: "Stats" },
            { title: "Problem archive" },
            { title: "Learn" },
            { title: "Topcoder Open" },
          ]
        }
      ]
    },
  ]
  return (
    <div className="App">
      <TopNav menu={navMenus} />
    </div>
  );
}

export default App;
