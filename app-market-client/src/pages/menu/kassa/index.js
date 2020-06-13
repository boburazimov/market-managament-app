import React, {Component} from 'react';
import {Button, Col, Container, Label, Row, Table} from "reactstrap";
import {connect} from "dva";
import {AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

@connect(({app}) => ({app}))
class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkOuts: [],
      result: {
        clearUzs: 0,
        clearUzk: 0,
        onlineCard: 0,
        unionPayCard: 0,
        humoCard: 0,
        accumFail: 0,

        artixUzs: 0,
        artixUzk: 0,
        artixReturn: 0,
      },
      onlineP: [],
      humoP: [],
      unionP: [],
      clearUzkP: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  handleChange(e) {
  }

  onBlurHandler(e) {
    const {app} = this.props;
    const {currentCashDesks} = app;

    let val = 0;
    let name = e.target.name.split('/')[0];
    let index = e.target.name.split('/')[1];

    for (let i = 0; i < currentCashDesks.length; i++) {

      console.log(document.getElementsByName(name + '/' + i)[0].value)
      console.log(name)

      if (document.getElementsByName(name + '/' + i)[0].value === '')
        document.getElementsByName(name + '/' + i)[0].value = 0.00;
      val += parseFloat(document.getElementsByName(name + '/' + i)[0].value);
    }

    let result = this.state.result;
    result[name] = val;

    let clearUzkP = this.state.clearUzkP;
    let onlineP = this.state.onlineP;
    let unionP = this.state.unionP;
    let humoP = this.state.humoP;


    if (name.startsWith('onlineCard')) {
      onlineP[index] = parseFloat(document.getElementsByName(name + '/' + index)[0].value);
    } else if (name.startsWith('unionPayCard')) {
      unionP[index] = parseFloat(document.getElementsByName(name + '/' + index)[0].value);
    } else if (name.startsWith('humoCard')) {
      humoP[index] = parseFloat(document.getElementsByName(name + '/' + index)[0].value);
    }

    let clearUzk = 0;
    for (let i = 0; i < currentCashDesks.length; i++) {
      clearUzkP[i] = (onlineP[i] ? onlineP[i] : 0) + (unionP[i] ? unionP[i] : 0) + (humoP[i] ? humoP[i] : 0);
      clearUzk += clearUzkP[i];
    }
    result.clearUzk = clearUzk;

    this.setState({
      result,
      onlineP,
      unionP,
      humoP,
      clearUzkP
    })
  }

  onHandleSubmit(e) {
  }

  render() {
    const {app} = this.props;
    const {currentCashDesks, currentUser} = app;

    return (
      <div className="col-lg-12 col-sm-12">
        <Container className="kassaPage">

          <Row className="bg-light border-bottom">
            <Col className="col-sm-12 col-md-6 offset-md-3 text-center">
              <h4>Закрытие кассовой смены</h4>
            </Col>
          </Row>
          <Row className="card-header">
            <Col className="col-sm-12 col-md-4">
              <Label>Маркет</Label>
              <h4 className="form-control">{currentCashDesks ? "currentCashDesks[0].magazineName" : ''}</h4>
            </Col>
            <Col className="col-sm-12 col-md-3">
              <Label>Ответственный</Label>
              <h4 className="form-control">{currentUser ? currentUser.firstName + ' ' + currentUser.lastName : ''}</h4>
            </Col>
            <Col className="col-sm-12 col-md-2">
              <Label>Контакты</Label>
              <h4 className="form-control ">{currentUser ? currentUser.username : ''}</h4>
            </Col>
            <Col className="col-sm-12 justify-content-end col-md-2">
              <AvForm onValidSubmit={this.onHandleSubmit} defaultValue={new Date()}>
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

          <AvForm onValidSubmit={this.onHandleSubmit}>
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
                      <AvInput value={currentCashDesks ? currentCashDesks.reduce((a, b) => a + b.balanceValue, 0) : 0}
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
                      <AvInput
                        value={this.state.result.clearUzs}
                        className="text-right"
                        type="number"
                        id="clearUzs"
                        name="clearUzs"
                        placeholder="0.00"
                        readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={0.00}
                                 type="number"
                                 id={`clearUzs/${i}`}
                                 name={`clearUzs/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистый UZK</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.clearUzk}
                               type="number"
                               id="clearUzk"
                               name="clearUzk"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={this.state.clearUzkP[i]}
                                 type="number"
                                 id={`clearUzk/${i}`}
                                 name={`clearUzk/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                                 readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <th className="desc-text">ONLINE карта</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.onlineCard}
                               type="number"
                               id="onlineCard"
                               name="onlineCard"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={this.state.onlineP[i]}
                                 type="number"
                                 id={`onlineCard/${i}`}
                                 name={`onlineCard/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <th className="desc-text">UnionPay</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.unionPayCard}
                               type="number"
                               id="unionPayCard"
                               name="unionPayCard"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={this.state.unionP[i]}
                                 type="number"
                                 id={`unionPayCard/${i}`}
                                 name={`unionPayCard/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <th className="desc-text">Humo</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.humoCard}
                               type="number"
                               id="humoCard"
                               name="humoCard"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={this.state.humoP[i]}
                                 type="number"
                                 id={`humoCard/${i}`}
                                 name={`humoCard/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
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
                    <th key={item.id} width="15%">{item.name.slice(0, 7)}</th>
                  ) : ''}
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <th className="desc-text">ARTIX UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.artixUzs}
                               type="number"
                               id="artixUzs"
                               name="artixUzs"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={0.00}
                                 type="number"
                                 id={`artixUzs/${i}`}
                                 name={`artixUzs/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <th className="desc-text">ARTIX UZK</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.artixUzk}
                               type="number"
                               id="artixUzk"
                               name="artixUzk"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={0.00}
                                 type="number"
                                 id={`artixUzk/${i}`}
                                 name={`artixUzk/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Расход UZS (возврат)</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.artixReturn}
                               type="number"
                               id="artixReturn"
                               name="artixReturn"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={0.00}
                                 type="number"
                                 id={`artixReturn/${i}`}
                                 name={`artixReturn/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
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
                    <th key={item.id} width="15%">{item.name.slice(0, 7)}</th>
                  ) : ''}
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <th className="desc-text">Накоп.сдачи/недоздача</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.accumFail}
                               type="number"
                               id="accumFail"
                               name="accumFail"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 type="number"
                                 id={`accumFail/${i}`}
                                 name={`accumFail/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                                 readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <th className="desc-text">Разница - UZS</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={''}
                               type="number"
                               id="differUzs"
                               name="differUzs"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={''}
                                 type="number"
                                 id={`differUzs/${i}`}
                                 name={`differUzs/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                                 readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Разница - UZK</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={''}
                               type="number"
                               id="differUzk"
                               name="differUzk"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={''}
                                 type="number"
                                 id={`differUzk/${i}`}
                                 name={`differUzk/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                                 readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <th className="desc-text">ИНКАССА</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right font-weight-bolder bg-info"
                               value={''}
                               type="number"
                               id="collectMoney"
                               name="collectMoney"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={''}
                                 type="number"
                                 id={`collectMoney/${i}`}
                                 name={`collectMoney/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                                 readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <th className="desc-text">Сальдо на конец</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={''}
                               type="number"
                               id="artixReturn"
                               name="artixReturn"
                               placeholder="0.00"
                               readOnly
                      />
                    </AvGroup>
                  </td>
                  {currentCashDesks ? currentCashDesks.map((item, i) =>
                    <td key={item.id}>
                      <AvGroup className="input-field">
                        <AvInput className="text-right"
                                 value={''}
                                 type="number"
                                 id={`artixReturn/${i}`}
                                 name={`artixReturn/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={this.handleChange}
                                 readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
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
