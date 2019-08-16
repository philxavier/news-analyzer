import { Table, Popup, Header, Icon } from "semantic-ui-react";
import { getWorst3Query } from "../queries/queries";
import { graphql } from "react-apollo";
import { Spinner } from "react-bootstrap";

import React, { Component } from "react";

class worst3 extends Component {
  constructor(props) {
    super(props);
  }

  displayData() {
    var data = this.props.data;

    console.log("this is data in worst", data);
    if (data.loading) {
      return (
        <div style={{ margin: "0 auto" }}>
          <Spinner animation="border" variant="light" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <div>
          <div className="header-container">
            <Header color="teal" as="h3" icon>
              <Icon name="thumbs down" />
              Top 3 Negative Articles
            </Header>
          </div>
          <div style={{ width: "550px" }}>
            <Table celled inverted selectable fixed={true} stackable={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Article Name</Table.HeaderCell>
                  <Table.HeaderCell>Evaluation</Table.HeaderCell>
                  <Table.HeaderCell>URL</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body className="table">
                <Table.Row>
                  <Popup
                    inverted
                    content={data.worst3[0].articleTitle}
                    trigger={
                      <Table.Cell collapsing={true}>
                        {data.worst3[0].articleTitle}
                      </Table.Cell>
                    }
                  />
                  <Table.Cell>{data.worst3[0].finalSentiment}</Table.Cell>
                  <Table.Cell collapsing={true} textAlign="right">
                    <a href={data.worst3[0].url}> {data.worst3[0].url}</a>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Popup
                    inverted
                    content={data.worst3[1].articleTitle}
                    trigger={
                      <Table.Cell collapsing={true}>
                        {data.worst3[1].articleTitle}
                      </Table.Cell>
                    }
                  />
                  <Table.Cell>{data.worst3[1].finalSentiment}</Table.Cell>
                  <Table.Cell collapsing={true} textAlign="right">
                    <a href={data.worst3[1].url}> {data.worst3[1].url}</a>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Popup
                    inverted
                    content={data.worst3[2].articleTitle}
                    trigger={
                      <Table.Cell collapsing={true}>
                        {data.worst3[2].articleTitle}
                      </Table.Cell>
                    }
                  />
                  <Table.Cell>{data.worst3[2].finalSentiment}</Table.Cell>
                  <Table.Cell collapsing={true} textAlign="right">
                    <a href={data.worst3[2].url}> {data.worst3[2].url}</a>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.displayData();
  }
}

export default graphql(getWorst3Query)(worst3);
