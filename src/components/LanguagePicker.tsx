/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Tooltip } from '@nextui-org/react';
import { useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';
import React, { useEffect, useRef, useState } from 'react';
import { ReactCountryFlag } from 'react-country-flag';

interface Language {
  code: string;
  name: string;
  flag: string;
}

export function LanguagePicker() {
  const [query] = useLanguageQuery();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: 'GB' },
    { code: 'de', name: 'Deutsch', flag: 'DE' },
    { code: 'sk', name: 'Slovenčina', flag: 'SK' },
    { code: 'sv', name: 'Svenska', flag: 'SE' },
  ];
  const [selectedLang, setSelectedLang] = useState(languages.find((lang) => lang.code === query?.lang) ?? languages[0]);

  useEffect(() => {
    setSelectedLang(languages.find((lang) => lang.code === query?.lang) ?? languages[0]);
  }, [query?.lang]);

  const onSelectLang = (lang: Language) => {
    setSelectedLang(lang);
    setDropdownOpen(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative z-10" ref={ref}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-1 inline-flex justify-between items-center w-full text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500  "
      >
        <ReactCountryFlag
          countryCode={selectedLang.flag}
          svg
          style={{
            width: '1.5em',
            height: '1.5em',
          }}
          title={selectedLang.name}
        />
      </button>
      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg w-full bg-blue-500 ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm">
            {languages.map((lang) => (
              <>
                {lang.code === 'sv' ? (
                  <Tooltip
                    content={
                      'Jag håller fortfarande på att lära mig svenska, så översättningarna kan vara felaktiga :)'
                    }
                    placement="left"
                  >
                    <li key={lang.code} className="hover:bg-blue-500 hover:text-white">
                      <LanguageSwitcher lang={lang.code}>
                        <button
                          onClick={() => onSelectLang(lang)}
                          className="inline-flex justify-between items-center w-full p-1 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                        >
                          <ReactCountryFlag
                            countryCode={lang.flag}
                            svg
                            style={{
                              width: '1.5em',
                              height: '1.5em',
                            }}
                            title={lang.flag}
                          />
                        </button>
                      </LanguageSwitcher>
                    </li>
                  </Tooltip>
                ) : (
                  <li key={lang.code} className="hover:bg-blue-500 hover:text-white">
                    <LanguageSwitcher lang={lang.code}>
                      <button
                        onClick={() => onSelectLang(lang)}
                        className="inline-flex justify-between items-center w-full p-1 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        <ReactCountryFlag
                          countryCode={lang.flag}
                          svg
                          style={{
                            width: '1.5em',
                            height: '1.5em',
                          }}
                          title={lang.flag}
                        />
                      </button>
                    </LanguageSwitcher>
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
