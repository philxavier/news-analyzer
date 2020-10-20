import React from "react";
import { addArticlesMutation, getArticlesQuery } from "../queries/queries";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import MenuTop from "./menuTop";

const MenuTopContainer = ({
  stopSpinner,
  startSpinner,
  addArticlesMutation,
}) => {
  const [loading, setIsloading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const submit = async (url) => {
    startSpinner();
    setIsloading(true);
    try {
      await addArticlesMutation({
        variables: {
          url: url,
        },
        // refetchQueries: [{ query: await getArticlesQuery }]
      });
    } catch (err) {
      console.log("this is the error", err);
    }

    setIsloading(false);
    stopSpinner();
  };

  return (
    <div style={{ marginBottom: "2%", width: "100%" }}>
      <MenuTop submit={submit} loading={loading} error={error} />
    </div>
  );
};

export default compose(
  graphql(getArticlesQuery, { name: "getArticlesQuery" }),
  graphql(addArticlesMutation, { name: "addArticlesMutation" })
)(MenuTopContainer);
