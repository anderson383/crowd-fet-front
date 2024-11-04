// useUser.js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Asegúrate de tener la ruta correcta para useSession

const useUser = () => {
  const [user, setUser] = useState(null);
  const session = useSession();

  useEffect(() => {
    if (session.data) {
      setUser(session.data.user);
    }
  }, [session]);

  return user; // Devuelve el usuario
};

export default useUser;
