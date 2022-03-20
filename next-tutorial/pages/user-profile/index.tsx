import { GetServerSideProps, NextPage } from 'next';

interface UserProfileProps {
  username: string;
}

const UserProfile: NextPage<UserProfileProps> = ({ username }) => {
  return (
    <div>
      <h1>UserProfile</h1>
      <h2>{username}</h2>
    </div>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async context => {
  // const {params, req, res} = context;

  return {
    props: {
      username: 'khaled',
    },
  };
};
