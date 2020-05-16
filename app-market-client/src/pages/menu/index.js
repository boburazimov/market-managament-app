import React, {Component} from 'react';
import {Button, Col, Container, Label, Row, Table} from "reactstrap";
import {connect} from "dva";
import {AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

@connect(({app}) => ({app}))
class Index extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'app/getUser'});
    dispatch({type: 'app/getCashDesks'});
  }

  render() {

    const validateProps = {
      required: {value: true},
      number: true,
      maxLength: {value: 11},

    };

    const {dispatch, app} = this.props;
    const {user, cashDesks} = app;

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
              <Table className="table mb-0" bordered hover={true}>
                {/*КАССИР БЛОК - Начало*/}
                <thead className="thead-default">
                <tr>
                  <th width="1%">#</th>
                  <th width="25%" className="headTitle">КАССИР</th>
                  <th width="15%">Итоги</th>
                  <th width="15%">Касса ККМ 1501</th>
                  <th width="15%">Касса ККМ 1501</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td className="desc-text">Сальдо на начало</td>
                  <AvGroup className="input-field">
                    <AvInput type="number" validate={validateProps} id="externalCode" name="externalCode"
                             placeholder="0.00"/>
                  </AvGroup>
                  <AvGroup className="input-field">
                    <AvInput type="number" validate={validateProps} id="externalCode" name="externalCode"
                             placeholder="0.00"/>
                  </AvGroup>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className="desc-text">Чистый UZ</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Чистый за день UZS</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">ONLINE карта</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">UnionPay</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Humo</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Накоп.сдачи/недоздача</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td></td>
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
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Расход UZS (возврат)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Расход UZK (возврат)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">UnionPay</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZS</th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZK</th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td></td>
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
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">СВЕРКА КАССА</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">ИНКАССА</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="desc-text">Сальдо на конец</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZS</th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="desc-text">Чистая выручка UZK</th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th className="text-right desc-text">ИТОГО:</th>
                  <td></td>
                  <td></td>
                  <td></td>
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

// <Col className="col-sm-12 col-md-3">Итого</Col>
// {cashDesks ? cashDesks.map(item =>
//   <Col className="col-sm-12 col-md-3" key={item.id} value={item.id}>{item.name}</Col>
// ) : ''}

export default Index;
