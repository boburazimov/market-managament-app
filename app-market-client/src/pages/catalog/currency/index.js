import React, {Component} from 'react';
import CatalogLayout from "../../../component/CatalogLayout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {GoPlus} from "react-icons/go";
import {connect} from "dva";
import {MdDelete, MdModeEdit} from "react-icons/md";
import CurrencyModal from "../../../component/Modals/CurrencyModal";

@connect(({app}) => ({app}))
class Currency extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'app/getCurrencies'
    })
  }

  render() {

    const {dispatch, app} = this.props;
    const {showModal, currentItem, currencies} = app;

    const openModal = (item) => {
      dispatch({
        type: 'app/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };

    const addCurrency = (e, v) => {
      dispatch({
        type: 'app/addCurrency',
        payload: {
          id: currentItem ? currentItem.id : '',
          ...v
        }
      })
    };


    const deleteCurrency = (id) => {
      dispatch({
        type: 'app/deleteCurrency',
        payload: {id}
      })
    };

    return (
      <div>
        <CatalogLayout>
          <Container>
            <Row>
              <Col>
                <h2 className="title">Валюты</h2>
                <Button className="addBtn btn-light rounded-circle" onClick={() => openModal('')}><GoPlus/></Button>
                <Table className="table table-bordered table-hover table-striped">
                  <thead>
                  <tr className="text-center">
                    <th>№</th>
                    <th>Наименование валюты</th>
                    <th>Симв. код</th>
                    <th>Комментарии</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                  {currencies.map((item, i) =>
                    <tr key={item.id}>
                      <td className="text-center">{i + 1}</td>
                      <td>{item.fullName}</td>
                      <td className="text-center font-weight-bold">{item.symbolCode}</td>
                      <td>{item.extraInfo}</td>
                      <td className="text-center">
                        <Button className="btn-danger float-none" onClick={() => openModal(item)}><MdModeEdit/></Button>
                        <Button className="btn-info float-none" onClick={(e) => {
                          if (window.confirm('Вы действительно хотите удалить?')) deleteCurrency(item.id)
                        }}><MdDelete/></Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <CurrencyModal
            showModal={showModal}
            openModal={openModal}
            currentItem={currentItem}
            addCurrency={addCurrency}
          />
        </CatalogLayout>
      </div>
    );
  }
}

Currency.propTypes = {};

export default Currency;
