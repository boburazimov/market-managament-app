import React, {Component} from 'react';
import {Button, Col, Container, Label, Row, Table} from "reactstrap";
import {connect} from "dva";
import {AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

@connect(({app}) => ({app}))
class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startSaldo:0,
      totalClearUzs: '',
      calculateValues: [
        // {
        //   id: 1, startBalance1: 5000, clearUzs1: 0, clearUzk1: 0, onlineCard1: 0, unionPayCard1: 0, humoCard1: 0,
        //   artixUzs1: 0, accumFail1: 0, artixUzk1: 0, artixReturn1: 0, differUzs1: 0, differUzk1: 0, collectMoney1: 0,
        //   endBalance1: 0
        // },
        // {
        //   id: 2, startBalance2: 0, clearUzs2: 0, clearUzk2: 0, onlineCard2: 0, unionPayCard2: 0, humoCard2: 0,
        //   artixUzs2: 0, accumFail2: 0, artixUzk2: 0, artixReturn2: 0, differUzs2: 0, differUzk2: 0, collectMoney2: 0,
        //   endBalance2: 0
        // },
        // {
        //   id: 3, startBalance3: 0, clearUzs3: 0, clearUzk3: 0, onlineCard3: 0, unionPayCard3: 0, humoCard3: 0,
        //   artixUzs3: 0, accumFail3: 0, artixUzk3: 0, artixReturn3: 0, differUzs3: 0, differUzk3: 0, collectMoney3: 0,
        //   endBalance3: 0
        // }
      ],
      checkOuts: [
        // {
        //   id: 1, onlineCard1: 0, unionPayCard1: 0, humoCard1: 0, accumFail1: 0, differUzk1: 0, collectMoney1: 0,
        //   endBalance1: 0
        // },
        // {
        //   id: 2, onlineCard2: 0, unionPayCard2: 0, humoCard2: 0, accumFail2: 0, differUzk2: 0, collectMoney2: 0,
        //   endBalance2: 0
        // },
        // {
        //   id: 3, onlineCard3: 0, unionPayCard3: 0, humoCard3: 0, accumFail3: 0, differUzk3: 0, collectMoney3: 0,
        //   endBalance3: 0
        // }
      ],
      returnCheck: [],
      result:{
        clearUzs: 0,
        clearUzk: 0,
        onlineCard: 0,
        unionPayCard: 0,
        humoCard: 0,
        totalFail: 0,
      },
      onlineP:[],
      humoP:[],
      paymeP:[],
      clearUzkP:[]
    }

    this.handleChange = this.handleChange.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
  }

  componentDidMount() {
    const {app} = this.props;
    const {currentCashDesks} = app;

    let onlineP = [], humoP = [], paymeP = [], clearUzkP=[];
    for (let i = 0; i < currentCashDesks.length; i++) {
      onlineP[i]=0.0;
      humoP[i]=0.00;
      paymeP[i]=0.00;
      clearUzkP[i]=0.00;
    }

    this.setState({
      onlineP,
      humoP,
      paymeP,
      clearUzkP
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onBlurHandler(e, v) {
    // console.log(e.target.id);
    // console.log(v);

  }

  render() {

    const validateProps = {
      required: {value: true},
      number: true,
      maxLength: {value: 11},
    };

    const {app} = this.props;
    const {currentCashDesks, currentUser} = app;

    const onHandleSubmit = (e, v) => {
    };

    const onChangeFields = (e) => {
      let val = 0;
      let name = e.target.name.split('/')[0];
      let index = e.target.name.split('/')[1];
      for (let i = 0; i < currentCashDesks.length; i++){
        console.log(document.getElementsByName(name + '/' + i)[0].value);
        console.log(typeof document.getElementsByName(name + '/' + i)[0].value);
        if(document.getElementsByName(name+'/'+i)[0].value === '')
          document.getElementsByName(name+'/'+i)[0].value=0.00;
        val+=parseFloat(document.getElementsByName(name+'/'+i)[0].value);
      }
      console.log(val);
      console.log(name);
      let oldResult=this.state.result;
      oldResult[name] = val;

      let clearUzkP = this.state.clearUzkP;  //onlineCard, unionPayCard, humoCard
      let onlineP = this.state.onlineP;  //onlineCard, unionPayCard, humoCard
      let humoP = this.state.humoP;  //onlineCard, unionPayCard, humoCard
      let paymeP = this.state.paymeP;  //onlineCard, unionPayCard, humoCard


      if(name.startsWith('onlineCard')){
        onlineP[index] = parseFloat(document.getElementsByName(name+'/'+index)[0].value);
      } else if(name.startsWith('unionPayCard')){
        paymeP[index] = parseFloat(document.getElementsByName(name+'/'+index)[0].value);
      } else if(name.startsWith('humoCard')){
        humoP[index] = parseFloat(document.getElementsByName(name+'/'+index)[0].value);
      }

      let clearUzk = 0; //Nurbek +94 669 6195

      for (let i = 0; i < currentCashDesks.length; i++){
        clearUzkP[i] = (onlineP[i] ? onlineP[i] : 0) +(paymeP[i] ? paymeP[i] : 0)+(humoP[i] ? humoP[i] : 0);
        clearUzk += clearUzkP[i];
      }

      oldResult.clearUzk = clearUzk;

      this.setState({
        result: oldResult,
        onlineP,
        humoP,
        paymeP,
        clearUzkP
      })
      //document.getElementsByName(name)[0].value=val;
    }

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
              <h4
                className="form-control">{currentCashDesks ? currentCashDesks.slice(0,1).magazineName : ''}</h4>
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
              <AvForm onValidSubmit={onHandleSubmit} defaultValue={new Date()}>
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
                      <AvInput value={currentCashDesks ? currentCashDesks.reduce((a, b) => a+b.balanceValue, 0): 0}
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
                                 onChange={onChangeFields}
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
                                 onChange={onChangeFields}
                                 readOnly
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">3</th>
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
                                 onChange={onChangeFields}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">3</th>
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
                                 value={this.state.paymeP[i]}
                                 type="number"
                                 id={`unionPayCard/${i}`}
                                 name={`unionPayCard/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={onChangeFields}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">3</th>
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
                                 onChange={onChangeFields}
                        />
                      </AvGroup>
                    </td>
                  ) : ''}
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Накоп.сдачи/недоздача</th>
                  <td>
                    <AvGroup className="input-field">
                      <AvInput className="text-right"
                               value={this.state.result.totalFail}
                               type="number"
                               id="totalFail"
                               name="totalFail"
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
                                 id={`totalFail/${i}`}
                                 name={`totalFail/${i}`}
                                 placeholder="0.00"
                                 onBlur={this.onBlurHandler}
                                 onChange={onChangeFields}
                                 readOnly
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
                    <th key={item.id} width="15%">{item.name.slice(0, 14)}</th>
                  ) : ''}
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <th className="desc-text">ARTIX UZS</th>
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
                  <th className="desc-text">ARTIX UZK</th>
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
