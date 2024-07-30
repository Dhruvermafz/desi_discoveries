import React from 'react';
import { Table } from "react-bootstrap";

// icons
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

export default function GalleryTable({ gallery, setEditGalleryModal }) {

  // edit modal show
  const editModalHandle = (e) => {
    e.preventDefault();
    setEditGalleryModal(true);
  }

    // delete
    const handleDelete = () => {
      alert("You have no permission to delete video item!");
    }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Img</th>
        </tr>
      </thead>
      <tbody>
        { gallery && gallery.map((galleryItem) => (
          <tr key={galleryItem.id}>
            <td>{ galleryItem.id }</td>
            <td>{ galleryItem.location }</td>
            <td><img src={ galleryItem.img } alt="galley img" width="100" height="auto" /></td>
            <td>
              <a href="#edit" onClick={editModalHandle}>
                <AiFillEdit className='text-warning me-3' />
              </a>
              <a href="#delete" onClick={handleDelete}>
                <AiOutlineDelete className='text-danger' />
              </a>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
  )
}
