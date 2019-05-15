import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

/**
 * TopNav is the main navigation component.
 */
const TopNav = ({ menu }) => {
  return (
    <div className={styles.themeWrapper}>
      <div className={styles.headerNavUi}>
        <div className={styles.primaryNav}>
          Topcoder TopNav
        </div>
      </div>
    </div>
  )
}

TopNav.propTypes = {
  /**
   * Array of menu objects, each with properties:
   *
   *   - title {string|element} The title
   *   - href {string} If set, wrap title in &lt;a&gt;
   *   - subMenu {array} Children menu
   */
  menu: PropTypes.array.isRequired
}

export default TopNav
