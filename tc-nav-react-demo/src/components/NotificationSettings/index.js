import React, { useMemo, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _ from 'lodash'

import styles from './styles.module.scss'

import CheckBox from '../CheckBox'
import SwitchBox from '../SwitchBox'
import DropdownBox from '../DropdownBox'

const Item = ({ item }) => {
  return (
    <li>
      <div className={styles['list-item']}>
        <div className={styles['left']}>
          <div className={styles['title']}>
            {item.title}
          </div>
          <div className={styles['description']}>
            {item.description}
          </div>
        </div>
        
        <div className={styles['website']}>
          <CheckBox checked={item.website} />
        </div>
        
        <div className={styles['as-email']}>
          {_.isBoolean(item.email) && (
            <CheckBox checked={item.email} />
          )}
          
          {!_.isUndefined(item.emailOptions) && (
            <DropdownBox
              checked={item.emailValue !== item.emailOptions[0].value}
              value={item.emailValue}
              options={item.emailOptions}
            />
          )}
        </div>
      </div>
      
      <div className={styles['description-mobile']}>
        {item.description}
      </div>
    </li>
  )
}

const NotificationSettings = ({ open, settings, theme, onChange, onClose }) => {
  const categories = useMemo(() => {
    return _.uniq(settings.map(x => x.category))
      .map(category => ({
        category,
        settings: settings.filter(x => x.category === category)
      }))

  }, [settings])

  return (
    <div className={cn(styles['settings-dialog'], styles['theme-wrapper'], `theme-${theme}`, open && styles.open)}>

      <div className={styles['header-nav-ui']}>
        <div className={styles['settings-nav']}>
          <img className={styles['tc-logo']} src='/img/tc-logo.svg' alt='logo' />
          <span className={styles['title']}>Topcoder Settings</span>
          <span
            role='button'
            className={styles['close-btn']}
            onClick={onClose}
          >
            <img src='/img/icon-close.svg' alt='close' />
          </span>
        </div>
      </div>
      
      <div className={styles['settings-panel']}>

        <div className={styles['title']}>
          Notifications
        </div>
        
        {categories.map(category => (
          <div className={styles['panel-content']} key={category.category}>
            <div className={styles['section-title']}>
              <div className={styles['left']}>
                {category.category}
              </div>
              <div className={styles['website']}>
                <span><em>Website</em></span>
              </div>
              
              <div className={styles['as-email']}>
                <span><em>As email</em></span>
              </div>
            </div>
          
            <ul className={styles['section-list']}>
              {category.settings.map((item, i) => (
                <Item
                  item={item}
                  key={`item-${i}`}
                />
              ))}
            </ul>
          </div>
        ))}

      </div>

    </div>
  )
}

NotificationSettings.defaultProps = {
  theme: 'light',
  settings: [
    {
      category: 'Project notifications',
      title: 'New posts and replies',
      description: `Get a notification any time somebody posts on your project. This will make sure you can stay up-to-date with what's happening on your project.`,
      website: true,
      emailValue: 'immediately',
      emailOptions: [
        { value: 'off', label: 'Off' },
        { value: 'immediately', label: 'Immediately' },
        { value: 'daily', label: 'Daily' },
        { value: 'everyOtherDay', label: 'Every other day' },
      ]
    }
  ]
}

NotificationSettings.propTypes = {
  /**
   * Array of options object, each with properties:
   * 
   *   - id (optional)
   *   - title {string} Option title
   *   - description {string} Option description
   *   - category {string} Option category. Eg. Project notifications
   *   - website {bool} Value for website setting
   *   - email {bool} Value for email setting
   *   - emailValue {string}
   *   - emailOptions {array} Options for emailValue. Each option should have
   *     value and label properties.
   * 
   * Email setting type can be a checkbox or a select box, which use
   * email {bool}, or emailValue and emailOptions respectively.
  */
  settings: PropTypes.array,

  theme: PropTypes.string,

  /**
   * Called when changing settings.
   * 
   * @param settings {array} The updated settings
   * @param option {object} The specific settings item that changed
   * 
  */
  onChange: PropTypes.func,

  onClose: PropTypes.func,
}

export default NotificationSettings
