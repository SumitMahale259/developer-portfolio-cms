// "use client";

// import { useEffect, useState } from "react";

// const words = [
//   "Full Stack Developer",
//   "React.js Developer",
//   "Next.js Developer",
// ];

// export default function TypingText() {
//   const [wordIndex, setWordIndex] = useState(0);
//   const [displayText, setDisplayText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentWord = words[wordIndex];

//     const timeout = setTimeout(
//       () => {
//         if (!isDeleting) {
//           setDisplayText(
//             currentWord.slice(0, displayText.length + 1)
//           );

//           if (displayText === currentWord) {
//             setTimeout(() => setIsDeleting(true), 1500);
//           }
//         } else {
//           setDisplayText(
//             currentWord.slice(0, displayText.length - 1)
//           );

//           if (displayText === "") {
//             setIsDeleting(false);
//             setWordIndex((prev) => (prev + 1) % words.length);
//           }
//         }
//       },
//       isDeleting ? 50 : 100
//     );

//     return () => clearTimeout(timeout);
//   }, [displayText, isDeleting, wordIndex]);

//   return (
//     <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
//       {displayText}
//       <span className="animate-pulse">|</span>
//     </h1>
//   );
// }

"use client";

import { useEffect, useState } from "react";

const words = [
  "Full Stack Developer",
  "React.js Developer",
  "Next.js Developer",
];

export default function TypingText({roles}: {roles: string[]}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = roles[wordIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(
            currentWord.slice(0, displayText.length + 1)
          );
        }, 100);
      } else {
        if (roles.length === 1) return;
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(
            currentWord.slice(0, displayText.length - 1)
          );
        }, 50);
      } else {
        setIsDeleting(false);
        setWordIndex(
          (prev) => (prev + 1) % roles.length
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
      {displayText}
      <span className="animate-pulse">|</span>
    </h1>
  );
}