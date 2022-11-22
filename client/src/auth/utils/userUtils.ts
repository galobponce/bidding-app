import { User } from '../../common/types';


export async function getUserFromUid(uid: number | string) {
  // Get users json from public folder
  const res = await fetch('../../users.json');

  // Get users from success response
  const users: User[] = await res.json();


  // Search the user by uid in users array
  const user = users.find(user => user.uid === uid);

  return user;
};