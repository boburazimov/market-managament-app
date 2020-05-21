import React, {Component} from 'react';
import {Button, Col, Container, Label, Row, Table} from "reactstrap";
import {connect} from "dva";
import {AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

@connect(({app}) => ({app}))
class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nachSaldo: '',
      chistiyUzs: '',
    }
  }

  componentDidMount() {
    let countNachSaldo = 0;
    const {currentCashDesks} = this.props.app;
    // eslint-disable-next-line array-callback-return
    currentCashDesks.map(item => {
      countNachSaldo += item.balanceValue;
    })
    this.setState({
      nachSaldo: countNachSaldo
    })
  }

  render() {

    const validateProps = {
      required: {value: true},
      number: true,
      maxLength: {value: 11},
    };

    const {app} = this.props;
    const {nachSaldo} = this.state;
    const {currentCashDesks} = app;

    const defaultValue = {};

    const onHandleSubmit = (e, v) => {
      console.log(v);
    };

    return (
      <div className="col-lg-12 col-sm-12">
        <Container className="menuPage">

          <Row className="bg-light border-bottom">
            <Col className="col-sm-12 col-md-6 offset-md-3 text-center">
              <h4>Закрытие кассовой смены</h4>
            </Col>
          </Row>
          <Row className="card-header">
            <Col className="col-sm-12 col-md-4">
              <Label>Маркет</Label>
              <h4 className="form-control bg-info text-light">H-055 Кора Камиш 2/4 120квм</h4>
            </Col>
            <Col className="col-sm-12 col-md-3">
              <Label>Ответственный</Label>
              <h4 className="form-control bg-info text-light">Бобур Азимов</h4>
            </Col>
            <Col className="col-sm-12 col-md-2">
              <Label>Контакты</Label>
              <h4 className="form-control bg-info text-light">+99897 444 54 03</h4>
            </Col>
            <Col className="col-sm-12 justify-content-end col-md-2">
              <AvForm onValidSubmit={onHandleSubmit} model={defaultValue}>
                <AvGroup>
                  <Label for="checkDate">Дата</Label>
                  <AvInput type="date" id="checkDate" name="checkDate"
                           required validate={{
                    dateRange: {
                      start: {value: -2, units: 'days',},
                      end: {value: 2, units: 'days',}
                    }
                  }}/>
                </AvGroup>
              </AvForm>
            </Col>
          </Row>

          <AvForm onValidSubmit={onHandleSubmit}>
            <Row className="card-body justify-content-center">
              <Table className="table mb-0" id="sassProps" bordered hover={true}>
                {/*КАССИР БЛОК - Начало*/}
                <thead className="thead-default">
                <tr>
                  <th width="1%">#</th>
                  <th width="25%" className="headTitle">КАССИР</th>
                  <th width="15%">Итоги</th>
                  {currentCashDesks ? currentCashDesks.map(item =>
                    <th key={item.id} width="15%">{item.name.slice(0, 7)}</th>
                  ) : ''}
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <th className="desc-text">Сальдо на начало</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput value={nachSaldo}
                               className="text-right"
                               type="number"
                               id="nachSaldo"
                               name="nachSaldo"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map(item =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput
                          value={item.balanceValue}
                          className="text-right"
                          type="number"
                          id="na"
                          name="balanceValue"
                          placeholder="0.00"
                          readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <th className="desc-text">Чистый UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput value={nachSaldo}
                               className="text-right"
                               type="number"
                               id="nachSaldo"
                               name="nachSaldo"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистый за день UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">ONLINE карта</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">UnionPay</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Humo</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Накоп.сдачи/недоздача</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                </tbody>
                {/*КАССИР БЛОК - Конец*/}

                {/*ARTIX БЛОК - Начало*/}
                <thead className="thead-default">
                <tr>
                  <th width="5px">#</th>
                  <th width="200px" className="headTitle">ARTIX</th>
                  <th width="170px">Итоги</th>
                  {currentCashDesks ? currentCashDesks.map(item =>
                    <th key={item.id} width="15%">{item.name.slice(0, 14)}</th>
                  ) : ''}
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <th className="desc-text">Приход UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <th className="desc-text">Приход UZK</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Расход UZS (возврат)</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Расход UZK (возврат)</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">UnionPay</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZK</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                </tbody>
                {/*ARTIX БЛОК - Конец*/}

                {/*СВЕРКА БЛОК - Начало*/}
                <thead className="thead-default">
                <tr>
                  <th width="5px">#</th>
                  <th width="200px" className="headTitle">СВЕРКА</th>
                  <th width="170px">Итоги</th>

                  {currentCashDesks ? currentCashDesks.map(item =>
                    <th key={item.id} width="15%">{item.name.slice(0, 14)}</th>
                  ) : ''}
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <th className="desc-text">Разница - UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <th className="desc-text">Разница - UZK</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">СВЕРКА КАССА</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">ИНКАССА</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Сальдо на конец</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZK</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right" type="number" validate={validateProps} id="externalCode"
                               name="externalCode"
                               placeholder="0.00"/>
                    </AvGroup>
                  </td>
                </tr>
                </tbody>
                {/*БЛОК СВЕРКА - Конец*/}
              </Table>
            </Row>
            <Row className="card-body justify-content-end pt-0">
              <Button type="submit" outline color="success">Отправить отчет</Button>
            </Row>
          </AvForm>
        </Container>
      </div>
    );
  }
}

export default Index;
