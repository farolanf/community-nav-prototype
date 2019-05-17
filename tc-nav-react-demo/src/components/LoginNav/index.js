import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import NotificationButton from '../NotificationButton'
import NotificationPanel from '../NotificationPanel';

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
  onClickMenu
}) => {
  const [showNotifications, setShowNotifications] = useState()

  const handleClickNotifications = e => {
    e.preventDefault()
    setShowNotifications(x => !x)
  }

  const handleClickNotificationsPopup = e => e.preventDefault()

  useEffect(() => {
    // handle click outside
    const onClick = e => {
      !e.defaultPrevented && setShowNotifications(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className={styles.loginContainer}>
      {loggedIn ? ([
        <NotificationButton
          state={notificationButtonState}
          notificationsPopupOpen={showNotifications}
          onClick={handleClickNotifications}
          key='notification-button'
        />,
        <UserInfo
          username={username}
          onClick={onClickMenu}
          key='user-info'
        />
      ]) : (
        <span onClick={onClickLogin}>LOGIN</span>
      )}
      {showNotifications && (
        <div className={styles.notificationsPopup} onClick={handleClickNotificationsPopup}>
          <NotificationPanel />
        </div>
      )}
    </div>
  )
}

LoginNav.propTypes = {
  loggedIn: PropTypes.bool,
  username: PropTypes.node,
}

export default LoginNav
