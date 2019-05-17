import React from 'react'
import styles from './styles.module.scss'

const MobileNav = ({ showLeftMenu, onClickLeftMenu, logo, rightMenu }) => (
  <div className={styles.mobileNav}>
    <div className={styles.leftMenuContainer}>
      <button className={styles.menuBtn} onClick={onClickLeftMenu}>
        {showLeftMenu ? (
          <img src='/img/icon-close.svg' alt='close' />
        ) : (
          <img src='/img/icon-menu.svg' width='20' alt='menu' />
        )}
      </button>
    </div>
    {logo}
    {rightMenu && (
      <div className={styles.rightMenu}>
        {rightMenu.title}
      </div>
    )}
  </div>
)

export default MobileNav