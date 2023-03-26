import React from 'react';
import Link from 'next/link';
import LanguagePicker from './LanguagePicker';
import { useTranslation, useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const router = useRouter();
  const navbarOptions = [
    { title: t('about.title'), path: '/about' },
    { title: t('blog.title'), path: '/blog' },
    { title: t('cv.title'), path: '/cv' },
    { title: t('contact.title'), path: '/contact' },
  ];
  console.log(router.asPath);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-4xl tracking-tight">Stanislav Kosorin</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block text-2xl lg:flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-2xl lg:flex-grow">
          {navbarOptions.map((option) => (
            <Link href={{ pathname: option.path, query: query }} passHref>
              <button
                className={`block mt-4 lg:inline-block lg:mt-0 ${
                  router.asPath.startsWith(option.path) ? 'text-white' : 'text-pink-200'
                }  hover:text-white mr-6`}
              >
                {option.title}
              </button>
            </Link>
          ))}
        </div>
        <LanguagePicker />
      </div>
    </nav>
  );
}
