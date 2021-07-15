import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { postCommentByReviewId } from "../utils/api";

const AddCommentForm = ({ reviewId, setCommentsChanged }) => {
  const user = useContext(UserContext);
  const [commentObj, setCommentObj] = useState({
    author: user.username,
    body: "",
  });
  const [postError, setPostError] = useState(false);

  const changeComment = (event) => {
    setCommentObj({ author: user.username, body: event.target.value });
  };

  const handleSubmit = (event) => {
    setPostError(false);
    event.preventDefault();
    postCommentByReviewId(reviewId, commentObj)
      .then(() => {
        setCommentsChanged((currCommentsChanged) => {
          const newCommentsChanged = currCommentsChanged + 1;
          return newCommentsChanged;
        });
      })
      .catch((err) => {
        setPostError(true);
      });
  };

  return (
    <div className="comment-form-container">
      {postError ? (
        <div className="post-err">
          <p>Error posting, please try again.</p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-input">Post new comment</label>
        <textarea
          type="text"
          name="comment-input"
          id="comment-input"
          value={commentObj.body || ""}
          onChange={changeComment}
        />
        <button
          disabled={commentObj.body.length < 1 || !user.username ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
