import React from 'react';
import Link from 'next/link';
import LanguagePicker from './LanguagePicker';
import { useTranslation, useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';

export default function Navbar() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
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
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-2xl lg:flex-grow">
          <Link href={{ pathname: '/about', query: query }} passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white mr-6">
              {t('about.title')}
            </button>
          </Link>
          <Link href={{ pathname: '/blog', query: query }} passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white mr-6">
              {t('blog.title')}
            </button>
          </Link>
          <Link href={{ pathname: '/cv', query: query }} passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white mr-6">
              {t('cv.title')}
            </button>
          </Link>
          <Link href={{ pathname: '/contact', query: query }} passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white">
              {t('contact.title')}
            </button>
          </Link>
        </div>
        <div>
          <LanguagePicker />
        </div>
      </div>
    </nav>
  );
}
