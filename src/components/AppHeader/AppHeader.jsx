import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { Component } from 'react'
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

export default class AppHeader extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.leftGroup}>
            <a href="#" className={styles.link}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default ml-2">Конструктор</span>
            </a>
            <a href="#" className={styles.link}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
            </a>
          </div>
          
          <div className={styles.logo}>
            <Logo />
          </div>
          
          <a href="#" className={styles.link}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
          </a>
        </nav>
      </header>
    )
  }
}