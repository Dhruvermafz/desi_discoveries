import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import toast from "react-hot-toast";
import "./blogcreate.css";

const BlogCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [metaFields, setMetaFields] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);

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
      published: true,
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
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("excerpt", values.excerpt);
        formData.append("content", values.content);
        formData.append("categories", values.categories);
        formData.append("tags", values.tags);
        formData.append("featured", isFeatured);
        formData.append("permalink", values.permalink);
        formData.append("metaTitle", values.metaTitle);
        formData.append("metaDescription", values.metaDescription);
        formData.append("published", values.published);

        if (bannerImage) formData.append("bannerImage", bannerImage);

        // Append dynamic paragraphs
        paragraphs.forEach((para, index) => {
          formData.append(`para${index}Content`, para.content);
          if (para.image) formData.append(`para${index}Image`, para.image);
        });

        // Append dynamic meta fields
        metaFields.forEach((field, index) => {
          formData.append(`metaTag${index}`, field.tag);
          formData.append(`metaAttribute${index}`, field.attribute);
        });

        const { data } = await axios.post(
          "http://localhost:4000/api/v1/blog/",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success(data.message);
        navigate("/admin/blogs");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    },
  });

  const handleBannerImagePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImagePreview(reader.result);
      setBannerImage(file);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleImagePreview = (index) => (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setParagraphs((prevParagraphs) => {
        const newParagraphs = [...prevParagraphs];
        newParagraphs[index] = {
          ...newParagraphs[index],
          imagePreview: reader.result,
          image: file,
        };
        return newParagraphs;
      });
    };
    if (file) reader.readAsDataURL(file);
  };

  const addParagraph = () => {
    setParagraphs([
      ...paragraphs,
      { content: "", image: null, imagePreview: "" },
    ]);
  };

  const removeParagraph = (index) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  const addMetaField = () => {
    setMetaFields([...metaFields, { tag: "", attribute: "" }]);
  };

  const removeMetaField = (index) => {
    setMetaFields(metaFields.filter((_, i) => i !== index));
  };

  const handleMetaFieldChange = (index, field, value) => {
    setMetaFields((prevMetaFields) =>
      prevMetaFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>Create New Blog</h2>

          {/* Banner Image Field */}
          <Form.Group controlId="bannerImage" className="mt-3">
            <Form.Label>Banner Image</Form.Label>
            <img
              src={bannerImagePreview || "/imgPL.webp"}
              alt="Banner Preview"
              style={{ width: "100%", height: "auto" }}
            />
            <Form.Control type="file" onChange={handleBannerImagePreview} />
          </Form.Group>

          {/* Title Field */}
          <Form.Group controlId="title" className="mt-3">
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

          {/* Content Field */}
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

          {/* Dynamic Paragraphs */}
          {paragraphs.map((para, index) => (
            <div key={index}>
              <Form.Group controlId={`para${index}Content`} className="mt-3">
                <Form.Label>Paragraph {index} Content</Form.Label>
                <ReactQuill
                  value={para.content}
                  onChange={(value) => {
                    setParagraphs((prev) =>
                      prev.map((p, i) =>
                        i === index ? { ...p, content: value } : p
                      )
                    );
                  }}
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
              </Form.Group>

              <Form.Group controlId={`para${index}Image`} className="mt-3">
                <Form.Label>Paragraph {index} Image</Form.Label>
                <img
                  src={para.imagePreview || "/imgPL.webp"}
                  alt={`Paragraph ${index} Preview`}
                  style={{ width: "100%", height: "auto" }}
                />
                <Form.Control
                  type="file"
                  onChange={handleImagePreview(index)}
                />
              </Form.Group>

              <Button
                variant="danger"
                className="mt-2"
                onClick={() => removeParagraph(index)}
              >
                Remove Paragraph
              </Button>
            </div>
          ))}

          <Button variant="secondary" className="mt-3" onClick={addParagraph}>
            Add Paragraph
          </Button>

          {/* Dynamic Meta Fields */}
          {metaFields.map((field, index) => (
            <div key={index}>
              <Form.Group controlId={`metaTag${index}`} className="mt-3">
                <Form.Label>Meta Tag {index}</Form.Label>
                <Form.Control
                  type="text"
                  value={field.tag}
                  onChange={(e) =>
                    handleMetaFieldChange(index, "tag", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group controlId={`metaAttribute${index}`} className="mt-3">
                <Form.Label>Meta Attribute {index}</Form.Label>
                <Form.Control
                  type="text"
                  value={field.attribute}
                  onChange={(e) =>
                    handleMetaFieldChange(index, "attribute", e.target.value)
                  }
                />
              </Form.Group>

              <Button
                variant="danger"
                className="mt-2"
                onClick={() => removeMetaField(index)}
              >
                Remove Meta Field
              </Button>
            </div>
          ))}

          <Button variant="secondary" className="mt-3" onClick={addMetaField}>
            Add Meta Field
          </Button>
        </Col>

        <Col md={4}>
          {/* Other Sidebar Fields */}
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

          <Form.Group controlId="featured" className="mt-3">
            <Form.Check
              type="checkbox"
              name="featured"
              label="Featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="permalink" className="mt-3">
            <Form.Label>Permalink</Form.Label>
            <Form.Control
              type="text"
              name="permalink"
              value={formik.values.permalink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.permalink && !!formik.errors.permalink}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.permalink}
            </Form.Control.Feedback>
          </Form.Group>

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

          <Form.Group controlId="published" className="mt-3">
            <Form.Check
              type="checkbox"
              name="published"
              label="Published"
              checked={formik.values.published}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.published && !!formik.errors.published}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.published}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-4"
            onClick={formik.handleSubmit}
          >
            Create Blog
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogCreate;
