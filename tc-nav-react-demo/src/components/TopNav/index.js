import React, { useState, useMemo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ChosenArrow from '../ChosenArrow'
import IconSelect from '../IconSelect'
import styles from './styles.module.scss'

let id = 1

const initMenuId = menu => {
  return menu
    .map(level1 => ({
      ...level1,
      id: id++,
      subMenu: level1.subMenu && level1.subMenu.map(level2 => ({
        ...level2,
        id: id++,
        subMenu: level2.subMenu && level2.subMenu.map(level3 => ({
          ...level3,
          id: id++
        }))
      }))
    }))
}

/**
 * TopNav is the main navigation component.
 */
const TopNav = ({ menu: _menu, logo, theme = 'light' }) => {
  const [cache] = useState({
    refs: {},
    slide: {},
  })
  const [collapsed, setCollapsed] = useState(true)
  const [activeLevel1Id, setActiveLevel1Id] = useState()
  const [activeLevel2Id, setActiveLevel2Id] = useState()
  const [activeLevel3Id, setActiveLevel3Id] = useState()
  const [showLevel3, setShowLevel3] = useState()

  const [showChosenArrow, setShowChosenArrow] = useState()
  const [chosenArrowX, setChosenArrowX] = useState()

  const [showIconSelect, setShowIconSelect] = useState()
  const [iconSelectX, setIconSelectX] = useState()

  const menuWithId = useMemo(() => initMenuId(_menu), [_menu])

  const [leftNav, setLeftNav] = useState(menuWithId.filter(x => !x.rightMenu))
  const [rightMenu] = useState(menuWithId.find(x => x.rightMenu))

  const [showLeftMenu, setShowLeftMenu] = useState()
  const [showMobileSubMenu, setShowMobileSubMenu] = useState()

  const createSetMenuRef = menuId => el => {
    cache.refs[menuId] = el
  }

  const findLevel1Menu = level1Id => leftNav.find(level1 => level1.id === level1Id)

  const findLevel2Menu = (level1Id, level2Id) => {
    const menu1 = findLevel1Menu(level1Id)
    return menu1 && menu1.subMenu && menu1.subMenu.find(level2 => level2.id === level2Id)
  }

  const activeMenu1 = findLevel1Menu(activeLevel1Id)
  const activeMenu2 = findLevel2Menu(activeLevel1Id, activeLevel2Id)

  const startSlide = () => {
    setLeftNav(leftNav => leftNav.map(menu => {
      if (!cache.refs[menu.id]) return menu
      cache.slide[menu.id] = true
      const el = cache.refs[menu.id]
      const rect = el.getBoundingClientRect()
      return {
        ...menu,
        initialX: rect.x
      }
    }))
  }

  const getMenuCenter = menuId => {
    const el = cache.refs[menuId]
    const rect = el.getBoundingClientRect()
    return rect.x + rect.width / 2
  }

  const setChosenArrowPos = menuId => {
    setChosenArrowX(getMenuCenter(menuId))
  }

  const setIconSelectPos = menuId => {
    setIconSelectX(getMenuCenter(menuId))
  }

  const handleClickLogo = () => {
    setCollapsed(true)
    setActiveLevel1Id()
    setShowLevel3(false)
    setShowChosenArrow(false)
    startSlide()
  }

  const createHandleClickLevel1 = menuId => () => {
    setCollapsed(false)
    setActiveLevel1Id(menuId)
    setActiveLevel2Id()
    setShowLevel3(false)
    startSlide()
    setTimeout(() => {
      setChosenArrowPos(menuId)
      setShowChosenArrow(true)
      setShowIconSelect(false)
    }, 270)
  }

  const createHandleClickLevel2 = menuId => () => {
    setActiveLevel2Id(menuId)
    setShowLevel3(true)
    setChosenArrowPos(menuId)
    // let the level 3 menu mounted first for sliding indicator to work
    setTimeout(() => {
      const menu = findLevel2Menu(activeLevel1Id, menuId)
      if (menu && menu.subMenu) {
        setIconSelectPos(menu.subMenu[0].id)
      }
    })
    !showIconSelect && setTimeout(() => setShowIconSelect(true), 300)
  }

  const createHandleClickLevel3 = menuId => () => {
    setIconSelectPos(menuId)
  }

  const handleClickLeftMenu = () => setShowLeftMenu(x => !x)

  const createHandleClickLevel2Mobile = menuId => () => {
    setShowLeftMenu(false)
    setActiveLevel2Id(menuId)
    const menu = findLevel2Menu(activeLevel1Id, menuId)
    if (menu && menu.subMenu) {
      setActiveLevel3Id(menu.subMenu[0].id)
    }
  }

  const createHandleClickLevel3Mobile = menuId => () => {
    setActiveLevel3Id(menuId)
    setShowMobileSubMenu(false)
  }

  const handleClickSubMenu = () => setShowMobileSubMenu(x => !x)

  useLayoutEffect(() => {
    leftNav.forEach(menu => {
      if (!cache.slide[menu.id] || !cache.refs[menu.id]) return
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
  }, [collapsed, leftNav, cache.refs, cache.slide])

  return (
    <div className={cn(styles.themeWrapper, `theme-${theme}`)}>
      <div className={styles.headerNavUi}>

        {/* The top mobile navigation */}
        <div className={styles.mobileNav}>
          <div className={styles.leftMenuContainer}>
            <button className={styles.menuBtn} onClick={handleClickLeftMenu}>
              {showLeftMenu ? (
                <img src='/img/icon-close.svg' alt='close' />
              ) : (
                <img src='/img/icon-menu.svg' width='20' alt='menu' />
              )}
            </button>
          </div>
          {logo}
          {rightMenu && (
            <div className={styles.rightMenu}>
              {rightMenu.title}
            </div>
          )}
        </div>

        {/* Mobile sub navigation (active level 2 menu) */}
        {!showLeftMenu && activeMenu2 && (
          <div className={cn(styles.mobileNavSubMenu, showMobileSubMenu && styles.mobileNavSubMenuOpen)}>
            {showMobileSubMenu && <div className={styles.mobileNavSubMenuMask} />}
            <button className={styles.mobileNavSubMenuHeader} onClick={handleClickSubMenu}>
              <span>{activeMenu2.title}</span>
              <img src="/img/arrow-small-down.svg" alt="dropdown icon" />
            </button>
            {showMobileSubMenu && (
              <div className={styles.mobileNavSubMenuContent}>
                {activeMenu2.subMenu && activeMenu2.subMenu.map((level3, i) => (
                  <a
                    className={cn(styles.mobileNavSubMenuChild, level3.id === activeLevel3Id && styles.mobileNavSubMenuChildOpen)}
                    href={level3.href}
                    key={`level3-${i}`}
                    onClick={createHandleClickLevel3Mobile(level3.id)}
                  >
                    {level3.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Primary navigation (level 1 and level 2 menu) */}
        <div className={cn(styles.primaryNavContainer, showLeftMenu && styles.primaryNavContainerOpen)}>
          <div className={styles.primaryNav}>
            <div
              className={cn(styles.tcLogo, collapsed && styles.tcLogoPush)}
              onClick={handleClickLogo}
            >
              {logo}
            </div>
            {leftNav.map((level1, i) => ([
              <a
                className={cn(styles.primaryLevel1, !activeLevel2Id && level1.id === activeLevel1Id && styles.primaryLevel1Open, level1.mobileOnly && styles.mobileOnly)}
                href={level1.href}
                key={`level1-${i}`}
                onClick={createHandleClickLevel1(level1.id)}
                ref={createSetMenuRef(level1.id)}
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
                      ref={createSetMenuRef(level2.id)}
                    >
                      {level2.title}
                    </a>
                  ))}
                </div>
              )
            ]))}
            <ChosenArrow show={showChosenArrow} x={chosenArrowX} />
          </div>

          <div className={styles.primaryNavRight}>
            {rightMenu && (
              <div className={styles.primaryLevel1}>
                {rightMenu.title}
              </div>
            )}
          </div>
        </div>

        {/* Level 3 menu */}
        <div className={cn(styles.secondaryNav, showLevel3 && styles.secondaryNavOpen)}>
          <div className={styles.secondaryNavLinkContainer}>
            {activeMenu2 && activeMenu2.subMenu && activeMenu2.subMenu.map((level3, i) => (
              <a
                className={styles.secondaryNavItem}
                href={level3.href}
                key={`level3-${i}`}
                onClick={createHandleClickLevel3(level3.id)}
                ref={createSetMenuRef(level3.id)}
              >
                {level3.title}
              </a>
            ))}
            <IconSelect show={showIconSelect} x={iconSelectX} />
          </div>
        </div>

        {/* Mobile level 2 menu */}
        {showLeftMenu && activeMenu1 && (
          <div className={styles.secondaryNavMobile}>
            {activeMenu1.subMenu && activeMenu1.subMenu.map((level2, i) => (
              <a
                className={cn(styles.secondaryNavMobileItem, level2.id === activeLevel2Id && styles.secondaryNavMobileItemOpen)}
                href={level2.href}
                key={`level2-${i}`}
                onClick={createHandleClickLevel2Mobile(level2.id)}
              >
                {level2.title}
              </a>
            ))}
          </div>
        )}

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
