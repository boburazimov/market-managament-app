import React, {Component} from 'react';
import {Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from "dva";
import {STORAGE_NAME} from "../utils/constant";
import {router} from "umi";
import logo from "../../public/assets/images/logo.png"

@connect(({app}) => ({app}))
class NavbarPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  render() {

    const {isOpen} = this.state;
    const {app} = this.props;
    const {currentUser, isAdmin, isDirector} = app;

    const toggle = () => this.setState(!isOpen);

    const logOut = () => {
      localStorage.removeItem(STORAGE_NAME);
      this.props.dispatch({
        type: 'app/updateState',
        payload: {
          currentUser: {},
          isAdmin: false,
          isCashier: false,
          isDirector: false
        }
      });
      router.push("/login");
    };

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Container className="container">
            <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                {Object.keys(currentUser).length > 0 ? <NavItem>
                  <NavLink href="/menu">Menu</NavLink>
                </NavItem> : ''}
                {isDirector ? <NavItem>
                  <NavLink href="/report">Hisobot</NavLink>
                </NavItem> : ''}
                {currentUser ?  <NavItem>
                  <NavLink href="/instruction">Yo'riqnoma</NavLink>
                </NavItem> : ''}
                {isAdmin ? <NavItem>
                  <NavLink href="/catalog/magazine">Catalog</NavLink>
                </NavItem> : ''}

              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem className="mr-md-3">
                  {!(Object.keys(currentUser).length > 0) ?
                    <NavLink href="/login">Kirish</NavLink>
                    : <Button className="btn-yellow" type="button" onClick={logOut}>Chiqish</Button>}
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

NavbarPanel.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

export default NavbarPanel;
