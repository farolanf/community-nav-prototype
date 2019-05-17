import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import NotificationButton from '../NotificationButton'
import NotificationsPopup from '../NotificationsPopup'
import UserInfo from '../UserInfo'
import AccountMenu from '../AccountMenu';

const LoginNav = ({
  loggedIn,
  username,
  notificationButtonState,
  accountMenu,
  switchText,
  onSwitch,
  onClickLogin,
}) => {
  const [openNotifications, setOpenNotifications] = useState()
  const [openAccountMenu, setOpenAccountMenu] = useState()

  const handleClickNotifications = () => setOpenNotifications(x => !x)

  const handleClickUserInfo = () => setOpenAccountMenu(x => !x)

  return (
    <div className={styles.loginContainer}>
      {loggedIn ? ([
        <NotificationButton
          className={styles.notificationButton}
          state={notificationButtonState}
          notificationsPopupOpen={openNotifications}
          onClick={handleClickNotifications}
          key='notification-button'
        />,
        <UserInfo
          username={username}
          newNotifications={notificationButtonState === 'new'}
          onClick={handleClickUserInfo}
          key='user-info'
        />
      ]) : (
        <span onClick={onClickLogin}>LOGIN</span>
      )}
      <NotificationsPopup
        open={openNotifications}
        onClose={() => setOpenNotifications(false)}
      />
      <AccountMenu
        open={openAccountMenu}
        menu={accountMenu}
        switchText={switchText}
        onSwitch={onSwitch}
        onClose={() => setOpenAccountMenu(false)}
      />
    </div>
  )
}

LoginNav.propTypes = {
  loggedIn: PropTypes.bool,
  username: PropTypes.node,
  accountMenu: PropTypes.array,
  switchText: PropTypes.string,
  onSwitch: PropTypes.func,
}

export default LoginNav
