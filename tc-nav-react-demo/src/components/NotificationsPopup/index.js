import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const NotificationsPopup = ({ open, onClose, emptyTitle, emptyText }) => (
  <div className={cn(styles.notificationsPanel, open && styles.open)}>
    <div className={styles.backdrop} onClick={onClose} />
    <div className={styles.notiHeader}>
      <span className={styles.leftNoti}>Notifications</span>
      <div className={styles.rights}>
        <span role='button' className={styles.whiteLink}>Settings</span>
      </div>
    </div>
    <div className={styles.notiBody}>
      <i className={styles.iconBell} />
      <h4 className={styles.titles}>{emptyTitle}</h4>
      <div className={styles.txt}>{emptyText}</div>
    </div>
    <div className={styles.notiFooter}>
      <span role='button' className={cn(styles.btn, styles['btn-blue'])}>Notification Settings</span>
    </div>
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
