// Period.tsx
import { CSSTransition } from 'react-transition-group';
import React, { useState, FC, useCallback } from 'react';
import styles from './Period.module.css';

export interface PeriodProps {
  title: string;
  date: string;
  description: string;
  details: React.ReactNode;
  url: string;
  urlName: string;
  urlLabel: string;
}

export default function Period({ title, date, description, details, url, urlName, urlLabel }: PeriodProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = useCallback(() => {
    setDropdownVisible(!dropdownVisible);
  }, [dropdownVisible]);

  return (
    <div className="mb-8">
      <div className="flex items-start cursor-pointer" onClick={toggleDropdown}>
        <div className="w-1/4">
          <h4 className="text-gray-500">{date}</h4>
        </div>
        <div className="w-3/4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-2">{description}</p>
        </div>
        <div className={`transform transition duration-300 ${dropdownVisible ? 'rotate-180' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <div className="w-3/4 ml-auto">
        <CSSTransition
          in={dropdownVisible}
          timeout={300}
          classNames={{
            enter: styles.slideEnter,
            enterActive: styles.slideEnterActive,
            exit: styles.slideExit,
            exitActive: styles.slideExitActive,
          }}
          unmountOnExit
          appear
        >
          <div className="mt-4 p-4 border border-gray-200 rounded">
            {details}
            <div className="mt-4">
              {urlLabel}
              {': '}
              <a className="text-blue-500 underline" href={url} target="_blank" rel="noopener noreferrer">
                {urlName}
              </a>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
