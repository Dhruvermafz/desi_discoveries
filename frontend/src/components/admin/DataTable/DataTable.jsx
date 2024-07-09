import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import "./datatable.css";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useFetch(`${path}`);
  const navigate = useNavigate();

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        setIsLoading(true);
        await axios.delete(`${path}/${id}`);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }

      setList(list.filter((item) => item._id !== id));
    }
  };

  const handleView = async (id) => {
    try {
      if (path === "users") {
        const userdata = await axios.get(`${path}/${id}`);
        navigate("/userpage", { state: userdata.data });
      }
      if (path === "hotels") {
        const hoteldata = await axios.get(`${path}/find/${id}`);
        navigate("/hoteladmin", { state: hoteldata.data });
      }
      if (path === "vehicle") {
        const vehicledata = await axios.get(`${path}/${id}`);
        navigate("/vehicle/view/", { state: vehicledata.data });
      }
      if (path === "tours") {
        const tourData = await axios.get(`${path}/${id}`);
        navigate("/tour/view", { state: tourData.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button
              variant="primary"
              onClick={() => handleView(params.row._id)}
              className="mr-2"
            >
              View
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // Use useMemo to filter the list only when the search query changes
  const filteredList = useMemo(() => {
    if (!searchQuery) {
      return list;
    }

    const searchRegex = new RegExp(searchQuery.trim(), "i");
    return list.filter((item) => {
      const searchableString = `${item.name} ${item.type} ${item.email} ${item.mobile} ${item.country} ${item.ownerName} ${item.vehicleType}`;
      return searchRegex.test(searchableString);
    });
  }, [list, searchQuery]);

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>
      {isLoading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.headerName}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item) => (
              <tr key={item._id}>
                {columns.map((column, index) => (
                  <td key={index}>{item[column.field]}</td>
                ))}
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleView(item._id)}
                    className="mr-2"
                  >
                    View
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Datatable;
