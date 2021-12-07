const getPoints = async (address) => {
  const response = await fetch("../pointsData.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const object = response.json();
  console.log(object);
  return object.data;
};

const getApts = async () => {
  const response = await fetch("../aptsData.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const object = response.json();
  console.log(object);
  return object.data;
};

const sendForm = (data) => {
  console.log(data);
};

export { getPoints, getApts, sendForm };
