import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { withRouter } from "../utils/withRouter";

class TotalBayar extends Component {
  submitBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios
      .post(API_URL + "pesanans", pesanan)
      .then((response) => {
        this.props.navigate("/sukses");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
        {/**WEB */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <Row>
                <Col>
                  <h4>Total Harga:</h4>
                </Col>
                <Col>
                  <h4>
                    <strong className="float-right">
                      Rp. {numberWithCommas(totalBayar)}
                    </strong>
                  </h4>
                </Col>
              </Row>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={() => this.submitBayar(totalBayar)}
                  size="lg"
                  className="mb-2 mt-4 mr-2"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />{" "}
                  <strong>BAYAR</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/**MOBILE */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <Row>
                <Col>
                  <h4>Total Harga:</h4>
                </Col>
                <Col>
                  <h4>
                    <strong className="float-right">
                      Rp. {numberWithCommas(totalBayar)}
                    </strong>
                  </h4>
                </Col>
              </Row>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={() => this.submitBayar(totalBayar)}
                  size="lg"
                  className="mb-2 mt-4 mr-2"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />{" "}
                  <strong>BAYAR</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(TotalBayar);
