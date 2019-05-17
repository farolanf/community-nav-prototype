import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const NotificationButton = ({ state }) => (
  <div className={cn(styles.notificationButton, styles[state])}>
    <img src="/img/icon-bell.svg" alt="notification" />
  </div>
)

NotificationButton.propTypes = {
  state: PropTypes.oneOf(['none', 'new', 'seen'])
}

export default NotificationButton
