import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'
import EmptyNotifications from './EmptyNotifications';
import NotificationList from './NotificationList';

const NotificationsPopup = ({ open, onClose, emptyTitle, emptyText, notifications }) => (
  <div className={cn(styles['notifications-panel'], open && styles.open)}>
    <div className={styles.backdrop} onClick={onClose} />
    {notifications && notifications.length > 0 ? (
      <NotificationList notifications={notifications} />
    ) : (
      <EmptyNotifications emptyTitle={emptyTitle} emptyText={emptyText} />
    )}
  </div>
)

NotificationsPopup.defaultProps = {
  emptyTitle: 'Good job! You’re all caught up',
  emptyText: (
    <div>
      Join challenges and check your notification settings if 
      you don’t receive notifications. We’re actively adding 
      new notifications. Read our <a href='/' className={styles.blueLink}>blog post</a> for more info
    </div>
  )
}

NotificationsPopup.propTypes = {
  emptyTitle: PropTypes.node,
  emptyText: PropTypes.node,

  /**
   * Array of Notifications, each with properties:
   * 
   *   - content {string|node}
   *   - category {array}
   *   - tags {array}
   *   - timestamp {number}
  */
  notifications: PropTypes.array,
}

export default NotificationsPopup
