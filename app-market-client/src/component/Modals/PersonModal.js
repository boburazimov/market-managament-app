import React from 'react';
import {AvField, AvForm, AvInput} from "availity-reactstrap-validation";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const PersonModal = (props) => {
  const {
    showModal,
    addCompany,
    currentItem,
    openModal,
  } = props;

  return (
    <div>
      <Modal isOpen={showModal} toggle={openModal} centered>
        <AvForm onValidSubmit={addCompany}>
          <ModalHeader toggle={openModal}>Company</ModalHeader>
          <ModalBody>
            <AvField name="fullName" label="Full-Name" defaultValue={currentItem.fullName}
                     placeholder="Enter the name" required/>
            <AvField name="address" label="Address" defaultValue={currentItem.address}
                     placeholder="Enter the address"/>
            <AvField name="bankName" label="Bank name" defaultValue={currentItem.bankName}
                     placeholder="Enter the Bank name"/>
            <AvField name="mfo" label="MFO" defaultValue={currentItem.mfo} placeholder="Enter the MFO"/>
            <AvField name="inn" label="INN" defaultValue={currentItem.inn} placeholder="Enter the INN"/>
            <AvField name="accountNumber" label="Account number" defaultValue={currentItem.accountNumber}
                     placeholder="Enter the Account number"/>
            <AvField type="textarea" style={{height: '100px'}} name="extraInfo" label="Extra Info" defaultValue={currentItem.extraInfo}
                     placeholder="Enter the Extra Info"/>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={openModal}>Cancel</Button>{' '}
            <Button color="primary">Save</Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    </div>
  );
};

export default PersonModal;
