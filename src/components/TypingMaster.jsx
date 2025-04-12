import { Typewriter } from 'react-simple-typewriter';
import { useState } from 'react';

const TypingPara = ({ words }) => {
  const [showCursor, setShowCursor] = useState(true);

  const handleDone = () => {
    setShowCursor(false); // 🔴 Hides cursor after typing is done
  };

  return (
    <Typewriter
      words={words}
      loop={1}
      cursor={showCursor}
      cursorStyle="_"
      typeSpeed={10}
      delaySpeed={1000}
      onLoopDone={handleDone}
    />
  );
};

export default TypingPara