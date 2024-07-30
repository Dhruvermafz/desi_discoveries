import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Tabs,
  Tab,
} from "react-bootstrap";

const CategoriesTags = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");
  const [key, setKey] = useState("categories");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  return (
    <Container className="mt-4">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="categories" title="Categories">
          <Row>
            <Col md={12}>
              <h2>Manage Categories</h2>
              <Form.Group controlId="newCategory">
                <Form.Label>Add New Category</Form.Label>
                <Form.Control
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-2" onClick={handleAddCategory}>
                Add Category
              </Button>

              <h3 className="mt-4">Categories List</h3>
              <ListGroup>
                {categories.map((category, index) => (
                  <ListGroup.Item key={index}>{category}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="tags" title="Tags">
          <Row>
            <Col md={12}>
              <h2>Manage Tags</h2>
              <Form.Group controlId="newTag">
                <Form.Label>Add New Tag</Form.Label>
                <Form.Control
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-2" onClick={handleAddTag}>
                Add Tag
              </Button>

              <h3 className="mt-4">Tags List</h3>
              <ListGroup>
                {tags.map((tag, index) => (
                  <ListGroup.Item key={index}>{tag}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CategoriesTags;
