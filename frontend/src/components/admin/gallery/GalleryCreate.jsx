import React from 'react';
import { Form, Modal, Button } from "react-bootstrap";

export default function GalleryCreate({ addGalleryModal, setAddGalleryModal }) {

  // close modal
  const handleClose = () => {
    setAddGalleryModal(false);
  }

    // after form submit
    const handleSubmit = () => {
      setAddGalleryModal(false);
      alert("You have no permission to create gallery item!");
    }

  return (
  <Modal show={addGalleryModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new gallery item</Modal.Title>
      </Modal.Header>
      <div className="modal-body">
        <Form>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Place location</Form.Label>
            <Form.Control type="text" placeholder="Enter place location" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="img">
            <Form.Label>Place image</Form.Label>
            <Form.Control type="file" placeholder="Select image file" />
          </Form.Group>
        </Form>
      </div>
      <Modal.Footer>
        <Button className='btn bg-danger btn-danger' onClick={handleClose}>
          Close
        </Button>
        <Button className='btn bg-success btn-success' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
