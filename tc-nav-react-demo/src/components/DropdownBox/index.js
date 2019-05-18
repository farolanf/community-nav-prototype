import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

const optionLabel = (value, options) => {
  const opt = options.find(x => x.value === value)
  return opt && opt.label
}

const DropdownBox = ({ open, checked, value, options, onChange }) => (
  <div className={cn(styles['dropdown-box'], checked && styles['checked'], open && styles['dropdown-open'])}>
    <span className={styles['selected-label']}>
      {optionLabel(value, options)}
      <i className={styles['dropdown-arrow']}></i>
    </span>
    
    <ul className={styles['options']}>
      {options.map(opt => (
        <li className={cn(styles['option-li'], opt.value === value && styles['active'])}>
          {opt.label}
        </li>
      ))}
    </ul>
  </div>
)

export default DropdownBox
