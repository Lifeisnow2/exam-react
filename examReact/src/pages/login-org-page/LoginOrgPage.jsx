// const LoginOrgPage = () => {
//   return <h1> Login Org page</h1>;
// };
import { useParams } from 'react-router-dom';
const LoginOrgPage = () => {
  const { id } = useParams();
  return <h1>Login org page for id: {id}</h1>;
};
export default LoginOrgPage;
