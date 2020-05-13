import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from "react-router-dom";

class CatalogSidebar extends Component {

  render() {

    return (
      <div className="katalog-sidebar">
        <ListGroup>
          {/*<ListGroupItem>*/}
          {/*  <Link to="/catalog/person"*/}
          {/*        className={window.location.pathname === "/catalog/person" ? "active-catalog nav-link" : "nav-link"}>Person</Link>*/}
          {/*</ListGroupItem>*/}
          <ListGroupItem>
            <Link to="/catalog/magazine"
                  className={window.location.pathname === "/catalog/magazine" ? "active-catalog nav-link" : "nav-link"}>Маркет</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/catalog/balance"
                  className={window.location.pathname === "/catalog/balance" ? "active-catalog nav-link" : "nav-link"}>Баланс</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/catalog/payType"
                  className={window.location.pathname === "/catalog/payType" ? "active-catalog nav-link" : "nav-link"}>Выд оплаты</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/catalog/currency"
                  className={window.location.pathname === "/catalog/currency" ? "active-catalog nav-link" : "nav-link"}>Валюта</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/catalog/cashDesk"
                  className={window.location.pathname === "/catalog/cashDesk" ? "active-catalog nav-link" : "nav-link"}>Касса ККМ</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/catalog/cashBox"
                  className={window.location.pathname === "/catalog/cashBox" ? "active-catalog nav-link" : "nav-link"}>Касса Организации</Link>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

CatalogSidebar.propTypes = {};

export default CatalogSidebar;
