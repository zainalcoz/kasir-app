import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjang: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjang: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
      totalHarga: keranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjang.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjang.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjang.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjang.id, data)
      .then((response) => {
        this.props.getDataKeranjang();
        swal({
          title: "Sukes",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((response) => {
        this.props.getDataKeranjang();
        swal({
          title: "Sukes",
          text: "Sukses Hapus Pesanan " + this.state.keranjang.product.nama,
          icon: "error",
          button: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((keranjang) => (
                <ListGroup.Item
                  key={keranjang.id}
                  onClick={() => this.handleShow(keranjang)}
                >
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

              <ModalKeranjang
                handleClose={this.handleClose}
                tambah={this.tambah}
                kurang={this.kurang}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleDelete={this.handleDelete}
                {...this.state}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
