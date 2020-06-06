import React, {Component} from 'react';
import {connect} from "dva";
import bg from "../../../public/assets/images/bgpattern.png";
import cashBox from "../../../public/assets/images/cashBox.svg";
import {NavLink} from "reactstrap";

let bgStyle = {
  backgroundImage: `url(${bg})`
};

@connect(({app}) => ({app}))
class Index extends Component {

  render() {

    return (
      <div className="menuPage" style={bgStyle}>
        <div className="container ">
          <div className="row mt-3">
            <div className="col-12">
              <h2 className="title">Menu</h2>
            </div>
            <div className="col-3">
              <div className="cards">
                <div className="cards-header">
                  <NavLink href="/menu/kassa"><img src={cashBox} className="card-img-top img-fluid" alt=""/></NavLink>
                </div>
                <div className="cards-body">
                  <div className="cards-title text-center">
                    <NavLink href="/menu/kassa"> <h2>Kassa</h2></NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
