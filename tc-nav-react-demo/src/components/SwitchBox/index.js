import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

const SwitchBox = ({ checked, onClick }) => (
  <div
    className={cn(styles['switch-box'], checked && styles['checked'])}
    onClick={onClick}
  >
    <span className={styles['label-on']}>
      on
    </span>
    <span className={styles['dot']}>
    </span>
    <span className={styles['label-off']}>
      off
    </span>
  </div>
)

export default SwitchBox
