import React, {Component} from 'react';
import CatalogLayout from "../../../component/CatalogLayout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {GoPlus} from "react-icons/go";
import {connect} from "dva";
import {MdDelete, MdModeEdit} from "react-icons/md";
import CashBoxModal from "../../../component/Modals/CashBoxModal";

@connect(({app}) => ({app}))
class CashBox extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'app/getCashBoxes'});
    dispatch({type: 'app/getCurrencies'});
  }

  render() {

    const {dispatch, app} = this.props;
    const {showModal, currentItem, cashBoxes, currencies} = app;

    const defaultValue = {
      currency: currentItem ? `/${currentItem.currencyId}` : '',
      name: currentItem ? currentItem.name : '',
      extraInfo: currentItem ? currentItem.extraInfo : '',
      externalCode: currentItem ? currentItem.externalCode : '',
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

    const addCashBox = (e, v) => {
      dispatch({
        type: 'app/addCashBox',
        payload: {
          id: currentItem ? currentItem.id : '',
          ...v
        }
      })
    };

    const deleteCashBox = (id) => {
      dispatch({
        type: 'app/deleteCashBox',
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
                    <th>Внешний код</th>
                    <th>Наименование</th>
                    <th>Валюта</th>
                    <th>Комментарии</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                  {cashBoxes.map((item, i) =>
                    <tr key={item.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">{item.externalCode}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center font-weight-bold">{item.currency.symbolCode}</td>
                      <td className="text-center">{item.extraInfo}</td>
                      <td className="text-center">
                        <Button className="btn-danger float-none" onClick={() => openModal(item)}><MdModeEdit/></Button>
                        <Button className="btn-info float-none" onClick={() => {
                          if (window.confirm('Вы действительно хотите удалить?')) deleteCashBox(item.id)
                        }}><MdDelete/></Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <CashBoxModal
            currencies={currencies}
            showModal={showModal}
            openModal={openModal}
            currentItem={currentItem}
            addCashBox={addCashBox}
            defaultValue={defaultValue}
          />
        </CatalogLayout>
      </div>
    );
  }
}

CashBox.propTypes = {};

export default CashBox;
