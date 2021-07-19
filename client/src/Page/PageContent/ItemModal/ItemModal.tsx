import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Item } from "../../../models/Item";
import { BsThreeDotsVertical } from "react-icons/bs";
import dayjs from "dayjs";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./ItemModal.css";

export const ItemModal: React.FC<{ item: Item; onDelete: any }> = ({ item, onDelete }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    setShow(false);
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this note?",
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(item._id),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  return (
    <>
      <BsThreeDotsVertical className="modal__dots" onClick={handleShow} />
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header className="modal__header" closeButton>
          <Modal.Title>{item.text}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
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
        <Modal.Footer className="modal__footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
