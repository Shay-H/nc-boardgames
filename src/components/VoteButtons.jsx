import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const VoteButtons = ({ handleUpvote, handleDownvote, disabledButtons }) => {
  return (
    <div className="vote-buttons-container">
      <button onClick={handleUpvote} disabled={disabledButtons.upvote}>
        <ThumbUpAltIcon />
      </button>
      <button onClick={handleDownvote} disabled={disabledButtons.downvote}>
        <ThumbDownAltIcon />
      </button>
    </div>
  );
};

export default VoteButtons;
