import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

const MobileMenu = ({ menu, activeChildId, createHandleClickItem }) => (
  <div className={styles.secondaryNavMobile}>
    {menu.subMenu && menu.subMenu.map((level2, i) => (
      <a
        className={cn(styles.secondaryNavMobileItem, level2.id === activeChildId && styles.secondaryNavMobileItemOpen)}
        href={level2.href}
        key={`level2-${i}`}
        onClick={createHandleClickItem(level2.id)}
      >
        {level2.title}
      </a>
    ))}
  </div>
)

export default MobileMenu