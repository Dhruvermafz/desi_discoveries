import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { TbPhotoPlus } from "react-icons/tb";
import moment from "moment";
import "../../../styles/addpackage.css";
const AddTourPackage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const currentUser = user.email;

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [groupCount, setGroupCount] = useState("");
  const [languages, setLanguages] = useState("");
  const [duration, setDuration] = useState("");
  const [cities, setCities] = useState("");
  const [description, setDescription] = useState("");
  const [introduction, setIntroduction] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !file ||
      !name ||
      !category ||
      !price ||
      !groupCount ||
      !languages ||
      !duration ||
      !cities ||
      !description ||
      !introduction
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields!",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload",
        formData
      );
      const imgUrl = uploadRes.data.url;

      const response = await axios.post("/tours", {
        currentUser,
        img: imgUrl,
        name,
        category,
        price,
        groupCount,
        languages,
        duration,
        cities,
        description,
        introduction,
      });

      Swal.fire(response.data.message, "", "success");
      navigate("/tours");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <Container fluid className="py-10 px-4 sm:px-4 lg:px-8">
      <Form>
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-semibold leading-7 text-[#41A4FF] text-center">
              Add Tour Package
            </h2>
            <p className="mt-3 text-red-500 text-lg leading-6 text-center">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <Form.Group className="mt-10">
              <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                Add a cover photo for the package
              </Form.Label>
              <div className="mt-10 flex flex-row items-center">
                <div className="w-1/3"></div>
                <div className="w-2/3">
                  <Image
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt="avatar"
                    className="w-[610px] h-[400px] rounded-3xl"
                  />
                </div>
              </div>
              <div className="mb-6 flex items-center justify-center text-center mt-12">
                <label htmlFor="file" className="mx-auto">
                  Click below icon to add a cover photo:
                  <TbPhotoPlus
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                </label>
                <Form.Control
                  type="file"
                  id="file"
                  name="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </Form.Group>
            <Row className="mt-10">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Add Name for Package
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type Here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Select Tour Category
                  </Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>--Select one--</option>
                    <option value="sun and beach">Sun and Beach</option>
                    <option value="hiking and trekking">
                      Hiking and Trekking
                    </option>
                    <option value="wild safari">Wild Safari</option>
                    <option value="special tours">Special Tour</option>
                    <option value="cultural">Cultural</option>
                    <option value="festival">Festival</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-6">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Add Per Person Price for Package
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Type Here"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Add Maximum Group Size
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Type Here"
                    value={groupCount}
                    onChange={(e) => setGroupCount(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-6">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Add Languages
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type Here"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                  />
                  <p className="text-sm">(English, French, German etc..)</p>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Select Tour Duration
                  </Form.Label>
                  <Form.Select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option>--Select One--</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="5">5 Days</option>
                    <option value="7">7 Days</option>
                    <option value="9">9 Days</option>
                    <option value="12">12 Days</option>
                    <option value="15">15 Days</option>
                  </Form.Select>
                  <p className="text-sm">(In days)</p>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-6">
              <Col>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Cities That are included in your package
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type Here"
                    value={cities}
                    onChange={(e) => setCities(e.target.value)}
                  />
                  <p className="text-sm">(Type cities in visiting order)</p>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-6">
              <Col>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Add a brief description about your tour package
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Type Your Description Here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-sm">
                    (This part will show as overall description part of tour
                    details)
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-6">
              <Col>
                <Form.Group>
                  <Form.Label className="block text-lg font-medium leading-6 text-gray-900">
                    Add an Introduction about your tour destinations and
                    activities
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Type Your Introduction Here"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                  <p className="text-sm">
                    (This part will show as overall introduction part of tour)
                  </p>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button variant="danger" type="reset">
              Reset
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit For Review
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default AddTourPackage;
