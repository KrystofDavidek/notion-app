import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Item } from "../../../models/Item";
import dayjs from "dayjs";
import "./ItemModal.css";

export const ItemModal: React.FC<{ item: Item; onDelete: any }> = ({ item, onDelete }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    setShow(false);
    onDelete(item._id);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Settings
      </Button>

      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <span className="modal__bold-text">Label:</span> {item.label}
          </p>
          <p>
            <span className="modal__bold-text">Created:</span> {dayjs(item.created_at).format("DD/MM/YYYY")}
          </p>
          <p>
            <span className="modal__bold-text">Last modificated: </span>
            {item.modified_at ? dayjs(item.modified_at).format("DD/MM/YYYY") : "Note was not modificated yet"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
