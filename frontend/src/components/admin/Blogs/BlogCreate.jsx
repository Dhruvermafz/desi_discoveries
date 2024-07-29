import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup"; // Ensure Yup is imported for validation
import { createBlog } from "../../../redux/actions/blogActions"; // Import the createBlog action
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../../../styles/BlogDetails.css";
const BlogCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize Formik for form state management
  const formik = useFormik({
    initialValues: {
      title: "",
      excerpt: "",
      content: "",
      categories: "",
      tags: "",
      featured: false,
      permalink: "",
      metaTitle: "",
      metaDescription: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      excerpt: Yup.string()
        .required("Excerpt is required")
        .max(250, "Excerpt cannot exceed 250 characters"),
      content: Yup.string().required("Content is required"),
      categories: Yup.string(),
      tags: Yup.string(),
      featured: Yup.boolean(),
      permalink: Yup.string().required("Permalink is required"),
      metaTitle: Yup.string(),
      metaDescription: Yup.string(),
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

          {/* Featured Checkbox */}
          <Form.Group controlId="featured">
            <Form.Check
              type="checkbox"
              label="Mark as Featured"
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

          {/* Content Field with Multiple Text Boxes */}
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

          {/* Tags Field */}
          <Form.Group controlId="tags" className="mt-3">
            <Form.Label>Tags (comma separated)</Form.Label>
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

          {/* Permalink Field */}
          <Form.Group controlId="permalink" className="mt-3">
            <Form.Label>Permalink</Form.Label>
            <Form.Control
              type="text"
              name="permalink"
              placeholder={`/blog/${formik.values.title}`}
              value={formik.values.permalink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.permalink && !!formik.errors.permalink}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.permalink}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Meta Title Field */}
          <Form.Group controlId="metaTitle" className="mt-3">
            <Form.Label>Meta Title</Form.Label>
            <Form.Control
              type="text"
              name="metaTitle"
              value={formik.values.metaTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.metaTitle && !!formik.errors.metaTitle}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.metaTitle}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Meta Description Field */}
          <Form.Group controlId="metaDescription" className="mt-3">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="metaDescription"
              value={formik.values.metaDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.metaDescription &&
                !!formik.errors.metaDescription
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.metaDescription}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="mt-4">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogCreate;
