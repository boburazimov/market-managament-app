import React from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const MagazineModal = (props) => {
  const {
    showModal,
    addMagazine,
    currentItem,
    openModal,
    users
  } = props;

  return (
    <div>
      <Modal isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addMagazine}>
          <ModalHeader toggle={openModal}>Magazine</ModalHeader>
          <ModalBody>
            <AvField name="externalCode" label="Code " value={currentItem ? currentItem.externalCode : ''}
                     placeholder="External Code" required/>
            <AvField name="name" label="Name" value={currentItem ? currentItem.name : ''}
                     placeholder="Enter the name"/>
            <AvField name="userId" type="select" label="Administrator"
                     value={currentItem ? currentItem.userId : ''}
                     required>
              <option value="0">Select Admin</option>
              {users ? users.map(item =>
                <option key={item.id} value={item.id}>{item.phoneNumber}</option>
              ) : ''}
            </AvField>
            <AvField type="textarea" style={{height: '100px'}} name="extraInfo" label="Extra Info"
                     value={currentItem ? currentItem.extraInfo : ''}
                     placeholder="Enter the Extra Info"/>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={openModal}>Cancel</Button>{' '}
            <Button color="primary">{currentItem ? 'Edit' : 'Save'}</Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    </div>
  );
};

export default MagazineModal;
