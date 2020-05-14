import React, {Component} from 'react';
import CatalogLayout from "../../../component/CatalogLayout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {GoPlus} from "react-icons/go";
import {connect} from "dva";
import {MdDelete, MdModeEdit} from "react-icons/md";
import CashDeskModal from "../../../component/Modals/CashDeskModal";

@connect(({app}) => ({app}))
class CashDesk extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'app/getCashDesks'});
    dispatch({type: 'app/getCurrencies'});
  }

  render() {

    const {dispatch, app} = this.props;
    const {showModal, currentItem, cashDesks, currencies} = app;

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

    const addCashDesk = (e, v) => {
      dispatch({
        type: 'app/addCashDesk',
        payload: {
          id: currentItem ? currentItem.id : '',
          ...v
        }
      })
    };

    const deleteCashDesk = (id) => {
      dispatch({
        type: 'app/deleteCashDesk',
        payload: {id}
      })
    };

    return (
      <div>
        <CatalogLayout>
          <Container>
            <Row>
              <Col>
                <h2 className="title">Кассы ККМ</h2>
                <Button className="addBtn btn-light rounded-circle" onClick={() => openModal('')}><GoPlus/></Button>
                <Table className="table table-bordered table-hover table-striped">
                  <thead>
                  <tr className="text-center">
                    <th>№</th>
                    <th>Внешний код</th>
                    <th>Наименование</th>
                    <th>Магазин</th>
                    <th>Баланс</th>
                    <th>Комментарии</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                  {cashDesks.map((item, i) =>
                    <tr key={item.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">{item.externalCode}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center font-weight-bold">{item.currency.symbolCode}</td>
                      <td className="text-center">{item.extraInfo}</td>
                      <td className="text-center">
                        <Button className="btn-danger float-none" onClick={() => openModal(item)}><MdModeEdit/></Button>
                        <Button className="btn-info float-none" onClick={() => {
                          if (window.confirm('Вы действительно хотите удалить?')) deleteCashDesk(item.id)
                        }}><MdDelete/></Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <CashDeskModal
            currencies={currencies}
            showModal={showModal}
            openModal={openModal}
            currentItem={currentItem}
            addCashDesk={addCashDesk}
            defaultValue={defaultValue}
          />
        </CatalogLayout>
      </div>
    );
  }
}

CashDesk.propTypes = {};

export default CashDesk;
