import React, { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import GalleryCreate from './GalleryCreate';
import GalleryEdit from './GalleryEdit';
import GalleryTable from './GalleryTable';

export default function Index({ gallery }) {

  // state
  const [addGalleryModal, setAddGalleryModal] = useState(false);
  const [editGalleryModal, setEditGalleryModal] = useState(false);

  // modal handle
  const addGalleryModalHandle = () => {
    setAddGalleryModal(true);
  }

  return (
    <Col md={9}>
      <div className="right-area px-4 py-3">
        <Row>
          <Col md={6}>
            <h4 className="mb-4">Gallery</h4>
          </Col>
          <Col>
            <p className="text-md-end text-center">
              <button className="btn bg-success btn-success table-btn" onClick={addGalleryModalHandle}>Add new place</button>
            </p>
          </Col>
        </Row>
        <GalleryTable gallery={ gallery } setEditGalleryModal={ setEditGalleryModal } />

        {/* modal */}
        {addGalleryModal && <GalleryCreate addGalleryModal={ addGalleryModal } setAddGalleryModal={ setAddGalleryModal } />}
        {editGalleryModal && <GalleryEdit editGalleryModal={ editGalleryModal } setEditGalleryModal={ setEditGalleryModal } />}

      </div>
    </Col>
  )
}
