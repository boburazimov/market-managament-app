import React from 'react';
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvFeedback, AvForm, AvGroup, AvInput, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";

const CashDeskModal = (props) => {

  const {currentItem, showModal, openModal, addCashDesk, currencies, defaultValue} = props;

  return (
    <div>
      <Modal isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addCashDesk} model={defaultValue}>
          <ModalHeader toggle={openModal}>Касса{currentItem ? ' *' : ''}</ModalHeader>
          <ModalBody>
            <AvGroup>
              <Label for="name">Внешний код</Label>
              <AvInput type="text" id="name" name="externalCode"
                       required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="name">Название кассы</Label>
              <AvInput type="text" id="name" name="name"
                       required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
            <AvRadioGroup inline name="currency" label="Валюта" errorMessage="Валюта не выбрана!" required>
              {currencies ? currencies.map(item =>
                <AvRadio key={item.id} customInput label={item.symbolCode} value={`/${item.id}`}/>
              ) : ''}
            </AvRadioGroup>
            <AvGroup>
              <Label for="name">Комментарии</Label>
              <AvInput type="textarea" name="extraInfo"
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
