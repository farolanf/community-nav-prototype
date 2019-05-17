import React, { useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _ from 'lodash'

import ChosenArrow from '../ChosenArrow'
import styles from './styles.module.scss'

import MobileNav from './MobileNav';
import MobileSubNav from './MobileSubNav';
import MobileMenu from './MobileMenu';
import SubNav from './SubNav';

const moreId = 'more'

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
  const [chosenArrowTick, setChosenArrowTick] = useState(0)

  const [showIconSelect, setShowIconSelect] = useState()
  const [iconSelectX, setIconSelectX] = useState()

  const menuWithId = useMemo(() => initMenuId(_menu), [_menu])

  const [leftNav, setLeftNav] = useState(menuWithId.filter(x => !x.rightMenu))
  const [rightMenu] = useState(menuWithId.find(x => x.rightMenu))

  const [showLeftMenu, setShowLeftMenu] = useState()
  const [showMobileSubMenu, setShowMobileSubMenu] = useState()

  const [moreMenu, setMoreMenu] = useState()
  const [showMore, setShowMore] = useState()

  const createSetRef = id => el => {
    cache.refs[id] = el
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

  const getMenuCenter = useCallback(menuId => {
    const el = cache.refs[menuId]
    const rect = el.getBoundingClientRect()
    return rect.x + rect.width / 2
  }, [cache.refs])

  const setChosenArrowPos = useCallback(menuId => {
    setChosenArrowX(getMenuCenter(menuId))
  }, [setChosenArrowX, getMenuCenter])

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
    setShowIconSelect(false)
    setTimeout(() => {
      // wait for sliding to end before showing arrow for the first time
      setShowChosenArrow(true)
    }, collapsed ? 250 : 0)
    // trigger useLayoutEffect to set arrow pos, this is necessary because
    // the other dependencies don't change
    setChosenArrowTick(x => x + 1)
  }

  useLayoutEffect(() => {
    // get final menu pos before it slide. Do this before sliding start, or
    // we'll get incorrect pos
    activeLevel1Id && setChosenArrowPos(activeLevel1Id)
  }, [activeLevel1Id, setChosenArrowPos, chosenArrowTick])

  const createHandleClickLevel2 = menuId => () => {
    setActiveLevel2Id(menuId)
    setShowLevel3(true)
    setChosenArrowPos(menuId)
    // let the level 3 menu mounted first for sliding indicator to work
    setTimeout(() => {
      const menu = findLevel2Menu(activeLevel1Id, menuId)
      if (menu && menu.subMenu) {
        // select first level 3 item
        setActiveLevel3Id(menu.subMenu[0].id)
        // this requires the item element to be mounted first
        setIconSelectPos(menu.subMenu[0].id)
      }
    })
    !showIconSelect && setTimeout(() => setShowIconSelect(true), 300)
  }

  const createHandleClickLevel3 = menuId => () => {
    setActiveLevel3Id(menuId)
    setIconSelectPos(menuId)
  }

  const handleClickMore = () => {
    setShowMore(x => !x)
  }

  const createHandleClickMoreItem = menuId => () => {
    setActiveLevel2Id(menuId)
    setShowLevel3(true)
    setChosenArrowPos(moreId)
    // let the level 3 menu mounted first for sliding indicator to work
    setTimeout(() => {
      const menu = findLevel2Menu(activeLevel1Id, menuId)
      if (menu && menu.subMenu) {
        // select first level 3 item
        setActiveLevel3Id(menu.subMenu[0].id)
        // this requires the item element to be mounted first
        setIconSelectPos(menu.subMenu[0].id)
      }
    })
    !showIconSelect && setTimeout(() => setShowIconSelect(true), 300)
  }

  useLayoutEffect(() => {
    setShowMore(false)
  }, [activeLevel1Id, activeLevel2Id, activeLevel3Id])

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

  // slide menu
  useEffect(() => {
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

  // trigger more menu generation on level 1 item change
  useEffect(() => {
    setMoreMenu([])
  }, [activeMenu1])

  // show/hide level 2 more menu
  const generateMoreMenu = useCallback(() => {
    // only proceed if more menu is empty
    if (moreMenu && moreMenu.length) return
    if (!activeMenu1 || !activeMenu1.subMenu) return
    const generateMenu = () => {
      const newMoreMenu = []
      let prect
      for (let i = activeMenu1.subMenu.length - 1; i >= 0; i--) {
        const menu = activeMenu1.subMenu[i]
        const menuEl = cache.refs[menu.id]
        if (!menuEl) return
        const rect = menuEl.getBoundingClientRect()
        if (!prect) {
          prect = menuEl.parentElement.getBoundingClientRect()
        }
        // add the item if it's overflowing
        if (rect.right > prect.right) {
          newMoreMenu.unshift(menu)
        } else if (newMoreMenu.length) {
          // add the last non overflowed item to make sure we have space
          // for the 'more' menu
          newMoreMenu.unshift(menu)
          break
        }
      }
      newMoreMenu.length && setMoreMenu(newMoreMenu)
    }
    const setOverflow = set => {
      cache.refs.primaryNav.style.overflow = set ? 'hidden' : ''
      const containers = Object.keys(cache.refs)
        .filter(key => key.startsWith('level2Container'))
        .map(key => cache.refs[key])
      containers.forEach(el => {
        el.style.overflow = set ? 'hidden' : ''
      })
    }
    setOverflow(true)
    setTimeout(() => {
      generateMenu()
      setOverflow(false)
    })
  }, [activeMenu1, cache.refs, moreMenu])

  // generate more menu before paint
  useLayoutEffect(() => {
    generateMoreMenu()
  }, [generateMoreMenu])

  useEffect(() => {
    // trigger more menu generation on resize
    const onResize = _.debounce(() => setMoreMenu([]), 100)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const filterNotInMore = menu => !(moreMenu || []).find(x => x.id === menu.id) 

  return (
    <div className={cn(styles.themeWrapper, `theme-${theme}`)}>
      <div className={styles.headerNavUi}>

        {/* The top mobile navigation */}
        <MobileNav
          showLeftMenu={showLeftMenu}
          logo={logo}
          rightMenu={rightMenu}
          onClickLeftMenu={handleClickLeftMenu}
        />

        {/* Mobile sub navigation (active level 2 menu) */}
        {!showLeftMenu && activeMenu2 && (
          <MobileSubNav
            open={showMobileSubMenu}
            menu={activeMenu2}
            activeChildId={activeLevel3Id}
            onClick={handleClickSubMenu}
            createHandleClickItem={createHandleClickLevel3Mobile}
          />
        )}

        {/* Primary navigation (level 1 and level 2 menu) */}
        <div className={cn(styles.primaryNavContainer, showLeftMenu && styles.primaryNavContainerOpen)}>
          <div className={styles.primaryNav} ref={createSetRef('primaryNav')}>
            <div
              className={cn(styles.tcLogo, collapsed && styles.tcLogoPush)}
              onClick={handleClickLogo}
            >
              {logo}
            </div>
            {leftNav.map((level1, i) => ([
              <span className={styles.primaryLevel1Separator} key={`separator-${i}`} />,
              /* Level 1 menu item */
              <a
                className={cn(styles.primaryLevel1, !activeLevel2Id && level1.id === activeLevel1Id && styles.primaryLevel1Open, level1.mobileOnly && styles.mobileOnly)}
                href={level1.href}
                key={`level1-${i}`}
                onClick={createHandleClickLevel1(level1.id)}
                ref={createSetRef(level1.id)}
              >
                {level1.title}
              </a>,
              /* Level 2 menu */
              level1.subMenu && (
                <div
                  className={cn(styles.primaryLevel2Container, level1.id === activeLevel1Id && styles.primaryLevel2ContainerOpen)}
                  key={`level2-${i}-container`}
                  ref={createSetRef(`level2Container${i}`)}
                >
                  {level1.subMenu.filter(filterNotInMore).map((level2, i) => (
                    <a
                      className={cn(styles.primaryLevel2, level2.id === activeLevel2Id && styles.primaryLevel2Open)}
                      href={level2.href}
                      key={`level2-${i}`}
                      onClick={createHandleClickLevel2(level2.id)}
                      ref={createSetRef(level2.id)}
                    >
                      {level2.title}
                    </a>
                  ))}
                  {/* The More menu */}
                  {level1.id === activeLevel1Id && moreMenu && moreMenu.length > 0 && (
                    <div className={cn(styles.moreBtnContainer, showMore && styles.moreOpen)}>
                      <button
                        className={cn(styles.primaryLevel2, styles.moreBtn)}
                        onClick={handleClickMore}
                        ref={createSetRef(moreId)}
                      >
                        <div className={styles.moreBtnMask} />
                        <span>More</span>
                        <img src='/img/arrow-small-down.svg' alt='dropdown-icon' />
                      </button>
                      <div className={styles.moreContentContainer}>
                        {moreMenu.map((menu, i) => (
                          <a
                            className={cn(styles.primaryLevel2, menu.id === activeLevel2Id && styles.primaryLevel2Open)}
                            href={menu.href}
                            key={`more-item-${i}`}
                            onClick={createHandleClickMoreItem(menu.id)}
                          >
                            {menu.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ),
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
        <SubNav
          open={showLevel3}
          menu={activeMenu2}
          activeChildId={activeLevel3Id}
          showIndicator={showIconSelect}
          indicatorX={iconSelectX}
          createHandleClickItem={createHandleClickLevel3}
          createSetRef={createSetRef}
        />

        {/* Mobile level 2 menu */}
        {showLeftMenu && activeMenu1 && (
          <MobileMenu
            menu={activeMenu1}
            activeChildId={activeLevel2Id}
            createHandleClickItem={createHandleClickLevel2Mobile}
          />
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
