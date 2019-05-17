import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import NotificationButton from '../NotificationButton'

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

const LoginNav = ({
  loggedIn,
  username,
  notificationButtonState,
  onClickLogin,
  onClickMenu,
  onClickNotifications
}) => {
  return (
    <div className={styles.loginContainer}>
      {loggedIn ? ([
        <NotificationButton state={notificationButtonState} />,
        <UserInfo
          username={username}
          onClick={onClickMenu}
        />
      ]) : (
        <span onClick={onClickLogin}>LOGIN</span>
      )}
    </div>
  )
}

export default LoginNav
