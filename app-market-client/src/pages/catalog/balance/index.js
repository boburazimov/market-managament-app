import React, {Component} from 'react';
import CatalogLayout from "../../../component/CatalogLayout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {GoPlus} from "react-icons/go";
import {connect} from "dva";
import {MdDelete, MdModeEdit} from "react-icons/md";
import BalanceModal from "../../../component/Modals/BalanceModal";

@connect(({app}) => ({app}))
class Balance extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'app/getBalances'
    })
  }

  render() {

    const {dispatch, app} = this.props;
    const {showModal, currentItem, balances} = app;

    const openModal = (item) => {
      dispatch({
        type: 'app/updateState',
        payload: {
          showModal: !showModal,
          currentItem: item
        }
      })
    };

    const addBalance = (e, v) => {
      dispatch({
        type: 'app/addBalance',
        payload: {
          id: currentItem ? currentItem.id : '',
          ...v
        }
      })
    };


    const deleteBalance = (id) => {
      dispatch({
        type: 'app/deleteBalance',
        payload: {id}
      })
    };

    return (
      <div>
        <CatalogLayout>
          <Container>
            <Row>
              <Col>
                <h2 className="title">Балансы кассы</h2>
                <Button className="addBtn btn-light rounded-circle" onClick={() => openModal('')}><GoPlus/></Button>
                <Table className="table table-bordered table-hover table-striped">
                  <thead>
                  <tr className="text-center">
                    <th>№</th>
                    <th>Баланс для кассы</th>
                    <th>Комментарии</th>
                    <th>Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                  {balances.map((item, i) =>
                    <tr key={item.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center font-weight-bold">{item.balance}</td>
                      <td>{item.extraInfo}</td>
                      <td className="text-center">
                        <Button className="btn-danger float-none" onClick={() => openModal(item)}><MdModeEdit/></Button>
                        <Button className="btn-info float-none" onClick={(e) => {
                          if (window.confirm('Вы действительно хотите удалить?')) deleteBalance(item.id)
                        }}><MdDelete/></Button>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <BalanceModal
            showModal={showModal}
            openModal={openModal}
            currentItem={currentItem}
            addBalance={addBalance}
          />
        </CatalogLayout>
      </div>
    );
  }
}

Balance.propTypes = {};

export default Balance;
