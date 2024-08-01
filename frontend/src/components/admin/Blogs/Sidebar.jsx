import React from "react";
import { Form, Button } from "react-bootstrap";

const Sidebar = ({
  formik,
  isFeatured,
  setIsFeatured,
  metaFields,
  handleMetaFieldChange,
  removeMetaField,
  addMetaField,
  addParagraph,
}) => {
  return (
    <div className="sidebar">
      <h3>Sidebar</h3>
      <Form.Group controlId="categories">
        <Form.Label>Categories</Form.Label>
        <Form.Control
          type="text"
          name="categories"
          value={formik.values.categories}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Group>

      <Form.Group controlId="tags" className="mt-3">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          name="tags"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Group>

      {/* Featured Checkbox */}
      <Form.Group controlId="featured" className="mt-3">
        <Form.Check
          type="checkbox"
          label="Is this blog featured?"
          checked={isFeatured}
          onChange={() => setIsFeatured(!isFeatured)}
        />
      </Form.Group>

      {/* Dynamic Meta Fields */}
      <div>
        <h4>Meta Fields</h4>
        {metaFields.map((field, index) => (
          <div key={index} className="mt-3">
            <Form.Group controlId={`metaTag${index}`}>
              <Form.Label>Meta Tag {index}</Form.Label>
              <Form.Control
                type="text"
                value={field.tag}
                onChange={(e) =>
                  handleMetaFieldChange(index, "tag", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId={`metaAttribute${index}`} className="mt-2">
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
              Remove Meta Field {index}
            </Button>
          </div>
        ))}
        <Button variant="secondary" className="mt-3" onClick={addMetaField}>
          + Add Meta Field
        </Button>
        {/* Add Paragraph Button */}
        <Button variant="secondary" className="mt-3" onClick={addParagraph}>
          + Add Paragraph
        </Button>
      </div>

      {/* Submit Button */}
      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        onClick={formik.handleSubmit}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Submitting..." : "Create Blog"}
      </Button>
    </div>
  );
};

export default Sidebar;
