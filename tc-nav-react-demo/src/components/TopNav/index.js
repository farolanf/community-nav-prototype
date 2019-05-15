import React, { useState, useMemo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

let id = 1

/**
 * TopNav is the main navigation component.
 */
const TopNav = ({ menu: _menu, logo, theme = 'light' }) => {
  const [cache] = useState({
    refs: {},
    slide: {}
  })
  const [collapsed, setCollapsed] = useState(true)
  const [activeLevel1Id, setActiveLevel1Id] = useState()
  const [activeLevel2Id, setActiveLevel2Id] = useState()
  const [showLevel3, setShowLevel3] = useState()

  const menuWithId = useMemo(() => {
    return _menu
      .map(level1 => ({
        ...level1,
        id: id++,
        subMenu: level1.subMenu && level1.subMenu.map(child => ({
          ...child,
          id: id++
        }))
      }))
  }, [_menu])

  const [leftMenu, setLeftMenu] = useState(menuWithId.filter(x => x.pos !== 'right'))
  const [rightMenu] = useState(menuWithId.filter(x => x.pos === 'right'))
  
  const createSetLevel1Ref = menuId => el => {
    cache.refs[menuId] = el
  }

  const startSlide = () => {
    setLeftMenu(leftMenu => leftMenu.map(menu => {
      cache.slide[menu.id] = true
      const el = cache.refs[menu.id]
      const rect = el.getBoundingClientRect()
      return {
        ...menu,
        initialX: rect.x,
      }
    }))
  }

  const handleClickLogo = () => {
    setCollapsed(true)
    startSlide()
    setActiveLevel1Id()
    setShowLevel3(false)
  }

  const createHandleClickLevel1 = menuId => () => {
    setCollapsed(false)
    startSlide()
    setActiveLevel1Id(menuId)
    setActiveLevel2Id()
    setShowLevel3(false)
  }

  const createHandleClickLevel2 = menuId => () => {
    setActiveLevel2Id(menuId)
    setShowLevel3(true)
  }

  useLayoutEffect(() => {
    leftMenu.forEach(menu => {
      if (!cache.slide[menu.id]) return
      cache.slide[menu.id] = false
      const el = cache.refs[menu.id]
      const rect = el.getBoundingClientRect()
      const relativeX = menu.initialX - rect.x
      el.style.transform = `translateX(${relativeX}px)`
      setTimeout(() => {
        el.style.transition = 'transform 250ms ease-out'
        el.style.transform = `translateX(0px)`
        setTimeout(() => {
          el.style.transition = ''
          el.style.transform = ''
        }, 250);
      })
    })
  }, [leftMenu, cache.refs, cache.slide])

  const activeMenu1 = leftMenu.find(x => x.id === activeLevel1Id)

  const activeMenu2 = activeMenu1
    && activeMenu1.subMenu
    && activeMenu1.subMenu.find(x => x.id === activeLevel2Id)

  const activeMenu3 = activeMenu2 && activeMenu2.subMenu

  return (
    <div className={cn(styles.themeWrapper, styles[`theme-${theme}`])}>
      <div className={styles.headerNavUi}>
        <div className={styles.primaryNavContainer}>
          <div className={styles.primaryNav}>
            <div
              className={cn(styles.tcLogo, collapsed && styles.tcLogoPush)}
              onClick={handleClickLogo}
            >
              {logo}
            </div>
            {leftMenu.map((level1, i) => ([
              <a
                className={cn(styles.primaryLevel1, !activeLevel2Id && level1.id === activeLevel1Id && styles.primaryLevel1Open)}
                href={level1.href}
                key={`level1-${i}`}
                onClick={createHandleClickLevel1(level1.id)}
                ref={createSetLevel1Ref(level1.id)}
              >
                {level1.title}
              </a>,
              level1.subMenu && (
                <div
                  className={cn(styles.primaryLevel2Container, level1.id === activeLevel1Id && styles.primaryLevel2ContainerOpen)}
                  key={`level2-${i}-container`}
                >
                  {level1.subMenu.map((level2, i) => (
                    <a
                      className={cn(styles.primaryLevel2, level2.id === activeLevel2Id && styles.primaryLevel2Open)}
                      href={level2.href}
                      key={`level2-${i}`}
                      onClick={createHandleClickLevel2(level2.id)}
                    >
                      {level2.title}
                    </a>
                  ))}
                </div>
              )
            ]))}
          </div>
          <div className={styles.primaryNavRight}>
            {rightMenu.map((level1, i) => (
              <div
                className={styles.primaryLevel1}
                key={`level1-right-${i}`}
              >
                {level1.title}
              </div>
            ))}
          </div>
        </div>
        <div className={cn(styles.secondaryNav, showLevel3 && styles.secondaryNavOpen)}>
          <div className={styles.secondaryNavLinkContainer}>
            {activeMenu3 && activeMenu3.map((menu, i) => (
              <a href={menu.href} key={`level3-${i}`}>
                {menu.title}
              </a>
            ))}
          </div>
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
   *   - href {string} The href for wrapper anchor
   *   - subMenu {array} Children menu
   */
  menu: PropTypes.array.isRequired
}

export default TopNav
