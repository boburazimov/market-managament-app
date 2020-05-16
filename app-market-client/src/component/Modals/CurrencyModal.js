import React from 'react';
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";

const CurrencyModal = (props) => {

  const {currentItem, showModal, openModal, addCurrency} = props;

  return (
    <div>
      <Modal isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addCurrency}>
          <ModalHeader toggle={openModal}>Валюта{currentItem? ' *' : ''}</ModalHeader>
          <ModalBody>
            <AvGroup>
              <Label for="name">Наименование</Label>
              <AvInput name="fullName" id="name" value={currentItem ? currentItem.fullName : ''}
                       placeholder="Enter the name..." required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="name">Симв. код</Label>
              <AvInput name="symbolCode" id="name" value={currentItem ? currentItem.symbolCode : ''}
                       placeholder="Enter the code..." required/>
              <AvFeedback>Поля не заполнено!</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="name">Комментарии</Label>
              <AvInput type="textarea" style={{height: '100px'}} name="extraInfo" value={currentItem ? currentItem.extraInfo : ''}
                       placeholder="Enter the comment..."/>
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

export default CurrencyModal;
