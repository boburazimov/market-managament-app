import React, {Component} from 'react';
import {Button, Col, Container, Row, Table} from "reactstrap";
import CatalogLayout from "../../../component/CatalogLayout";
import {connect} from "dva";
import {MdDelete, MdModeEdit} from "react-icons/md";
import MagazineModal from "../../../component/Modals/MagazineModal";
import {GoPlus} from "react-icons/go";

@connect(({magazineModel, app}) => ({magazineModel, app}))
class Magazine extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'app/getUsers'
    });
    this.props.dispatch({
      type: 'app/getMagazines'
    })
  }

  render() {

    const {app, dispatch} = this.props;
    const {magazines, showModal, pathname, currentItem, users} = app;

    const styled = {
      width: 100
    };

    const openModal = (item) => {
      dispatch({
        type: 'app/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };

    const addMagazine = (e, v) => {
      dispatch({
        type: 'app/addMagazine',
        payload: {
          id: currentItem ? currentItem.id : '',
          ...v
        }
      })
    };

    const deleteMagazine = (id) => {
      dispatch({
        type: 'app/deleteMagazine',
        payload: {id}
      })
    };

    return (
      <div>
        <CatalogLayout pathname={pathname}>
          <Container>
            <Row>
              <Col>
                <h2 className="title">Magazine</h2>
                <Button className="addBtn btn-light rounded-circle" onClick={() => openModal('')}><GoPlus/>
                </Button>
                <Table className="table table-bordered table-striped table-hover">
                  <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Administrator</th>
                    <th>Extra Info</th>
                    <th style={styled}>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {magazines.map((item, i) =>
                    <tr key={item.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center font-weight-bold">{item.name}</td>
                      <td className="text-center">{item.externalCode}</td>
                      <td className="text-center">{item.phoneNumber}</td>
                      <td>{item.extraInfo}</td>
                      <td className="text-center">
                        <Button className="btn-info float-none" onClick={() => openModal(item)}><MdModeEdit/></Button>
                        <Button className="btn-danger float-none" onClick={(e) => {
                          if (window.confirm('Вы действительно хотите удалить?')) deleteMagazine(item.id)
                        }}><MdDelete/></Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <MagazineModal
            showModal={showModal}
            openModal={openModal}
            currentItem={currentItem}
            addMagazine={addMagazine}
            users={users}
          />
        </CatalogLayout>
      </div>
    );
  }
}

Magazine.propTypes = {};

export default Magazine;
