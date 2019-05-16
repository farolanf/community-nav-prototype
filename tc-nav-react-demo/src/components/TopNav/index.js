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
  const [showLevel3, setShowLevel3] = useState()

  const [showChosenArrow, setShowChosenArrow] = useState()
  const [chosenArrowX, setChosenArrowX] = useState()

  const [showIconSelect, setShowIconSelect] = useState()
  const [iconSelectX, setIconSelectX] = useState()

  const menuWithId = useMemo(() => initMenuId(_menu), [_menu])

  const [leftMenu, setLeftMenu] = useState(menuWithId.filter(x => x.pos !== 'right'))
  const [rightMenu] = useState(menuWithId.filter(x => x.pos === 'right'))

  const createSetMenuRef = menuId => el => {
    cache.refs[menuId] = el
  }

  const findLevel1Menu = level1Id => leftMenu.find(level1 => level1.id === level1Id)

  const findLevel2Menu = (level1Id, level2Id) => {
    const menu1 = findLevel1Menu(level1Id)
    return menu1 && menu1.subMenu && menu1.subMenu.find(level2 => level2.id === level2Id)
  }

  const activeMenu2 = findLevel2Menu(activeLevel1Id, activeLevel2Id)

  const startSlide = () => {
    setLeftMenu(leftMenu => leftMenu.map(menu => {
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
    // let the level 3 menu mounted first
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

  useLayoutEffect(() => {
    leftMenu.forEach(menu => {
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
  }, [collapsed, leftMenu, cache.refs, cache.slide])

  return (
    <div className={cn(styles.themeWrapper, `theme-${theme}`)}>
      <div className={styles.headerNavUi}>
        <div className={styles.primaryNavContainer}>
          <div className={styles.primaryNav}>
            <div
              className={cn(styles.tcLogo, collapsed && styles.tcLogoPush)}
              onClick={handleClickLogo}
            >
              {logo}
            </div>
            {leftMenu.filter(x => !x.mobileOnly).map((level1, i) => ([
              <a
                className={cn(styles.primaryLevel1, !activeLevel2Id && level1.id === activeLevel1Id && styles.primaryLevel1Open)}
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
