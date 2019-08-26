import React, { useState, useEffect } from "react";
import { Menu, Header, Loader, Input } from "semantic-ui-react";

const MenuTop2 = props => {
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   alert("oooooooooooooooooooooooooooooo");
  // }, [props.loading]);

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
    </Menu>
  );
};

export default MenuTop2;
