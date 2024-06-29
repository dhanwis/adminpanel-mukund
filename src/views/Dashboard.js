import { addprojectresponsecontext } from "components/context/ContextShareeee";
import React, { useContext, useEffect, useState } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { allproductAPI } from "services/allAPI";
import { BASE_URL } from "services/baseurl";
import nodata from "assets/img/no-data2.1.gif";

function Dashboard() {
  const [getProduct, setgetProduct] = useState([]);

  const { addprojectresponse, setaddprojectresponse } = useContext(addprojectresponsecontext);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (addprojectresponse) {
      setgetProduct(addprojectresponse);
    }
  }, [addprojectresponse]);

  const getProducts = async () => {
    const reqheader = {
      "Content-Type": "application/json",
    };
    const result = await allproductAPI(reqheader);
    setgetProduct(result.data);
    setaddprojectresponse(result.data);
  };

  console.log(getProduct);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats" style={{ width: '20rem' }}>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-cart-simple text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Products</p>
                      <CardTitle tag="p">{getProduct?.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Top 10 Products</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getProduct && getProduct.length > 0 ?
                        getProduct.map((item, index) => (
                          <tr key={item.id}> {/* Assuming each item has a unique id */}
                            <td>{index + 1}</td>
                            <td>{item.productname}</td>
                            <td>
                              <img
                                src={`${BASE_URL}/uploads/${item.image}`}
                                alt={item.productname}
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  borderRadius: '50%'
                                }}
                              />
                            </td>
                          </tr>
                        ))
                        : null
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
