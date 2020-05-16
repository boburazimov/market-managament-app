import React, {Component} from 'react';
import {Col, Container, Label, Row, Table} from "reactstrap";
import {connect} from "dva";
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

@connect(({app}) => ({app}))
class Index extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'app/getUser'});
    dispatch({type: 'app/getCashDesks'});
  }

  render() {

    const {dispatch, app} = this.props;
    const {user, cashDesks} = app;

    const defaultValue = {};

    const onHandleSubmit = (value) => {
      console.log(value);
    };

    return (
      <div className="col-lg-12 col-sm-12">
        <Container className="menuPage">

          <Row className="bg-light border-bottom">
            <Col className="col-sm-12 col-md-6 offset-md-3 text-center">
              <h2>Закрытие кассовой смены</h2>
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
                           required/>
                  <AvFeedback>Выберите дату!</AvFeedback>
                </AvGroup>
              </AvForm>
            </Col>
          </Row>


          <Row className="card-body">
            <AvForm>
              <Table className="table" bordered>
                {/*КАССИР БЛОК - Начало*/}
                <thead className="thead-default">
                <tr>
                  <th width="5px">#</th>
                  <th width="200px" className="headTitle">КАССИР</th>
                  <th width="300px">Итоги</th>
                  <th width="150px">Касса ККМ 1501</th>
                  <th width="150px">Касса ККМ 1501</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td className="desc-text">Сальдо на начало</td>
                  <td><AvField type="number" id="name" name="name" placeholder="0.00"
                               required/></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className="desc-text">Чистый UZ</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Чистый за день UZS</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">ONLINE карта</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">UnionPay</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Humo</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Накоп.сдачи/недоздача</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
                {/*КАССИР БЛОК - Конец*/}

                {/*ARTIX БЛОК - Начало*/}
                <thead className="thead-default">
                <tr>
                  <th width="5px">#</th>
                  <th width="200px" className="headTitle">ARTIX</th>
                  <th width="170px">Итоги</th>
                  <th width="150px">Касса ККМ 1501</th>
                  <th width="150px">Касса ККМ 1501</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td className="desc-text">Приход UZS</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className="desc-text">Приход UZK</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Расход UZS (возврат)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Расход UZK (возврат)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">UnionPay</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZS</th>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZK</th>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
                {/*ARTIX БЛОК - Конец*/}

                {/*СВЕРКА БЛОК - Начало*/}
                <thead className="thead-default">
                <tr>
                  <th width="5px">#</th>
                  <th width="200px" className="headTitle">СВЕРКА</th>
                  <th width="170px">Итоги</th>
                  <th width="150px">Касса ККМ 1501</th>
                  <th width="150px">Касса ККМ 1501</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td className="desc-text">Разница - UZS</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className="desc-text">Разница - UZK</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">СВЕРКА КАССА</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">ИНКАССА</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Сальдо на конец</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZS</th>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZK</th>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
                {/*БЛОК СВЕРКА - Конец*/}
              </Table>
            </AvForm>
          </Row>
        </Container>
      </div>
    );
  }
}

// <Col className="col-sm-12 col-md-3">Итого</Col>
// {cashDesks ? cashDesks.map(item =>
//   <Col className="col-sm-12 col-md-3" key={item.id} value={item.id}>{item.name}</Col>
// ) : ''}

export default Index;
