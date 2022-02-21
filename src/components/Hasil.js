import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((keranjang) => (
              <ListGroup.Item key={keranjang.id}>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pil="true" variant="success">
                        {keranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{keranjang.product.nama}</h5>
                    Rp. {numberWithCommas(keranjang.product.harga)}
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(keranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
