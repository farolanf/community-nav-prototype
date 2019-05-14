import React from 'react'
import PropTypes from 'prop-types'
import 'assets/sass/style.scss'

const TopNav = ({ menu }) => {
  return (
    <div className='header-nav-ui'>
      <div className='primary-nav'>
        TC TopNav
      </div>
    </div>
  )
}

TopNav.propTypes = {
  /**
   * Array of menu objects, each with properties:
   *   - title {string|element} The title
   *   - href {string} If set, wrap title in <a>
   *   - subMenu {array} Children menu
   */
  menu: PropTypes.array.isRequired
}

export default TopNav
