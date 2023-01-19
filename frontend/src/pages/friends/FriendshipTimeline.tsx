import FriendRequestCard from './FriendRequestCard';
import './styles/FriendsPage.css';
import Timeline from '../../components/Timeline';
import getDate from '../../utils/getDate';
import Tooltip from '../../components/Tooltip';
import { useNavigate } from 'react-router-dom';
import { getFriendsTimelineCardType, getFriendsTimelineType } from '../../utils/getFriendsPageText';
import FriendsRequestsListType from '../../types/components/FriendsRequestsListType';

const FriendshipTimeline: React.FC<{ friendsRequestsList: FriendsRequestsListType[] }> = ({
  friendsRequestsList
}) => {
  const navigate = useNavigate();

  return (
    <Timeline>
      {friendsRequestsList?.map((request) => (
        <Timeline.Item
          key={request.userId}
          text={`${getFriendsTimelineType(request.requestStatus, request.type)} ${getDate(
            request?.updatedAt || request?.createdAt,
            0,
            false
          )}`}
          hoverText={`${request?.firstName}'s profile`}
          button={
            <span className="btn" onClick={() => navigate(`/profile/${request.userId}/posts`)}>
              <Tooltip text="profile">
                <i className="fa fa-user" />
              </Tooltip>
            </span>
          }
        >
          <FriendRequestCard
            user={request}
            horizontal={true}
            type={`${getFriendsTimelineCardType(request.requestStatus, request.type)}`}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default FriendshipTimeline;
