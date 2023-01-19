import FriendRequestCard from './FriendRequestCard';
import './styles/FriendsPage.css';
import Timeline from '../../components/Timeline';
import getDate from '../../utils/getDate';
import Tooltip from '../../components/Tooltip';
import { useNavigate } from 'react-router-dom';
import FriendType from '../../types/FriendType';
import getSortedFriendsByBirthday from '../../utils/getSortedFriendsByBirthday';

const BirthdaysTimeline: React.FC<{ friends: FriendType[] }> = ({ friends }) => {
  const navigate = useNavigate();

  return (
    <Timeline>
      {getSortedFriendsByBirthday(friends).map((friend) => (
        <Timeline.Item
          key={friend.userId}
          text={`${getDate(friend?.dateOfBirth, 0, false)}`}
          hoverText={`${friend?.firstName}'s profile`}
          button={
            <span className="btn" onClick={() => navigate(`/profile/${friend.userId}/posts`)}>
              <Tooltip text="profile">
                <i className="fa fa-user" />
              </Tooltip>
            </span>
          }
        >
          <FriendRequestCard user={friend} horizontal={true} type={`friend`} />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default BirthdaysTimeline;
