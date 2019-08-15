import { Button, InputGroup, FormControl } from "react-bootstrap";
import Axios from "axios";

import React, { Component } from "react";

export default class InputButton extends Component {
  constructor(props) {
    super(props);
  }

  includeArticle = () => {
    alert("cheers");
  };

  render() {
    return (
      <div className="input-button-wrapper">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button onClick={this.includeArticle} variant="outline-secondary">
              Include Article
            </Button>
          </InputGroup.Prepend>
          <FormControl aria-describedby="basic-addon1" />
        </InputGroup>
      </div>
    );
  }
}
