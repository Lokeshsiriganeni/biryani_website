import { useLocation } from "react-router-dom";

function AddTransactionPage() {
  const location = useLocation();
  const user = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please capture an image.");

    const blob = await (await fetch(image)).blob();
    const formData = new FormData();
    console.log("blob img" + blob);
    formData.append("name", userData.name);
    formData.append("address", userData.address);
    formData.append("mobile", userData.mobile);
    formData.append("image", blob, "captured.jpg");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      console.log("Uploaded successfully: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // console.log("user details are", user.user_name);
  return (
    <>
      <h1>Add transaction page</h1>
      <input></input>
    </>
  );
}

export default AddTransactionPage;
