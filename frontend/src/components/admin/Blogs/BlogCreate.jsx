import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup"; // Ensure Yup is imported for validation
import { createBlog } from "../../../redux/actions/blogActions"; // Import the createBlog action
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const BlogCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize Formik for form state management
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      excerpt: "",
      tags: "",
      categories: "",
      featured: false, // Add the initial value for the featured field
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      excerpt: Yup.string()
        .required("Excerpt is required")
        .max(100, "Excerpt cannot exceed 100 characters"),
      tags: Yup.string(),
      categories: Yup.string(),
      featured: Yup.boolean(), // Add validation for the featured field
    }),
    onSubmit: (values) => {
      // Dispatch createBlog action with form data
      dispatch(createBlog(values));
      navigate("/admin/blogs"); // Navigate to blog list after successful submission
    },
  });

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Create New Blog</h2>
          <Form onSubmit={formik.handleSubmit}>
            {/* Title Field */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.title && !!formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Content Field with React Quill */}
            <Form.Group controlId="content" className="mt-3">
              <Form.Label>Content</Form.Label>
              <ReactQuill
                value={formik.values.content}
                onChange={(value) => formik.setFieldValue("content", value)}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "video",
                ]}
              />
              {formik.touched.content && formik.errors.content && (
                <div className="text-danger mt-1">{formik.errors.content}</div>
              )}
            </Form.Group>

            {/* Excerpt Field */}
            <Form.Group controlId="excerpt" className="mt-3">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="excerpt"
                value={formik.values.excerpt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.excerpt && !!formik.errors.excerpt}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.excerpt}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Tags Field */}
            <Form.Group controlId="tags" className="mt-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.tags && !!formik.errors.tags}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.tags}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Categories Field */}
            <Form.Group controlId="categories" className="mt-3">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                type="text"
                name="categories"
                value={formik.values.categories}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.categories && !!formik.errors.categories
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.categories}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Featured Blog Field */}
            <Form.Group controlId="featured" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Do you consider this blog as featured?"
                name="featured"
                checked={formik.values.featured}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.featured && !!formik.errors.featured}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.featured}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogCreate;
