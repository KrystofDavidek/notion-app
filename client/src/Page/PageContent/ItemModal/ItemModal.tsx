import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Item } from "../../../models/Item";
import { BsThreeDotsVertical } from "react-icons/bs";
import dayjs from "dayjs";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./ItemModal.css";
import { AddNoteItem } from "../AddNoteItem/AddNoteItem";

export const ItemModal: React.FC<{ item: Item; onDelete: any; addImage: any }> = ({ item, onDelete, addImage }) => {
  const [show, setShow] = useState(false);
  const [urlInputShow, setUrlInputShow] = useState(false);
  const [url, setUrl] = useState("");

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

  const showImageUrlInput = () => {
    urlInputShow ? setUrlInputShow(false) : setUrlInputShow(true);
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addImage(url, item._id);
  }

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
          {/* <p>
            <span className="modal__bold-text">Modified by:</span> {item}
          </p> */}
        </Modal.Body>
        <Modal.Footer className="modal__footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={showImageUrlInput}>
            Import image
          </Button>
          {urlInputShow ?
            <form className="modal__image-url-form modal-form" onSubmit={handleUrlSubmit}>
              <label htmlFor="imageURL" className="modal-form__label">URL: </label>
              <input id="imageURL" className="modal-form__input" type="text" placeholder="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png" onChange={handleUrlChange}></input>
              <input type="submit" value="UPLOAD"></input>
            </form> : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};
