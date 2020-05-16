import React from 'react';
import {Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

const CashDeskModal = (props) => {

  const {currentItem, showModal, openModal, addCashDesk, defaultValue, statusEnums, magazines, balances} = props;

  return (
    <div>
      <Modal className="modal-md" isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addCashDesk} model={defaultValue}>
          <ModalHeader toggle={openModal}>Касса ККМ{currentItem ? ' *' : ''}</ModalHeader>
          <ModalBody>
            <AvGroup>
              <Label for="name">Наименование кассы ККМ</Label>
              <AvInput type="text" id="name" name="name" placeholder="Введите название кассы..."
                       required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
            <Row>
              <Col xs="12" sm="6">
                <AvGroup>
                  <Label for="externalCode">Внешний код</Label>
                  <AvInput type="text" id="externalCode" name="externalCode" placeholder="Введите код..."
                           required/>
                  <AvFeedback>Поля не заполнено!</AvFeedback>
                </AvGroup>
              </Col>
              <Col xs="12" sm="6">
                <AvGroup>
                  <Label for="statusEnum">Статус</Label>
                  <AvInput type="select" name="statusEnum" required>
                    <option value="0">Выберите статус</option>
                    {statusEnums ? statusEnums.map((item, i) =>
                      <option key={i} label={item === "ACTIVE" ? "Действует" : item === "INACTIVE" ? "Закрыто" : ""}
                              value={item}/>
                    ) : ''}
                  </AvInput>
                  <AvFeedback>Статус не выбран!</AvFeedback>
                </AvGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="8">
                <AvGroup>
                  <Label for="magazineId">Маркет</Label>
                  <AvInput type="select" name="magazineId" required>
                    <option value="0">Выберите маркет</option>
                    {magazines ? magazines.map(item =>
                      <option key={item.id} label={item ? item.name : ""} value={item.id}/>
                    ) : ''}
                  </AvInput>
                  <AvFeedback>Маркет не выбран!</AvFeedback>
                </AvGroup>
              </Col>
              <Col xs="12" sm="4">
                <AvGroup>
                  <Label for="mBalanceId">Баланс</Label>
                  <AvInput type="select" name="mBalanceId" required>
                    <option value="0">Выбрать</option>
                    {balances ? balances.map(item =>
                      <option key={item.id} label={item ? item.balanceValue : ""} value={item.id}/>
                    ) : ''}
                  </AvInput>
                  <AvFeedback>Баланс не выбран!</AvFeedback>
                </AvGroup>
              </Col>
            </Row>
            <AvGroup>
              <Label for="extraInfo">Комментарии</Label>
              <AvInput type="textarea" style={{height: '100px'}} name="extraInfo"
                       placeholder="Введите дополнительную информацию..."/>
            </AvGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-warning" type="button" color="secondary" onClick={openModal}>Cancel</Button>{' '}
            <Button className="btn btn-success" color="primary">{currentItem ? 'Edit' : 'Save'}</Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    </div>
  );
};

export default CashDeskModal;
