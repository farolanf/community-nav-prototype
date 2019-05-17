import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import NotificationButton from '../NotificationButton'
import NotificationPanel from '../NotificationPanel'
import UserInfo from '../UserInfo'

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
          className={styles.notificationButton}
          state={notificationButtonState}
          notificationsPopupOpen={showNotifications}
          onClick={handleClickNotifications}
          key='notification-button'
        />,
        <UserInfo
          username={username}
          notificationButtonState={notificationButtonState}
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
