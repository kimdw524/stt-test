import React, { useRef } from 'react';
import useUserAudio from '../hooks/useUserAudio';
import axios from 'axios';

const Main = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { record, stop } = useUserAudio();

  const handleStop = async () => {
    const audio = await stop();
    console.log(audio);
    return;
    const result = await axios.post(
      'http://aiopen.etri.re.kr:8000/WiseASR/Recognition',
      {
        request_id: 'reserved field',
        argument: {
          language_code: 'korean',
          audio: audio,
        },
      },
      { headers: { Authorization: 'cb4c3815-0505-4768-9cfd-822afecbd954' } }
    );
    console.log(result);
  };

  return (
    <main>
      <button onClick={() => record()}>녹음 시작</button>
      <button onClick={handleStop}>저장</button>
      <audio ref={audioRef} controls />
    </main>
  );
};

export default Main;
