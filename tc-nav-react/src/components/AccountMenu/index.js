import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const AccountMenu = ({ open, onClose, avatarSrc, username, email, menu, switchText, onSwitch }) => {
  const handleClickItem = item => () => {
    if (item.onClick) {
      item.onClick()
      onClose()
    }
  }
  return (
    <div className={cn(styles['user-info-popup'], open && styles.open)}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.header}>
        <img src={avatarSrc} width='60' className={styles.avatar} alt='avatar' />
        <div className={styles.title}>
          <span className={styles.handle}>{username}</span>
          <span className={styles.email}>{email}</span>
        </div>
      </div>
      <div role='button' className={styles.switch} onClick={onSwitch}>
        <img className={styles['switch-icon']} src='/img/icon-switch-business.svg' alt='switch' />
        <span>{switchText}</span>
      </div>
      <div className={styles.menu}>
        {menu.map((item, i) => (
          item.separator ? (
            <span className={styles.separator} key={`separator-${i}`} />
          ) : (
            <a
              href={item.href}
              key={`item-${i}`}
              onClick={handleClickItem(item)}
            >
              {item.title}
            </a>
          )
        ))}
      </div>
    </div>
  )
}

AccountMenu.defaultProps = {
  avatarSrc: '/img/img-vic-tor-avatar.svg',
  username: 'vic-tor',
  email: 'vic@topcoder.com',
  switchText: 'Switch to BUSINESS',
  menu: [
    { title: 'Settings', href: null, onClick: null },
    { title: 'Payments', href: null, onClick: null },
    { title: 'All projects', href: null, onClick: null },
    { separator: true },
    { title: 'Help', href: null, onClick: null },
    { title: 'About Topcoder', href: null, onClick: null },
    { title: 'Log Out', href: null, onClick: null },
  ]
}

AccountMenu.propTypes = {
  open: PropTypes.bool,
  avatarSrc: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  menu: PropTypes.array,
  switchText: PropTypes.string,
  onSwitch: PropTypes.func
}

export default AccountMenu

