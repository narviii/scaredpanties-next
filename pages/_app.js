import React, { useEffect } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { useState } from 'react'
import { FirebaseContext, UserContext, DbContext, UserDocContext, LoginDialogContext } from '../src/context'
import firebase from '../src/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';






function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  })

  const db = firebase.firestore();
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [userDoc, loading, errorDoc] = useDocument(user ? db.collection('users').doc(user.uid) : null)

  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  return (
    <React.Fragment>
      <Head>
        <title>scaredpanties. A handpicked and lovely collected Lingerie brands catalog</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <FirebaseContext.Provider value={firebase}>
        <UserDocContext.Provider value={userDoc}>
          <DbContext.Provider value={db}>
            <UserContext.Provider value={user}>

              <LoginDialogContext.Provider value={{ loginDialogOpen, setLoginDialogOpen }}>
                <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </LoginDialogContext.Provider>
            </UserContext.Provider>
          </DbContext.Provider>
        </UserDocContext.Provider>

      </FirebaseContext.Provider>
    </React.Fragment>
  );
}

export default MyApp
