import React, { useState } from "react";
import { Menu, Header, Input } from "semantic-ui-react";

const MenuTop2 = props => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = e => {
    var url = e.target.value;
    setSearchTerm(url);
  };

  const handleClick = async () => {
    let url = searchTerm;
    await props.submit(url);
    setSearchTerm("");
  };

  return (
    <Menu>
      <div className="menu-wrapper">
        <div className="title-container">
          <h2 style={{ marginRight: "10px" }}>Brazil according to</h2>
          <img
            src="https://news-analyzer.s3-us-west-2.amazonaws.com/cnn+logo.png"
            alt=""
            width="80px"
            height="40px"
          />
        </div>

        <Menu.Item position="right" className="input-bar">
          <Input
            fluid={true}
            value={searchTerm}
            action={{
              onClick: handleClick,
              content: "Add Article"
            }}
            placeholder="insert URL"
            onChange={e => {
              handleChange(e);
            }}
          />
        </Menu.Item>
      </div>
    </Menu>
  );
};

export default MenuTop2;
