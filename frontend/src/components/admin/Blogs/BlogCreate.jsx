import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./blogcreate.css";
import { BASE_URL } from "../../../utils/config";

const BlogCreate = () => {
  const dispatch = useDispatch();

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [metaFields, setMetaFields] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [categories, setCategories] = useState([""]);
  const [tags, setTags] = useState([""]);

  const [formValues, setFormValues] = useState({
    title: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, excerpt, content, metaTitle, metaDescription } = formValues;

    if (!title || !excerpt || !content) {
      Swal.fire(
        "Validation Error",
        "Title, excerpt, and content are required.",
        "error"
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("categories", categories.join(","));
      formData.append("tags", tags.join(","));
      formData.append("featured", isFeatured);

      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);

      if (bannerImage) formData.append("bannerImage", bannerImage);

      paragraphs.forEach((para, index) => {
        formData.append(`para${index}Content`, para.content);
        if (para.image) formData.append(`para${index}Image`, para.image);
      });

      metaFields.forEach((field, index) => {
        formData.append(`metaTag${index}`, field.tag);
        formData.append(`metaAttribute${index}`, field.attribute);
      });

      const { data } = await axios.post(`${BASE_URL}/blogs/`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", data.message, "success");

      // Reset form values
      setFormValues({
        title: "",
        excerpt: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
      });
      setBannerImage(null);
      setBannerImagePreview("");
      setParagraphs([]);
      setMetaFields([]);
      setIsFeatured(false);
      setCategories([""]);
      setTags([""]);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
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
              value={formValues.title}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Excerpt Field */}
          <Form.Group controlId="excerpt" className="mt-3">
            <Form.Label>Excerpt</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="excerpt"
              value={formValues.excerpt}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Content Field */}
          <Form.Group controlId="content" className="mt-3">
            <Form.Label>Content</Form.Label>
            <ReactQuill
              value={formValues.content}
              onChange={(value) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  content: value,
                }))
              }
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
              <Button variant="danger" onClick={() => removeParagraph(index)}>
                Remove Paragraph
              </Button>
            </div>
          ))}
          <Button variant="primary" onClick={addParagraph} className="mt-3">
            + Add Paragraph
          </Button>
        </Col>
        <Col>
          {/* Meta Fields */}
          {metaFields.map((meta, index) => (
            <div key={index} className="mt-3">
              <Row>
                <Col>
                  <Form.Group controlId={`metaTag${index}`}>
                    <Form.Label>Meta Tag</Form.Label>
                    <Form.Control
                      type="text"
                      value={meta.tag}
                      onChange={(e) =>
                        handleMetaFieldChange(index, "tag", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`metaAttribute${index}`}>
                    <Form.Label>Meta Attribute</Form.Label>
                    <Form.Control
                      type="text"
                      value={meta.attribute}
                      onChange={(e) =>
                        handleMetaFieldChange(
                          index,
                          "attribute",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="danger" onClick={() => removeMetaField(index)}>
                Remove Meta Field
              </Button>
            </div>
          ))}
          <Button variant="primary" onClick={addMetaField} className="mt-3">
            + Add Meta Field
          </Button>

          {/* Categories */}
          {categories.map((category, index) => (
            <Form.Group
              controlId={`category${index}`}
              className="mt-3"
              key={index}
            >
              <Form.Label>Category {index + 1}</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    value={category}
                    onChange={(e) =>
                      handleCategoryChange(index, e.target.value)
                    }
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="danger"
                    onClick={() => removeCategory(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          ))}
          <Button variant="primary" onClick={addCategory} className="mt-3">
            + Add Category
          </Button>

          {/* Tags */}
          {tags.map((tag, index) => (
            <Form.Group controlId={`tag${index}`} className="mt-3" key={index}>
              <Form.Label>Tag {index + 1}</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="danger" onClick={() => removeTag(index)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          ))}
          <Button variant="primary" onClick={addTag} className="mt-3">
            + Add Tag
          </Button>

          {/* Featured Checkbox */}
          <Form.Group controlId="isFeatured" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          </Form.Group>

          {/* Meta Title Field */}
          <Form.Group controlId="metaTitle" className="mt-3">
            <Form.Label>Meta Title</Form.Label>
            <Form.Control
              type="text"
              name="metaTitle"
              value={formValues.metaTitle}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Meta Description Field */}
          <Form.Group controlId="metaDescription" className="mt-3">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="metaDescription"
              value={formValues.metaDescription}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" onClick={handleSubmit} className="mt-3">
            Create Blog
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogCreate;
