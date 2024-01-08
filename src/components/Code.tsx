"use client";
import { useState, useRef, useEffect, use } from "react";
import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";
type Props = {
  placeholder: string;
  initialValue?: string;
};

const Code = () => {
  const preRef = useRef<HTMLPreElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>("");
  const [isTextAreaFocused, setIsTextAreaFocused] = useState<boolean>(false);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current && preRef.current && textAreaRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const preHeight = preRef.current.clientHeight;

      textAreaRef.current.style.height = `${Math.max(
        preHeight,
        containerHeight
      )}px`;
    }
  }, [containerRef.current?.clientHeight, preRef.current?.clientHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <div
      className={clsx(
        isTextAreaFocused ? "border-pink-400" : "border-white/20",
        "h-2/3 w-2/3 max-w-4xl rounded-xl border-[1px] py-4",
        "transition-colors duration-300 ease-in-out"
      )}
    >
      <div ref={containerRef} className="relative h-full w-full overflow-auto">
        <Highlight code={value} language="jsx" theme={themes.nightOwl}>
          {({ className,tokens, getLineProps, getTokenProps }) => (
            <>
              <textarea
                ref={textAreaRef}
                value={value}
                placeholder="Add some code here.."
                onChange={handleChange}
                spellCheck={false}
                onFocus={() => setIsTextAreaFocused(true)}
                onBlur={() => setIsTextAreaFocused(false)}
                className={clsx(
                  className,
                  "absolute w-full resize-none overflow-hidden whitespace-pre-wrap break-words break-keep bg-transparent pl-16 pr-3 font-mono text-transparent",
                  "caret-pink-500 selection:bg-pink-500/30 placeholder:text-white/20 focus:outline-none"
                )}
              />
              <pre
                ref={preRef}
                className={clsx(
                  className,
                  "pointer-events-none absolute w-full select-none pr-3"
                )}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="table-row"
                  >
                    <span className="table-cell w-10 select-none text-right opacity-50">
                      {i + 1}
                    </span>
                    <code className="table-cell whitespace-pre-wrap break-words break-keep pl-6">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </code>
                  </div>
                ))}
              </pre>
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default Code;
