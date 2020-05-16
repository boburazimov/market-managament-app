import React from 'react';
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

const BalanceModal = (props) => {

  const {currentItem, showModal, openModal, addBalance} = props;

  return (
    <div>
      <Modal isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addBalance}>
          <ModalHeader toggle={openModal}>Баланс{currentItem ? ' *' : ''}</ModalHeader>
          <ModalBody>
            <AvGroup>
              <Label for="currencyInput">Остаток</Label>
              {/*<CurrencyInput className="input-group currencyInput" type="text" name="balance" id="name">*/}
              <AvInput type="number" id="currencyInput" name="balanceValue"
                       value={currentItem ? currentItem.balanceValue : ''} required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="name">Комментарии</Label>
              <AvInput type="textarea" style={{height: '100px'}} name="extraInfo" value={currentItem ? currentItem.extraInfo : ''}
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

export default BalanceModal;
