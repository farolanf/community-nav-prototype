import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

const UserInfo = ({ username, onClick, newNotifications }) => (
  <div
    className={styles.userInfoContainer}
    role='button'
    onClick={onClick}
  >
    <div className={cn(styles.avatarContainer, newNotifications && styles.newNotifications)}>
      <img className={styles.avatar} src="/img/img-vic-tor-avatar.svg" alt="avatar" />
    </div>
    <div className={styles.handleContainer}>
      <span className={styles.handle}>{username}</span>
      <span className={styles.dropdownIcon}>
        <img src="/img/arrow-small-down.svg" alt="dropdown icon" />
      </span>
    </div>
  </div>
)

export default UserInfo
