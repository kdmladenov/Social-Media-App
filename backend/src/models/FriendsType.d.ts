interface FriendsType {
  sourceId: number;
  targetId: number;
  requestStatusId: number;
  requestStatus: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  isDeleted: boolean;
  totalDBItems: number;
}

export default FriendsType;
