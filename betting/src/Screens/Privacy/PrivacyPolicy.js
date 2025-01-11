import React, { useEffect } from "react";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { apiCallNew } from "../../Network_Call/apiservices";
import { PulseLoader } from "react-spinners";

const PrivacyPolicy = () => {
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = async () => {
    try {
      setLoad(true);
      const response = await apiCallNew(
        "get",
        null,
        ApiEndPoints.PrivacyPolicy
      );
      if (response.success === true) {
        setData(response.result);
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.error(error);
      setLoad(false);
    }
  };
  return (
    <div className="m-5">
      {" "}
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <>
        <div className="m-5">
          <div
            dangerouslySetInnerHTML={{
              __html: data?.content,
            }}
          />
        </div>
      </>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#155239",
  },
};

export default PrivacyPolicy;
