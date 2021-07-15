import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const VoteButtons = ({ handleUpvote, handleDownvote, disabledElements }) => {
  return (
    <div className="vote-buttons-container">
      <button onClick={handleUpvote} disabled={disabledElements?.upvote}>
        <ThumbUpAltIcon />
      </button>
      <button onClick={handleDownvote} disabled={disabledElements?.downvote}>
        <ThumbDownAltIcon />
      </button>
    </div>
  );
};

export default VoteButtons;
