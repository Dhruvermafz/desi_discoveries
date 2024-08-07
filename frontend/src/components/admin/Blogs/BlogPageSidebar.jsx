import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  ListGroup,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { FaCompress } from "react-icons/fa"; // Compressor icon from react-icons

const BlogPageSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'addCategory', 'editCategory', 'addTag', 'editTag'
  const [modalData, setModalData] = useState({ name: "", id: "" });

  useEffect(() => {
    // Fetch categories and tags
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/categories`),
          axios.get(`${BASE_URL}/tags`),
        ]);
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (err) {
        console.error("Error fetching categories or tags:", err);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = (type, data = { name: "", id: "" }) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData({ name: "", id: "" });
  };

  const handleAdd = async () => {
    try {
      const { name } = modalData;
      if (modalType === "addCategory") {
        await axios.post(`${BASE_URL}/categories`, { name });
        setCategories([...categories, { name }]);
      } else if (modalType === "addTag") {
        await axios.post(`${BASE_URL}/tags`, { name });
        setTags([...tags, { name }]);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleEdit = async () => {
    try {
      const { name, id } = modalData;
      if (modalType === "editCategory") {
        await axios.put(`${BASE_URL}/categories/${id}`, { name });
        setCategories(
          categories.map((cat) => (cat.id === id ? { ...cat, name } : cat))
        );
      } else if (modalType === "editTag") {
        await axios.put(`${BASE_URL}/tags/${id}`, { name });
        setTags(tags.map((tag) => (tag.id === id ? { ...tag, name } : tag)));
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error editing item:", err);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === "category") {
        await axios.delete(`${BASE_URL}/categories/${id}`);
        setCategories(categories.filter((cat) => cat.id !== id));
      } else if (type === "tag") {
        await axios.delete(`${BASE_URL}/tags/${id}`);
        setTags(tags.filter((tag) => tag.id !== id));
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <Container className="sidebar">
      <Col>
        {/* Categories Row */}
        <Row className="mb-3 align-items-center">
          <Col>
            <h4>Categories</h4>
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={() => handleShowModal("addCategory")}
            >
              Add Category
            </Button>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="scrollable-list">
            <ListGroup>
              {categories.map((category) => (
                <ListGroup.Item key={category.id}>
                  {category.name}
                  <Button
                    variant="link"
                    onClick={() => handleShowModal("editCategory", category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => handleDelete("category", category.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>

        {/* Tags Row */}
        <Row className="mb-3 align-items-center">
          <Col>
            <h4>Tags</h4>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={() => handleShowModal("addTag")}>
              Add Tag
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="scrollable-list">
            <ListGroup>
              {tags.map((tag) => (
                <ListGroup.Item key={tag.id}>
                  {tag.name}
                  <Button
                    variant="link"
                    onClick={() => handleShowModal("editTag", tag)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => handleDelete("tag", tag.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Col>

      {/* Modal for adding/editing categories and tags */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType.includes("add")
              ? `Add ${modalType.split("add")[1]}`
              : `Edit ${modalType.split("edit")[1]}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={modalData.name}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={modalType.includes("add") ? handleAdd : handleEdit}
          >
            {modalType.includes("add") ? "Add" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BlogPageSidebar;
