import React, {Component} from 'react';
import CatalogLayout from "../../../component/CatalogLayout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {GoPlus} from "react-icons/go";
import {connect} from "dva";
import {MdDelete, MdModeEdit} from "react-icons/md";
import PayTypeModal from "../../../component/Modals/PayTypeModal";

@connect(({app}) => ({app}))
class PayType extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'app/getPayTypes'
    })
  }

  render() {

    const {dispatch, app} = this.props;
    const {showModal, currentItem, payTypes} = app;

    const openModal = (item) => {
      dispatch({
        type: 'app/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };

    const addPayType = (e, v) => {
      dispatch({
        type: 'app/addPayType',
        payload: {
          id: currentItem ? currentItem.id : '',
          ...v
        }
      })
    };

    const deletePayType = (id) => {
      dispatch({
        type: 'app/deletePayType',
        payload: {id}
      })
    };

    return (
      <div>
        <CatalogLayout>
          <Container>
            <Row>
              <Col>
                <h2 className="title">Виды оплаты</h2>
                <Button className="addBtn btn-light rounded-circle" onClick={() => openModal('')}><GoPlus/></Button>
                <Table className="table table-bordered table-hover table-striped">
                  <thead>
                  <tr className="text-center">
                    <th>№</th>
                    <th>Вид оплаты</th>
                    <th>Комментарии</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                  {payTypes.map((item, i) =>
                    <tr key={item.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center font-weight-bold">{item.name}</td>
                      <td className="text-center">{item.extraInfo}</td>
                      <td className="text-center">
                        <Button className="btn-danger float-none" onClick={() => openModal(item)}><MdModeEdit/></Button>
                        <Button className="btn-info float-none" onClick={(e) => {
                          if (window.confirm('Вы действительно хотите удалить?')) deletePayType(item.id)
                        }}><MdDelete/></Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <PayTypeModal
            showModal={showModal}
            openModal={openModal}
            currentItem={currentItem}
            addPayType={addPayType}
          />
        </CatalogLayout>
      </div>
    );
  }
}

PayType.propTypes = {};

export default PayType;
