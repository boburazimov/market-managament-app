import React, {Component} from 'react';
import {connect} from "dva";
import CatalogLayout from "../../../component/CatalogLayout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import PersonModal from "../../../component/PersonModal"
import {MdAddCircleOutline, MdModeEdit, MdDelete} from "react-icons/md";

@connect(({companyModel}) => ({companyModel}))
class Person extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'companyModel/getCompanies'
    })
  }

  render() {

    const {dispatch, companyModel} = this.props;
    const {pathname, showModal, companies, currentItem} = companyModel;

    const openModal = (item) => {
      dispatch({
        type: 'companyModel/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };

    const addCompany = (e, v) => {
      if (!currentItem) {
        dispatch({
          type: 'companyModel/addCompany',
          payload: {
            ...v
          }
        })
      } else {
        dispatch({
          type: 'companyModel/editCompany',
          payload: {
            id: currentItem.id,
            ...v
          }
        })
      }
    };

    const deleteCompany = (id) => {
      if (window.confirm(`Delete?`))
        dispatch({
          type: 'companyModel/deleteCompany',
          payload: {
            id
          }
        })
    };

    return (
      <div>
        <CatalogLayout pathname={pathname}>
          <Container>
            <Row>
              <Col>
                <h2 className="title">Person</h2>
                <Button className="addBtn btn-light" onClick={() => openModal('')}><MdAddCircleOutline/>
                  New
                </Button>
                <Table className="table table-bordered table-striped table-hover">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Bank-Name</th>
                    <th>MFO</th>
                    <th>INN</th>
                    <th>Account-Number</th>
                    <th>Extra-Info</th>
                    <th width="100">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {companies.map((item, i) =>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.fullName}</td>
                      <td>{item.address}</td>
                      <td>{item.bankName}</td>
                      <td>{item.mfo}</td>
                      <td>{item.inn}</td>
                      <td>{item.accountNumber}</td>
                      <td>{item.extraInfo}</td>
                      <td>
                        <Button className="btn-edit" onClick={() => openModal(item)}><MdModeEdit/></Button>
                        <Button className="btn-danger" onClick={() => deleteCompany(item.id)}><MdDelete/></Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <PersonModal
            showModal={showModal}
            openModal={openModal}
            currentItem={currentItem}
            addCompany={addCompany}
          />
        </CatalogLayout>
      </div>
    );
  }
}

Person.propTypes = {};

export default Person;
