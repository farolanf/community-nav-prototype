import React from 'react'
import styles from './styles.module.scss'

const UserInfo = ({ username, onClick }) => (
  <div
    className={styles.userInfoContainer}
    role='button'
    onClick={onClick}
  >
    <img className={styles.avatar} src="/img/img-vic-tor-avatar.svg" alt="avatar" />
    <div className={styles.handleContainer}>
      <span className={styles.handle}>{username}</span>
      <span className={styles.dropdownIcon}>
        <img src="/img/arrow-small-down.svg" alt="dropdown icon" />
      </span>
    </div>
  </div>
)

export default UserInfo
