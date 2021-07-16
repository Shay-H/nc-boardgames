import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const VoteButtons = ({
  handleUpvote,
  handleDownvote,
  disabledElements,
  commentId,
}) => {
  return (
    <div className="vote-buttons-container">
      <button
        onClick={(event) => handleUpvote(event, commentId)}
        disabled={disabledElements?.upvote}
      >
        <ThumbUpAltIcon />
      </button>
      <button
        onClick={(event) => handleDownvote(event, commentId)}
        disabled={disabledElements?.downvote}
      >
        <ThumbDownAltIcon />
      </button>
    </div>
  );
};

export default VoteButtons;
