import React, { Component } from "react";
import { Input, Menu, Header } from "semantic-ui-react";

class MenuTop extends Component {
  render() {
    return (
      <Menu>
        <div style={{ top: "50%", marginTop: "5px" }}>
          <Header as="h2" floated="right">
            Brazil according to
          </Header>
        </div>
        <div style={{ marginTop: "3px" }}>
          <img
            src="https://news-analyzer.s3-us-west-2.amazonaws.com/cnn+logo.png"
            alt=""
            width="80px"
            height="40px"
          />
        </div>

        <Menu.Item position="right">
          <Input
            action={{ type: "submit", content: "Add Article" }}
            placeholder="Insert Article URL"
          />
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuTop;
