import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";

const ModalConfirmLogout = ({ handleLogout, openModal, setOpenModal }) => {
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Logout Konfirmasi</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 text-center">
            <p>Apakah anda yakin ingin keluar ?</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-4">
          <Button
            onClick={() => {
              handleLogout();
              setOpenModal(false);
            }}
          >
            Ya
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirmLogout;
