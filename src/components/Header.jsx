import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Container, Form, FormControl, Navbar, NavLink, Nav, NavDropdown,
} from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
import $ from 'jquery';

import { Link } from 'react-router-dom';
import Registration from './Registration';

// export default function Header({ currUser, logOutHandler }) {
//   return (
function Header({ currUser, logOutHandler }) {
  function animation() {
    const tabsNewAnim = $('#navbarSupportedContent');
    const activeItemNewAnim = tabsNewAnim.find('.active');
    const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    const itemPosNewAnimTop = activeItemNewAnim.position();
    const itemPosNewAnimLeft = activeItemNewAnim.position();
    $('.hori-selector').css({
      top: `${itemPosNewAnimTop.top}px`,
      left: `${itemPosNewAnimLeft.left}px`,
      height: `${activeWidthNewAnimHeight}px`,
      width: `${activeWidthNewAnimWidth}px`,
    });
    $('#navbarSupportedContent').on('click', 'li', function (e) {
      $('#navbarSupportedContent ul li').removeClass('active');
      $(this).addClass('active');
      const activeWidthNewAnimHeight = $(this).innerHeight();
      const activeWidthNewAnimWidth = $(this).innerWidth();
      const itemPosNewAnimTop = $(this).position();
      const itemPosNewAnimLeft = $(this).position();
      $('.hori-selector').css({
        top: `${itemPosNewAnimTop.top}px`,
        left: `${itemPosNewAnimLeft.left}px`,
        height: `${activeWidthNewAnimHeight}px`,
        width: `${activeWidthNewAnimWidth}px`,
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on('resize', () => {
      setTimeout(() => { animation(); }, 500);
    });
  }, []);

  return (

    <nav className="navbar navbar-expand-lg navbar-mainbg">

      <div className="navbar-brand navbar-logo">
        Велопрогулки
      </div>

      <button
        className="navbar-toggler"
        onClick={function () {
          setTimeout(() => { animation(); });
        }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white" />
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">

          <div className="hori-selector">
          </div>
          {currUser.id ? (
            <Navbar.Text className="nav-text">
              Привет,
              {' '}
              {currUser.name}
            </Navbar.Text>
          ) : ((<Navbar.Text className="nav-text">Привет, гость!</Navbar.Text>))}
          <li className="nav-item active">
            <Link className="nav-link" to="/" exact>
              <i
                className="fas fa-tachometer-alt"
              />
              Home
            </Link>
          </li>
          {currUser.id ? (

            <li className="nav-item">
              <NavLink className="nav-link" onClick={logOutHandler} exact>
                <i
                  className="far fa-address-book"
                />
                Выйти
              </NavLink>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" link to="/authorization" exact>
                  <i
                    className="far fa-address-book"
                  />
                  Личный кабинет
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registration" exact>
                  <i
                    className="far fa-address-book"
                  />
                  Зарегистрироваться
                </Link>
              </li>
            </>

          )}
        </ul>
      </div>
    </nav>
  );
}
export default Header;
