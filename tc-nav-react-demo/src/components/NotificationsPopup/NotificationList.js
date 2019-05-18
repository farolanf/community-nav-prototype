import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const LightBar = ({ title }) => (
  <div className={styles['light-bar']}>
    {title}
    <span role='button' className={cn(styles['green-link'], styles['mobile-only'])}>
      Dismiss All
    </span>
  </div>
)

const NotificationList = ({ notifications }) => {
  const categories = (notifications || []).map(noti => noti.category)

  return (
    <>
      <div className={styles['noti-header']}>
        <span className={styles['left-noti']}>Notifications</span>
        <div className={styles.rights}>
          <span role='button' className={styles['white-link']}>Dismiss All</span>
          &nbsp;<span className={styles.point}></span>&nbsp;
          <span role='button' className={styles['white-link']}>Settings</span>
        </div>
        <span
          role='button'
          className={styles['btn-setting']}
        />
      </div>
      <div className={styles['noti-body']}>
        <LightBar title='New' />
        <div className={styles['lightblue-section']}>
          <div className={styles['items']}>
            <a href='/' className={styles['item-content have-remove']}>
              <p className={styles['txt']}>
                Northumbrian Water (NWL) - Customer Engagement 
                Gamification Mobile App Design Concepts Challenge is now 
                open for registrations
              </p>
              <div className={styles['bottom-info']}>
                <span className={styles['blue-squre']}>Concept Design</span>
                <span className={styles['time-txt']}>2h ago</span>
              </div>
              <div className={styles['right-remove mobile-hide']}>
                <div className={styles['btn-close']}></div>
                <span className={styles['black-txt']}>Dismiss notification</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

NotificationList.propTypes = {
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

export default NotificationList
