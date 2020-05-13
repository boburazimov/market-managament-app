import React from 'react';
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvFeedback, AvForm, AvGroup, AvInput, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";

const PayTypeModal = (props) => {

  const {currentItem, showModal, openModal, addPayType, methodEnums, defaultValue} = props;

  return (
    <div>
      <Modal isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addPayType} model={defaultValue}>
          <ModalHeader toggle={openModal}>Баланс{currentItem ? ' *' : ''}</ModalHeader>
          <ModalBody>
            <AvRadioGroup inline name="methodEnum" label="Метод оплаты" errorMessage="Метод не выбран!" required>
              {methodEnums ? methodEnums.map((item, i) =>
                <AvRadio key={i} customInput label={item} value={item}/>
              ) : ''}
            </AvRadioGroup>
            <AvGroup>
              <Label for="name">Вид оплаты</Label>
              <AvInput type="text" id="name" name="name"
                       required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
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

export default PayTypeModal;
