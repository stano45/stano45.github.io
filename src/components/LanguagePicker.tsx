import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation, useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';

interface Language {
  code: string;
  name: string;
  flag: string;
}

export default function LanguagePicker() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log('query', query);

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: 'GB' },
    { code: 'de', name: 'Deutsch', flag: 'DE' },
    { code: 'sk', name: 'Slovenčina', flag: 'SK' },
    { code: 'sv', name: 'Svenska', flag: 'SE' },
  ];
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const onToggleLanguageClick = (lang: Language) => {
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
    <div className="relative w-44" ref={ref}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <span className="mr-4">{selectedLang?.name ?? 'English'}</span>
        <ReactCountryFlag
          countryCode={selectedLang?.flag ?? 'GB'}
          svg
          style={{
            width: '1.5em',
            height: '1.5em',
          }}
          title={selectedLang?.flag ?? 'GB'}
        />
      </button>
      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg w-full bg-blue-500 ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm">
            {languages.map((lang) => (
              <li key={lang.code} className="hover:bg-blue-500 hover:text-white">
                <LanguageSwitcher lang={lang.code}>
                  <div className="inline-flex justify-between items-center w-full px-4 py-1 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                    <span className="mr-4 p-2">{lang.name}</span>
                    <ReactCountryFlag
                      countryCode={lang.flag}
                      svg
                      style={{
                        width: '1.5em',
                        height: '1.5em',
                      }}
                      title={lang.flag}
                    />
                  </div>
                </LanguageSwitcher>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
