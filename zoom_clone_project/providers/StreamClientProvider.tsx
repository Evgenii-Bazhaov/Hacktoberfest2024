"use client"

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {StreamVideo, StreamVideoClient} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  
  const StreamVideoProvider = ({children} : {children: ReactNode}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user,isLoaded} = useUser();
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error('Stream API key is missing');
    
        const client = new StreamVideoClient({
          apiKey: apiKey,
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider,
        });
    
        setVideoClient(client);
      }, [user, isLoaded]);

      if (!videoClient) return <Loader/>;
    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider