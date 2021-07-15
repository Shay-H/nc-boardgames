import "../css/Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <p>Loading...</p>
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
