import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ListCategories, Hasil, Menu } from "../components";
import axios from "axios";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryPilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryPilih)
      .then((response) => {
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((response) => {
        const keranjangs = response.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((response) => {
          const keranjangs = response.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((response) => {
        if (response.data.length === 0) {
          const data = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", data)
            .then((response) => {
              swal({
                title: "Sukes",
                text: "Sukses Masuk Keranjang " + data.product.nama,
                icon: "success",
                button: false,
                timer: 3000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const data = {
            jumlah: response.data[0].jumlah + 1,
            total_harga: response.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + response.data[0].id, data)
            .then((response) => {
              swal({
                title: "Sukes",
                text: "Sukses Masuk Keranjang " + data.product.nama,
                icon: "success",
                button: false,
                timer: 3000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categoryPilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((response) => {
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoryPilih, keranjangs } = this.state;
    return (
      <div className="App">
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoryPilih={categoryPilih}
              />
              <Col>
                <h4>
                  <strong>Daftar Product</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menu
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
