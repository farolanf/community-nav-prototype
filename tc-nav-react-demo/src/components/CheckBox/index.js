import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

const CheckBox = ({ checked, onClick }) => (
  <div className={styles['checkbox']}>
    <div className={cn(styles['check-icon'], checked && styles['checked'])} />
  </div>
)
