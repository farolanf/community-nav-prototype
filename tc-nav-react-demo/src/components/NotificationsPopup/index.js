import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const NotificationsPopup = ({ open, onClose, emptyTitle, emptyText, notifications }) => {
  const hasNotifications = notifications && notifications.length
  const categories = (notifications || []).map(noti => noti.category)

  return (
    <div className={cn(styles['notifications-panel'], open && styles.open)}>
      <div className={styles.backdrop} onClick={onClose} />

      {hasNotifications ? (
        <div>empty</div>
      ) : (
        <>
          <div className={styles['noti-header']}>
            <span className={styles['notification-back-btn']} role='button' />
            <span className={styles['left-noti']}>Notifications</span>
            <div className={styles.rights}>
              <span className={styles.point}></span>
              <span className={styles['white-link']} role='button'>Settings</span>
            </div>
            <span className={styles['btn-setting']} role='button' />
          </div>
          <div className={styles['noti-body']}>
            <i className={cn(styles.icons, styles['icon-bell'])} />
            <h4 className={styles.titles}>{emptyTitle}</h4>
            <div className={styles.txt}>{emptyText}</div>
          </div>
          <div className={styles['noti-footer']}>
            <span className={cn(styles.btn, styles['btn-blue'])} role='button'>
              Notification Settings
            </span>
          </div>
        </>
      )}
    </div>
  )
}

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
