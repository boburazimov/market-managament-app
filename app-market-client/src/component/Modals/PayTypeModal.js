import React from 'react';
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

const PayTypeModal = (props) => {

  const {currentItem, showModal, openModal, addPayType} = props;

  return (
    <div>
      <Modal isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addPayType}>
          <ModalHeader toggle={openModal}>Баланс{currentItem ? ' *' : ''}</ModalHeader>
          <ModalBody>
            <AvGroup>
              <Label for="currencyInput">Вид оплаты</Label>
              <AvInput type="text" id="currencyInput" name="name"
                       value={currentItem ? currentItem.name : ''} required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="name">Комментарии</Label>
              <AvInput name="extraInfo" value={currentItem ? currentItem.extraInfo : ''}
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

export default PayTypeModal;
