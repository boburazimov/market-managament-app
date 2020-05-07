import React, {Component} from 'react';
import CatalogSidebar from "./CatalogSidebar";

class CatalogLayout extends Component {
  render() {
    return (
      <div className="mt-2 catalog container">
        <CatalogSidebar pathname={this.props.pathname}/>
        <div className="layout-children">
          {this.props.children}
        </div>
      </div>
    );
  }
}

CatalogLayout.propTypes = {};

export default CatalogLayout;
