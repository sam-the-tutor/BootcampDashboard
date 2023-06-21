import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState, } from "react";
import { canisterId, createActor } from "../declarations/backend";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`,
  },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);
  const [isAdmin, setIsAdmin] = useState('');
  const [isGraduate, setIsGraduate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);


  async function setCredentials(client){
    if(whoamiActor !== null){
    
    const admin = await whoamiActor.isAdmin(principal);
    console.log("isAdmin :", admin)
    console.log("Principal : ", principal.toString())
    const graduate = await whoamiActor.isGraduate(principal);
   
    
    if(admin){
      setIsAdmin(admin)
      navigate('/admin')
    }
    else if(graduate){
      setIsGraduate(graduate)
      navigate('/graduate')
    }else{
      navigate('/')
    }
    }

  }
  

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };


  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal();
    setPrincipal(principal);

    setAuthClient(client);

  
    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setWhoamiActor(actor);

    if(isAuthenticated){
      setCredentials(client)
    }

  }

  async function logout() {
    await authClient?.logout();
    setIsAdmin('')
    setIsGraduate('')
    await updateClient(authClient);
    
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
    isAdmin,
    isGraduate,
    setIsAdmin,
    setIsGraduate,
    isLoading,
    setIsLoading
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
