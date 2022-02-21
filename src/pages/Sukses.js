import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import axios from "axios";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((response) => {
        const keranjangs = response.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
